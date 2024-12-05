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
        <i className="hamburder_icon fa fa-bars"></i>
      </div>

      {isOpen && (
        <div className="side-menu" ref={menuRef}>
          <div className="logo-menu">
            <img className="logo_side-img" src="/img/logo-while.png" alt="Logo" />
            <h1 className='logo_menu-text'>Biểu mẫu</h1>
          </div>
          <ul className="menu-list">
            <li className='menu_li'>
              <i class="menu_icon fa-regular fa-file"></i>
              Tài liệu
            </li>
            <li className='menu_li'>
              <i class="menu_icon fa-regular fa-file"></i>
              Trang tính
            </li >
            <li className='menu_li'>
              <i class="menu_icon fa-regular fa-file"></i>
              Trang trình bày
            </li>
            <li className='menu_li'>
              <i class="menu_icon fa-regular fa-file"></i>
              Biểu mẫu
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu_li'>
              <i class="menu_icon fa-solid fa-gear"></i>
              Cài Đặt
            </li>
            <li className='menu_li'>
             <i class="menu_icon fa-solid fa-question"></i>
              Trợ Giúp và phản hổi
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu_li'>
              <i class="menu_icon   fa-brands fa-google-drive"></i>
              Drive
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
