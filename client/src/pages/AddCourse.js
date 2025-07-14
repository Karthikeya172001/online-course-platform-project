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
      await axios.post('https://your-backend-api.com/api/courses/add', course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Course added successfully!');
    } catch (err) {
      alert('Failed to add course');
    }
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="instructor" placeholder="Instructor" onChange={handleChange} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
