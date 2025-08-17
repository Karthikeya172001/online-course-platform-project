// server/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String }
  }
});

module.exports = mongoose.model('Course', CourseSchema);
