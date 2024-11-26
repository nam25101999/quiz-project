const mongoose = require('mongoose');
const Answer = require('./Answer');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,  // Bắt buộc phải có nội dung câu hỏi
  },
  answers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Answer'  // Liên kết với mô hình Answer
  }],
});

// Tạo và xuất mô hình Question
module.exports = mongoose.model('Question', questionSchema);
