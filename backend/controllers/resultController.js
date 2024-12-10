const Exam = require('../models/Exam'); // Import model Exam
const Result = require('../models/Result'); // Import model Result

// Lấy tất cả kết quả của bài thi mà người dùng đã tạo
const getResults = async (req, res) => {
  try {
    const userId = req.user.id; // Người dùng hiện tại từ token
    
    // Tìm tất cả các bài thi mà người dùng đã tạo
    const exams = await Exam.find({ userId });
    
    // Kiểm tra xem người dùng có tạo bài thi nào không
    if (exams.length === 0) {
      return res.status(404).json({ message: 'Bạn chưa tạo bài thi nào.' });
    }

    // Lấy tất cả kết quả của các bài thi mà người dùng đã tạo
    const results = await Result.find({ 
      examId: { $in: exams.map(exam => exam._id) }  // Lọc theo examId từ các bài thi đã tạo
    })
      .populate('examId', 'title')  // Lấy tên bài thi từ Exam model
      .populate('answers.questionId', 'questionText')  // Lấy câu hỏi từ Result
      .populate('userId', 'username email')  // Thông tin người trả lời
      .sort({ createdAt: -1 });  // Sắp xếp theo ngày tạo, từ mới nhất

    // Nếu không có kết quả nào
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không có kết quả nào.' });
    }

    // Trả về các kết quả
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy kết quả bài thi.' });
  }
};

module.exports = { getResults };
