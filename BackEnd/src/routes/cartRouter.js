import express from 'express';
import { addToCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);

export default cartRouter;
