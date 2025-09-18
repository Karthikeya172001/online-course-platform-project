// server/middleware/auth.js
import jwt from "jsonwebtoken";

// ✅ Middleware to check if user is logged in
export function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload (id, role) to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// ✅ Middleware to restrict routes by role
export function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
}
