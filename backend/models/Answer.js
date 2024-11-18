// backend/models/Answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: String, required: true }
});

module.exports = mongoose.model('Answer', answerSchema);
