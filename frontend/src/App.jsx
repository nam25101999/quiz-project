import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ExamList from './components/ExamList';
import CreateExam from './components/CreateExam';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/login">Đăng nhập</Link> | <Link to="/register">Đăng ký</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <main>
          <Link to="/create">Tao Bai Tap </Link> 
          <Link to="/exam-list">Danh Sach Bai Tap </Link>
          <Routes>
            <Route path="/create" element={<CreateExam />} />
            <Route path="/exam-list" element={<ExamList />} />
          </Routes>
        </main>
        
      </div>
    </Router>
    
  );
};

export default App;
