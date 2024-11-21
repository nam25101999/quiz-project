// routes/userRoutes.js
const express = require('express');
const { login, register } = require('../controllers/userController');

const router = express.Router();

// Route đăng nhập
router.post('/login', login);

// Route đăng ký
router.post('/register', register);

module.exports = router;
