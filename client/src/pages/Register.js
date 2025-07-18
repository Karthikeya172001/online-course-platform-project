// client/src/pages/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import api from '../api';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // ✅ useNavigate

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    await api.post('/auth/register', formData);
    alert('User registered successfully!');
    setFormData({ username: '', email: '', password: '' }); // ✅ Clear fields
  } catch (err) {
    alert(err.response?.data?.msg || 'Registration failed');
  }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
