import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import admin from '../config/firebaseConfig.js';
import dotenv from 'dotenv';
dotenv.config();

// Tạo user [POST] /api/register
export const createUser = async (req, res, next) => {
  const { userName, fullName, phone, email, password, role, address } = req.body;

  try {
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const user = new UserModel({
      userName,
      fullName,
      phone,
      email,
      role,
      address: Array.isArray(address) ? address : [address],
      firebaseUid: firebaseUser.uid,
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    const newUser = await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({
      statusCode: 201,
      user: newUser,
      message: 'Tạo tài khoản thành công',
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    next(error);
  }
};

// Đăng nhập [POST] /api/login
export const login = async (req, res) => {
  const { firebaseUid } = req.body;

  if (!firebaseUid) {
    return res.status(400).json({ message: 'Thiếu Firebase UID' });
  }

  const user = await UserModel.findOne({ firebaseUid });
  if (!user) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    data: {
      _id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      address: user.address,
      accessToken,
    },
  });
};

// Đăng nhập với admin [POST] /api/login/admin
export const loginAdmin = async (req, res) => {
  const { firebaseUid } = req.body;

  if (!firebaseUid) {
    return res.status(400).json({ message: 'Thiếu Firebase UID' });
  }

  const user = await UserModel.findOne({ firebaseUid });
  if (!user) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    data: {
      _id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      address: user.address,
      accessToken,
    },
  });
};

// POST Làm Mới Token (/api/refresh_token)
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Validate refreshToken
    if (!refreshToken || typeof refreshToken !== 'string') {
      console.error('Invalid refresh token:', refreshToken);
      return res.status(400).json({ message: 'Invalid refresh token' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(403).json({ message: 'Refresh token không hợp lệ' });
      }

      console.log('Decoded Token:', decoded);

      // Find the user associated with the refresh token
      const user = await UserModel.findOne({ refreshToken });
      if (!user) {
        console.error('User not found for refresh token');
        return res.status(403).json({ message: 'Refresh token không hợp lệ' });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign({ _id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });

      console.log('New Access Token:', newAccessToken);
      return res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Error in refreshToken handler:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
// Đăng xuất [POST] /api/logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await UserModel.findOne({ refreshToken });
    if (!user) return res.sendStatus(204);

    user.refreshToken = null;
    await user.save();

    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Đã đăng xuất' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Email:', email);

    if (!email) {
      return res.status(400).json({ message: 'Email là bắt buộc' });
    }

    // Kiểm tra email trong MongoDB
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại trong cơ sở dữ liệu' });
    }

    // Kiểm tra email trong Firebase Authentication
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      console.log('User found in Firebase:', userRecord.uid);
    } catch (error) {
      console.error('Firebase user check error:', error);
      return res.status(404).json({ message: 'Email không tồn tại trong Firebase' });
    }

    const actionCodeSettings = {
      url: `${process.env.CLIENT_URL}/reset-password?email=${encodeURIComponent(email)}`,
      handleCodeInApp: true,
    };
    console.log('Action Code Settings:', actionCodeSettings);

    // Gửi link reset qua Firebase Auth
    try {
      const resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
      console.log('Generated Password Reset Link:', resetLink);

      return res.status(200).json({
        message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.',
        resetLink, // Trả về link để debug nếu cần
      });
    } catch (error) {
      console.error('Error generating reset link:', error);
      return res.status(500).json({
        message: 'Lỗi khi tạo link đặt lại mật khẩu',
        error: error.message,
      });
    }
  } catch (error) {
    console.error('Error in resetPassword:', error.code, error.message);
    return res.status(500).json({
      message: 'Lỗi khi gửi email đặt lại mật khẩu',
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Người dùng không tồn tại' });
  }

  await admin.auth().updateUser(user.firebaseUid, {
    password: newPassword,
  });

  return res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công' });
};
