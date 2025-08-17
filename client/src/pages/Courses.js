import React, { useEffect, useState } from 'react';
import API from '../api';
import getRole from '../utils/getRole';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const role = getRole();
  const token = localStorage.getItem('token');

  // Load courses
  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add course (only for instructors)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Course added successfully!');
      setForm({ title: '', description: '' });
      // Reload courses
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error adding course');
    }
  };

  return (
    <div>
      <h1>Available Courses</h1>

      {/* Instructor-only form */}
      {role === 'instructor' && (
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
      )}

      {/* Show all courses */}
      {courses.map((course) => (
        <div key={course._id} style={styles.card}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><b>Instructor:</b> {course.instructor?.username || 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    maxWidth: '400px'
  }
};

export default Courses;
