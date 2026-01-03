
import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/courses
 * Get ALL courses (for Courses page)
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "username email");

    res.json(courses);
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ error: "Failed to load courses" });
  }
});

/**
 * POST /api/courses/add
 * Add course (INSTRUCTOR ONLY)
 */
router.post(
  "/add",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const course = await Course.create({
        title,
        instructor: req.user.id,
      });

      res.json({ message: "Course added successfully", course });
    } catch (err) {
      console.error("Add course error:", err);
      res.status(500).json({ error: "Failed to add course" });
    }
  }
);

/**
 * GET /api/courses/my
 * Get ONLY logged-in instructor’s courses (My Courses page)
 */
router.get(
  "/my",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const myCourses = await Course.find({
        instructor: req.user.id,
      }).populate("instructor", "username email");

      res.json(myCourses);
    } catch (err) {
      console.error("My courses error:", err);
      res.status(500).json({ error: "Failed to load courses" });
    }
  }
);

/**
 * DELETE /api/courses/delete-all
 * TEMP cleanup route (Instructor only)
 */
router.delete(
  "/delete-all",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      await Course.deleteMany({});
      res.json({ message: "All courses deleted successfully" });
    } catch (err) {
      console.error("Delete all error:", err);
      res.status(500).json({ error: "Failed to delete courses" });
    }
  }
);

export default router;


