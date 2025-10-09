import React, { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in as an instructor.");
      return;
    }

    try {
      const res = await axios.post(
        "https://online-course-platform-project-backend.onrender.com/api/courses/add",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201) {
        setMessage("✅ Course added successfully!");
        setTitle("");
        setDescription("");
      } else {
        setMessage("❌ Failed to add course");
      }
    } catch (error) {
      setMessage("❌ Failed to add course");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "0 auto",
  },
};

export default AddCourse;
