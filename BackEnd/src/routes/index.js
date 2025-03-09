import express from 'express';
import productRouter from './productRouter.js';
import authRouter from './authRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from the server side');
});

// Sử dụng router.use để kết nối các router con
router.use('/products', productRouter);
router.use('/auth', authRouter);

export default router;
