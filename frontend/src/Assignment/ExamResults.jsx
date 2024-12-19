import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/ExamResults.css'

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalParticipants: 0,
    totalScore: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  const { examId } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'; // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
          return;
        }

        // Gọi API để lấy kết quả cho examId cụ thể
        const response = await axios.get(`http://localhost:5000/api/results/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resultsData = response.data.results;
        setResults(resultsData);

        // Tính toán thống kê
        const totalParticipants = resultsData.length;
        let totalScore = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        resultsData.forEach((result) => {
          totalScore += result.score; // Tổng điểm của tất cả kết quả
          result.answers.forEach((answer) => {
            if (answer.isCorrect) {
              correctAnswers++;
            } else {
              incorrectAnswers++;
            }
          });
        });

        setStatistics({
          totalParticipants,
          totalScore,
          correctAnswers,
          incorrectAnswers,
        });
      } catch (error) {
        setError('Có lỗi xảy ra khi tải kết quả.');
        console.error(error);
      }
    };

    if (examId) {
      fetchResults(); // Chỉ gọi fetchResults khi examId có sẵn
    }
  }, [examId]); // Dependency array có examId để reload khi examId thay đổi

  if (error) return <p>{error}</p>;

  return (
    <div className="exam-results-container">
      <h1>Kết quả bài thi</h1>
      
      {/* Thống kê tổng quan */}
      <div className="exam-statistics">
        <h2>Thống kê tổng quan</h2>
        <ul>
          <li>Tổng số người tham gia: {statistics.totalParticipants}</li>
          <li>Tổng điểm: {statistics.totalScore}</li>
          <li>Số câu trả lời đúng: {statistics.correctAnswers}</li>
          <li>Số câu trả lời sai: {statistics.incorrectAnswers}</li>
        </ul>
      </div>
      
      {results.length === 0 ? (
        <p>Không có kết quả nào cho bài thi này.</p>
      ) : (
        results.map((result) => (
          <div key={result._id} className="exam-result-card">
            <h2>Bài thi: {result.examId?.title || 'Không có tiêu đề'}</h2>
            <p>Điểm số: <strong>{result.score}</strong></p>
            <p>Ngày làm: {new Date(result.createdAt).toLocaleString()}</p>
            <p>Người trả lời: {result.userId?.username || 'Không có tên người trả lời'}</p>

            <details className="result-details">
              <summary>Chi tiết kết quả</summary>
              <ul>
                {result.answers?.map((answer, index) => (
                  <li key={index} className={`result-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <p><strong>Câu hỏi:</strong> {answer.questionId?.questionText || 'Không có câu hỏi'}</p>
                    <p><strong>Đáp án đã chọn:</strong> {answer.selectedAnswer}</p>
                    <p className="answer-status">{answer.isCorrect ? 'Đúng' : 'Sai'}</p>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))
      )}
    </div>
  );
};

export default ExamResults;
