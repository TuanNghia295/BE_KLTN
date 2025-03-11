import express from 'express';
import { addToCart, getCartByUserId } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/cartInfo/:userId', authMiddleware, getCartByUserId);
cartRouter.post('/add', authMiddleware, addToCart);

export default cartRouter;
