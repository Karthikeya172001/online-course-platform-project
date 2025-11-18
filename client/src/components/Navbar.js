import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRole(); // "student" or "instructor"

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

            {/* Instructor-only links */}
            {role === "instructor" && (
              <>
                <Link to="/add-course" style={styles.link}>Add Course</Link>
                <Link to="/my-courses" style={styles.link}>My Courses</Link>
              </>
            )}

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// Inline CSS
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  menu: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutBtn: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;





