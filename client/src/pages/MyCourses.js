import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    axios
      .get("https://online-course-platform-project-backend.onrender.com/api/courses/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data))
      .catch(() => setError("Failed to load courses"));
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {courses.length === 0 ? (
        <p>No courses yet</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c._id}>{c.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCourses;
