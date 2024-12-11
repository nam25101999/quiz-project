const express = require('express');
const router = express.Router();
const { createExam } = require('../controllers/examController');
const  { getExamList } = require('../controllers/examController');
const { getExamDetails } = require("../controllers/examController");
const { submitExam } = require("../controllers/examController");
const { deleteExam } = require('../controllers/examController');
const { renameExam } = require('../controllers/examController');
const { searchExams } = require('../controllers/examController');
const {searchExamsByTitle} = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createExam);

router.get('/list', protect,getExamList  );

router.get('/:examId', protect, getExamDetails);

router.post('/submit', protect, submitExam);

router.delete('/delete/:id', protect, deleteExam);

router.put('/:examId/rename', protect, renameExam);

router.get('/search', searchExams);



module.exports = router;
