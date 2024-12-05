import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import '../styles/UserMenu.css';

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Tạo tham chiếu để theo dõi menu

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
        <i className="fa fa-user"></i>
        <span>{user ? user.username : 'Đang tải...'}</span>
      </div>
      {isMenuOpen && user && (
        <div className="user-dropdown">
          <div className="user-details">
            <p><strong>Tên:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => navigate('/update-profile')}>Sửa thông tin</button>
            <button onClick={handleLogout} style={{ marginTop: '10px' }}>Đăng xuất</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
