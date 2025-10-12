import React, { useEffect, useState } from "react";
import axios from "axios";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const role = getRole();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://online-course-platform-project-backend.onrender.com/api/courses",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load courses");
      }
    };
    fetchCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    try {
      const res = await axios.post(
        `https://online-course-platform-project-backend.onrender.com/api/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Enrolled successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to enroll.");
    }
  };

  const myCourses = role === "instructor"
    ? courses.filter(c => c.instructor?._id === getRole("id"))
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>
      {message && <p>{message}</p>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id} style={{ marginBottom: "10px" }}>
              <strong>{course.title}</strong> —{" "}
              {course.instructor?.username || "Unknown Instructor"}
              {role === "student" && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {role === "instructor" && (
        <>
          <h3>My Courses</h3>
          {myCourses.length === 0 ? (
            <p>You haven’t added any courses yet.</p>
          ) : (
            <ul>
              {myCourses.map((c) => (
                <li key={c._id}>{c.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Courses;
