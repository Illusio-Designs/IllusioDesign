import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectInside from './pages/ProjectInside';
import Blog from './pages/Blog';
import BlogInside from './pages/BlogInside';
import { sendPublicPagePath, fetchExistingPaths, fetchPages } from './utils/api';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const [existingPaths, setExistingPaths] = useState([]);
  const [dynamicPages, setDynamicPages] = useState([]);

  // Fetch existing paths from the backend on component mount
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const paths = await fetchExistingPaths();
        setExistingPaths(paths);
      } catch (error) {
        console.error('Error fetching existing paths:', error);
      }
    };

    fetchPaths();
  }, []);

  // Fetch dynamic pages on component mount
  useEffect(() => {
    const fetchDynamicPages = async () => {
      try {
        const pages = await fetchPages(); // Fetch dynamic pages
        setDynamicPages(pages);
      } catch (error) {
        console.error('Error fetching dynamic pages:', error);
      }
    };

    fetchDynamicPages();
  }, []);

  // Scroll to top on navigation
  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action]);

  // Send the current pathname to the backend
  useEffect(() => {
    const sendPath = async () => {
      if (!existingPaths.includes(pathname)) {
        try {
          await sendPublicPagePath(pathname); // Send pathname to the backend
          console.log('Successfully sent pathname:', pathname);
          setExistingPaths(prevPaths => [...prevPaths, pathname]); // Update state with new path
        } catch (error) {
          console.error('Failed to send pathname:', error);
        }
      }
    };

    sendPath();
  }, [pathname, existingPaths]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Project />} />
      <Route path="/project-inside/:title" element={<ProjectInside />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-inside/:title" element={<BlogInside />} />
      {dynamicPages.map(page => (
        <Route key={`dynamic-${page.id}`} path={`/${page.path}`} element={<BlogInside />} />
      ))}
    </Routes>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
