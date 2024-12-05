import React, { useState, useRef, useEffect } from 'react';
import '../styles/HeaderForm.css';

const HeaderForm = ({ title, setTitle }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); // Ref cho gạch chân
  const underlineRef = useRef(null); // Ref cho input để đo chiều rộng

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Cập nhật chiều rộng và vị trí của gạch chân
  useEffect(() => {
    if (inputRef.current) {
      const textWidth = inputRef.current.scrollWidth;
      inputRef.current.style.width = `${textWidth + 10}px`; // Thêm khoảng trống cho đẹp mắt
    }

    if (underlineRef.current && title.trim()) {
      const textWidth = inputRef.current.scrollWidth;
      underlineRef.current.style.width = isFocused && title.trim() ? `${textWidth}px` : `0px`; // Cập nhật gạch chân
      underlineRef.current.style.left = `calc(50% - ${textWidth / 2}px)`; // Căn giữa gạch chân
    }
  }, [title, isFocused]);

  return (
    <header className="header-form">
      <div className="header_content">
        <div className="header-left">
          <div className="logo_form-header">
            <img className="logo_form-header" src="/img/logo-while.png" alt="Logo" />
          </div>
          <div className={`title-header ${isFocused ? 'focused' : ''}`}>
          <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="Tiêu đề biểu mẫu"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <span className="underline" ref={underlineRef}></span> {/* Phần tử gạch chân */}
          </div>
          <div className="star">
            <i className="fa-regular fa-star"></i>
          </div>
        </div>

        <div className="header-right">
          <div className="icon-container">
            <i className="fas fa-user"></i>
            <i className="fas fa-bell"></i>
            <i className="fas fa-cog"></i>
            <i className="fas fa-question-circle"></i>
          </div>
          <button className="send"></button>
          <div className="icon">Gửi</div>
          <div className="user_Menu"></div>
        </div>
      </div>

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
