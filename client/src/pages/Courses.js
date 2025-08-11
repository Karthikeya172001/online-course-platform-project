
import React, { useEffect, useState } from 'react';
import API from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map((course, idx) => (
        <div key={idx}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
