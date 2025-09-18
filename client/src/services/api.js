import axios from "axios";

// ✅ Use Render backend if available, fallback to local
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://online-course-platform-project-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
