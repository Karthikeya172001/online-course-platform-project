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
          setError("Please login to view courses.");
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
          setCourses([]);
          setError("No courses available.");
        }
      } catch (err) {
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title}{" "}
              {course.instructor && `- ${course.instructor.username}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
};

export default Courses;
