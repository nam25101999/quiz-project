import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/exam/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExam(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExamDetails();
  }, [examId]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(a => a.questionId !== questionId);
      return [...updatedAnswers, { questionId, selectedAnswer }];
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/exam/submit', { examId, answers }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Bài thi hoàn thành! Điểm của bạn là: ${response.data.score}`);
      navigate('/exam-results'); // Điều hướng đến trang kết quả
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi nộp bài thi.');
    }
  };

  if (!exam) return <p>Loading...</p>;

  return (
    <div>
      <h1>{exam.title}</h1>
      {exam.questions.map((q) => (
        <div key={q._id}>
          <p>{q.questionText}</p>
          {q.answers.map((a) => (
            <label key={a.text}>
              <input
                type="radio"
                name={q._id}
                value={a.text}
                onChange={() => handleAnswerChange(q._id, a.text)}
              />
              {a.text}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Nộp bài</button>
    </div>
  );
};

export default TakeExam;
