import express from 'express';
import { createUser, login, loginAdmin, logout, refreshToken } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();
authRouter.post('/register', createUser);
authRouter.post('/login', login);
authRouter.post('/login/admin', loginAdmin);
authRouter.post('/refresh_token', authMiddleware, refreshToken); // phải có accessToken đúng thì mới sử dụng được api này
authRouter.post('/logout', authMiddleware, logout); // phải có accessToken đúng thì mới sử dụng được api này

export default authRouter;
