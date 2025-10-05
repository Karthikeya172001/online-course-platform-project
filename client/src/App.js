import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
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
              <PrivateRoute role="instructor">
                <AddCourse />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
