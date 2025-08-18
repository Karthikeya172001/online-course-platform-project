// client/src/pages/Courses.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import getRole from '../utils/getRole';

function Courses() {
  const [courses, setCourses] = useState([]);
  const role = getRole();

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.map((course) => (
        <div key={course._id} style={styles.card}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><b>Instructor:</b> {course.instructor?.username || 'Unknown'}</p>

          {/* ✅ Only instructors see the Edit button */}
          {role === 'instructor' && (
            <Link to={`/edit-course/${course._id}`} style={styles.editBtn}>
              ✏️ Edit
            </Link>
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
  editBtn: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '3px',
  }
};

export default Courses;
