import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   GET /api/courses
 * @desc    Get all available courses
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    console.error("❌ Error fetching courses:", err.message);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

/**
 * @route   GET /api/courses/my
 * @desc    Get all courses created by the logged-in instructor
 * @access  Instructor only
 */
router.get("/my", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const myCourses = await Course.find({ instructor: req.user.id }).populate("instructor", "username");
    res.json(myCourses);
  } catch (err) {
    console.error("❌ Error fetching instructor courses:", err.message);
    res.status(500).json({ error: "Failed to fetch instructor courses" });
  }
});

/**
 * @route   POST /api/courses/add
 * @desc    Add a new course (Instructor only)
 * @access  Instructor only
 */
router.post("/add", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "Title and description required" });

    const course = new Course({
      title,
      description,
      instructor: req.user.id,
    });

    await course.save();
    res.json({ message: "✅ Course added successfully!" });
  } catch (err) {
    console.error("❌ Error adding course:", err.message);
    res.status(500).json({ error: "Failed to add course" });
  }
});

export default router;
