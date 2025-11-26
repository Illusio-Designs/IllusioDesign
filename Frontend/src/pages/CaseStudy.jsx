import '@/styles/pages/CaseStudy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function CaseStudy({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="case-study-section" id="case-study">
      <div className="case-study-container">
        <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
          <h2>
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Case Studies
            </SplitText>
          </h2>
          <p className="case-study-intro">Real results from real clients. Explore our success stories.</p>
        </ScrollReveal>
        <div className="case-study-grid">
          <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5}>
            <div className="case-study-card" onClick={() => navigateTo('case-study-detail', 'boosting-online-sales-300')} style={{ cursor: 'pointer' }}>
            <div className="case-study-header">
              <span className="case-study-tag">E-Commerce</span>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Boosting Online Sales by 300%
                </SplitText>
              </h3>
            </div>
            <div className="case-study-content">
              <p className="case-study-client">Client: Fashion Retail Brand</p>
              <p className="case-study-description">
                We redesigned their e-commerce platform with a focus on user experience 
                and conversion optimization, resulting in a 300% increase in online sales.
              </p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">300%</span>
                  <span className="metric-label">Sales Increase</span>
                </div>
                <div className="metric">
                  <span className="metric-value">45%</span>
                  <span className="metric-label">Conversion Rate</span>
                </div>
                <div className="metric">
                  <span className="metric-value">2.5x</span>
                  <span className="metric-label">User Engagement</span>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5}>
            <div className="case-study-card" onClick={() => navigateTo('case-study-detail', 'streamlining-business-operations')} style={{ cursor: 'pointer' }}>
            <div className="case-study-header">
              <span className="case-study-tag">SaaS Platform</span>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Streamlining Business Operations
                </SplitText>
              </h3>
            </div>
            <div className="case-study-content">
              <p className="case-study-client">Client: Tech Startup</p>
              <p className="case-study-description">
                Developed a comprehensive SaaS platform that automated their workflow, 
                reducing operational costs by 60% and improving team productivity.
              </p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">60%</span>
                  <span className="metric-label">Cost Reduction</span>
                </div>
                <div className="metric">
                  <span className="metric-value">80%</span>
                  <span className="metric-label">Time Saved</span>
                </div>
                <div className="metric">
                  <span className="metric-value">5k+</span>
                  <span className="metric-label">Active Users</span>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5}>
            <div className="case-study-card" onClick={() => navigateTo('case-study-detail', 'growing-brand-awareness')} style={{ cursor: 'pointer' }}>
            <div className="case-study-header">
              <span className="case-study-tag">Digital Marketing</span>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Growing Brand Awareness
                </SplitText>
              </h3>
            </div>
            <div className="case-study-content">
              <p className="case-study-client">Client: Healthcare Provider</p>
              <p className="case-study-description">
                Implemented a comprehensive digital marketing strategy that increased 
                brand visibility and generated 500% more qualified leads.
              </p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">500%</span>
                  <span className="metric-label">Lead Growth</span>
                </div>
                <div className="metric">
                  <span className="metric-value">250%</span>
                  <span className="metric-label">ROI Increase</span>
                </div>
                <div className="metric">
                  <span className="metric-value">10k+</span>
                  <span className="metric-label">Reach</span>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
