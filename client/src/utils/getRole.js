import jwtDecode from "jwt-decode";

const getRole = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

export default getRole;
