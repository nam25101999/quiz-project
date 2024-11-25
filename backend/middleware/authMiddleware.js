// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }

  try {
    // Giải mã token và kiểm tra tính hợp lệ
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token hết hạn, vui lòng đăng nhập lại' });
    }
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = { protect };
