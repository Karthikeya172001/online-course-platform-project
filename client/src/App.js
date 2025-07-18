import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Courses from './pages/Courses'; // ✅ import Courses

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/courses" element={<Courses />} /> {/* ✅ new route */}
      </Routes>
    </Router>
  );
}

export default App;
