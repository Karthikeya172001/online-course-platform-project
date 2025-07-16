// client/src/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://online-course-api-m8p7.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
