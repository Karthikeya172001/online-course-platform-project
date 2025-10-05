// client/src/pages/Courses.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        console.log("DEBUG /courses response:", res.status, res.data);
        const d = res.data;
        if (Array.isArray(d)) setCourses(d);
        else if (Array.isArray(d.courses)) setCourses(d.courses);
        else {
          setCourses([]);
          setError("Unexpected server response (see console).");
          console.warn("Unexpected /courses shape:", d);
        }
      } catch (err) {
        console.error("Fetch /courses error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load courses");
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Courses</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {courses.length === 0 ? <p>No courses available</p> : (
        <ul>{courses.map(c => <li key={c._id || c.id}>{c.title} — {c.instructor?.username || "Unknown"}</li>)}</ul>
      )}
    </div>
  );
}
