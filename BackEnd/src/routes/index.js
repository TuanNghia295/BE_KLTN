import express from 'express';
import productRouter from './productRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello from the server side");
});

// Sử dụng router.use để kết nối các router con
router.use('/products', productRouter);

export default router;