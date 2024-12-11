import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/TakeExam.css';
import { jwtDecode } from 'jwt-decode';

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showRetryButton, setShowRetryButton] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Bạn cần đăng nhập để tham gia bài thi.');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        try {
          const response = await axios.get(`http://localhost:5000/api/exam/${examId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setExam(response.data);
        } catch (error) {
          console.error('Không thể lấy bài thi:', error);
        }
      } catch (error) {
        console.error('Token không hợp lệ:', error.message);
        setErrorMessage('Token không hợp lệ. Vui lòng đăng nhập lại.');
      }
    };

    fetchExamDetails();
  }, [examId, navigate]);

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
      setSubmissionMessage(`Câu trả lời của bạn đã được ghi lại. Điểm của bạn là: ${response.data.score}`);
      setShowRetryButton(true);
      setTimeout(() => {
        navigate('/exam-results');  // Chuyển hướng đến trang kết quả sau khi nộp bài
      }, 5000); // Chờ 2 giây trước khi chuyển hướng
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi nộp bài thi.');
    }
  };

  const handleRetry = () => {
    setAnswers([]);
    setSubmissionMessage('');
    setShowRetryButton(false);
    navigate(`/exam/${examId}`);
  };

  if (!exam && !errorMessage) return <p>Loading...</p>;

  return (
    <div className="take-exam-container">
      {errorMessage && (
        <div className="error-message-container">
          <div className="error-message">
            <p>{errorMessage}</p>
            <button onClick={() => navigate('/login')} className="go-to-login-button">
              Đăng nhập
            </button>
          </div>
        </div>
      )}
      
      {!errorMessage && exam && (
        <>
          <h1 className="exam-title">{exam.title}</h1>
          <div className="questions-container">
            {exam.questions.map((q) => (
              <div key={q._id} className="take-exam-question">
                <p className="take-exam-question-text">{q.questionText}</p>
                <div className="answer-options">
                  {q.answers.map((a) => (
                    <label key={a.text} className="take-exam-answer">
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
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="take-exam-submit-button">Nộp bài</button>

          {submissionMessage && (
            <div className="submission-message">
              <p>{submissionMessage}</p>
            </div>
          )}

          {showRetryButton && (
            <button onClick={handleRetry} className="retry-button">
              Làm lại bài thi
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TakeExam;
