import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);  // ✅ always starts as array
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // ✅ Normalize data: handle array OR object
        const data = res.data;
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]); // fallback
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title} – {course.instructor?.username || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;
