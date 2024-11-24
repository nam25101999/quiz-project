import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hàm để lấy bài trắc nghiệm theo người dùng đăng nhập
  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await axios.get('http://localhost:5000/api/exams', {
        headers: { Authorization: `Bearer ${token}` }, // Gửi token trong header
      });
      setExams(response.data.exams);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách bài trắc nghiệm.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams(); // Gọi hàm lấy bài trắc nghiệm khi component được render
  }, []);

  // Hiển thị khi đang tải hoặc có lỗi
  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Danh Sách Bài Thi</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>
            <h3>{exam.title}</h3>
            {exam.examUrl && (
              <p>
                <a href={exam.examUrl} target="_blank" rel="noopener noreferrer">
                  Nhấn vào đây để làm bài kiểm tra
                </a>
              </p>
            )}
            <ul>
              {exam.questions.map((question) => (
                <li key={question._id}>
                  <p>{question.questionText}</p>
                  <ul>
                    {question.answers.map((answer) => (
                      <li key={answer._id}>
                        {answer.content} {answer.isCorrect ? '(Đúng)' : ''}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
