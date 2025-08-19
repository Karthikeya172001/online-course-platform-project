const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// ✅ Delete a course (only instructor who created it)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Only the course creator can delete
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

// ✅ Update a course
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Only the course creator can edit
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    if (title) course.title = title;
    if (description) course.description = description;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
