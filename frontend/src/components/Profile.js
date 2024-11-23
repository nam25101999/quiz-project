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
          setMessage('Lỗi khi lấy thông tin người dùng');
        });
    } else {
      setMessage('Token không hợp lệ');
    }
  }, []);

  const handleEdit = () => {
    navigate('/update-profile'); 
  };

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          <p><strong>Tên người dùng:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Họ và tên:</strong> {user.fullName}</p>
          <p><strong>Ngày sinh:</strong> {user.dob}</p>
          <p><strong>Giới tính:</strong> {user.gender}</p>
          <button onClick={handleEdit}>Sửa thông tin</button>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default Profile;
