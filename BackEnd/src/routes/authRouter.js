import express from 'express';
import { createUser, login, loginAdmin, logout, refreshToken } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';

const authRouter = express.Router();
authRouter.post('/register', createUser);
authRouter.post('/login', login);
authRouter.post('/login/admin', loginAdmin);
authRouter.post('/refresh_token', authAdminMiddleware, refreshToken); // phải có accessToken đúng thì mới sử dụng được api này
authRouter.post('/logout', authAdminMiddleware, logout); // phải có accessToken đúng thì mới sử dụng được api này

export default authRouter;
