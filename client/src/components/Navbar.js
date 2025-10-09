import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole"; // ✅ decode user role from JWT

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRole(); // returns "student", "instructor", or null

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Online Course Platform</h2>
      <ul style={styles.menu}>
        {!token ? (
          <>
            <li><Link to="/">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/courses">Courses</Link></li>
            {role === "instructor" && (
              <li><Link to="/add-course">Add Course</Link></li>
            )}
            <li>
              <button onClick={handleLogout} style={styles.logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
  },
  logo: {
    margin: 0,
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  logout: {
    background: "#ff4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
