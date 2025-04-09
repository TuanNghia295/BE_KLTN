import express from 'express';
import { createOrder, shippingFee } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';

const paymentRouter = express.Router();

// Tính phí vận chuyển
paymentRouter.post('/calculate-shipping-fee', authMiddleware || authAdminMiddleware, shippingFee);

// Đặt hàng
paymentRouter.post('/createOrder', authMiddleware || authAdminMiddleware, createOrder);

export default paymentRouter;
