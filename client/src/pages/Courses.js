const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Import

// ✅ Add course (protected for instructors only)
router.post(
  '/',
  authMiddleware,                 // ✅ Must be logged in
  authorizeRole('instructor'),    // ✅ Must be instructor
  async (req, res) => {
    try {
      const { title, description, instructor } = req.body;
      const newCourse = new Course({ title, description, instructor });
      await newCourse.save();
      res.status(201).json({ msg: 'Course created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// ✅ Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
