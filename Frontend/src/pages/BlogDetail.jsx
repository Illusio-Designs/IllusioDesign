import '@/styles/pages/BlogDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';

export default function BlogDetail({ blogName, navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="blog-detail-section">
        <div className="blog-detail-container">
          <div className="breadcrumb">
            <a onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
              ← Back to Blog
            </a>
          </div>
        
        <article className="blog-article">
          <div className="article-header">
            <span className="article-category">Design Trends</span>
            <h1>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                Latest Design Trends in 2024
              </SplitText>
            </h1>
            <div className="article-meta">
              <span className="author">By Illusio Designs Team</span>
              <span className="date">November 15, 2024</span>
              <span className="read-time">5 min read</span>
            </div>
          </div>
          
          <div className="article-image">
            <div className="placeholder-image">Featured Image</div>
          </div>
          
          <div className="article-content">
            <p className="lead">
              The design landscape is constantly evolving, and 2024 brings exciting new trends 
              that are reshaping how we create digital experiences. Let&apos;s explore the top trends 
              that are defining this year.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                1. AI-Powered Design Tools
              </SplitText>
            </h2>
            <p>
              Artificial intelligence is revolutionizing the design process. From automated layout 
              suggestions to intelligent color palette generation, AI tools are becoming essential 
              companions for designers, helping them work faster and more efficiently.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                2. Immersive 3D Experiences
              </SplitText>
            </h2>
            <p>
              Three-dimensional design elements are no longer just for gaming. Websites and apps 
              are incorporating 3D graphics, animations, and interactive elements to create more 
              engaging and memorable user experiences.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                3. Sustainable Design Practices
              </SplitText>
            </h2>
            <p>
              Environmental consciousness is influencing design decisions. Designers are focusing 
              on creating lightweight, energy-efficient websites and apps that minimize their 
              carbon footprint while maintaining excellent user experiences.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                4. Bold Typography
              </SplitText>
            </h2>
            <p>
              Large, expressive typography is taking center stage. Designers are using oversized 
              fonts and creative text treatments to make strong visual statements and improve 
              content hierarchy.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                5. Micro-Interactions
              </SplitText>
            </h2>
            <p>
              Small, delightful animations and interactions are enhancing user engagement. These 
              subtle details provide feedback, guide users, and add personality to digital products.
            </p>
            
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                Conclusion
              </SplitText>
            </h2>
            <p>
              Staying current with design trends is essential for creating modern, effective digital 
              experiences. At Illusio Designs, we combine these trends with timeless design principles 
              to create solutions that are both contemporary and enduring.
            </p>
          </div>
          
          <div className="article-footer">
            <div className="article-tags">
              <span className="tag">Design</span>
              <span className="tag">Trends</span>
              <span className="tag">2024</span>
              <span className="tag">UX/UI</span>
            </div>
            
            <div className="article-share">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Share this article
                </SplitText>
              </h3>
              <div className="share-buttons">
                <button className="share-btn">LinkedIn</button>
                <button className="share-btn">Twitter</button>
                <button className="share-btn">Facebook</button>
              </div>
            </div>
          </div>
        </article>
        
        <div className="related-posts">
          <h2>
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Related Articles
            </SplitText>
          </h2>
          <div className="related-grid">
            <div className="related-card">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Building Scalable Web Applications
                </SplitText>
              </h3>
              <p>Learn best practices for creating robust solutions.</p>
              <a href="#blog">Read More →</a>
            </div>
            <div className="related-card">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Digital Marketing Strategies
                </SplitText>
              </h3>
              <p>Effective strategies to boost your online presence.</p>
              <a href="#blog">Read More →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
