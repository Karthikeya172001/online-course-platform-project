// client/src/pages/Courses.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import getRole from '../utils/getRole';

function Courses() {
  const [courses, setCourses] = useState([]);
  const role = getRole(); // ✅ check if instructor

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter(course => course._id !== id));
      alert('✅ Course deleted');
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error deleting course');
    }
  };

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.map((course) => (
        <div key={course._id} style={styles.card}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><b>Instructor:</b> {course.instructor?.username || 'Unknown'}</p>

          {/* ✅ Only instructors see Edit/Delete */}
          {role === 'instructor' && (
            <div style={styles.actions}>
              <Link to={`/edit-course/${course._id}`} style={styles.editBtn}>✏️ Edit</Link>
              <button onClick={() => handleDelete(course._id)} style={styles.deleteBtn}>🗑️ Delete</button>
            </div>
          )}
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
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px'
  },
  editBtn: {
    padding: '5px 10px',
    background: '#007bff',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none'
  },
  deleteBtn: {
    padding: '5px 10px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Courses;
