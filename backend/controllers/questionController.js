const Question = require('../models/Question'); // Import model Question

// Thêm câu hỏi
exports.addQuestion = async (req, res) => {
  const { title, questionText, answers } = req.body;
  
  try {
    const newQuestion = new Question({
      title,
      questionText,
      answers
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Câu hỏi đã được thêm thành công!' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra!' });
  }
};
