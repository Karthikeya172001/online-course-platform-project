import express from "express";
import jwt from "jsonwebtoken";
import Course from "../models/Course.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

// Middleware to check auth token
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a course (only instructors)
router.post("/add", authMiddleware, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id
    });

    await newCourse.save();
    res.json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
