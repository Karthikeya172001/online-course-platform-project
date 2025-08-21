import axios from "axios";

const api = axios.create({
  baseURL: "https://online-course-platform-project-backend.onrender.com/api",
});

export default api;
