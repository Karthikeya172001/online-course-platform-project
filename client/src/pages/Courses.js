import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import getRole from '../utils/getRole';

function Courses() {
  const [courses, setCourses] = useState([]);
  const role = getRole();
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await API.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter((c) => c._id !== id));
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

          {role === 'instructor' && (
            <>
              <Link to={`/edit-course/${course._id}`} style={styles.edit}>✏️ Edit</Link>
              <button onClick={() => handleDelete(course._id)} style={styles.delete}>🗑 Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: { border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' },
  edit: { marginRight: '10px', color: 'blue', textDecoration: 'none' },
  delete: { background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }
};

export default Courses;
