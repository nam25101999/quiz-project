import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Nếu không có token, yêu cầu người dùng đăng nhập
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('http://localhost:5000/api/results', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResults(response.data.results); // Lưu kết quả vào state
      } catch (error) {
        setError('Có lỗi xảy ra khi tải kết quả.');
        console.error(error);
      }
    };

    fetchResults();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Kết quả bài thi của bạn</h1>
      {results.length === 0 ? (
        <p>Không có kết quả nào.</p>
      ) : (
        results.map((result) => (
          <div key={result._id}>
            <h2>Bài thi: {result.examId?.title || 'Không có tiêu đề'}</h2>
            <p>Điểm số: {result.score}</p>
            <p>Ngày làm: {new Date(result.createdAt).toLocaleString()}</p>

            {/* Hiển thị thông tin người trả lời */}
            <p>Người trả lời: {result.userId?.username || 'Không có tên người trả lời'}</p>

            <h3>Chi tiết kết quả:</h3>
            <ul>
              {result.answers?.map((answer, index) => (
                <li key={index}>
                  <p>Câu hỏi: {answer.questionId?.questionText || 'Không có câu hỏi'}</p>
                  <p>Đáp án đã chọn: {answer.selectedAnswer}</p>
                  <p>{answer.isCorrect ? 'Đúng' : 'Sai'}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ExamResults;
