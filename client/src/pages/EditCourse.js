// client/src/pages/EditCourse.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    // ✅ Load existing course details
    API.get(`/courses/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/courses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Course updated successfully!");
      navigate('/courses');
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Error updating course");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Edit Course</h2>
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: 'auto',
  }
};

export default EditCourse;
