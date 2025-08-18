const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// ✅ Add a new course (already done)
router.post('/', auth, async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      description: req.body.description,
      instructor: req.user.id  // store instructor ID
    });
    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Delete a course (only the creator can delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await course.deleteOne();
    res.json({ msg: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Edit a course (only the creator can edit)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
