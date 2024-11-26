const express = require('express');
const { createNote, getNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route để tạo ghi chú (cần xác thực)
router.post('/notes', protect, createNote);

// Route để lấy ghi chú (cần xác thực)
router.get('/notes', protect, getNotes);

module.exports = router;
