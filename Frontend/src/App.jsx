// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectInside from './pages/ProjectInside';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project-inside" element={<ProjectInside />} />
      </Routes>
    </Router>
  );
}

export default App;
