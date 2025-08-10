import axios from 'axios';

const api = axios.create({
  baseURL: 'https://online-course-platform-project-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
