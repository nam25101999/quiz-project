const Exam = require('../models/Exam');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// Tạo mới một bài trắc nghiệm
const createExam = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // Tạo bài trắc nghiệm mới
    const newExam = new Exam({ title });
    await newExam.save();

    // Thêm câu hỏi vào bài trắc nghiệm
    for (let questionData of questions) {
      const newQuestion = new Question({
        questionText: questionData.questionText,
      });

      await newQuestion.save();

      // Thêm đáp án cho câu hỏi
      for (let answerData of questionData.answers) {
        const newAnswer = new Answer(answerData);
        await newAnswer.save();
        newQuestion.answers.push(newAnswer._id);
      }

      await newQuestion.save();
      newExam.questions.push(newQuestion._id);
    }

    await newExam.save();

    // Tạo đường link dựa trên ID của bài kiểm tra
    const examUrl = `http://localhost:3000/exams/${newExam._id}`;

    res.status(201).json({
      message: 'Exam created successfully',
      exam: newExam,
      examUrl, // Thêm đường link
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Lấy tất cả bài trắc nghiệm (kèm theo câu hỏi và đáp án)
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate({
      path: 'questions',
      populate: {
        path: 'answers',
      },
    });

    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Lấy bài trắc nghiệm theo ID (kèm theo câu hỏi và đáp án)
const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId).populate({
      path: 'questions',
      populate: {
        path: 'answers',
      },
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createExam, getExams, getExamById };
