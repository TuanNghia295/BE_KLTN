import express from 'express';
import { shippingFee } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/calculate-shipping-fee', authMiddleware, shippingFee);

export default paymentRouter;
