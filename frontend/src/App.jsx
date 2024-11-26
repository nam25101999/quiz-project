import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './components/Register';
import ExamList from './components/ExamList';
import CreateExam from './components/CreateExam';
import Header from './components/Header';
import ExamView from './components/ExamView';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import NotePage from './pages/NotePage';
import NotesPage from './pages/NotesPage';
import ExamDetails from './components/ExamDetails';

// Component bảo vệ route, chỉ cho phép truy cập khi đã đăng nhập
const PrivateRoute = ({ element }) => {
  // Kiểm tra xem token đã tồn tại trong localStorage chưa
  const isAuthenticated = localStorage.getItem('token');

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div>
        {/* Routes */}
        <Routes>
          {/* Hiển thị trang đăng nhập riêng biệt */}
          <Route path="/login" element={<Login />} />
          
          {/* Các route bảo vệ cho những trang yêu cầu người dùng đã đăng nhập */}
          <Route
            path="/"
            element={
              <PrivateRoute element={
                <>
                  <Header />
                  <main>
                    <nav>
                      <Link to="/create">Tạo Bài Tập</Link>
                      <Link to="/exam-list">Danh Sách Bài Tập</Link>
                    </nav>
                    <Routes>
                      <Route path="/create" element={<CreateExam />} />
                      <Route path="/exam-list" element={<ExamList />} />
                      <Route path="/examsview" element={<ExamView />} />
                      <Route path="/exam-details" element={<ExamDetails />} />
                    </Routes>
                  </main>
                </>
              } />
            }
          />

          {/* Các route cho phần đăng ký và cập nhật thông tin người dùng */}
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />

          {/* Các route cho Notes */}
          <Route path="/notes" element={<PrivateRoute element={<NotesPage />} />} />
          <Route path="/note-page" element={<PrivateRoute element={<NotePage />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
