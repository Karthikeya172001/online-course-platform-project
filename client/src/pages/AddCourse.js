import React, { useState } from "react";

function AddCourse() {
  const [form, setForm] = useState({ title: "", description: "" });

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://online-course-platform-project-backend.onrender.com/api/courses/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) alert("Course added!");
    else alert("❌ Failed to add course");
  };

  return (
    <form onSubmit={submit}>
      <h2>Add Course</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button>Add Course</button>
    </form>
  );
}

export default AddCourse;


