import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token in Navbar:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Online Course Platform</h2>
      <div style={styles.menu}>
        {!token && (
          <>
            <Link to="/" style={styles.link}>Register</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/courses" style={styles.link}>Courses</Link>
            {role === "instructor" && (
              <Link to="/add-course" style={styles.link}>Add Course</Link>
            )}
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        )}
      </div>
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
  logo: { margin: 0 },
  menu: { display: "flex", gap: "15px" },
  link: { color: "#fff", textDecoration: "none" },
  logout: { marginLeft: "15px", background: "red", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }
};

export default Navbar;
