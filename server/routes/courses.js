// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth'); // ✅ middleware to verify token
const User = require('../models/User');

// ✅ Add Course (Instructor only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    // get logged in user
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    // ✅ Automatically attach instructor name
    const newCourse = new Course({
      title,
      description,
      instructor: user.username, 
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
