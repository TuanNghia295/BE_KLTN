import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';

// Tạo user [POST] /api/register
export const createUser = async (req, res) => {
  const { userName, fullName, phone, email, password, role } = req.body;
  const user = new UserModel({
    userName,
    fullName,
    phone,
    email,
    password,
    role,
  });
  // Sử dụng jwt để mã hóa password
  user.password = await bcrypt.hash(password, 12);
  // Tạo access token và refresh token
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  // truyền refresh token vào trong database
  try {
    const newUser = await user.save();
    res.status(201).json({
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(409).json({ statusCode: 409, message: error.message });
  }
};

// Đăng nhập [POST] /api/login
export const login = async (req, res) => {
  // Nhận form data từ client có sdt và password
  const { phone, password } = req.body;
  // Tìm user trong database
  const userExist = await UserModel.findOne({ phone });
  // Nếu không tìm thấy user
  if (!userExist) {
    return res
      .status(404)
      .json({ statusCode: 404, message: 'Tài khoản không tồn tại' });
  }
  // So sánh password
  const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ statusCode: 400, message: 'Mật khẩu hoặc tài khoản không đúng' });
  }
  // Tạo access token và refresh token
  const accessToken = userExist.generateAccessToken();
  const refreshToken = userExist.generateRefreshToken();
  // truyền refresh token vào trong database
  userExist.refreshToken = refreshToken;
  await userExist.save();
  // Trả về thông tin user và token
  res.status(200).json({
    fullName: userExist.fullName,
    phone: userExist.phone,
    email: userExist.email,
    role: userExist.role,
    address: userExist.address,
    accessToken,
  });
};
