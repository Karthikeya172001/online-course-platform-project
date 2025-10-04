// client/src/pages/Courses.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

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

        const res = await api.get("/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data || []);
      } catch (err) {
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
        {courses.length > 0 ? (
          courses.map((c) => (
            <li key={c._id}>
              {c.title} - {c.instructor?.username || "Unknown"}
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
