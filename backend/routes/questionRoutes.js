const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Lấy tất cả câu hỏi
router.get('/', questionController.getAllQuestions);

// Thêm câu hỏi mới
router.post('/', questionController.addQuestion);

module.exports = router;
