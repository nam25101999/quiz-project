const Question = require('../models/Question');

// Lấy tất cả câu hỏi
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Lỗi khi lấy câu hỏi:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Thêm câu hỏi mới
exports.addQuestion = async (req, res) => {
  const { title, questionText, answers } = req.body;
  try {
    const newQuestion = new Question({
      title,
      questionText,
      answers,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Lỗi khi thêm câu hỏi:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
