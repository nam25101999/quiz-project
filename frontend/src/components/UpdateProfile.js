// src/components/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import api from '../axios';

const UpdateProfile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: '',
    password: ''  // Thêm trường mật khẩu
  });
  const [message, setMessage] = useState('');

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser({
            fullName: response.data.fullName,
            email: response.data.email,
            dob: response.data.dob,
            gender: response.data.gender,
            password: '' // Không hiển thị mật khẩu cũ
          });
        })
        .catch(err => {
          setMessage('Lỗi khi tải dữ liệu người dùng');
        });
    }
  }, []);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/update', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || 'Cập nhật thành công!');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Lỗi máy chủ');
    }
  };

  return (
    <div>
      <h2>Cập nhật thông tin</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Họ và tên</label>
          <input 
            type="text" 
            value={user.fullName || ''} 
            onChange={(e) => setUser({ ...user, fullName: e.target.value })} 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={user.email || ''} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />
        </div>
        <div>
          <label>Ngày sinh</label>
          <input 
            type="date" 
            value={user.dob || ''} 
            onChange={(e) => setUser({ ...user, dob: e.target.value })} 
          />
        </div>
        <div>
          <label>Giới tính</label>
          <select 
            value={user.gender || ''} 
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>
        <div>
          <label>Mật khẩu mới (nếu thay đổi)</label>
          <input 
            type="password" 
            value={user.password || ''} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
            placeholder="Nhập mật khẩu mới nếu thay đổi"
          />
        </div>
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
