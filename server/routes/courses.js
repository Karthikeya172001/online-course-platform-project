// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const User = require('../models/User');

// ✅ Add a new course (Instructor only)
router.post('/', auth, async (req, res) => {
  try {
    // logged-in user from JWT
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: user._id  // ✅ auto attach instructor
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses (with instructor usernames)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
