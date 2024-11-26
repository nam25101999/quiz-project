const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  text: { type: String, required: true },  // Nội dung đáp án
  isCorrect: { type: Boolean, required: true }  // Đáp án đúng hay sai
});

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },  // Nội dung câu hỏi
  answers: [AnswerSchema],  // Danh sách các đáp án
});

const ExamSchema = new Schema({
  title: { type: String, required: true },  // Tiêu đề bài kiểm tra
  questions: [QuestionSchema],  // Danh sách câu hỏi trong bài kiểm tra
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
