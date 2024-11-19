import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([{ answerText: '', isCorrect: false }]);

  // Thêm câu trả lời mới
  const addAnswer = () => {
    setAnswers([...answers, { answerText: '', isCorrect: false }]);
  };

  // Cập nhật câu trả lời
  const updateAnswer = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answerText = value;
    setAnswers(updatedAnswers);
  };

  // Đánh dấu câu trả lời đúng
  const toggleCorrectAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setAnswers(updatedAnswers);
  };

  // Gửi câu hỏi tới backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', {
        title,
        questionText,
        answers
      });
      alert('Câu hỏi đã được thêm thành công!');
      setTitle('');
      setQuestionText('');
      setAnswers([{ answerText: '', isCorrect: false }]);
    } catch (error) {
      console.error('Lỗi khi thêm câu hỏi:', error);
      alert('Đã xảy ra lỗi!');
    }
  };

  return (
    <div>
      <h2>Nhập Câu Hỏi Trắc Nghiệm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề câu hỏi</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Câu hỏi</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        
        {/* Hiển thị các câu trả lời */}
        {answers.map((answer, index) => (
          <div key={index}>
            <label>Đáp án {index + 1}</label>
            <input 
              type="text"
              value={answer.answerText}
              onChange={(e) => updateAnswer(index, e.target.value)}
              required
            />
            <label>
              <input 
                type="checkbox" 
                checked={answer.isCorrect} 
                onChange={() => toggleCorrectAnswer(index)}
              /> Câu trả lời đúng
            </label>
          </div>
        ))}
        
        <button type="button" onClick={addAnswer}>Thêm câu trả lời</button>
        <button type="submit">Lưu câu hỏi</button>
      </form>
    </div>
  );
};

export default QuestionForm;
