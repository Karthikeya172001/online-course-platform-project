import express from "express";
import { authenticate, authorizeRole } from "../middleware/auth.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// POST /api/enroll/:courseId
router.post("/:courseId", authenticate, authorizeRole("student"), async (req, res) => {
  try {
    const { courseId } = req.params;
    const existing = await Enrollment.findOne({ user: req.user.id, course: courseId });
    if (existing) return res.status(400).json({ error: "Already enrolled" });

    const enrollment = new Enrollment({
      user: req.user.id,
      course: courseId,
    });
    await enrollment.save();
    res.json({ message: "Enrollment successful!" });
  } catch (err) {
    res.status(500).json({ error: "Enrollment failed" });
  }
});

export default router;
