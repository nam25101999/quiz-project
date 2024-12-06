import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import '../styles/UserMenu.css';

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Đóng menu nếu nhấp ra ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-info" onClick={toggleMenu}>
        <i className="user-icon fa fa-user"></i>
      </div>
      {isMenuOpen && user && (
        <div className="user-dropdown">
          <div className="user-details">
            <p className='text_user'>{user.email}</p>
            <img className='user_avt' src="" alt="" />
            <p className='text_user'><strong>Chào</strong> {user.username}</p>
            
            <button onClick={() => navigate('/update-profile')}>Sửa thông tin</button>
            <button onClick={handleLogout} style={{ marginTop: '10px' }}>Đăng xuất</button>
            <div className="footer_user">
              <p >Chính sách quyền riêng tư</p>
              <p>Điều khoản và dịch vụ</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
