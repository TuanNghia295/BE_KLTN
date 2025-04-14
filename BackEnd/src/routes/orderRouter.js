import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authAdminMiddleware from '../middleware/authAdminMiddleware.js';
import {
  cancelOrder,
  deleteOrder,
  getOrder,
  getOrderByDate,
  getOrderById,
  getOrderByMonth,
  getOrderByStatus,
  getOrderByUser,
  getOrderByUserId,
  getOrderDetailByUser,
  updateOrderStatus,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin Lấy danh sách đơn hàng
orderRouter.get('/getAll', authAdminMiddleware, getOrder);

// Admin Lấy danh sách đơn hàng theo id
orderRouter.get('/:id', authAdminMiddleware, getOrderById);

// Admin Cập nhật trạng thái đơn hàng
orderRouter.patch('/:id', authAdminMiddleware, updateOrderStatus);

// Admin Xóa đơn hàng
orderRouter.delete('/:id', authAdminMiddleware, deleteOrder);

// Admin Lấy danh sách đơn hàng theo trạng thái
orderRouter.get('/status/:status', authAdminMiddleware, getOrderByStatus);

// Admin Lấy danh sách đơn hàng theo người dùng
orderRouter.get('/user/:userId', authAdminMiddleware, getOrderByUserId);

// Admin Lấy danh sách đơn hàng theo ngày
orderRouter.get('/date/:date', authAdminMiddleware, getOrderByDate);

// Admin Lấy danh sách đơn hàng theo tháng
orderRouter.get('/month/:month', authAdminMiddleware, getOrderByMonth);

// user Lấy danh sách đơn hàng của mình
orderRouter.get('/user', authMiddleware, getOrderByUser);

// user xem chi tiết đơn hàng
orderRouter.get('/user/:id', authMiddleware, getOrderDetailByUser);

// user Hủy đơn hàng
orderRouter.delete('/user/:id', authMiddleware, cancelOrder);

export default orderRouter;
