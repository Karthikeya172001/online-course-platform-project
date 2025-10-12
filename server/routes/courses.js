import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to load courses" });
  }
});

// ✅ Add a new course (only instructors)
router.post("/", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title } = req.body;
    const course = new Course({
      title,
      instructor: req.user.id,
    });
    await course.save();
    res.status(201).json({ message: "✅ Course added successfully!", course });
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

// ✅ Enroll in a course (students only)
router.post("/:id/enroll", authenticate, authorizeRole("student"), async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.students.includes(userId)) {
      return res.status(400).json({ error: "Already enrolled" });
    }

    course.students.push(userId);
    await course.save();

    res.json({ message: "✅ Enrolled successfully!", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while enrolling" });
  }
});

// ✅ Get instructor’s own courses
router.get("/my-courses", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const myCourses = await Course.find({ instructor: req.user.id });
    res.json(myCourses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your courses" });
  }
});

// ✅ Get student’s enrolled courses
router.get("/enrolled", authenticate, authorizeRole("student"), async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id }).populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
});

export default router;


