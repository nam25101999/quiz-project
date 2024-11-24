import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExamView = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (!examId) {
      setError("Không có ID bài thi.");
      setLoading(false);
      return;
    }

    const fetchExam = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/exams/${examId}`);
        if (response.data.exam) {
          setExam(response.data.exam);
        } else {
          setError("Không tìm thấy bài thi.");
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError("Không thể tải bài thi, vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resultData = {
        examId,
        userAnswers,
      };

      const response = await axios.post('http://localhost:5000/api/results', resultData);
      setResultMessage(response.data.message || 'Kết quả đã được gửi!');
      setSubmitted(true);
    } catch (error) {
      setResultMessage('Không thể gửi kết quả. Vui lòng thử lại sau.');
    }
  };

  if (loading) {
    return <div>Đang tải bài thi...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!exam) {
    return <div>Không tìm thấy bài thi.</div>;
  }

  return (
    <div>
      <h1>{exam.title}</h1>
      <h2>Câu hỏi</h2>
      {exam.questions && exam.questions.length > 0 ? (
        exam.questions.map((question, index) => (
          <div key={question._id}>
            <p>{`${index + 1}. ${question.questionText}`}</p>
            <ul>
              {question.answers.map((answer, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="radio"
                      name={question._id}
                      value={idx}
                      checked={userAnswers[question._id] === idx}
                      onChange={() => handleAnswerChange(question._id, idx)}
                      disabled={submitted}
                    />
                    {answer.content}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Không có câu hỏi nào trong bài thi.</p>
      )}
      {!submitted && (
        <button onClick={handleSubmit} disabled={Object.keys(userAnswers).length !== exam.questions.length}>
          Nộp bài
        </button>
      )}
      {resultMessage && <p>{resultMessage}</p>}
    </div>
  );
};

export default ExamView;
