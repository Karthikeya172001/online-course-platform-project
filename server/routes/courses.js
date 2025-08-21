const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const auth = require("../middleware/auth");

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add course (protected)
router.post("/", auth, async (req, res) => {
  const { title, description, instructor } = req.body;
  const newCourse = new Course({ title, description, instructor });
  await newCourse.save();
  res.json(newCourse);
});

// Update course
router.put("/:id", auth, async (req, res) => {
  const { title, description, instructor } = req.body;
  const updated = await Course.findByIdAndUpdate(req.params.id, { title, description, instructor }, { new: true });
  res.json(updated);
});

// Delete course
router.delete("/:id", auth, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ msg: "Course removed" });
});

module.exports = router;
