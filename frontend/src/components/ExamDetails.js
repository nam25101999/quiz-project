import React, { useState, useEffect } from 'react';
import axios from '../axios';

const ExamDetails = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/exam/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data); // Kiểm tra dữ liệu trả về
        setExams(response.data.exams); // Lưu các bài kiểm tra vào state
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy bài kiểm tra.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return <div>Đang tải bài kiểm tra...</div>;
  }

  // Hiển thị thông báo lỗi nếu có
  if (error) {
    return <div>{error}</div>;
  }

  // Hiển thị bài kiểm tra
  return (
    <div>
      <h1>Danh Sách Bài Kiểm Tra</h1>
      {exams.length === 0 ? (
        <p>Không có bài kiểm tra nào.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam._id}>
              <h2>{exam.title}</h2>
              {exam.questions && exam.questions.length === 0 ? (
                <p>Không có câu hỏi nào trong bài kiểm tra.</p>
              ) : (
                <ul>
                  {exam.questions.map((question, index) => (
                    <li key={index}>
                      <p>{question.questionText}</p>
                      <ul>
                        {question.answers && question.answers.length > 0 ? (
                          question.answers.map((answer, idx) => (
                            <li key={idx}>
                              <p>Trả lời: {answer.answerText}</p>
                              <small>Ngày tạo: {new Date(answer.createdAt).toLocaleString()}</small>
                            </li>
                          ))
                        ) : (
                          <p>Không có câu trả lời nào.</p>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamDetails;
