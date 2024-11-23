// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = { protect };
