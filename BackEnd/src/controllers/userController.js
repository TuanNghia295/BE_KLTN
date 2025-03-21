// GET /getAll phân trang danh sách người dùng

import UserModel from '../models/userModel.js';

export const getListUser = async (req, res) => {
  const { limit, page, q, order } = req.query;
  // Đổi limit và page từ string sang number
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);

  // tạo truy vấn q trên MongoDB với option i dùng để không phân biệt hoa thường
  const query = q
    ? {
        $or: [
          { fullName: { $regex: q, $options: 'i' } },
          { userName: { $regex: q, $options: 'i' } },
          { phone: { $regex: q, $options: 'i' } },
        ],
      }
    : {};
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

// Sửa thông tin người dùng hiện tại
export const updateUser = async (req, res) => {
  const { userName, fullName, password, email, phone, address } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cập nhật thông tin người dùng
    if (userName) user.userName = userName;
    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10); // Mã hóa mật khẩu mới
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Lưu thông tin người dùng đã cập nhật
    await user.save();

    // Trả về thông tin người dùng đã cập nhật, không bao gồm mật khẩu
    const updatedUser = await UserModel.findById(req.user._id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Xóa người dùng
    await user.remove();
    res.json({ statusCode: 200, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Cập nhật người dùng theo id
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { userName, fullName, password, email, phone, role, address } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cập nhật thông tin người dùng
    if (userName) user.userName = userName;
    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10); // Mã hóa mật khẩu mới
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
    if (address) user.address = address;

    // Lưu thông tin người dùng đã cập nhật
    await user.save();

    // Trả về thông tin người dùng đã cập nhật, không bao gồm mật khẩu
    const updatedUser = await UserModel.findById(id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};
