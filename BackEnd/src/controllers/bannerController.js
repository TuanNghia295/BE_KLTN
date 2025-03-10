import express from 'express';
import BannerModel from '../models/bannerModel.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { ROLE } from '../constant/role.js';

// lấy danh sách banner phân trang và sắp xếp dựa theo order DESC hoặc ASC
// /api/banners?page=2&limit=5&sort=createdAt&type=DESC
const getBanners = (req, res) => {
  const { page, limit, sort, type } = req.query; // Lấy các tham số page, limit và sort từ query string của request
  const pageNumber = parseInt(page); // Chuyển đổi tham số page thành số nguyên
  const limitNumber = parseInt(limit); // Chuyển đổi tham số limit thành số nguyên

  const sortObject = { [sort]: type === 'DESC' ? -1 : 1 }; // Tạo object sort dựa trên tham số sort và type

  const sortKey = Object.keys(sortObject)[0]; // Lấy key của object sort
  const sortValue = Object.values(sortObject)[0]; // Lấy value của object sort

  BannerModel.find() // Tìm tất cả các banner trong cơ sở dữ liệu
    .sort({ [sortKey]: sortValue }) // Sắp xếp các banner theo key và value được cung cấp
    .skip((pageNumber - 1) * limitNumber) // Bỏ qua một số lượng banner nhất định để phân trang
    .limit(limitNumber) // Giới hạn số lượng banner trả về
    .then((banners) => res.status(200).json(banners)) // Trả về danh sách các banner dưới dạng JSON với mã trạng thái 200
    .catch((err) => res.status(500).json({ message: 'Cannot get banners', error: err.message })); // Xử lý lỗi và trả về mã trạng thái 500
};

// tạo banner
const createBanner = async (req, res) => {
  const { alt } = req.body;

  //   Cấu hình bộ nhớ tạm cho multer
  const storage = multer.memoryStorage();
  multer({ storage });

  // Kiểm tra role có phải là ADMIN không
  const role = req.headers.role;

  if (role !== ROLE.ADMIN) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to perform this action',
    });
  }

  // Lấy file từ request
  const imageFile = req.file;
  console.log('imageFile', imageFile);

  if (!imageFile) {
    return res.status(400).json({
      success: false,
      message: 'No image file found in request',
    });
  }

  //   Upload lên cloud dinary
  const result = await cloudinary.uploader.upload_stream(
    {
      folder: 'banners',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'], // Cho phép WebP
      format: 'webp', // Ép kiểu thành WebP
      transformation: [
        { quality: 'auto', fetch_format: 'webp' }, // Chuyển về WebP tự động
        { width: 1920, crop: 'fill', gravity: 'auto' }, // Resize ảnh
      ],
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Upload failed', error });
      }
      const newBanner = new BannerModel({
        alt,
        url: result.secure_url,
      });

      newBanner
        .save()
        .then((banner) => res.status(201).json(banner))
        .catch((err) => res.status(500).json({ message: 'Cannot create banner', error: err.message }));
    }
  );
  result.end(imageFile.buffer); // Kết thúc quá trình upload
};

// Xóa banner
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra role có phải là ADMIN không
  const role = req.headers.role;

  if (role !== ROLE.ADMIN) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to perform this action',
    });
  }

  BannerModel.findByIdAndDelete({ id })
    .then((banner) => {
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.status(200).json({ message: 'Delete banner successfully' });
    })
    .catch((err) => res.status(500).json({ message: 'Cannot delete banner', error: err.message }));
};

export { getBanners, createBanner, deleteBanner };
