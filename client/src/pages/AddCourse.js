import React, { useState } from 'react';
import API from '../api';

function AddCourse() {
  const [form, setForm] = useState({ title: '', description: '', instructor: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/courses', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Course added successfully!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Course Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="instructor" placeholder="Instructor Name" onChange={handleChange} />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
