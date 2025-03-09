import ProductModel from '../models/productModel.js';
import CategoryModel from '../models/categoriesModel.js';
import mongoose from 'mongoose';
import { ROLE } from '../constant/role.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

// Cấu hình bộ nhớ tạm cho multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Tạo sản phẩm
export const createProduct = async (request, response) => {
  const { name, price, description, categoryId, variations } = request.body;

  // Lấy file từ request
  const imageFile = request.file; // Lấy file từ multer

  if (!imageFile) {
    return response.status(400).json({ message: 'Image is required' });
  }

  // Upload lên Cloudinary
  const result = await cloudinary.uploader.upload_stream(
    {
      folder: 'products',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'], // Cho phép WebP
      format: 'webp', // Ép kiểu thành WebP
      transformation: [
        { quality: 'auto', fetch_format: 'webp' }, // Chuyển về WebP tự động
        { width: 500, height: 500, crop: 'fill', gravity: 'auto' }, // Resize ảnh
      ],
    },
    (error, result) => {
      if (error) {
        return response.status(500).json({ message: 'Upload failed', error });
      }

      // Tiếp tục xử lý tạo sản phẩm sau khi upload thành công
      const newProduct = new ProductModel({
        name,
        price,
        description,
        imageUrl: result.secure_url, // Lưu URL ảnh
        categoryId: new mongoose.Types.ObjectId(categoryId),
        variations: typeof variations === 'string' ? JSON.parse(variations) : variations,
      });

      newProduct
        .save()
        .then((product) => response.status(201).json(product))
        .catch((err) => response.status(500).json({ message: 'Cannot create product', error: err.message }));
    }
  );

  result.end(imageFile.buffer);
};

// Lấy toàn bộ sản phẩm
export const getAllProducts = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > perPage) {
      return response.status(404).json({
        message: 'Page not found',
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find()
      .populate('categoryId')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      products: products,
      totalPage: totalPages,
      page: page,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Lấy toàn bộ sản phẩm trong từng danh mục (categoryId)
export const getAllProductsByCategoryId = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > perPage) {
      return response.status(404).json({
        message: 'Page not found',
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      categoryId: request.params.id,
    })
      .populate('categoryId') // Lấy thông tin của danh mục
      .skip((page - 1) * perPage) // Bỏ qua số lượng sản phẩm
      .limit(perPage) // Giới hạn số lượng sản phẩm
      .exec(); // Thực thi

    if (!products) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      products: products,
      totalPage: totalPages,
      page: page,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get Product Count
export const getAllProductsCount = async (request, response) => {
  try {
    const countProducts = await ProductModel.countDocuments();

    response.status(200).json({
      countProducts: countProducts,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getSingleProduct = async (request, response) => {
  try {
    const singleProduct = await ProductModel.find({
      name: request.query.name,
    });

    response.status(200).json({
      singleProduct,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (request, response) => {
  const product = await ProductModel.findByIdAndDelete(request.params.id).populate('categoryId');

  if (!product) {
    return response.status(500).json({
      message: 'Product not found',
    });
  }

  return response.status(200).json({
    message: 'Delete product successfully',
  });
};

// Update Product
export const updateProduct = async (request, response) => {
  try {
    const { name, price, description, imageUrl, categoryId, variations } = request.body;

    const product = await ProductModel.findByIdAndUpdate(request.params.id, {
      name,
      price,
      description,
      imageUrl,
      categoryId: new mongoose.Types.ObjectId(categoryId),
      variations,
    }).populate('categoryId');

    if (!product) {
      response.status(404).json({
        message: 'Product not found',
      });
    }

    response.status(200).json({
      message: 'Product Updated',
      success: true,
      error: false,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
