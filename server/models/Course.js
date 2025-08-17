// server/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, // 👈 links to User collection
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);

