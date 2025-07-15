import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to Online Course Platform</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
