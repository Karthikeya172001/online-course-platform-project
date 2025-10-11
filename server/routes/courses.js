import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses (Public or Authenticated)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username email");
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a new course (Instructor only)
router.post("/add", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id,
    });

    await newCourse.save();
    res.status(201).json({ message: "✅ Course created successfully", course: newCourse });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
});

// ✅ My Courses (Instructor’s own)
router.get("/my-courses", authenticate, authorizeRole("instructor"), async (req, res) => {
  try {
    const myCourses = await Course.find({ instructor: req.user.id });
    res.json(myCourses);
  } catch (err) {
    console.error("Error fetching instructor courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Enroll in a course (Student only)
router.post("/enroll", authenticate, authorizeRole("student"), async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: "Course ID is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Avoid duplicate enrollment
    if (course.students && course.students.includes(req.user.id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Add student to course
    course.students = course.students || [];
    course.students.push(req.user.id);
    await course.save();

    res.json({ message: "✅ Enrolled successfully", course });
  } catch (err) {
    console.error("Error enrolling student:", err);
    res.status(500).json({ error: "Enrollment failed" });
  }
});

export default router;
