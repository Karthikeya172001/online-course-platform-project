import jwtDecode from "jwt-decode";

export default function getRole() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}
