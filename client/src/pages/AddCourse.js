// client/src/pages/AddCourse.js
import React, { useState } from "react";
import api from "../services/api";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/courses", { title, description });
      setMessage(`✅ Course created: ${res.data.title}`);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create course");
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddCourse;
