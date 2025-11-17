import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// -------------------------
// GET ALL COURSES (PUBLIC)
// -------------------------
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------
// ADD COURSE (INSTRUCTOR ONLY)
// -------------------------
router.post(
  "/add",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    const { title, description } = req.body;

    try {
      const course = new Course({
        title,
        description,
        instructor: req.user.id,
      });

      await course.save();

      res.json({ message: "Course added successfully", course });
    } catch (error) {
      console.error("Error adding course:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// -------------------------
// ENROLL IN A COURSE (STUDENT)
// -------------------------
router.post(
  "/enroll/:courseId",
  authenticate,
  authorizeRole("student"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // If student already enrolled
      if (course.studentsEnrolled.includes(req.user.id)) {
        return res.json({ message: "Already enrolled" });
      }

      course.studentsEnrolled.push(req.user.id);
      await course.save();

      res.json({ message: "Enrolled successfully" });
    } catch (error) {
      console.error("Error enrolling:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// -------------------------
// GET COURSES OF LOGGED-IN INSTRUCTOR
// -------------------------
router.get(
  "/instructor/my-courses",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const courses = await Course.find({ instructor: req.user.id });
      res.json(courses);
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// -------------------------
// GET COURSES ENROLLED BY STUDENT
// -------------------------
router.get(
  "/my-enrolled",
  authenticate,
  authorizeRole("student"),
  async (req, res) => {
    try {
      const courses = await Course.find({
        studentsEnrolled: req.user.id,
      }).populate("instructor", "username");

      res.json(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;


