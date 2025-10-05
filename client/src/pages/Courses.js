import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No login token found");
          return;
        }

        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // 🧠 If backend returns an object instead of an array
        if (Array.isArray(res.data)) setCourses(res.data);
        else setCourses([]);
      } catch (err) {
        console.error("Error fetching courses:", err.response?.data || err);
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title} —{" "}
              {course.instructor?.username || "Unknown Instructor"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
