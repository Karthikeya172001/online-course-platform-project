
  import React, { useEffect, useState } from 'react';
import api from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('https://online-course-platform-project-backend.onrender.com/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Available Courses</h2>
      {courses.map((course, index) => (
        <div key={index}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <small>Instructor: {course.instructor}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Courses;
