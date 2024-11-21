// models/Answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true, // Đánh dấu đáp án đúng hay sai
  }
});

module.exports = mongoose.model('Answer', answerSchema);
