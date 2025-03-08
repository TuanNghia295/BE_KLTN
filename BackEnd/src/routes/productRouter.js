import express from 'express';
import { createProduct, getAllProducts, getAllProductsByCategoryId, getAllProductsCount, getSingleProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/create', authMiddleware, createProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProducts/:id', getAllProductsByCategoryId);
productRouter.get('/getProductsCount', getAllProductsCount)
productRouter.get('/getSingleProduct/:id', getSingleProduct)
productRouter.delete('/:id', authMiddleware, deleteProduct)
productRouter.put('/update/:id', authMiddleware, updateProduct)

export default productRouter;