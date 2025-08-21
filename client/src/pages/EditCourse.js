import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const navigate = useNavigate();

  // fetch existing course details
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setInstructor(data.instructor);
      })
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, instructor }),
    });

    navigate("/courses"); // go back to courses page
  };

  return (
    <div>
      <h2>Edit Course</h2>
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
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default EditCourse;
