const express = require('express');
const router = express.Router();
const { getResults, getResultsByExamId } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getResults);

router.get('/:examId', getResultsByExamId);

module.exports = router;
