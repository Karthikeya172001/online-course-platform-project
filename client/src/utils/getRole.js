import jwtDecode from 'jwt-decode';

export default function getRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null; // assuming your JWT has a "role" field
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
}
