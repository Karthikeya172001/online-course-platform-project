const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');

// ✅ Add course (only instructors)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    // ensure only instructors can add
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id // auto-attach instructor
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses with instructor info
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username email'); 
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
