import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// GET all courses
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username email");
    res.json(courses); // ✅ Always return an array
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to load courses" });
  }
});

// POST add a new course (only instructor)
router.post("/", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      instructor: req.user.id,
    });
    await course.save();
    res.json({ message: "Course added successfully", course });
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ error: "Failed to add course" });
  }
});

export default router;
