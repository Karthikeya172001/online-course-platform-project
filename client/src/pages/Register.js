import React, { useState } from 'react';
import API from '../api';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('User registered successfully!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
