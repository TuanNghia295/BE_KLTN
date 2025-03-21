import express from 'express';
import { createBanner, deleteBanner, getBanners } from '../controllers/bannerController.js';
import multer from 'multer';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';

const bannerRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
bannerRouter.get('/getAll', getBanners);
bannerRouter.post('/create', authAdminMiddleware, upload.single('url'), createBanner);
bannerRouter.post('/delete:id', authAdminMiddleware, deleteBanner);

export default bannerRouter;
