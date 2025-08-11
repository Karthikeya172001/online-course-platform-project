


import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const [formData, setFormData] = useState({ title: '', description: '', instructor: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/courses', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert('Course added successfully!');
        navigate('/courses');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="instructor" placeholder="Instructor" onChange={handleChange} />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
