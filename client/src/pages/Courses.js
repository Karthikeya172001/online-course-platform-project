import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || "https://online-course-platform-project-backend.onrender.com"}/api/courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((c) => (
            <li key={c._id}>
              {c.title} – {c.instructor?.username || "Unknown Instructor"}
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
}

export default Courses;
