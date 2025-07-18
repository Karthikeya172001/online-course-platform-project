import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructor: '',
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://online-course-api-m8p7.onrender.com/api/courses', course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Course added successfully!');
      setCourse({ title: '', description: '', instructor: '' }); // ✅ clear fields
    } catch (err) {
      alert('❌ Failed to add course');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={course.title} onChange={handleChange} required /><br />
        <input name="description" placeholder="Description" value={course.description} onChange={handleChange} required /><br />
        <input name="instructor" placeholder="Instructor" value={course.instructor} onChange={handleChange} required /><br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
