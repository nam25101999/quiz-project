import React from 'react';
import '../styles/HeaderForm.css';

const HeaderForm = () => {
  return (
    <header className="header-form">
      {/* Phần Logo và Icons */}
      <div className="header-top">
        <div className="logo">
          <img src="https://via.placeholder.com/150" alt="Logo" />
        </div>
        <div className="icons">
          <i className="fas fa-user"></i>
          <i className="fas fa-bell"></i>
          <i className="fas fa-cog"></i>
        </div>
      </div>

      {/* Thanh Nav */}
      <nav className="navbar">
        <ul>
          <li><a href="#">Câu Hỏi</a></li>
          <li><a href="#">Câu Trả Lời</a></li>
          <li><a href="#">Cài Đặt</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderForm;
