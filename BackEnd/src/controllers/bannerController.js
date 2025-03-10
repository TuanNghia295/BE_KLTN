import express from 'express';
import BannerModel from '../models/bannerModel.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { ROLE } from '../constant/role.js';

// lấy danh sách banner
const getBanners = (req, res) => {
  const banners = BannerModel.find({});
  res.json(banners);
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

export { getBanners, createBanner };
