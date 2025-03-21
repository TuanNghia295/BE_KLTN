// GET /getAll phân trang danh sách người dùng

import UserModel from '../models/userModel.js';

export const getListUser = async (req, res) => {
  const { limit, page, q, order } = req.query;
  // Đổi limit và page từ string sang number
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);

  // tạo truy vấn q trên MongoDB với option i dùng để không phân biệt hoa thường
  const query = q ? { name: { $regex: q, $options: 'i' } } : {};
  const sortBy = order === 'ASC' ? 1 : -1;

  // Đếm tổng số người dùng thõa query
  const total = await UserModel.countDocuments(query);

  // Lấy ra danh sách người dùng
  const userList = await UserModel.find(query)
    .sort({ createdAt: sortBy }) // Sắp xếp theo thời gian tạo
    .skip((pageNumber - 1) * limitNumber) // Bỏ qua số lượng phần tử không cần khi phân trang, ví dụ page 2,limit 10 thì bỏ qua 10 phần tử đầu
    .limit(limitNumber); // Giới hạn số lượng phần tử trả về mỗi trang

  res.json({
    data: userList,
    total,
    page: pageNumber,
    limit: limitNumber,
  });
};

// Lấy thông tin người dùng hiện tại
export const getUserInfo = async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password'); // Lấy thông tin người dùng hiện tại, không lấy password
  res.json(user);
};
