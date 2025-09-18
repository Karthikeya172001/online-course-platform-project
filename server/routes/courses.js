import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses (any logged-in user can view)
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses); // ✅ plain array, no { courses: [...] }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a course (only instructors allowed)
router.post("/add", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = new Course({
      title,
      description,
      instructor: req.user.id, // comes from JWT
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
