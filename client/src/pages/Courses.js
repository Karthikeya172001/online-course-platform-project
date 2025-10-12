import React, { useEffect, useState } from "react";
import axios from "axios";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const role = getRole();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      let url = "https://online-course-platform-project-backend.onrender.com/api/courses";

      // ✅ If instructor → show only their courses
      if (role === "instructor") {
        url = `${url}/my-courses`;
      } else if (role === "student") {
        url = `${url}/enrolled`;
      }

      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(Array.isArray(data) ? data : []);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enroll button for students
  const handleEnroll = async (courseId) => {
    try {
      const { data } = await axios.post(
        `https://online-course-platform-project-backend.onrender.com/api/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(data.message);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to enroll");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.item}>
              <span>
                {course.title} —{" "}
                {course.instructor ? course.instructor.username : "Unknown"}
              </span>
              {role === "student" && (
                <button
                  onClick={() => handleEnroll(course._id)}
                  style={styles.button}
                >
                  Enroll
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
  list: { listStyle: "none", padding: 0 },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px auto",
    maxWidth: "400px",
    borderRadius: "5px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Courses;
    
    
    
