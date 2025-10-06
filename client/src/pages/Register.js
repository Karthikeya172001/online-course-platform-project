import React, { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "student" });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMsg(res.data.message || "Registered. Please login.");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handle} required /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handle} required /><br />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} required /><br />
        <select name="role" value={form.role} onChange={handle}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
