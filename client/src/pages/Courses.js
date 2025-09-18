import React, { useEffect, useState } from "react";
import api from "../services/api";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = getRole();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses"); // ✅ backend always returns array
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses/add", form);
      alert("Course added");

      // ✅ Refresh course list
      const res = await api.get("/courses");
      setCourses(res.data);

      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Add course error:", err);
      alert(err.response?.data?.error || "Failed to add course");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>

      {loading && <p>Loading courses…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && courses.length === 0 && !error && <p>No courses found.</p>}

      <ul>
        {courses.map((c) => (
          <li key={c._id || c.id}>
            {c.title} — {c.instructor?.username || "Unknown"}
          </li>
        ))}
      </ul>

      {role === "instructor" && (
        <form onSubmit={handleAddCourse} style={{ marginTop: 20 }}>
          <h3>Add Course</h3>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Add Course</button>
        </form>
      )}
    </div>
  );
}

export default Courses;
