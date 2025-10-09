import React, { useEffect, useState } from "react";
import axios from "axios";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = getRole();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (res.data.courses && Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.title} – {course?.instructor?.username || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
};

export default Courses;
