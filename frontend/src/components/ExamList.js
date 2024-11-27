import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Lấy dữ liệu bài kiểm tra từ API
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await axios.get('http://localhost:5000/api/exams', {
          headers: {
            'Authorization': `Bearer ${token}`, // Gửi token xác thực
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setExams(response.data.exams);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Có lỗi xảy ra khi lấy bài kiểm tra.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Danh sách bài kiểm tra</h2>
      {exams.length === 0 ? (
        <p>Không có bài kiểm tra nào.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam._id}>
              <h3>{exam.title}</h3>
              <p>Câu hỏi: {exam.questions.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
