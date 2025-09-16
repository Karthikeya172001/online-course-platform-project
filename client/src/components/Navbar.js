import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRole();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
      {token && (
        <>
          <Link to="/courses">Courses</Link>
          {role === "instructor" && <Link to="/add-course">Add Course</Link>}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
