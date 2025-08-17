// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const User = require('../models/User');

// ✅ Add a new course (Instructor only)
router.post('/', auth, async (req, res) => {
  try {
    // req.user.id comes from auth middleware (decoded JWT)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: 'Please provide title and description' });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: user._id, // 👈 store instructor by ID
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses (with instructor details)
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
