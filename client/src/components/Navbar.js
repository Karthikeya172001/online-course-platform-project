import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Online Course Platform</h2>

      <div style={styles.links}>

        {!token && (
          <>
            <Link style={styles.link} to="/register">Register</Link>
            <Link style={styles.link} to="/login">Login</Link>
          </>
        )}

        {token && (
          <>
            <Link style={styles.link} to="/courses">Courses</Link>

            {role === "instructor" && (
              <>
                <Link style={styles.link} to="/add-course">Add Course</Link>
                <Link style={styles.link} to="/my-courses">My Courses</Link>
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
};

const styles = {
  navbar: {
    background: "#222",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: { color: "white", textDecoration: "none", fontSize: "16px" },
  logoutBtn: {
    background: "#e63946",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px"
  }
};

export default Navbar;





