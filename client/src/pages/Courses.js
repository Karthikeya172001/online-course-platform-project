import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../services/api";
import getRole from "../utils/getRole";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const role = getRole();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/courses`).then(res => setCourses(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/courses/add`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Course added!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add course");
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(c => (
          <li key={c._id}>{c.title} - {c.instructor?.username}</li>
        ))}
      </ul>

      {role === "instructor" && (
        <form onSubmit={handleAddCourse}>
          <input name="title" placeholder="Course title" onChange={handleChange} />
          <input name="description" placeholder="Description" onChange={handleChange} />
          <button type="submit">Add Course</button>
        </form>
      )}
    </div>
  );
}

export default Courses;
