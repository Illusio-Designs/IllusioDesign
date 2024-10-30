import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectInside from './components/ProjectInside';
import Blog from './pages/Blog';
import BlogInside from './components/BlogInside';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const [existingPaths, setExistingPaths] = useState([]);
  const [dynamicPages, setDynamicPages] = useState([]);

  // Removed the useEffect hook that fetched existing paths from the backend

  // Removed the useEffect hook that fetched dynamic pages

  // Scroll to top on navigation
  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action]);

  // Removed the useEffect hook that sent the current pathname to the backend

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Project />} />
      <Route path="/project-inside/:title" element={<ProjectInside />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-inside/:title" element={<BlogInside />} />
    </Routes>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
