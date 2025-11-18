import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/my-courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCourses(res.data);
      } catch (err) {
        setError("Failed to load your courses");
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2>My Courses</h2>

      {error && <p style={styles.error}>{error}</p>}

      {courses.length === 0 ? (
        <p>No courses created by you.</p>
      ) : (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  list: { listStyle: "none", padding: 0 },
  courseCard: {
    background: "#f2f2f2",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  error: { color: "red" },
};

export default MyCourses;



