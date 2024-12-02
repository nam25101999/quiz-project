// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
const register = async (req, res) => {
  try {
    const { username, email, password, fullName, dob, gender } = req.body;

    // Kiểm tra nếu tên người dùng đã tồn tại
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
    }

    // Kiểm tra nếu email đã tồn tại
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      dob,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};
// Đăng nhập
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  try {
    const { fullName, email, dob, gender, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword; // Cập nhật mật khẩu mới
    }

    await user.save();
    res.status(200).json({ message: 'Cập nhật thông tin thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};


const getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, 'your_secret_key');
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token đã hết hạn, vui lòng đăng nhập lại' });
      }
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: error.message });
  }
};

const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Tên người dùng không được để trống.' });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(200).json({
        exists: true,
        username: user.username,
        email: user.email,
        avatar: user.avatar, 
      });
    }
    return res.status(404).json({ exists: false });
  } catch (error) {
    console.error('Lỗi khi kiểm tra tài khoản:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
};



module.exports = { login, register, updateUser, getUserInfo, checkUsername };
