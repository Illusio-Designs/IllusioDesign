// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectInside from './pages/ProjectInside';
import BlogInside from './pages/BlogInside';  
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project-inside/:title" element={<ProjectInside />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-inside/:title" element={<BlogInside />} />
      </Routes>
    </Router>
  );
}

export default App;
