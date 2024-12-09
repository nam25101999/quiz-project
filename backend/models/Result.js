const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  score: { type: Number, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedAnswer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);
