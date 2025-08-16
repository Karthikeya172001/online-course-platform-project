// client/src/pages/AddCourse.js
import React, { useState } from 'react';
import API from '../api';

function AddCourse() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    instructor: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/courses', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Course added successfully!');
      setForm({ title: '', description: '', instructor: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="instructor"
        placeholder="Instructor Name"
        value={form.instructor}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
