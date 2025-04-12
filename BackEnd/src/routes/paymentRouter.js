import express from 'express';
import { createOrder, shippingFee } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const paymentRouter = express.Router();

// Tính phí vận chuyển
paymentRouter.post('/calculate-shipping-fee', authMiddleware, shippingFee);

// Đặt hàng
paymentRouter.post('/createOrder', authMiddleware, createOrder);

export default paymentRouter;
