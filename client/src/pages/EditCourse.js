import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function EditCourse() {
  const { id } = useParams(); // get course id from URL
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  // ✅ Fetch existing course details
  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => {
        setForm({ title: res.data.title, description: res.data.description });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <form onSubmit={handleSubmit}>
      <h2>Edit Course</h2>
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditCourse;
