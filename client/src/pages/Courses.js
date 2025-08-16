import React, { useEffect, useState } from 'react';
import API from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><b>Instructor:</b> {course.instructor}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
