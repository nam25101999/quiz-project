import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng

  // Kiểm tra trạng thái đăng nhập khi component được tải
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile'); // Chuyển hướng nếu đã đăng nhập
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/register', { username, email, password, fullName, dob, gender });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Tên đăng nhập</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Họ và tên</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label>Ngày sinh</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div>
          <label>Giới tính</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Chọn giới tính</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
