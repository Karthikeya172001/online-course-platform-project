// client/src/pages/Courses.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import getRole from "../utils/getRole";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = getRole();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        // api.baseURL already ends with /api in our setup, so use '/courses'
        const res = await api.get("/courses");
        console.log("GET /courses response:", res.data);

        const data = res.data;

        // Accept multiple shapes: plain array, { courses: [...] }, { data: [...] }
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else if (Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          // If not an array, show the object so you can debug what's being returned
          setCourses([]);
          setError(
            "Unexpected response shape from API. See console for details. Response: " +
              JSON.stringify(data)
          );
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        // If axios error, try to get meaningful message:
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch courses";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]); // refetch if token changes

  const [form, setForm] = useState({ title: "", description: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses/add", form); // auth header is added by api interceptor
      alert("Course added");
      // refresh list
      const res = await api.get("/courses");
      const data = res.data;
      setCourses(Array.isArray(data) ? data : data.courses ?? []);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Add course error:", err);
      alert(err.response?.data?.error || err.message || "Failed to add course");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Courses</h2>

      {loading && <p>Loading courses…</p>}

      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && courses.length === 0 && !error && <p>No courses found.</p>}

      <ul>
        {Array.isArray(courses) &&
          courses.map((c) => (
            <li key={c._id || c.id}>
              {c.title} — {c.instructor?.username ?? c.instructor?.name ?? "Unknown"}
            </li>
          ))}
      </ul>

      {role === "instructor" && (
        <form onSubmit={handleAddCourse} style={{ marginTop: 20 }}>
          <h3>Add course</h3>
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
