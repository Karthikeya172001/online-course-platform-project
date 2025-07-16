
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// ✅ Add new course
router.post('/', async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ msg: 'Please provide title, description, and instructor' });
    }

    const newCourse = new Course({ title, description, instructor });
    await newCourse.save();

    res.status(201).json({ msg: 'Course created successfully' });
  } catch (err) {
    console.error("❌ Error creating course:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("❌ Error fetching courses:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
