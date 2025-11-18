import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// --------------------------------------------------
// GET ALL COURSES (PUBLIC)
// --------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// --------------------------------------------------
// ADD NEW COURSE (INSTRUCTOR ONLY)
// --------------------------------------------------
router.post(
  "/add",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    const { title, description } = req.body;

    try {
      const newCourse = await Course.create({
        title,
        description,
        instructor: req.user.id,
      });

      res.json({ message: "Course added!", course: newCourse });
    } catch (err) {
      res.status(500).json({ error: "Failed to add course" });
    }
  }
);

// --------------------------------------------------
// ENROLL STUDENT INTO COURSE
// --------------------------------------------------
router.post("/enroll/:courseId", authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Prevent double enrollment
    if (course.studentsEnrolled.includes(req.user.id)) {
      return res.status(400).json({ error: "Already enrolled" });
    }

    course.studentsEnrolled.push(req.user.id);
    await course.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Enrollment failed" });
  }
});

// --------------------------------------------------
// GET COURSES OF LOGGED-IN INSTRUCTOR
// --------------------------------------------------
router.get(
  "/my-courses",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const myCourses = await Course.find({ instructor: req.user.id });
      res.json(myCourses);
    } catch (err) {
      res.status(500).json({ error: "Failed to load your courses" });
    }
  }
);


// GET only instructor's own courses
router.get("/my-courses", authenticate, async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId });

    res.json(courses);
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({ error: "Failed to load your courses" });
  }
});


export default router;



