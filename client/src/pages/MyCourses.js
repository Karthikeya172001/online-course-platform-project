



import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses/my-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load your courses");
      }
    };

    fetchMyCourses();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2>My Courses</h2>

      {error && <p style={styles.error}>{error}</p>}

      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.item}>
              <strong>{course.title}</strong>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  error: {
    color: "red",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    padding: "10px",
    background: "#eee",
    marginBottom: "10px",
    borderRadius: "5px",
  },
};

export default MyCourses;