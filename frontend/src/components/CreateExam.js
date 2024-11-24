import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateExam = () => {
  const [examTitle, setExamTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([{ content: '', isCorrect: false }]);
  const [message, setMessage] = useState('');
  const [examLink, setExamLink] = useState('');
  const [userExams, setUserExams] = useState([]); // Lưu thông tin bài thi của người dùng
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Chuyển hướng nếu chưa đăng nhập
    } else {
      fetchUserExams(token); // Lấy danh sách bài thi của người dùng
    }
  }, [navigate]);

  const fetchUserExams = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/exams/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserExams(response.data.exams); // Cập nhật danh sách bài thi
    } catch (error) {
      setMessage('Không thể tải danh sách bài thi.');
    }
  };

  const handleExamTitleChange = (e) => setExamTitle(e.target.value);
  const handleQuestionTextChange = (e) => setQuestionText(e.target.value);

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...answers];
    if (e.target.name === 'isCorrect') {
      updatedAnswers[index][e.target.name] = e.target.checked;
    } else {
      updatedAnswers[index][e.target.name] = e.target.value;
    }
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => setAnswers([...answers, { content: '', isCorrect: false }]);
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
          questionText,
          answers: answers.map((answer) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
        },
      ],
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/exams', examData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const examUrl = response.data.examUrl;
      if (examUrl) {
        setExamLink(examUrl);
        setMessage('Bài thi đã được tạo thành công!');
        fetchUserExams(token); // Cập nhật lại danh sách bài thi
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
          <input type="text" value={examTitle} onChange={handleExamTitleChange} required />
        </div>
        <div>
          <label>Tiêu đề câu hỏi</label>
          <input type="text" value={questionText} onChange={handleQuestionTextChange} required />
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
      <h3>Bài thi của bạn</h3>
      <ul>
        {userExams.map((exam) => (
          <li key={exam._id}>
            {exam.title}
            <a href={`/exam/${exam._id}`} target="_blank" rel="noopener noreferrer"> Xem bài thi</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateExam;
