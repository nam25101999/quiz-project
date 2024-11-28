import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css';
import '../styles_main/base.css';

const Login = () => {
  const [step, setStep] = useState(1); // Bước đăng nhập (1: tên đăng nhập, 2: mật khẩu)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  // Kiểm tra token khi mở trang
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Giải mã token
        navigate('/'); // Chuyển hướng nếu đã đăng nhập
      } catch (error) {
        console.error('Token không hợp lệ:', error.message);
      }
    }
  }, [navigate]);

  const handleCheckUsername = async () => {
    setUsernameError(''); // Reset lỗi tên đăng nhập
    if (!username.trim()) {
      setUsernameError('Tên đăng nhập không được để trống.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/check-username', { username });
      if (response.data.exists) {
        setStep(2); // Chuyển sang bước nhập mật khẩu
      } else {
        setMessage('Tài khoản không tồn tại.');
      }
    } catch (error) {
      setMessage('Tài khoản không tồn tại');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register');
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu có bị trống không
    if (!password.trim()) {
      setPasswordError('Mật khẩu không được để trống.');
      return;
    }
  
    setPasswordError(''); // Nếu không có lỗi, reset lỗi mật khẩu
    setLoading(true);
  
    try {
      // Gửi yêu cầu đăng nhập
      const response = await api.post('/login', { username, password });
  
      // Nếu đăng nhập thành công
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
      setMessage('Đăng nhập thành công!');
      navigate('/'); // Chuyển hướng về trang chính
    } catch (error) {
      // Nếu xảy ra lỗi khi đăng nhập
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
  
        // Kiểm tra lỗi nếu là sai mật khẩu
        if (errorMessage === 'Sai mật khẩu') {
          setPasswordError('Sai mật khẩu. Vui lòng thử lại.');
        } else if (errorMessage === 'Tài khoản không tồn tại') {
          setMessage('Tài khoản không tồn tại. Vui lòng kiểm tra lại.');
        } else {
          setMessage('Lỗi máy chủ. Vui lòng thử lại sau.');
        }
      } else {
        setMessage('Lỗi máy chủ. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="body_login">
      <form className="form_login" onSubmit={handleLogin}>
        <div className="form_left">
          <div className="logo">
            <img className="logo_img" src="/img/logo.png" alt="Logo" />
          </div>
          <h2 className="login_text">Đăng nhập</h2>
          <p className="login_textf">Sử dụng Tài khoản 2N của bạn</p>
        </div>
        <div className="form_right">
          {step === 1 && (
            <div>
              <div className="form_text">
                <label
                  className={`floating_label ${focused || username ? "active" : ""}`}
                >
                  Tên đăng nhập hoặc Email
                </label>
                <input
                  className="login_input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                />
              </div>
              {usernameError && <p className="error_message">{usernameError}</p>}
              <a className='text_account' href="/">Bạn quên tài khoản?</a>
              <div className="text_learnmore">
                Đây không phải máy tính của bạn? Hãy sử dụng chế độ Khách để đăng nhập một cách riêng tư.
                <span>
                  <a className="text_learnmore_a" href="/"> Tìm hiểu thêm về cách sử dụng Chế độ khách</a>
                </span>
              </div>
              <div className="buttons">
                <button className="button_register" onClick={handleRedirectToRegister}>
                  Tạo tài khoản
                </button>
                <button
                  className='button_next'
                  type="button"
                  onClick={handleCheckUsername}
                  disabled={loading}
                >
                  {loading ? 'Đang kiểm tra...' : 'Tiếp theo'}
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="form_password">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="error_text">{passwordError}</p>}
              </div>
                <button className="login_button" type="submit" disabled={loading}>
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </div>
          )}
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
