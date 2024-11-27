const express = require('express');
const router = express.Router();
const { createExam } = require('../controllers/examController');
const  { getExams } = require('../controllers/examController');
const { getExamById } = require("../controllers/examController");
const { protect } = require('../middleware/authMiddleware');

// Route tạo bài kiểm tra (có xác thực)
router.post('/create', protect, createExam);

router.get('/get', protect, getExams );

router.get("/:id", protect, getExamById);

module.exports = router;
