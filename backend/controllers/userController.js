// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem username có tồn tại không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received data:', req.body);  // Log dữ liệu nhận được từ frontend

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Mã hóa mật khẩu trước khi lưu vào DB
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);  // Log mật khẩu đã mã hóa

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);  // Log lỗi chi tiết
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { login, register };
