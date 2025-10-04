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
      // redirect students if they try to access instructor-only route
      return <Navigate to="/courses" replace />;
    }

    return children;
  } catch (err) {
    console.error("PrivateRoute decode error:", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
