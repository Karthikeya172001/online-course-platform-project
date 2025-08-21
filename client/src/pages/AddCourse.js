import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, instructor }),
    });

    navigate("/courses"); // go back to courses page after adding
  };

  return (
    <div>
      <h2>Add New Course</h2>
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
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Instructor Name"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
