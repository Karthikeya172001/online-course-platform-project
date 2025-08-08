
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse'; // ✅ import new page
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route
          path="/add-course"
          element={
            <PrivateRoute>
              <AddCourse /> {/* ✅ only logged-in users can access */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
