import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
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
              <PrivateRoute role="instructor">
                <AddCourse />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-courses"
            element={
              <PrivateRoute role="instructor">
                <MyCourses />
              </PrivateRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

