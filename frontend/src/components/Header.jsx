import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/Header.css';

const Header = () => {
  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <header className="Header">
      <div className="first_header">
        <div className="logo">
          <img
            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/453382192_1946809815761487_1536232079129393471_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEprH47eZNYk_TNh0h2LTYZ4p6aeOiJ6vzinpp46Inq_LI8z7IUNHwlK86fVkk0biuw3Qlazv4-l9npdAGogXmw&_nc_ohc=Q4AvtIZ8QR0Q7kNvgFvP1Ow&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Az2FzVA4lscUZQwfqDeYOpS&oh=00_AYDZB70rc0Fd0ewA_rLGPoqfk1OXLSSNkum1Hp2x1_HT4g&oe=674554D8"
            alt="Logo"
          />
        </div>
        <div className="menu">
          <div className="menu_icon">
            <span>☰</span>
          </div>
          <div className="login">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/services">Services</a>
        <a href="/menu">Menu</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Nút đăng xuất */}
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
        Đăng xuất
      </button>
    </header>
  );
};

export default Header;
