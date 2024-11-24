import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users',  
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
