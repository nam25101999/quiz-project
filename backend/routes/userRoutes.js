// routes/userRoutes.js
const express = require('express');
const { login, register, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.put('/update', protect, updateUser);

module.exports = router;
