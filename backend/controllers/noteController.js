const Note = require('../models/Note');

// Lưu ghi chú
const createNote = async (req, res) => {
    try {
      const { note } = req.body;
      if (!note || note.trim() === "") {
        return res.status(400).json({ message: 'Ghi chú không được để trống.' });
      }
  
      const newNote = new Note({
        note,
        userId: req.user.id,
      });
  
      await newNote.save();
  
      res.status(201).json({ message: 'Ghi chú đã được lưu thành công!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Có lỗi xảy ra khi tạo ghi chú.' });
    }
  };

// Hàm lấy ghi chú
const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID không hợp lệ.' });
    }

    // Sử dụng populate để lấy thông tin username từ userId
    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username');

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'Không có ghi chú nào.' });
    }

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error('Lỗi khi lấy ghi chú:', error.message);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy ghi chú.',
      error: error.message,
    });
  }
};


module.exports = { createNote, getNotes };
