// client/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Online Course Platform</h2>
      <ul style={styles.menu}>
        <li><Link to="/">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/add-course">Add Course</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
};

export default Navbar;

