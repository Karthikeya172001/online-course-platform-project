import React, { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  // Fetch all courses from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Delete a course
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter((course) => course._id !== id)); // update UI instantly
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map((course) => (
        <div
          key={course._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Instructor: {course.instructor || "Unknown"}</p>
          <button>✏️ Edit</button>
          <button onClick={() => handleDelete(course._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Courses;



