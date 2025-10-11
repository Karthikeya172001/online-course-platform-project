import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses/my",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Error loading instructor courses:", err);
        setError("Failed to load your courses");
      }
    };
    fetchMyCourses();
  }, []);

  if (error) return <p>{error}</p>;
  if (courses.length === 0) return <p>No courses found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 My Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> – {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyCourses;
