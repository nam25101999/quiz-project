const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Answer', answerSchema);
