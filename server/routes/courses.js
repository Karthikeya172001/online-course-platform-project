const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

/** Create (instructor only) */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ msg: 'Please fill all fields' });

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'instructor')
      return res.status(403).json({ msg: 'Only instructors can add courses' });

    const course = new Course({
      title,
      description,
      instructor: req.user.id
    });

    await course.save();
    return res.status(201).json(course);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Server error' });
  }
});

/** Read all (public) */
router.get('/', async (_req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    return res.json(courses);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Server error' });
  }
});

/** Read single (public) */
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'username');
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    return res.json(course);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Server error' });
  }
});

/** Update (owner instructor only) */
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    if (course.instructor.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    course.title = req.body.title ?? course.title;
    course.description = req.body.description ?? course.description;

    await course.save();
    return res.json({ msg: 'Course updated successfully', course });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Server error' });
  }
});

/** Delete (owner instructor only) */
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    if (course.instructor.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    await course.deleteOne();
    return res.json({ msg: 'Course deleted successfully' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
