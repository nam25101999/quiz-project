// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import QuestionForm from './components/QuestionForm';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Trang Web Trắc Nghiệm</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-question" element={<QuestionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
