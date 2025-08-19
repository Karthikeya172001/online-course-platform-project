import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import getRole from '../utils/getRole';  // ✅ to check role

function Courses() {
  const [courses, setCourses] = useState([]);
  const role = getRole(); // ✅ get user role from JWT

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

          {/* ✅ Show Edit button only if logged in as instructor */}
          {role === 'instructor' && (
            <Link to={`/edit-course/${course._id}`} style={styles.editBtn}>
              Edit
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
    padding: '5px 10px',
    background: 'blue',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '3px',
    marginTop: '10px',
  }
};

export default Courses;
