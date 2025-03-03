// Tạo user

import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
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
