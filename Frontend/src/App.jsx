import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectInside from './components/ProjectInside';
import Blog from './pages/Blog';
import BlogInside from './components/BlogInside';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import SeoWrapper from './components/SeoWrapper'; // Import your SeoWrapper
import AboutUs from './pages/AboutUs';

function App() {
  const action = useNavigationType();

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action]);

  return (
    <Routes>
      <Route path="/" element={<><SeoWrapper pageId="/" /><Home /></>} />
      <Route path="/project" element={<><SeoWrapper pageId="/project" /><Project /></>} />
      <Route path="/project-inside/:title" element={<ProjectInside />} />
      <Route path="/blog" element={<><SeoWrapper pageId="/blog" /><Blog /></>} />
      <Route path="/blog-inside/:title" element={<BlogInside />} />
      <Route path="/contactus" element={<><SeoWrapper pageId="/contactus" /><ContactUs /></>} />
      <Route path="/services" element={<><SeoWrapper pageId="/services" /><Services /></>} />
      <Route path="/aboutus" element={<><SeoWrapper pageId="/aboutus" /><AboutUs /></>} />
    </Routes>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

