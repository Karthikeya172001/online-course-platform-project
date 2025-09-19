import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token in Courses.js:", token); // ✅ Debug
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Courses response:", res.data); // ✅ Debug
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching courses:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            {c.title} – {c.instructor?.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
