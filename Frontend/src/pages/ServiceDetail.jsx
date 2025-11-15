import '@/styles/pages/ServiceDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceDetail({ serviceName, navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="service-detail-section">
        <div className="service-detail-container">
          <div className="breadcrumb">
            <a onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
              ← Back to Services
            </a>
          </div>
        
        <div className="service-hero">
          <h1>Design Services</h1>
          <p className="service-tagline">
            Creative and user-centric design solutions that bring your vision to life
          </p>
        </div>
        
        <div className="service-content">
          <div className="content-section">
            <h2>What We Offer</h2>
            <p>
              Our design services encompass everything you need to create stunning, effective 
              digital experiences. We combine creativity with strategy to deliver designs that 
              not only look beautiful but also achieve your business goals.
            </p>
          </div>
          
          <div className="service-features">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>
                User-centered interface design that prioritizes usability and aesthetics. 
                We create intuitive experiences that users love.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile App Design</h3>
              <p>
                Native and cross-platform mobile app designs optimized for iOS and Android. 
                Beautiful interfaces that work seamlessly on any device.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Web Design</h3>
              <p>
                Modern, responsive website designs that engage visitors and drive conversions. 
                From landing pages to complex web applications.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Brand Identity</h3>
              <p>
                Complete brand identity systems including logos, color palettes, typography, 
                and brand guidelines that make you stand out.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Design Systems</h3>
              <p>
                Scalable design systems and component libraries that ensure consistency 
                across all your digital products.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Prototyping</h3>
              <p>
                Interactive prototypes that bring your ideas to life. Test and validate 
                concepts before development begins.
              </p>
            </div>
          </div>
          
          <div className="content-section">
            <h2>Our Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3>Discovery</h3>
                <p>We start by understanding your business, users, and goals through research and workshops.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">02</div>
                <h3>Strategy</h3>
                <p>We develop a design strategy that aligns with your objectives and user needs.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">03</div>
                <h3>Design</h3>
                <p>Our team creates beautiful, functional designs with multiple iterations and refinements.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">04</div>
                <h3>Testing</h3>
                <p>We validate designs through user testing and gather feedback for improvements.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">05</div>
                <h3>Delivery</h3>
                <p>Final designs are delivered with complete documentation and developer handoff.</p>
              </div>
            </div>
          </div>
          
          <div className="content-section">
            <h2>Why Choose Our Design Services?</h2>
            <ul className="benefits-list">
              <li>Experienced team of designers with diverse expertise</li>
              <li>User-centered approach backed by research and data</li>
              <li>Modern design tools and best practices</li>
              <li>Collaborative process with regular feedback loops</li>
              <li>Fast turnaround without compromising quality</li>
              <li>Ongoing support and design iterations</li>
            </ul>
          </div>
          
          <div className="cta-section">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how our design services can help you achieve your goals.</p>
            <button className="cta-button">Get in Touch</button>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
