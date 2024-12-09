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
  answers: [AnswerSchema],  // Sử dụng AnswerSchema cho mảng câu trả lời
});

// Đăng ký mô hình cho câu hỏi
mongoose.model('Question', QuestionSchema);

// Định nghĩa schema cho bài thi
const ExamSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],  // Mảng câu hỏi cho bài thi
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Tham chiếu đến User
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
