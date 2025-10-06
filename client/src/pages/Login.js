import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setErr("");
        nav("/courses");
      } else {
        setErr("No token received");
      }
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handle} required /><br />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
