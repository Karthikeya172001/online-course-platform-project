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
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setCourses([]);
          setError("Invalid data format from server.");
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(courses) && courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title} – {course.instructor?.username || "Unknown"}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No courses available</p>
      )}
    </div>
  );
}

export default Courses;
