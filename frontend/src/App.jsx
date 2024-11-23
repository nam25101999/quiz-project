import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ExamList from './components/ExamList';
import CreateExam from './components/CreateExam';
import Header from './components/Header';
import ExamView from './components/ExamView';
import UpdateProfile from './components/UpdateProfile';

const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <nav>
          <Link to="/login">Đăng nhập</Link> 
          <Link to="/register">Đăng ký</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
        <main>
          <Link to="/create">Tao Bai Tap </Link> 
          <Link to="/exam-list">Danh Sách Bài Tập </Link>
          <Routes>
            <Route path="/create" element={<CreateExam />} />
            <Route path="/exam-list" element={<ExamList />} />
            <Route path="/exams/:examId" element={<ExamView />} />
          </Routes>
        </main>
        
      </div>
    </Router>
    
  );
};

export default App;
