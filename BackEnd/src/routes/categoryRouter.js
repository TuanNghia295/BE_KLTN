import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/categoryController.js';
import express from 'express';
const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategory);
categoryRouter.post('/create', createCategory);
categoryRouter.patch('/update', updateCategory);
categoryRouter.delete('/delete', deleteCategory);

export default categoryRouter;
