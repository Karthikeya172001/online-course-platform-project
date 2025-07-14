import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('https://your-backend-api.com/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map((course, index) => (
        <div key={index} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <strong>Instructor: {course.instructor}</strong>
        </div>
      ))}
    </div>
  );
}

export default Courses;
