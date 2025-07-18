import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; // ✅ Import Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Add Navbar */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
