import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import '../styles/UserMenu.css'

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Quản lý trạng thái menu mở/đóng
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token'); // Xóa token nếu hết hạn
            navigate('/login'); // Điều hướng đến trang đăng nhập
          }
        });
    } else {
      navigate('/login'); // Điều hướng về trang đăng nhập nếu không có token
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Chuyển trạng thái menu khi click vào icon
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="user-menu">
      <div className="user-info">
        <i className="fa fa-user" onClick={toggleMenu}></i>
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
