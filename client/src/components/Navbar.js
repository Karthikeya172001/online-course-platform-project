import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "#222", color: "#fff" }}>
      <div><strong>Online Course Platform</strong></div>
      <div style={{ display: "flex", gap: 12 }}>
        {!token ? (
          <>
            <Link to="/" style={{ color: "#fff" }}>Register</Link>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/courses" style={{ color: "#fff" }}>Courses</Link>
            <Link to="/add-course" style={{ color: "#fff" }}>Add Course</Link>
            <button onClick={logout} style={{ background: "transparent", color: "#fff", border: "1px solid #fff", padding: "4px 8px" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
