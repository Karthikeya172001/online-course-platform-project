import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (role && decoded.role !== role) {
      return <Navigate to="/courses" replace />;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
