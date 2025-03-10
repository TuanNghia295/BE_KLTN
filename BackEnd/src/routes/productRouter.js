import express from 'express';
import {
  createProduct,
  getAllProducts,
  getAllProductsByCategoryId,
  getAllProductsCount,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';

const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productRouter.post('/create', authMiddleware, upload.single('imageUrl'), createProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProducts/:categoryId', getAllProductsByCategoryId);
productRouter.get('/getProductsCount', getAllProductsCount);
productRouter.get('/getSingleProduct', getSingleProduct);
productRouter.delete('/:id', authMiddleware, deleteProduct);
productRouter.put('/update/:id', authMiddleware, updateProduct);

export default productRouter;
