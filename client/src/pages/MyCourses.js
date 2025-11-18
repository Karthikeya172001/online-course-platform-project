import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE}/api/courses/my-courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data.courses || []);
      } catch (err) {
        setError("Failed to load your courses");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [API_BASE]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <p>No courses yet.</p>
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
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#eee",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
};

export default MyCourses;


