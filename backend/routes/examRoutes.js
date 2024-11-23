const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  getExamById,
} = require('../controllers/examController');

router.post('/', createExam);

router.get('/', getExams);

router.get('/:id', getExamById);

module.exports = router;
