import axios from 'axios';

const API = axios.create({
  baseURL: 'https://online-course-platform-project-backend.onrender.com/api'
});

export default API;
