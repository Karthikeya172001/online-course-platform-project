import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Register</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      {token && <Link to="/courses" style={styles.link}>Courses</Link>}
      {token && <button onClick={handleLogout} style={styles.logout}>Logout</button>}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#282c34',
    padding: '10px',
    marginBottom: '30px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logout: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  }
};

export default Navbar;
