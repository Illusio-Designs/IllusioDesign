import '@/styles/pages/CaseStudyDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="case-study-detail-section">
        <div className="case-study-detail-container">
          <div className="breadcrumb">
            <a onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
              ← Back to Case Studies
            </a>
          </div>
        
        <div className="case-study-hero">
          <span className="case-study-category">E-Commerce</span>
          <h1>Boosting Online Sales by 300%</h1>
          <p className="case-study-subtitle">Fashion Retail Brand</p>
        </div>
        
        <div className="case-study-overview">
          <div className="overview-item">
            <h3>Client</h3>
            <p>Fashion Retail Brand</p>
          </div>
          <div className="overview-item">
            <h3>Industry</h3>
            <p>E-Commerce</p>
          </div>
          <div className="overview-item">
            <h3>Duration</h3>
            <p>6 Months</p>
          </div>
          <div className="overview-item">
            <h3>Services</h3>
            <p>Design, Development</p>
          </div>
        </div>
        
        <div className="case-study-content">
          <div className="content-section">
            <h2>The Challenge</h2>
            <p>
              The client was facing declining online sales and high cart abandonment rates. 
              Their existing e-commerce platform had poor user experience, slow loading times, 
              and a complicated checkout process that was driving customers away.
            </p>
          </div>
          
          <div className="content-section">
            <h2>Our Solution</h2>
            <p>
              We conducted a comprehensive UX audit and redesigned the entire e-commerce platform 
              with a focus on user experience and conversion optimization. Key improvements included:
            </p>
            <ul>
              <li>Streamlined checkout process reducing steps from 5 to 2</li>
              <li>Improved product discovery with advanced filtering and search</li>
              <li>Mobile-first responsive design</li>
              <li>Performance optimization reducing page load time by 60%</li>
              <li>Personalized product recommendations</li>
            </ul>
          </div>
          
          <div className="content-section">
            <h2>The Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <span className="result-number">300%</span>
                <span className="result-label">Increase in Sales</span>
              </div>
              <div className="result-card">
                <span className="result-number">45%</span>
                <span className="result-label">Conversion Rate</span>
              </div>
              <div className="result-card">
                <span className="result-number">2.5x</span>
                <span className="result-label">User Engagement</span>
              </div>
              <div className="result-card">
                <span className="result-number">60%</span>
                <span className="result-label">Faster Load Time</span>
              </div>
            </div>
          </div>
          
          <div className="content-section">
            <h2>Client Testimonial</h2>
            <blockquote>
              &quot;Working with Illusio Designs transformed our business. The new platform not only 
              looks amazing but has significantly improved our sales and customer satisfaction. 
              Their team was professional, responsive, and delivered beyond our expectations.&quot;
              <cite>— CEO, Fashion Retail Brand</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
