const express = require('express');
const router = express.Router();
const { getResults } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getResults);

module.exports = router;
