import React, { useState } from "react";
import api from "../services/api";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/courses", { title, description: desc });
      setMsg(res.data?.message || "Course added");
      setTitle(""); setDesc("");
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.error || "Failed to add course");
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={submit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required /><br />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required /><br />
        <button type="submit">Add Course</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
