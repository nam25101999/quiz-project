const express = require('express');
const { createNote, getNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/notes', protect, createNote);

router.get('/notes', protect, getNotes);

module.exports = router;
