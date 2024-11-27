const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Middleware bảo vệ
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token không được cung cấp hoặc không đúng định dạng' });
    }

    // Lấy token từ header
    const token = authHeader.split(' ')[1];

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');

    // Kiểm tra nếu decoded.id không hợp lệ
    if (!decoded || !mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: 'ID người dùng không hợp lệ trong token' });
    }

    // Gắn thông tin người dùng vào req
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Lỗi JWT:', err);

    // Xử lý lỗi cụ thể
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token đã hết hạn, vui lòng đăng nhập lại' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token không hợp lệ, vui lòng thử lại' });
    } else {
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi xác thực token' });
    }
  }
};

module.exports = { protect };
