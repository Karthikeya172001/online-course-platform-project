import React, { useEffect, useState } from "react";
import axios from "axios";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const { data } = await axios.get(
        "https://online-course-platform-project-backend.onrender.com/api/courses/enrolled",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🎓 My Enrolled Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : courses.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.item}>
              <strong>{course.title}</strong> —{" "}
              {course.instructor?.username || "Unknown Instructor"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  list: { listStyle: "none", padding: 0 },
  item: {
    background: "#f7f7f7",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "5px",
    maxWidth: "400px",
  },
};

export default EnrolledCourses;
