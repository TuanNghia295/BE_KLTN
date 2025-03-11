import mongoose from 'mongoose';
import CartModel from '../models/cartModel.js';
import ProductModel from '../models/productModel.js';

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Kiểm tra tính hợp lệ của userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Tìm giỏ hàng của người dùng
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Lấy thông tin chi tiết của sản phẩm
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await ProductModel.findOne({ productId: item.productId });
        return {
          ...item.toObject(),
          product,
        };
      })
    );

    res.status(200).json({
      ...cart.toObject(),
      items: populatedItems,
    });
  } catch (error) {
    res.status(500).json({ message: 'Cannot get cart', error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, size, color, quantity } = req.body;

  // Kiểm tra tính hợp lệ của productId
  if (!Number.isInteger(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  try {
    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await ProductModel.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Kiểm tra xem biến thể sản phẩm có tồn tại không
    const variation = product.variations.find((v) => v.size === size && v.color === color);
    if (!variation) {
      return res.status(404).json({ message: 'Product variation not found' });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Nếu giỏ hàng đã tồn tại, kiểm tra xem biến thể sản phẩm đã có trong giỏ hàng chưa
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId && item.size === size && item.color === color
      );

      if (itemIndex > -1) {
        // Nếu biến thể sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Nếu biến thể sản phẩm chưa có trong giỏ hàng, thêm biến thể sản phẩm vào giỏ hàng
        cart.items.push({ productId, size, color, quantity });
      }
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      cart = new CartModel({
        userId,
        items: [{ productId, size, color, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Cannot add to cart', error: error.message });
  }
};

// PUT /cart/update/:userId?productId=...&size=...&color=...&quantity=...
export const updateCart = async (req, res) => {
  const { productId, size, color, quantity } = req.query;
  const userId = req.params.userId;

  // Kiểm tra tính hợp lệ của userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  // Kiểm tra tính hợp lệ của productId
  if (!Number.isInteger(parseInt(productId))) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  try {
    // Tìm giỏ hàng của người dùng
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await ProductModel.findOne({ productId: parseInt(productId) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Kiểm tra xem biến thể sản phẩm có tồn tại không
    const variation = product.variations.find((v) => v.size === size && v.color === color);
    if (!variation) {
      return res.status(404).json({ message: 'Product variation not found' });
    }

    // Nếu biến thể sản phẩm đã có trong giỏ hàng, cập nhật số lượng
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === parseInt(productId) && item.size === size && item.color === color
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = parseInt(quantity);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product variation not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Cannot update cart', error: error.message });
  }
};
