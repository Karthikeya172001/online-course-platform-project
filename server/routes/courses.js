import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username email");
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// ✅ Add new course (instructor only)
router.post("/add", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    const course = new Course({
      title,
      description,
      instructor: req.user.id, // ✅ Comes from decoded JWT
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ error: "Failed to add course" });
  }
});

export default router;
