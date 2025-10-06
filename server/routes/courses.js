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
    res.status(500).json({ error: "Error fetching courses" });
  }
});

// Add a course (only instructors)
router.post("/", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id,
    });
    await newCourse.save();
    res.json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding course" });
  }
});

export default router;
