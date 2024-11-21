// src/components/ExamList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hàm để lấy tất cả bài trắc nghiệm từ backend
  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/exams');
      setExams(response.data.exams);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exams');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams(); // Gọi hàm lấy bài trắc nghiệm khi component được render
  }, []);

  // Hiển thị khi đang tải hoặc có lỗi
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Exams List</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>
            <h3>{exam.title}</h3>
            <ul>
              {exam.questions.map((question) => (
                <li key={question._id}>
                  <p>{question.questionText}</p>
                  <ul>
                    {question.answers.map((answer) => (
                      <li key={answer._id}>
                        {answer.content} {answer.isCorrect ? '(Correct)' : ''}
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
