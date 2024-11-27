import React, { useState } from 'react';
import CreateExam from './CreateExam';
import ExamView from './ExamView';

const App = () => {
  const [exams, setExams] = useState([]); // Lưu danh sách bài kiểm tra

  const handleAddExam = (newExam) => {
    setExams([...exams, newExam]); // Thêm bài kiểm tra mới vào danh sách
  };

  return (
    <div>
      <h1>Exam Management</h1>
      <CreateExam onAddExam={handleAddExam} />
      <ExamView exams={exams} />
    </div>
  );
};

export default App;
