// routes/userRoutes.js
const express = require('express');
const { login, 
    register, 
    updateUser, 
    getUserInfo,
    checkUsername,
    } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.put('/update', protect, updateUser);

router.get('/user',protect, getUserInfo);

router.post('/check-username', checkUsername);

module.exports = router;
