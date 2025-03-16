import express from 'express';
import productRouter from './productRouter.js';
import authRouter from './authRouter.js';
import bannerRouter from './bannerRouter.js';
import cartRouter from './cartRouter.js';
import categoryRouter from './categoryRouter.js';
import paymentRouter from './paymentRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from the server side');
});

// Sử dụng router.use để kết nối các router con
router.use('/products', productRouter);
router.use('/banners', bannerRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/category', categoryRouter);
router.use('/payment', paymentRouter);

export default router;
