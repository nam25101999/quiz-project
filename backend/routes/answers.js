// backend/routes/answers.js
const express = require('express');
const Answer = require('../models/Answer');
const router = express.Router();

// Thêm câu trả lời
router.post('/add', async (req, res) => {
  try {
    const newAnswer = new Answer(req.body);
    await newAnswer.save();
    res.status(201).send(newAnswer);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
