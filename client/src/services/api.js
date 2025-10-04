// client/src/services/api.js
import axios from "axios";

// Use Render backend in production, localhost in dev
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API,
});

export default api;

