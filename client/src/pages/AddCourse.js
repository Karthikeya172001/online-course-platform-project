// client/src/pages/AddCourse.js
import React, { useState } from 'react';
import API from '../api';

function AddCourse() {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/courses', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Course added successfully!');
      setForm({ title: '', description: '' }); // reset form
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
