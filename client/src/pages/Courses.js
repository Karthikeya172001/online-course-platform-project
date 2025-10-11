import React, { useEffect, useState } from "react";
import axios from "axios";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const role = getRole();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://online-course-platform-project-backend.onrender.com/api/courses/enroll",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Enrolled successfully!");
    } catch (err) {
      console.error("❌ Enrollment failed:", err);
      alert("Failed to enroll.");
    }
  };

  if (error) return <p>{error}</p>;
  if (courses.length === 0) return <p>No courses available.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> – {c.description}
            {role === "student" && (
              <button
                onClick={() => handleEnroll(c._id)}
                style={{ marginLeft: 10 }}
              >
                Enroll
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
