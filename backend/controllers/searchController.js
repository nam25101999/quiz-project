const Content = require('../models/Content');

const searchContent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Vui lòng nhập nội dung tìm kiếm.' });
    }

    // Tìm kiếm theo title hoặc description
    const results = await Content.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Tìm kiếm không phân biệt chữ hoa thường
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy kết quả phù hợp.' });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error.message);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm.' });
  }
};

module.exports = { searchContent };
