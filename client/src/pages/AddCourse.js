import React, { useState } from "react";
import axios from "axios";
import getRole from "../utils/getRole";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const role = getRole();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "instructor") {
      setMessage("❌ Only instructors can add courses.");
      return;
    }

    try {
      const res = await axios.post(
        "https://online-course-platform-project-backend.onrender.com/api/courses/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data && res.data._id) {
        setMessage("✅ Course added successfully!");
        setTitle("");
        setDescription("");
      } else {
        setMessage("❌ Failed to add course. Try again.");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      setMessage("❌ Failed to add course.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Course</h2>

      {role !== "instructor" ? (
        <p>⚠️ You must be logged in as an instructor to add a course.</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Add Course
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    width: "300px",
    height: "100px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddCourse;
