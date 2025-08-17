// client/src/pages/Courses.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  // fetch courses on page load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><b>Instructor:</b> {course.instructor?.username || 'Unknown'}</p>
          </div>
        ))
      )}
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
