
const Exam = require('../models/Exam');
const Result = require('../models/Result');


const createExam = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // Tạo bài thi mới
    const exam = new Exam({
      title,
      questions,
      userId: req.user.id,
    });

    await exam.save();
    res.status(201).json({ message: 'Exam created successfully!', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating exam: ' + error.message });
  }
};

const getExamList = async (req, res) => {
  try {
    const exams = await Exam.find({ userId: req.user.id }).select('title createdAt'); // Chỉ lấy trường cần thiết
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId).populate('userId', 'username');
    if (!exam) return res.status(404).json({ message: 'Bài thi không tồn tại.' });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;

    // Kiểm tra xem bài kiểm tra có tồn tại không
    const exam = await Exam.findById(examId).populate("questions.answers");

    if (!exam) {
      return res.status(404).json({ message: "Bài kiểm tra không tồn tại." });
    }
    res.status(404).json({ message: "Không tìm thấy bài kiểm tra" });
    res.status(200).json({ exam });
  } catch (error) {
    console.error("Lỗi khi lấy bài kiểm tra:", error.message);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy bài kiểm tra." });
  }
};


const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    // Lấy bài thi từ cơ sở dữ liệu
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Bài thi không tồn tại.' });

    let score = 0;
    const results = [];

    // Kiểm tra câu trả lời và tính điểm
    exam.questions.forEach((question) => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      if (userAnswer) {
        const correctAnswer = question.answers.find(a => a.isCorrect);
        const isCorrect = correctAnswer.text === userAnswer.selectedAnswer;
        if (isCorrect) score += 1;

        results.push({
          questionId: question._id,
          selectedAnswer: userAnswer.selectedAnswer,
          isCorrect,
        });
      }
    });

    // Lưu kết quả vào cơ sở dữ liệu
    const result = new Result({
      userId: req.user.id,
      examId,
      score,
      answers: results,
    });
    await result.save();

    res.status(201).json({
      message: 'Kết quả đã được lưu thành công.',
      resultId: result._id,
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi gửi bài thi.' });
  }
};


const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem bài thi có tồn tại không
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: 'Bài thi không tồn tại.' });
    }

    // Kiểm tra quyền sở hữu bài thi
    if (exam.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa bài thi này.' });
    }

    // Xóa bài thi
    await exam.deleteOne();

    res.status(200).json({ message: 'Bài thi đã được xóa thành công.' });
  } catch (error) {
    console.error('Lỗi khi xóa bài thi:', error.message);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bài thi.' });
  }
};



module.exports = { createExam, getExamList, getExamById, getExamDetails, submitExam, deleteExam };