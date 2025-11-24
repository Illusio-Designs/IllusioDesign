import '@/styles/pages/Services.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';

export default function Services({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="services-section" id="services">
        <div className="services-container">
          <h2>
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Our Services
            </SplitText>
          </h2>
          <div className="services-grid">
            <div className="service-card" onClick={() => navigateTo('service-detail', 'design')} style={{ cursor: 'pointer' }}>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Design
                </SplitText>
              </h3>
              <p>Creative and user-centric design solutions that bring your vision to life.</p>
            </div>
            <div className="service-card" onClick={() => navigateTo('service-detail', 'development')} style={{ cursor: 'pointer' }}>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Development
                </SplitText>
              </h3>
              <p>Robust and scalable web and mobile applications built with cutting-edge technology.</p>
            </div>
            <div className="service-card" onClick={() => navigateTo('service-detail', 'marketing')} style={{ cursor: 'pointer' }}>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Marketing
                </SplitText>
              </h3>
              <p>Strategic digital marketing campaigns that drive growth and engagement.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
