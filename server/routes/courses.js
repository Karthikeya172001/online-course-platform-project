import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route POST /api/courses/add
 * @desc Add a new course (Instructor Only)
 */
router.post("/add", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const course = new Course({
      title,
      instructor: req.user.id,
    });

    await course.save();
    res.json({ message: "Course added", course });

  } catch (error) {
    console.error("Add course error", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /api/courses
 * @desc Get all courses
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (error) {
    console.error("Fetch courses error", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /api/courses/my-courses
 * @desc Instructor’s own courses
 */
router.get("/my-courses", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const myCourses = await Course.find({ instructor: req.user.id }).populate("instructor", "username");
    res.json(myCourses);
  } catch (error) {
    console.error("Fetch my-courses error", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route DELETE /api/courses/delete-all
 * @desc Delete ALL courses (Instructor Only)
 */
router.delete("/delete-all", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    await Course.deleteMany({});
    res.json({ message: "All courses deleted successfully!" });
  } catch (error) {
    console.error("Delete-all error", error);
    res.status(500).json({ error: "Failed to delete courses" });
  }
});

export default router;



