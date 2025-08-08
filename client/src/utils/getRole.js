
import jwtDecode from 'jwt-decode';

export default function getRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null; // JWT must contain "role"
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
}
