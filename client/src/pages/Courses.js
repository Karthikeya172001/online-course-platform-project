import React, { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://online-course-platform-project-backend.onrender.com/api/courses")
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c._id}>
              {c.title} — {c.instructor?.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;

