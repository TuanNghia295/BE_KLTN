import express from 'express';
import { createBanner, deleteBanner, getBanners } from '../controllers/bannerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';

const bannerRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
bannerRouter.get('/', getBanners);
bannerRouter.post('/create', authMiddleware, upload.single('url'), createBanner);
bannerRouter.post('/delete:id', authMiddleware, deleteBanner);

export default bannerRouter;
