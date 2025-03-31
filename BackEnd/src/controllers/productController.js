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
  try {
    const { name, price, description, categoryId, variations } = request.body;
    const imageFiles = request.files;

    if (!imageFiles || imageFiles.length === 0) {
      return response.status(400).json({ message: 'Vui lòng tải lên ít nhất một ảnh' });
    }

    // Hàm upload nhiều ảnh với metadata
    const uploadImages = async (files) => {
      const uploadPromises = files.map((file, index) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'products',
              allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
              format: 'webp',
              transformation: [
                { quality: 'auto', fetch_format: 'webp' },
                { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else
                resolve({
                  url: result.secure_url,
                  publicId: result.public_id,
                  isPrimary: index === 0, // Mặc định ảnh đầu tiên là ảnh chính
                  order: index,
                });
            }
          );
          uploadStream.end(file.buffer);
        });
      });
      return Promise.all(uploadPromises);
    };

    const uploadedImages = await uploadImages(imageFiles);

    const newProduct = new ProductModel({
      name,
      price,
      description,
      images: uploadedImages,
      categoryId: new mongoose.Types.ObjectId(categoryId),
      variations: typeof variations === 'string' ? JSON.parse(variations) : variations,
    });

    const savedProduct = await newProduct.save();
    response.status(201).json(savedProduct);
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    response.status(500).json({
      message: 'Lỗi server',
      error: error.message,
    });
  }
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
export const getAllProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  const { page, limit, sort, type } = req.query;

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const sortObject = { [sort]: type === 'DESC' ? -1 : 1 };

  try {
    const products = await ProductModel.find({ categoryId })
      .sort(sortObject)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate('categoryId'); // Lấy thông tin của category

    const totalProducts = await ProductModel.countDocuments({ categoryId });
    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.status(200).json({
      data: products,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Cannot get products', error: error.message });
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
