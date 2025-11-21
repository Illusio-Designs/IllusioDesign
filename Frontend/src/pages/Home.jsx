import '@/styles/pages/Home.css';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">
                Designate <span className="highlight-box">Illusio</span>
              </span>
              <span className="title-line">Thoughts to Flow Into Magic.</span>
            </h1>
          </div>
          
          <div className="floating-shapes">
            <Image src="/Icons/circle.png" alt="" className="shape shape-circle-1" width={70} height={70} />
            <Image src="/Icons/halfcircle.png" alt="" className="shape shape-half-1" width={60} height={60} />
            <Image src="/Icons/halfcircle.png" alt="" className="shape shape-half-2" width={60} height={60} />
            <Image src="/Icons/circle.png" alt="" className="shape shape-circle-2" width={70} height={70} />
            <Image src="/Icons/square.png" alt="" className="shape shape-square-1" width={50} height={50} />
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="services-offer-section">
        <div className="container">
          <h2 className="section-title">Services We Offer</h2>
          <div className="services-cards">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Design</h3>
            </div>
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Development</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <div className="container">
          <h2 className="section-title">Case Studies</h2>
          <div className="case-studies-grid">
            <div className="case-study-card">
              <div className="case-placeholder"></div>
              <p>BOOSTING ONLINE SALES BY 300%</p>
            </div>
            <div className="case-study-card">
              <div className="case-placeholder"></div>
              <p>STREAMLINING BUSINESS OPERATIONS</p>
            </div>
            <div className="case-study-card">
              <div className="case-placeholder"></div>
              <p>GROWING BRAND AWARENESS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>663</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3>19+</h3>
              <p>Year Experience</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>7+</h3>
              <p>Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Topics */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Topics</h2>
          <div className="faq-content">
            <div className="faq-list">
              <div className="faq-item">What services do you offer?</div>
              <div className="faq-item">How long does a typical project take?</div>
              <div className="faq-item">What is your pricing structure?</div>
              <div className="faq-item">Do you offer ongoing support?</div>
              <div className="faq-item">Can you work with our existing team?</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Excellent work and professional service. Highly recommended!"</p>
              <p className="client-name">- John Doe</p>
            </div>
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"They transformed our vision into reality. Amazing team!"</p>
              <p className="client-name">- Jane Smith</p>
            </div>
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Outstanding results and great communication throughout."</p>
              <p className="client-name">- Mike Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Growth Hub */}
      <section className="growth-hub-section">
        <div className="container">
          <h2 className="section-title">Digital Growth Hub</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-placeholder"></div>
              <p>Latest Design Trends 2024</p>
            </div>
            <div className="blog-card">
              <div className="blog-placeholder"></div>
              <p>Building Scalable Applications</p>
            </div>
            <div className="blog-card">
              <div className="blog-placeholder"></div>
              <p>Digital Marketing Strategies</p>
            </div>
          </div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </>
  );
}
