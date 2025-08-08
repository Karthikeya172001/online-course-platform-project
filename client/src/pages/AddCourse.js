
  import React, { useState } from 'react';
import api from '../api'; // ✅ uses your axios instance
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate = useNavigate();
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
      if (!token) {
        alert('Please log in first');
        return navigate('/login');
      }

      await api.post('/courses', course, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Course added successfully!');
      setCourse({ title: '', description: '', instructor: '' }); // clear fields
      navigate('/courses'); // go back to courses page
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to add course');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={course.title}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="description"
          placeholder="Description"
          value={course.description}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="instructor"
          placeholder="Instructor"
          value={course.instructor}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
