import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// Get all courses
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get my courses (Instructor)
router.get("/my", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your courses" });
  }
});

export default router;
