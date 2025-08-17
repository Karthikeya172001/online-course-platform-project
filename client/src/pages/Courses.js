// client/src/pages/Courses.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error('❌ Error fetching courses:', err));
  }, []);

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
            <p>
              <b>Instructor:</b> {course.instructor?.username || course.instructor || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
  },
};

export default Courses;
