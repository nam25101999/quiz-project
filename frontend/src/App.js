// src/App.js
import React from 'react';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';

const App = () => {
  return (
    <div>
      <h1>Trang Quản Lý Câu Hỏi Trắc Nghiệm</h1>
      <QuestionForm />
      <QuestionList />
    </div>
  );
};

export default App;
