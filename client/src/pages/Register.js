import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://online-course-platform-project-backend.onrender.com/api/auth/register",
        { name, email, password, role }
      );

      if (res.data.message === "User registered successfully") {
        setMessage("✅ Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(res.data.message || "❌ Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={role === "instructor"}
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            Instructor
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    width: "250px",
    padding: "8px",
    fontSize: "16px",
  },
  radioGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  button: {
    width: "150px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
