import React, { useEffect, useState } from 'react';
import api from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        alert('Error loading courses');
      }
    }

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map(course => (
          <div key={course._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Courses;
