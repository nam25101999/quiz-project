import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExamList.css';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Option 1');
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

  const handleDeleteExam = async (examId) => {
    try {
      const confirmDelete = window.confirm('Bạn có chắc muốn xóa bài thi này?');
      if (!confirmDelete) return;
  
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/exam/delete/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
  
      alert('Xóa bài thi thành công!');
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi khi xóa bài thi.');
    }
  };

  return (
    <div>
      {/* Header Exam List */}
      <header className='header-exam'>
        <div className="header-exam-list">
          <div className="left-header">
            <h2 className="left-header">Biểu mẫu gần đây</h2>
          </div>
          
          <div className="right-header">
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
            <div className="menu_exam">
              <i className="menu_exam-icon fa fa-plus icon" />
              <i className="menu_exam-icon fa fa-edit icon" />
              <i className="menu_exam-icon fa fa-trash icon" />
            </div>
          </div>
        </div>
      </header>

      {/* Danh sách bài thi */}
      <div className="exam-list-container">
      < div className="exam-list">
          {exams.map((exam) => (
            <div key={exam._id} className="exam-item">
              <img
                src="https://ssl.gstatic.com/docs/templates/thumbnails/1zUQ4f2jZhbTd4yaCB5FlY4JdVbs61Ai6K9W_2EsJWwU_400_1.png"
                alt={exam.title}
                onClick={() => handleExamClick(exam._id)}
              />
              <h3>{exam.title}</h3>
              <p>Ngày tạo: {new Date(exam.createdAt).toLocaleDateString()}</p>
              <button className="delete-btn" onClick={() => handleDeleteExam(exam._id)}>
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamList;
