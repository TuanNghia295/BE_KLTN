import express from 'express';
import { shippingFee } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/calculate-shipping-fee', authMiddleware || authAdminMiddleware, shippingFee);

export default paymentRouter;
