import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/courses");
        // normalize
        if (Array.isArray(res.data)) setCourses(res.data);
        else if (Array.isArray(res.data.courses)) setCourses(res.data.courses);
        else setCourses([]);
      } catch (err) {
        console.error("Courses fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load courses");
      }
    })();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>{courses.map(c => <li key={c._id || c.id}>{c.title} — {c.instructor?.username || "Unknown"}</li>)}</ul>
      )}
    </div>
  );
}
