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
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Course added successfully!');
      setForm({ title: '', description: '' }); // clear form after submit
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="title" 
        value={form.title}
        placeholder="Course Title" 
        onChange={handleChange} 
        required 
      />
      <input 
        name="description" 
        value={form.description}
        placeholder="Description" 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
