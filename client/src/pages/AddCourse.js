import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to view courses.");
        return;
      }

      try {
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ensure we got an array
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (res.data.courses && Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
        } else {
          setMessage("No courses available");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setMessage("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Courses</h2>

      {message && <p>{message}</p>}

      {courses.length > 0 ? (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.item}>
              <strong>{course.title}</strong> —{" "}
              {course.instructor ? course.instructor.username : "Unknown"}
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        !message && <p>No courses available.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#f9f9f9",
    margin: "10px auto",
    padding: "10px",
    maxWidth: "400px",
    borderRadius: "6px",
    textAlign: "left",
  },
};

export default Courses;
