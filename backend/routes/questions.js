// backend/routes/questions.js
const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Thêm câu hỏi mới
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Lấy tất cả câu hỏi
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
