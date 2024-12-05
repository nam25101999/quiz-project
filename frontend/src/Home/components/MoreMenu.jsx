import React, { useState, useEffect, useRef } from 'react';
import '../styles/MoreMenu.css'; // Tạo một file CSS riêng

const MoreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Sử dụng useRef để tham chiếu đến menu dropdown
  const buttonRef = useRef(null); // Sử dụng useRef cho nút 9 chấm

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Mở/đóng menu khi nhấn vào nút 9 chấm
  };

  // Thêm sự kiện lắng nghe click ra ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Đóng menu nếu người dùng click ra ngoài
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Cleanup khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="more-menu">
      {/* Nút 9 chấm */}
      <button
        className="menu-button"
        onClick={toggleMenu}
        ref={buttonRef} // Thêm ref vào nút 9 chấm
      >
        <i className="fa fa-ellipsis-v"></i>
        <i className="fa fa-ellipsis-v"></i>
        <i className="fa fa-ellipsis-v"></i>
      </button>

      {/* Menu bên trong */}
      {isOpen && (
        <div className="menu-dropdown" ref={menuRef}> {/* Thêm ref vào menu dropdown */}
          <div className="icons-grid">
            {/* 9 icon ô vuông */}
            <div className="icon-item"><i className="fa fa-home"></i><span>Home</span></div>
            <div className="icon-item"><i className="fa fa-user"></i><span>Profile</span></div>
            <div className="icon-item"><i className="fa fa-cog"></i><span>Settings</span></div>
            <div className="icon-item"><i className="fa fa-envelope"></i><span>Messages</span></div>
            <div className="icon-item"><i className="fa fa-bell"></i><span>Notifications</span></div>
            <div className="icon-item"><i className="fa fa-power-off"></i><span>Logout</span></div>
            <div className="icon-item"><i className="fa fa-calendar"></i><span>Calendar</span></div>
            <div className="icon-item"><i className="fa fa-flag"></i><span>Flag</span></div>
            <div className="icon-item"><i className="fa fa-search"></i><span>Search</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreMenu;
