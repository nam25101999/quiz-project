// src/components/CreateExam.js
import React, { useState } from 'react';
import axios from 'axios';


const CreateExam = () => {
  const [examTitle, setExamTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([{ content: '', isCorrect: false }]);
  const [message, setMessage] = useState('');

  // Hàm xử lý thay đổi tiêu đề bài trắc nghiệm
  const handleExamTitleChange = (e) => {
    setExamTitle(e.target.value);
  };

  // Hàm xử lý thay đổi câu hỏi
  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  // Hàm xử lý thay đổi đáp án
  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][e.target.name] = e.target.value;
    setAnswers(updatedAnswers);
  };

  // Thêm một đáp án mới
  const addAnswer = () => {
    setAnswers([...answers, { content: '', isCorrect: false }]);
  };

  // Xóa một đáp án
  const removeAnswer = (index) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo dữ liệu bài trắc nghiệm
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
      // Gửi dữ liệu bài trắc nghiệm đến backend
      const response = await axios.post('http://localhost:5000/api/exams', examData);
      setMessage(response.data.message); // Hiển thị thông báo từ server
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
                placeholder="Answer content"
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
          <button type="button" onClick={addAnswer}>Thêm câu hỏi</button>
        </div>
        <button type="submit">Tạo bài kiểm tra</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateExam;
