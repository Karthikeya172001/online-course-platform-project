const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// ✅ Add course
router.post('/', async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newCourse = new Course({ title, description, price });
    await newCourse.save();
    res.status(201).json({ msg: 'Course created successfully' });
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
