import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng
import api from '../axios'; // API được cấu hình trước

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng hook navigate để chuyển hướng

  // Kiểm tra trạng thái đăng nhập khi component được tải
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
      setMessage('Đăng nhập thành công!');
      navigate('/profile'); // Chuyển hướng đến /profile sau khi đăng nhập thành công
    } catch (error) {
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Lỗi máy chủ. Vui lòng thử lại sau.'
      );
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
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
