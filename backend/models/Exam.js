const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  answers: [AnswerSchema],
});

const ExamSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
