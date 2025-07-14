import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://online-course-platform-project.onrender.com/register', {
        name,
        email,
        password
      });
      alert('Registered: ' + res.data.message);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
