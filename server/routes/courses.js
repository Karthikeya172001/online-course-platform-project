// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// ✅ Add new course (instructor auto-filled from JWT)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id // 👈 taken from JWT (logged-in instructor)
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses with instructor name
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
