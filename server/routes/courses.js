// server/routes/courses.js
import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// Get all courses
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses); // ✅ send array directly
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Add a new course
router.post("/", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      description: req.body.description,
      instructor: req.user.id,
    });
    const saved = await newCourse.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course" });
  }
});

export default router;
