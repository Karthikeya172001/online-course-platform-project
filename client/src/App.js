import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected: any logged-in user */}
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />

        {/* Protected: instructors only */}
        <Route
          path="/add-course"
          element={
            <PrivateRoute role="instructor">
              <AddCourse />
            </PrivateRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
