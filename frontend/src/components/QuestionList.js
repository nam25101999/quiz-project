import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  // Lấy danh sách câu hỏi từ backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy câu hỏi:', error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Danh Sách Câu Hỏi</h2>
      {questions.length === 0 ? (
        <p>Không có câu hỏi nào trong hệ thống.</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3>{question.questionText}</h3>
              <ul>
                {question.options.map((option, idx) => (
                  <li key={idx}>
                    {option.optionText} - {option.isCorrect ? 'Đúng' : 'Sai'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
