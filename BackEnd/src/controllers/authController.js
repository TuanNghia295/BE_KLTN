import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { validationResult } from 'express-validator';

// Tạo user [POST] /api/register
export const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, fullName, phone, email, password, role, address } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({
      userName,
      fullName,
      phone,
      email,
      password: hashedPassword,
      role,
      address: Array.isArray(address) ? address : [address], // Ensure address is an array
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
    next(error);
  }
};

// Đăng nhập [POST] /api/login
export const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ statusCode: 400, message: 'Vui lòng nhập số điện thoại và mật khẩu' });
  }

  const userExist = await UserModel.findOne({ phone });
  if (!userExist) {
    return res.status(404).json({ statusCode: 404, message: 'Tài khoản không tồn tại' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ statusCode: 400, message: 'Mật khẩu hoặc tài khoản không đúng' });
  }

  const accessToken = userExist.generateAccessToken();
  const refreshToken = userExist.generateRefreshToken();

  userExist.refreshToken = refreshToken;
  await userExist.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    statusCode: 200,
    data: {
      _id: userExist._id,
      fullName: userExist.fullName,
      phone: userExist.phone,
      email: userExist.email,
      role: userExist.role,
      address: userExist.address, // Address is now an array
      accessToken,
    },
  });
};

// Đăng nhập với admin [POST] /api/login/admin
export const loginAdmin = async (req, res) => {
  const { phone, password } = req.body;
  const userExist = await UserModel.findOne({ phone, role: 'ADMIN' });
  if (!userExist) {
    return res.status(404).json({ statusCode: 404, message: 'Tài khoản không tồn tại' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ statusCode: 400, message: 'Mật khẩu hoặc tài khoản không đúng' });
  }
  const accessToken = userExist.generateAccessToken();
  const refreshToken = userExist.generateRefreshToken();
  userExist.refreshToken = refreshToken;
  await userExist.save();
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({
    fullName: userExist.fullName,
    phone: userExist.phone,
    email: userExist.email,
    role: userExist.role,
    address: userExist.address, // Address is now an array
    accessToken,
  });
};

// POST Làm Mới Token (/api/refresh_token)
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Không có refresh token' });
    }

    const user = await UserModel.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Refresh token không hợp lệ' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh token không hợp lệ' });
      }

      const newAccessToken = generateAccessToken(user._id);
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
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
