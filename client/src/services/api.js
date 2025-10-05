// client/src/services/api.js
import axios from "axios";
const API = process.env.REACT_APP_API_URL || "https://online-course-platform-project-backend.onrender.com";
const api = axios.create({ baseURL: `${API}/api`, headers: { "Content-Type": "application/json" } });

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
}, e => Promise.reject(e));

export default api;
