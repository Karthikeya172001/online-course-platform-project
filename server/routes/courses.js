// server/routes/courses.js
import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses (populate instructor details)
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new course (only instructors)
router.post("/", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      instructor: req.user.id, // store instructor id from token
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
