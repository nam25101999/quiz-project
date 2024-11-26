const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const protect = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');

    // Kiểm tra nếu decoded.id không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: 'ID người dùng không hợp lệ' });
    }

    req.user = { id: decoded.id };  // Gắn thông tin người dùng vào req
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token hết hạn, vui lòng đăng nhập lại' });
    }
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = { protect };
