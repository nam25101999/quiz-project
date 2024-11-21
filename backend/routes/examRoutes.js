// routes/examRoutes.js
const express = require('express');
const { createExam, getExams, getExamById } = require('../controllers/examController');

const router = express.Router();

router.post('/', createExam); // POST /api/exams - Tạo bài trắc nghiệm mới
router.get('/', getExams); // GET /api/exams - Lấy tất cả bài trắc nghiệm
router.get('/:id', getExamById); // GET /api/exams/:id - Lấy bài trắc nghiệm theo ID

module.exports = router;
