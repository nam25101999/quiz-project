// backend/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);
