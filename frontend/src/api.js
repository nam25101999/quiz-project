// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Địa chỉ backend của bạn

// Lấy danh sách câu hỏi
export const getQuestions = () => {
  return axios.get(`${API_URL}/questions`);
};

// Đăng ký người dùng
export const registerUser = (username, password) => {
  return axios.post(`${API_URL}/users/register`, { username, password });
};
