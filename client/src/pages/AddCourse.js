import React, { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://online-course-platform-project-backend.onrender.com/api/courses",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Course added successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Failed to add course.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Course</h2>
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
