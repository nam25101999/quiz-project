import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams để lấy tham số từ URL
import axios from 'axios';

const ExamView = () => {
    const { examId } = useParams();
    console.log("Exam ID:", examId);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        // Kiểm tra xem có bài thi hay không
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
          <div key={index}>
            <p>{question.questionText}</p>
            <ul>
              {question.answers.map((answer, idx) => (
                <li key={idx}>
                  {answer.content} {answer.isCorrect && "(Đáp án đúng)"}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Không có câu hỏi nào trong bài thi.</p>
      )}
    </div>
  );
};

export default ExamView;
