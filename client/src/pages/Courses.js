// client/src/pages/Courses.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          return;
        }

        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Defensive check
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          setCourses([]);
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title} — {course.instructor?.username || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;
