import express from "express";
import Course from "../models/Course.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to load courses" });
  }
});

router.post(
  "/add",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const { title, description } = req.body;

      const course = await Course.create({
        title,
        description,
        instructor: req.user.id,
      });

      res.json({ message: "Course added", course });
    } catch (err) {
      res.status(500).json({ error: "Failed to add course" });
    }
  }
);

router.get(
  "/mine",
  authenticate,
  authorizeRole("instructor"),
  async (req, res) => {
    try {
      const courses = await Course.find({ instructor: req.user.id });
      res.json(courses);
    } catch {
      res.status(500).json({ error: "Failed to load your courses" });
    }
  }
);

export default router;



