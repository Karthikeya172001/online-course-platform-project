import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
