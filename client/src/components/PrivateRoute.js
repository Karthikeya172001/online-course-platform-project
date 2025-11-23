import React from "react";
import { Navigate } from "react-router-dom";
import getRole from "../utils/getRole";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = getRole();

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/courses" />;

  return children;
}

export default PrivateRoute;





