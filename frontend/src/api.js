// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Địa chỉ backend của bạn

// Lấy danh sách câu hỏi
export const getQuestions = async () => {
    return axios.get('http://localhost:5000/api/questions'); // Đảm bảo URL khớp với backend
  };

// Đăng ký người dùng
export const registerUser = (username, password) => {
  return axios.post(`${API_URL}/users/register`, { username, password });
};
