import express from 'express';
import { createBanner, getBanners } from '../controllers/bannerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';

const bannerRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
bannerRouter.get('/', getBanners);
bannerRouter.post('/create', authMiddleware, upload.single('url'), createBanner);

export default bannerRouter;
