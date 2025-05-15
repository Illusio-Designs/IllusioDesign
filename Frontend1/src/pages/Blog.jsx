import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Blog.css';

// Blog data array
export const blogData = [
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    title: "The End of UX Designers? AI's Rise to Dominate the Industry!",
    desc: 'Explore the emerging trends transforming how users interact with digital platforms.'
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: "AI vs. UX Designers: Who's Really in Control of 2025?",
    desc: 'Discover the Bold Trends Redefining UX Design in 2025!'
  },
  {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'Designing for All: Essential Web Accessibility Guidelines from WCAG 2.2',
    desc: 'Design for Everyone: Key Accessibility Tips for an Inclusive Web!'
  },
  {
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    title: 'Power Up Your Browser: Best Chrome Extensions for Designers.',
    desc: 'Streamline Your UX/UI Design with These Essential Chrome Extensions!'
  },
  {
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'Web Accessibility: Ensuring Inclusive Digital Experiences for All',
    desc: 'Explore the emerging trends transforming how users interact with digital platforms.'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'The Future of UX: Trends Shaping Tomorrow\'s Digital Experiences',
    desc: 'Explore the emerging trends transforming how users interact with digital platforms.'
  }
];

// BlogCards component
export const BlogCards = ({ blogs }) => (
  <div className="blog-cards">
    {blogs.map((blog) => (
      <div className="blog-card" key={blog.title}>
        <img src={blog.img} alt="Blog" className="blog-img" />
        <h3>{blog.title}</h3>
        <p className="blog-desc">{blog.desc}</p>
      </div>
    ))}
  </div>
);

const Blog = () => {
  return (
    <div className="blog-page">
      <Header />
      <div className="blog-main">
        <div className="hero-section">
          <p>Blogs</p>
          <h2>Your Design Roadmap<span className="dot">.</span></h2>
        </div>
        <BlogCards blogs={blogData} />
      </div>
      <Footer />
    </div>
  );
};

export default Blog; 