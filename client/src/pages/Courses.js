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
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (Array.isArray(res.data)) setCourses(res.data);
        else setCourses([]);
      } catch (err) {
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c._id}>
              {c.title} - {c.instructor?.username || "Instructor"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;
