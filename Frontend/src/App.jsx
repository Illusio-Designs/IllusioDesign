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
import Privacy from './pages/Privacy';
import Design from './pages/Design';
import Development from './pages/Development';
import Marketing from './pages/Marketing';
import ThemeManager from './components/ThemeManager'; // Import the ThemeManager

function App() {
  const action = useNavigationType();

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action]);

  return (
    <>
      <ThemeManager /> {/* Include the ThemeManager here */}
      <Routes>
        <Route path="/" element={<><SeoWrapper pageId="/" /><Home /></>} />
        <Route path="/project" element={<><SeoWrapper pageId="/project" /><Project /></>} />
        <Route path="/project-inside/:title" element={<ProjectInside />} />
        <Route path="/blog" element={<><SeoWrapper pageId="/blog" /><Blog /></>} />
        <Route path="/blog-inside/:title" element={<BlogInside />} />
        <Route path="/contactus" element={<><SeoWrapper pageId="/contactus" /><ContactUs /></>} />
        <Route path="/services" element={<><SeoWrapper pageId="/services" /><Services /></>} />
        <Route path="/services/design" element={<><SeoWrapper pageId="/services/design" /><Design /></>} />
        <Route path="/services/development" element={<><SeoWrapper pageId="/services/development" /><Development /></>} />
        <Route path="/services/marketing" element={<><SeoWrapper pageId="/services/marketing" /><Marketing /></>} />
        <Route path="/aboutus" element={<><SeoWrapper pageId="/aboutus" /><AboutUs /></>} />
        <Route path="/privacy" element={<><SeoWrapper pageId="/privacy" /><Privacy /></>} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
