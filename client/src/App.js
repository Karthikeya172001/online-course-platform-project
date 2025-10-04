import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
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
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
