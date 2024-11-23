import React, { useState } from 'react';
import axios from 'axios';

const CreateExam = () => {
  const [examTitle, setExamTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([{ content: '', isCorrect: false }]);
  const [message, setMessage] = useState('');
  const [examLink, setExamLink] = useState(''); // Thêm state để lưu link

  const handleExamTitleChange = (e) => {
    setExamTitle(e.target.value);
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...answers];
    if (e.target.name === 'isCorrect') {
      updatedAnswers[index][e.target.name] = e.target.checked;
    } else {
      updatedAnswers[index][e.target.name] = e.target.value;
    }
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { content: '', isCorrect: false }]);
  };

  const removeAnswer = (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đáp án này?')) {
      const updatedAnswers = answers.filter((_, i) => i !== index);
      setAnswers(updatedAnswers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validAnswers = answers.every((answer) => answer.content.trim() !== '');
    if (!validAnswers) {
      setMessage('Vui lòng nhập đầy đủ nội dung đáp án.');
      return;
    }
  
    const examData = {
      title: examTitle,
      questions: [
        {
          questionText: questionText,
          answers: answers.map((answer) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
        },
      ],
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/exams', examData);
      console.log(response.data);  // Kiểm tra dữ liệu trả về từ API
  
      const examUrl = response.data.examUrl;  // Backend trả về đường dẫn bài thi
      if (examUrl) {
        setExamLink(examUrl);  // Lưu link vào state
        setMessage('Bài thi đã được tạo thành công!');
      } else {
        setMessage('Không có đường dẫn bài thi từ backend.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };
  

  return (
    <div>
      <h2>Tạo Bài Thi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu Đề Bài Thi</label>
          <input
            type="text"
            value={examTitle}
            onChange={handleExamTitleChange}
            required
          />
        </div>
        <div>
          <label>Tiêu đề câu hỏi</label>
          <input
            type="text"
            value={questionText}
            onChange={handleQuestionTextChange}
            required
          />
        </div>
        <div>
          <h3>Đáp án</h3>
          {answers.map((answer, index) => (
            <div key={index}>
              <input
                type="text"
                name="content"
                value={answer.content}
                onChange={(e) => handleAnswerChange(index, e)}
                placeholder="Nội dung đáp án"
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerChange(index, e)}
                />
                Đáp án đúng
              </label>
              <button type="button" onClick={() => removeAnswer(index)}>Xóa đáp án</button>
            </div>
          ))}
          <button type="button" onClick={addAnswer}>Thêm đáp án</button>
        </div>
        <button type="submit">Tạo bài kiểm tra</button>
      </form>
      {message && <p>{message}</p>}
      {examLink && (
        <p>
          <a href={examLink} target="_blank" rel="noopener noreferrer">
            Nhấn vào đây để làm bài kiểm tra
          </a>
        </p>
      )}
    </div>
  );
};

export default CreateExam;
