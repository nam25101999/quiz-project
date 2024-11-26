import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // API đã cấu hình
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Thêm loading state
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Bắt đầu trạng thái đang chờ

    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
      setMessage('Đăng nhập thành công!');
      navigate('/profile');
    } catch (error) {
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Lỗi máy chủ. Vui lòng thử lại sau.'
      );
    } finally {
      setLoading(false);  // Kết thúc trạng thái đang chờ
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập</label>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
