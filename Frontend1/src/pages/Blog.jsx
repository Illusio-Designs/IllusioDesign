import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Blog.css';

const Blog = () => {
  return (
    <div className="blog-page">
      <Header />
      <div className="blog-main">
        <div className="hero-section">
          <h1>Our Blog</h1>
          <p>Insights, news, and updates from our team</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog; 