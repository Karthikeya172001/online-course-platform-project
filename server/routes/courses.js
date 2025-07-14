const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Add a new course
router.post('/add', async (req, res) => {
  const { title, description, instructor } = req.body;
  const newCourse = new Course({ title, description, instructor });
  await newCourse.save();
  res.status(201).send('Course added');
});

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

module.exports = router;
