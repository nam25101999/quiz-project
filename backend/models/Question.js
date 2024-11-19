const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questionText: { type: String, required: true },
  answers: [answerSchema], // Một câu hỏi có nhiều câu trả lời
});

module.exports = mongoose.model('Question', questionSchema);
