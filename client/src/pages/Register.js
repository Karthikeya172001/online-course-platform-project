import React, { useState } from 'react';
import API from '../api';

function Register() {
  const [form, setForm] = useState({
    username: '',   // <-- use username
    email: '',
    password: '',
    role: 'student'
  });
  const [message, setMessage] = useState(null); // for inline messages

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await API.post('/auth/register', form);
      setMessage({ type: 'success', text: res.data.msg || 'User registered successfully!' });
      setForm({ username: '', email: '', password: '', role: 'student' }); // clear
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.msg || 'Error registering' });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Register</h2>

      {message && (
        <div style={{
          margin: '10px auto',
          padding: '8px 12px',
          width: 'fit-content',
          borderRadius: 6,
          color: message.type === 'error' ? '#7a0000' : '#003300',
          background: message.type === 'error' ? '#ffdede' : '#e6ffed'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
        /><br /><br />

        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
        /><br /><br />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
