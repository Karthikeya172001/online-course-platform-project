import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Just a simple working route */}
        <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>✅ It works! Online Course Platform is Live</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
