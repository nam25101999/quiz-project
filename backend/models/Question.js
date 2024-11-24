// models/Question.js
const mongoose = require('mongoose');
const Answer = require('./Answer');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }], // Liên kết với bảng Answer
});

module.exports = mongoose.model('Question', questionSchema);
