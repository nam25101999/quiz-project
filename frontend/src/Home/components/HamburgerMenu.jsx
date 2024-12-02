import React, { useState, useEffect, useRef } from 'react';
import '../styles/HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Ref để tham chiếu đến menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Thêm sự kiện click ra ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburger-menu')) {
        setIsOpen(false); // Đóng menu khi click ra ngoài
      }
    };

    document.addEventListener('click', handleClickOutside); // Thêm sự kiện click ra ngoài
    return () => document.removeEventListener('click', handleClickOutside); // Loại bỏ sự kiện khi component unmount
  }, []);

  return (
    <div className="hamburger-menu-container">
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>

      {isOpen && (
        <div className="side-menu" ref={menuRef}>
          <div className="logo">
            <img className="logo_side-img" src="/img/logo.png" alt="Logo" />
          </div>
          <ul className="menu-list">
            <li>Tài liệu</li>
            <li>Trang tính</li>
            <li>Trang trình bày</li>
            <li>Biểu mẫu cài đặt</li>
            <li>Trợ giúp</li>
            <li>Phản hồi</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
