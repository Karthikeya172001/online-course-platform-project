// client/src/pages/EditCourse.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function EditCourse() {
  const { id } = useParams(); // ✅ course id from URL
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  // ✅ Load existing course details
  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => setForm({ title: res.data.title, description: res.data.description }))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put(`/courses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Course updated successfully!');
      navigate('/courses'); // redirect back to courses
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error updating course');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Edit Course</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Course Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
        required
      />
      <button type="submit">Update Course</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '500px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default EditCourse;
