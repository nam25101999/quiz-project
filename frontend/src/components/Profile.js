import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
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
            // Nếu token hết hạn hoặc không hợp lệ
            setMessage('Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
            localStorage.removeItem('token'); // Xóa token khỏi localStorage
            navigate('/login'); // Điều hướng về trang đăng nhập
          } else {
            setMessage('Lỗi khi lấy thông tin người dùng');
          }
        });
    } else {
      setMessage('Token không hợp lệ');
      navigate('/login'); // Điều hướng về trang đăng nhập nếu không có token
    }
  }, [navigate]);

  const handleEdit = () => {
    navigate('/update-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          <p><strong>ID người dùng:</strong> {user._id}</p>
          <p><strong>Tên người dùng:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Họ và tên:</strong> {user.fullName}</p>
          <p><strong>Ngày sinh:</strong> {user.dob}</p>
          <p><strong>Giới tính:</strong> {user.gender}</p>
          <button onClick={handleEdit}>Sửa thông tin</button>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Đăng xuất
          </button>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default Profile;
