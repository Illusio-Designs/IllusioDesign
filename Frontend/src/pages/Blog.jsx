import '@/styles/pages/Blog.css';

export default function Blog({ navigateTo }) {
  return (
    <section className="blog-section" id="blog">
      <div className="blog-container">
        <h2>Our Blog</h2>
        <p className="blog-intro">Stay updated with the latest trends and insights</p>
        <div className="blog-grid">
          <article className="blog-card" onClick={() => navigateTo('blog-detail', 'latest-design-trends-2024')} style={{ cursor: 'pointer' }}>
            <div className="blog-image">Blog Image 1</div>
            <div className="blog-content">
              <span className="blog-date">Nov 15, 2024</span>
              <h3>Latest Design Trends in 2024</h3>
              <p>Discover the top design trends shaping the digital landscape this year.</p>
              <span className="read-more">Read More →</span>
            </div>
          </article>
          <article className="blog-card" onClick={() => navigateTo('blog-detail', 'building-scalable-web-applications')} style={{ cursor: 'pointer' }}>
            <div className="blog-image">Blog Image 2</div>
            <div className="blog-content">
              <span className="blog-date">Nov 10, 2024</span>
              <h3>Building Scalable Web Applications</h3>
              <p>Learn best practices for creating robust and scalable web solutions.</p>
              <span className="read-more">Read More →</span>
            </div>
          </article>
          <article className="blog-card" onClick={() => navigateTo('blog-detail', 'digital-marketing-strategies')} style={{ cursor: 'pointer' }}>
            <div className="blog-image">Blog Image 3</div>
            <div className="blog-content">
              <span className="blog-date">Nov 5, 2024</span>
              <h3>Digital Marketing Strategies</h3>
              <p>Effective strategies to boost your online presence and engagement.</p>
              <span className="read-more">Read More →</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
