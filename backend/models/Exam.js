// models/Exam.js
const mongoose = require('mongoose');
const Question = require('./Question');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

module.exports = mongoose.model('Exam', examSchema);
