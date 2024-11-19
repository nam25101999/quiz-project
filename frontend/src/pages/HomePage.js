// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getQuestions } from '../api';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy câu hỏi:', error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Câu Hỏi Trắc Nghiệm</h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question._id}>
            <h3>{question.title}</h3>
            <p>{question.questionText}</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer.answerText}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
    </div>
  );
};

export default HomePage;
