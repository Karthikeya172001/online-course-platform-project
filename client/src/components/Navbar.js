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
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>

        {token && (
          <>
            <Link to="/courses" style={styles.link}>Courses</Link>

            {role === "instructor" && (
              <>
                <Link to="/add-course" style={styles.link}>Add Course</Link>
                <Link to="/my-courses" style={styles.link}>My Courses</Link>
              </>
            )}
          </>
        )}
      </div>

      {token && (
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "#222",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutBtn: {
    background: "red",
    color: "white",
    padding: "6px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;



