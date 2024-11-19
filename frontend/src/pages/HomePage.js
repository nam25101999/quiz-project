import React, { useEffect, useState } from 'react';
import { getQuestions } from '../api';
import QuestionList from '../components/QuestionList'; // Import QuestionList

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        console.log('Dữ liệu câu hỏi:', response.data); // Thêm dòng này để kiểm tra dữ liệu
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
        <QuestionList questions={questions} /> // Truyền câu hỏi vào QuestionList
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
    </div>
  );
};

export default HomePage;
