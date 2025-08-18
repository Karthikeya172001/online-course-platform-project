import React, { useEffect, useState } from 'react';
import API from '../api';
import getRole from '../utils/getRole';
import jwtDecode from 'jwt-decode';

function Courses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');
  const role = getRole();
  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting course');
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
          {role === 'instructor' && course.instructor?._id === userId && (
            <button onClick={() => handleDelete(course._id)}>Delete</button>
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
  }
};

export default Courses;
