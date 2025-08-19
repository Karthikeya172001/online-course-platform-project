import jwtDecode from 'jwt-decode';

function getRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role; // must match backend payload
  } catch (err) {
    return null;
  }
}

export default getRole;
