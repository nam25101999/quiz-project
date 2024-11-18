import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([{ optionText: '', isCorrect: false }]);

  // Hàm để thêm option mới
  const addOption = () => {
    setOptions([...options, { optionText: '', isCorrect: false }]);
  };

  // Hàm để cập nhật giá trị option
  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].optionText = event.target.value;
    setOptions(newOptions);
  };

  // Hàm để cập nhật giá trị đúng/sai của option
  const handleOptionCorrectChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = event.target.checked;
    setOptions(newOptions);
  };

  // Hàm gửi dữ liệu lên server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = { questionText, options };
      await axios.post('http://localhost:5000/api/questions/add', questionData);
      alert('Câu hỏi đã được thêm thành công!');
      setQuestionText('');
      setOptions([{ optionText: '', isCorrect: false }]);
    } catch (error) {
      console.error('Lỗi khi thêm câu hỏi:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h2>Thêm Câu Hỏi Trắc Nghiệm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Câu hỏi: </label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Chọn các lựa chọn: </label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Lựa chọn ${index + 1}`}
                value={option.optionText}
                onChange={(e) => handleOptionChange(index, e)}
                required
              />
              <label>
                Đúng
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionCorrectChange(index, e)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addOption}>
            Thêm Lựa Chọn
          </button>
        </div>
        <button type="submit">Lưu Câu Hỏi</button>
      </form>
    </div>
  );
};

export default QuestionForm;
