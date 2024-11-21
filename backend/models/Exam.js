// models/Exam.js
const mongoose = require('mongoose');
const Question = require('./Question');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],  // Liên kết với các câu hỏi
});

module.exports = mongoose.model('Exam', examSchema);
