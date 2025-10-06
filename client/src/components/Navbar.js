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
      <h2 style={styles.logo}>Online Course Platform</h2>
      <ul style={styles.menu}>
        {!token && (
          <>
            <li><Link to="/">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        {token && (
          <>
            <li><Link to="/courses">Courses</Link></li>
            {role === "instructor" && <li><Link to="/add-course">Add Course</Link></li>}
            <li><button onClick={handleLogout} style={styles.logout}>Logout</button></li>
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
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: { margin: 0 },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  logout: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;
