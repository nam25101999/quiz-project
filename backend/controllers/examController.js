
const Exam = require('../models/Exam'); // Đảm bảo mô hình Exam đã được tạo đúng

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

const getExams = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ middleware authenticate

    // Tìm các bài kiểm tra của người dùng
    const exams = await Exam.find({ userId })
    .sort({ createdAt: -1 })
    .populate('userId', 'username'); // Populate để lấy thông tin người dùng nếu cần

    if (!exams || exams.length === 0) {
      return res.status(404).json({ message: 'Không có bài kiểm tra nào.' });
    }

    res.status(200).json({ success: true, exams });
  } catch (error) {
    console.error('Lỗi khi lấy bài kiểm tra:', error.message);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bài kiểm tra.', error: error.message });
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


module.exports = { createExam, getExams, getExamById };