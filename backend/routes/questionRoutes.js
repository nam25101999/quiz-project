const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Định tuyến POST để thêm câu hỏi
router.post('/', questionController.addQuestion);

module.exports = router;
