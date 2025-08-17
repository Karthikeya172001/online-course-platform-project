// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const User = require('../models/User');

// ✅ Add course (only for instructors)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    // find instructor from JWT user.id
    const instructor = await User.findById(req.user.id).select('username role');
    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }

    if (instructor.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    // ✅ Save course with instructor info
    const newCourse = new Course({
      title,
      description,
      instructor: {
        id: instructor._id,
        username: instructor.username
      }
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses
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
