import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Register</Link>
      <Link to="/login" style={styles.link}>Login</Link>

      {token && (
        <>
          <Link to="/courses" style={styles.link}>
            {role === "instructor" ? "My Courses" : "Courses"}
          </Link>
          {role === "instructor" && (
            <Link to="/add-course" style={styles.link}>Add Course</Link>
          )}
          <button onClick={handleLogout} style={styles.logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    background: "#333",
    padding: "10px",
  },
  link: { color: "#fff", textDecoration: "none" },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "5px 10px",
  },
};

export default Navbar;





