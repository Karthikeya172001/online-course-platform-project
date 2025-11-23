import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://online-course-platform-project-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/courses";
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

      <button>Login</button>
    </form>
  );
}

export default Login;

