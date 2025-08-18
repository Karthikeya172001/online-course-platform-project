// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse'; // ✅ new
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

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
              <AddCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-course/:id"
          element={
            <PrivateRoute>
              <EditCourse />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
