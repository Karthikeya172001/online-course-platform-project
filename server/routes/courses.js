// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const User = require('../models/User');

// ✅ Add new course (Instructor only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'instructor') {
      return res.status(403).json({ msg: 'Only instructors can add courses' });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id
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
    const courses = await Course.find().populate('instructor', 'username');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'username');
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// ✅ Update a course (Instructor only, must own it)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    await course.save();
    res.json({ msg: 'Course updated successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Delete a course (Instructor only, must own it)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await course.deleteOne();
    res.json({ msg: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
