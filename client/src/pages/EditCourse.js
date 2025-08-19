import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function EditCourse() {
  const { id } = useParams(); // ✅ get course ID from URL
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  // ✅ Load course details when page opens
  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => setForm(res.data))
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
      navigate('/courses'); // go back to course list
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error updating course');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Edit Course</h1>
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
      <button type="submit">Update Course</button>
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
  },
};

export default EditCourse;
