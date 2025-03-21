import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getListUser, getUserInfo } from '../controllers/userController.js';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';

const userRouter = express.Router();

userRouter.get('/getAll', authAdminMiddleware, getListUser);
userRouter.get('/userInfo', authMiddleware, getUserInfo);

export default userRouter;
