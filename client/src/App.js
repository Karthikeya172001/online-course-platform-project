import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Guest Pages */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Logged-in Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />

        {/* Instructor Only */}
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
}

export default App;


