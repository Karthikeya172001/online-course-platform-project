// client/src/pages/AddCourse.js
import React, { useState } from 'react';
import API from '../api';

function AddCourse({ onCourseAdded }) {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/courses', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Course added successfully!');

      // 🔑 instantly update parent (Courses.js)
      if (onCourseAdded) {
        onCourseAdded(res.data);
      }

      // clear form
      setForm({ title: '', description: '' });

    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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
      <button type="submit">Add Course</button>
    </form>
  );
}

const styles = {
  form: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default AddCourse;
