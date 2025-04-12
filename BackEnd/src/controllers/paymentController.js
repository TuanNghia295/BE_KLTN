import axios from 'axios';
import mongoose from 'mongoose';
import ProductModel from '../models/productModel.js';
import OrderModel from '../models/orderModel.js';
// Assume you have User model if needed for population, etc.
// import UserModel from './models/UserModel';

// --- Constants ---
// ** IMPORTANT: Use Environment Variables for sensitive data! **
const GOONG_API_KEY = process.env.GOONG_API_KEY || 'VPm5NokrnVUxZcWC3tWKf6ImVSweqe3pPyq47U5S';

const GOONG_GEOCODE_URL = 'https://rsapi.goong.io/Geocode';
const GOONG_DISTANCE_URL = 'https://rsapi.goong.io/DistanceMatrix';
const DEFAULT_FROM_ADDRESS = 'Số 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh';
const ALLOWED_PAYMENT_METHODS = ['cash', 'bank_transfer']; // Or align with OrderModel if different

// --- Database Connection (Example - Place in your server setup) ---
/*
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));
*/
// Make sure the connection is established before your server starts listening.

// --- Goong API Functions (Geocoding & Distance) ---
const geocodeAddress = async (address) => {
  if (!GOONG_API_KEY) {
    console.error('Goong API Key is missing!');
    throw new Error('Lỗi cấu hình hệ thống vận chuyển.');
  }
  try {
    const response = await axios.get(GOONG_GEOCODE_URL, {
      params: { address, api_key: GOONG_API_KEY },
    });
    if (response.data?.results?.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    console.warn(`Geocoding không tìm thấy kết quả cho: ${address}`);
    throw new Error(`Không thể xác định vị trí cho địa chỉ: ${address}`);
  } catch (error) {
    const errorMsg = error.response?.data?.error_message || error.message;
    const status = error.response?.status;
    console.error(`Lỗi Goong Geocode (${status}) cho "${address}":`, errorMsg);
    if (status === 403) {
      // Forbidden - likely bad API key
      throw new Error(`Lỗi xác thực Goong API. Vui lòng kiểm tra API Key.`);
    }
    throw new Error(`Lỗi Goong Geocode: ${errorMsg}`);
  }
};

const calculateDistance = async (origin, destination) => {
  if (!GOONG_API_KEY) {
    console.error('Goong API Key is missing!');
    throw new Error('Lỗi cấu hình hệ thống vận chuyển.');
  }
  try {
    const response = await axios.get(GOONG_DISTANCE_URL, {
      params: {
        origins: `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        vehicle: 'car', // Or 'bike'
        api_key: GOONG_API_KEY,
      },
    });

    const element = response.data?.rows?.[0]?.elements?.[0];
    if (element?.status === 'OK') {
      const distanceMeters = element.distance.value;
      return distanceMeters / 1000; // Convert to km
    }

    const status = element?.status || response.data?.status || 'UNKNOWN_ERROR';
    console.warn(`Không thể tính khoảng cách Goong. Status: ${status}`, response.data);
    // Handle specific known statuses from Goong if needed
    if (status === 'ZERO_RESULTS') {
      throw new Error('Không thể tìm thấy tuyến đường giữa hai địa điểm.');
    }
    if (status === 'MAX_ROUTE_LENGTH_EXCEEDED') {
      throw new Error('Khoảng cách quá lớn để tính toán.');
    }
    throw new Error(`Không thể tính toán khoảng cách. Lỗi: ${status}`);
  } catch (error) {
    const errorMsg = error.response?.data?.error_message || error.message;
    const status = error.response?.status;
    console.error(`Lỗi Goong Distance Matrix (${status}):`, errorMsg);
    if (status === 403) {
      // Forbidden - likely bad API key
      throw new Error(`Lỗi xác thực Goong API. Vui lòng kiểm tra API Key.`);
    }
    throw new Error(`Lỗi Goong Distance Matrix: ${errorMsg}`);
  }
};

// --- Shipping Fee Calculation Logic ---
const calculateShippingFee = (distance) => {
  if (distance <= 0) return 0;

  const FIRST_KM_FEE = 15000; // Fee for the first kilometer
  const ADDITIONAL_KM_FEE = 2000; // Fee for each additional kilometer

  if (distance <= 1) {
    return FIRST_KM_FEE;
  }

  const additionalDistance = distance - 1; // Distance after the first kilometer
  const fee = FIRST_KM_FEE + additionalDistance * ADDITIONAL_KM_FEE;

  return Math.round(fee / 1000) * 1000; // Round to the nearest thousand
};

// --- Internal Helper to get Shipping Fee and Distance ---
const getShippingDetails = async (fromAddress, toAddress, isReturn = false) => {
  try {
    const [fromLocation, toLocation] = await Promise.all([
      geocodeAddress(fromAddress), // Throws specific error on failure
      geocodeAddress(toAddress), // Throws specific error on failure
    ]);

    const distance = await calculateDistance(fromLocation, toLocation); // Throws specific error
    let fee = calculateShippingFee(distance);

    if (isReturn) {
      fee *= 1.5; // Example return policy
      fee = Math.round(fee / 1000) * 1000;
    }
    return { shippingFee: fee, distance };
  } catch (error) {
    // Log the specific error origin if possible
    console.error(`Lỗi trong quá trình getShippingDetails: ${error.message}`);
    // Re-throw the specific error from geocodeAddress or calculateDistance
    throw error;
  }
};

// --- Internal Helper Function to Get Product and Validate Variation ---
const fetchAndValidateProductVariation = async (itemData) => {
  const { productId, quantity, size, color } = itemData;
  try {
    const product = await ProductModel.findOne({ productId: productId });

    if (!product) {
      console.warn(`Sản phẩm không tồn tại trong DB với productId: ${productId}`);
      // Return structured error info instead of throwing immediately
      return { error: `Sản phẩm với ID ${productId} không tồn tại.`, product: null, variation: null };
    }

    // Find the specific variation within the product
    const variation = product.variations?.find((v) => v.size === size && v.color === color);

    if (!variation) {
      console.warn(`Không tìm thấy biến thể size '${size}', color '${color}' cho productId: ${productId}`);
      return {
        error: `Sản phẩm ${product.name} (ID: ${productId}) không có biến thể size '${size}', color '${color}'.`,
        product: product,
        variation: null,
      };
    }

    // Check stock
    if (variation.amount < quantity) {
      console.warn(
        `Không đủ hàng cho biến thể size '${size}', color '${color}' của productId: ${productId}. Cần ${quantity}, có ${variation.amount}`
      );
      return {
        error: `Sản phẩm ${product.name} (${size}/${color}) chỉ còn ${variation.amount} sản phẩm, không đủ ${quantity} sản phẩm.`,
        product: product,
        variation: variation,
      };
    }

    // If all checks pass, return the necessary data
    return { error: null, product, variation };
  } catch (error) {
    console.error(`Lỗi khi truy vấn/kiểm tra sản phẩm/biến thể cho productId ${productId}:`, error);
    // Throw a new error indicating a DB problem during fetch/validation
    throw new Error(`Lỗi cơ sở dữ liệu khi kiểm tra sản phẩm ${productId}.`);
  }
};

// --- Database Saving Function (Using OrderModel) ---
const saveOrderToDatabase = async (orderData) => {
  try {
    // Create a new order instance using the imported OrderModel
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();
    console.log('Đơn hàng đã lưu vào DB với ID:', savedOrder._id);
    // Return the saved document as a plain object if needed downstream
    return savedOrder.toObject();
  } catch (dbError) {
    console.error('Lỗi khi lưu đơn hàng vào DB:', dbError);
    // Check for specific Mongoose validation errors if needed
    if (dbError instanceof mongoose.Error.ValidationError) {
      throw new Error(`Lỗi dữ liệu khi lưu đơn hàng: ${dbError.message}`);
    }
    // Check for unique constraint errors (e.g., transactionId if you enforce it)
    if (dbError.code === 11000) {
      // Duplicate key error code
      throw new Error(`Lỗi trùng lặp dữ liệu khi lưu đơn hàng (ví dụ: transactionId).`);
    }
    throw new Error('Không thể lưu đơn hàng vào cơ sở dữ liệu.'); // Generic DB save error
  }
};

// --- Function to Update Stock (Needs Careful Implementation) ---
const updateStockAfterOrder = async (orderedItems) => {
  // This requires atomic operations to prevent race conditions
  console.log('!!! Cần thực hiện: Giảm số lượng tồn kho cho các sản phẩm đã đặt !!!', orderedItems);
  // Example (Simplified - potentially unsafe without transactions/atomicity):
  /*
    const bulkOps = orderedItems.map(item => ({
        updateOne: {
            filter: { _id: item._id, "variations._id": item.productVariationId }, // Find product and specific variation
            update: { $inc: { "variations.$.amount": -item.quantity } } // Decrement amount of the matched variation
        }
    }));
    try {
        if (bulkOps.length > 0) {
            await ProductModel.bulkWrite(bulkOps);
            console.log("Đã cập nhật số lượng tồn kho.");
        }
    } catch (stockError) {
        console.error("LỖI NGHIÊM TRỌNG: Không thể cập nhật tồn kho sau khi đặt hàng:", stockError);
        // !!! Add compensation logic here: Cancel the order, notify admin, etc. !!!
    }
    */
};

// --- API Endpoint: Create Order (Fully Revised) ---
export const createOrder = async (req, res) => {
  const userId = req.user?._id;

  console.log('User ID from auth middleware:', userId); // Debugging line

  if (!userId) {
    return res.status(401).json({ error: 'Xác thực thất bại. Vui lòng đăng nhập.' });
  }

  const { customerName, customerPhone, toAddress, items, paymentMethod, note = '', isReturn = false } = req.body;

  const fromAddress = DEFAULT_FROM_ADDRESS;

  // --- 1. Input Validation ---
  let errors = [];
  if (!customerName) errors.push('Thiếu tên khách hàng.');
  if (!customerPhone) errors.push('Thiếu số điện thoại khách hàng.');
  if (!toAddress) errors.push('Thiếu địa chỉ giao hàng.');

  // Payment Method Validation
  const allowedPaymentMethods = ['Cash', 'BankTransfer']; // Matches enum in orderModel
  if (!paymentMethod) {
    errors.push('Thiếu phương thức thanh toán.');
  } else if (!allowedPaymentMethods.includes(paymentMethod)) {
    errors.push(`Phương thức thanh toán không hợp lệ. Chỉ chấp nhận: ${allowedPaymentMethods.join(', ')}.`);
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('Danh sách sản phẩm không hợp lệ hoặc rỗng.');
  } else {
    items.forEach((item, index) => {
      const itemLabel = `Sản phẩm thứ ${index + 1}`;
      if (!item.productId || typeof item.productId !== 'number')
        errors.push(`${itemLabel}: Thiếu hoặc sai định dạng productId (phải là số).`);
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0 || !Number.isInteger(item.quantity))
        errors.push(`${itemLabel}: Số lượng không hợp lệ.`);
      if (!item.size || typeof item.size !== 'string') errors.push(`${itemLabel}: Thiếu hoặc sai định dạng 'size'.`);
      if (!item.color || typeof item.color !== 'string') errors.push(`${itemLabel}: Thiếu hoặc sai định dạng 'color'.`);
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Dữ liệu yêu cầu không hợp lệ.', details: errors });
  }

  // --- 2. Process Order ---
  try {
    let subtotal = 0;
    const validatedOrderItems = [];
    const itemsForStockUpdate = [];

    // --- 2a. Fetch Products, Validate Variations & Stock, Calculate Subtotal ---
    const validationPromises = items.map((item) => fetchAndValidateProductVariation(item));
    const validationResults = await Promise.all(validationPromises);

    const validationErrors = validationResults.filter((result) => result.error);
    if (validationErrors.length > 0) {
      const errorDetails = validationErrors.map((errResult) => errResult.error);
      const isNotFound = validationErrors.every((e) => e.error.includes('không tồn tại'));
      const isOutOfStock = validationErrors.some((e) => e.error.includes('không đủ'));

      let statusCode = 400;
      if (isNotFound && !isOutOfStock) {
        statusCode = 404;
      }

      return res.status(statusCode).json({
        error: 'Một hoặc nhiều sản phẩm không hợp lệ hoặc không đủ hàng.',
        details: errorDetails,
      });
    }

    // If all validations passed, calculate subtotal and prepare item data
    for (let i = 0; i < validationResults.length; i++) {
      const { product, variation } = validationResults[i];
      const itemRequestData = items[i];

      const itemTotal = product.price * itemRequestData.quantity;
      subtotal += itemTotal;

      validatedOrderItems.push({
        productVariationId: variation._id,
        price: product.price,
        quantity: itemRequestData.quantity, // Thêm quantity vào item
      });

      itemsForStockUpdate.push({
        productId: product._id,
        productVariationId: variation._id,
        quantity: itemRequestData.quantity,
      });
    }

    // --- 2b. Calculate Shipping Fee ---
    const { shippingFee, distance } = await getShippingDetails(fromAddress, toAddress, isReturn);

    // --- 2c. Calculate Total Amount ---
    const totalAmount = subtotal + shippingFee;

    // --- 3. Prepare Order Data for Saving ---
    const newOrderData = {
      userId: userId,
      totalPrice: totalAmount,
      status: 'Pending',
      items: validatedOrderItems,
      payment: {
        method: paymentMethod,
        transactionId: null, // Để trống hoặc xử lý sau nếu có cổng thanh toán
        status: 'Pending',
      },
      shippingAddress: {
        // Lưu thông tin giao hàng
        fullName: customerName,
        phone: customerPhone,
        address: toAddress,
      },
    };

    console.log('newOrderData trước khi lưu:', JSON.stringify(newOrderData, null, 2)); // In ra newOrderData

    // --- 4. Save Order to Database ---
    const savedOrder = await saveOrderToDatabase(newOrderData);

    // --- 5. Update Stock ---
    await updateStockAfterOrder(itemsForStockUpdate);

    // --- 6. Success Response ---
    res.status(201).json({
      message: 'Đặt hàng thành công!',
      order: savedOrder,
    });
  } catch (error) {
    console.error('!!! Lỗi trong API createOrder:', error);
    // Handle specific errors propagated from helpers
    if (
      error.message.includes('Lỗi Goong') ||
      error.message.includes('Không thể xác định vị trí') ||
      error.message.includes('Không thể tính toán khoảng cách')
    ) {
      res.status(400).json({ error: 'Địa chỉ không hợp lệ hoặc lỗi hệ thống vận chuyển.', details: error.message });
    } else if (error.message.includes('Lỗi cơ sở dữ liệu khi kiểm tra sản phẩm')) {
      res.status(500).json({ error: 'Lỗi máy chủ khi kiểm tra thông tin sản phẩm.', details: error.message });
    } else if (error.message.includes('Không thể lưu đơn hàng') || error.message.includes('Lỗi dữ liệu khi lưu')) {
      res.status(500).json({ error: 'Lỗi máy chủ khi lưu đơn hàng.', details: error.message });
    } else if (error.message.includes('Lỗi xác thực Goong API')) {
      res.status(500).json({ error: 'Lỗi cấu hình hệ thống vận chuyển.', details: error.message });
    } else {
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ không xác định khi xử lý đơn hàng.', details: error.message });
    }
  }
};

// --- API Endpoint: Get Shipping Fee (No Weight Needed) ---
export const shippingFee = async (req, res) => {
  const { toAddress, isReturn = false } = req.body;
  const fromAddress = DEFAULT_FROM_ADDRESS;

  // --- 1. Input Validation ---
  if (!toAddress || typeof toAddress !== 'string' || toAddress.trim() === '') {
    // Rõ ràng hơn về lỗi thiếu hoặc sai định dạng địa chỉ
    return res.status(400).json({
      success: false, // Thêm cờ trạng thái
      error: 'Địa chỉ không hợp lệ.',
      details: 'Vui lòng cung cấp địa chỉ giao hàng hợp lệ.',
    });
  }

  // --- 2. Calculate Shipping Details ---
  try {
    // getShippingDetails nên được thiết kế để throw lỗi cụ thể
    const result = await getShippingDetails(fromAddress, toAddress.trim(), isReturn);

    // Kiểm tra kết quả trả về từ helper (phòng trường hợp helper không throw lỗi mà trả về null/undefined)
    if (
      result === null ||
      result === undefined ||
      typeof result.shippingFee !== 'number' ||
      typeof result.distance !== 'number'
    ) {
      console.error('Lỗi logic: getShippingDetails trả về kết quả không hợp lệ mà không throw lỗi.', result);
      return res.status(500).json({
        success: false,
        error: 'Lỗi máy chủ nội bộ khi xử lý phí vận chuyển.',
        details: 'Kết quả tính toán không hợp lệ.',
      });
    }

    const { shippingFee, distance } = result;

    // --- 3. Success Response ---
    // Trả về cấu trúc JSON rõ ràng khi thành công
    res.status(200).json({
      // Sử dụng status 200 OK
      success: true, // Thêm cờ trạng thái
      data: {
        totalFee: shippingFee,
        distance: `${distance.toFixed(2)} km`, // Làm tròn và thêm đơn vị
        // Có thể thêm các thông tin khác nếu cần
      },
    });
  } catch (error) {
    console.error(`Lỗi khi lấy phí ship cho "${toAddress}":`, error); // Log lỗi chi tiết hơn

    // --- 4. Error Handling (Phân loại lỗi rõ ràng hơn) ---
    let statusCode = 500; // Mặc định là lỗi server
    let errorMessage = 'Lỗi máy chủ khi tính toán phí vận chuyển.';
    let errorDetails = error.message || 'Lỗi không xác định.';

    // Phân loại lỗi dựa trên thông điệp (có thể làm cách này tinh vi hơn nếu cần)
    const msg = error.message.toLowerCase();

    if (msg.includes('không thể xác định vị trí') || msg.includes('geocode')) {
      statusCode = 400; // Lỗi do client cung cấp địa chỉ sai
      errorMessage = 'Không thể tìm thấy địa chỉ.';
      errorDetails = `Không thể xác định vị trí cho địa chỉ được cung cấp: ${toAddress}`;
    } else if (
      msg.includes('không thể tính toán khoảng cách') ||
      msg.includes('distance matrix') ||
      msg.includes('không thể tìm thấy tuyến đường')
    ) {
      statusCode = 400; // Thường là do địa chỉ hợp lệ nhưng không có đường đi thực tế
      errorMessage = 'Không thể tính khoảng cách.';
      errorDetails = `Không thể tính toán tuyến đường hoặc khoảng cách giữa "${fromAddress}" và "${toAddress}".`;
    } else if (msg.includes('lỗi xác thực goong api') || msg.includes('api key')) {
      statusCode = 500; // Lỗi cấu hình server
      errorMessage = 'Lỗi cấu hình hệ thống vận chuyển.';
      errorDetails = 'Lỗi xác thực với dịch vụ bản đồ. Vui lòng liên hệ quản trị viên.'; // Che giấu chi tiết API key
    } else if (error instanceof mongoose.Error) {
      // Ví dụ nếu helper có tương tác DB
      statusCode = 500;
      errorMessage = 'Lỗi cơ sở dữ liệu.';
      errorDetails = 'Có lỗi xảy ra khi truy vấn dữ liệu liên quan.';
    }
    // Các lỗi khác giữ nguyên là 500

    // Trả về cấu trúc lỗi nhất quán
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: errorDetails, // Cung cấp chi tiết lỗi (đã được lọc bớt thông tin nhạy cảm nếu cần)
    });
  }
};
