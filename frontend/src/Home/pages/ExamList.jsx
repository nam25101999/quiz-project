import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExamList.css';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Option 1'); // Quản lý lựa chọn trong ô xổ
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/exam/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  const handleExamClick = (examId) => {
    navigate(`/exam/${examId}`);
  };

  return (
    <div>
      {/* Header Exam List */}
      <div className="header-exam-list">
        <div className="left-header">
          <h2>Biểu mẫu gần đây</h2>
        </div>
        <div className="center-header">
          <select 
            value={selectedOption} 
            onChange={(e) => setSelectedOption(e.target.value)}
            className="dropdown"
          >
            <option value="Option 1">Lựa chọn 1</option>
            <option value="Option 2">Lựa chọn 2</option>
            <option value="Option 3">Lựa chọn 3</option>
          </select>
        </div>
        <div className="right-header">
          {/* Icon Font Awesome */}
          <i className="fa fa-plus icon" />
          <i className="fa fa-edit icon" />
          <i className="fa fa-trash icon" />
        </div>
      </div>

      {/* Danh sách bài thi */}
      <div className="exam-list-container">
        <div className="exam-list">
          {exams.map((exam) => (
            <div key={exam._id} className="exam-item" onClick={() => handleExamClick(exam._id)}>
              {/* Hình ảnh */}
              <img src={exam.imageUrl} alt={exam.title} />
              <h3>{exam.title}</h3>
              <p>Ngày tạo: {new Date(exam.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamList;
