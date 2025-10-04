import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );
      setMessage(res.data.message || "Registration successful! You can now login.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button type="submit">Register</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default Register;
