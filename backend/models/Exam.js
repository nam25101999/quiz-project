const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho câu trả lời
const AnswerSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

// Định nghĩa schema cho câu hỏi
const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  answers: [AnswerSchema],
});

mongoose.model('Question', QuestionSchema);

// Định nghĩa schema cho bài thi
const ExamSchema = new Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      answers: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
