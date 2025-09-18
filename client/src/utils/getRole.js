import jwtDecode from "jwt-decode";

export default function getRole() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null; // ✅ No token → no role

    const decoded = jwtDecode(token);

    // ✅ Ensure role exists in token payload
    return decoded?.role || null;
  } catch (err) {
    console.error("JWT decode error:", err.message);
    return null;
  }
}
