import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => {
        setForm({ title: res.data.title, description: res.data.description });
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.msg || '❌ Error fetching course');
      });
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
      navigate('/courses');
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error updating course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Course</h1>
      <input name="title" value={form.title} onChange={handleChange} required />
      <input name="description" value={form.description} onChange={handleChange} required />
      <button type="submit">Update Course</button>
    </form>
  );
}

export default EditCourse;
