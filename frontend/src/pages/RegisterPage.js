// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(username, password);
      alert('Đăng ký thành công!');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Tên người dùng</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
