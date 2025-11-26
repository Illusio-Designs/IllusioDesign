import '@/styles/pages/Services.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function Services({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="services-section" id="services">
        <div className="services-container">
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                Our Services
              </SplitText>
            </h2>
          </ScrollReveal>
          <div className="services-grid">
            <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
              <div className="service-card" onClick={() => navigateTo('service-detail', 'branding')} style={{ cursor: 'pointer' }}>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Branding & Design
                  </SplitText>
                </h3>
                <p>Brand identity, guidelines, and creative systems that feel ownable.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5}>
              <div className="service-card" onClick={() => navigateTo('service-detail', 'web-app')} style={{ cursor: 'pointer' }}>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Web & App Development
                  </SplitText>
                </h3>
                <p>Product-ready web, mobile, and immersive experiences built to scale.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5}>
              <div className="service-card" onClick={() => navigateTo('service-detail', 'marketing')} style={{ cursor: 'pointer' }}>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Digital Marketing
                  </SplitText>
                </h3>
                <p>Lifecycle strategy across performance, content, and automation.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5}>
              <div className="service-card" onClick={() => navigateTo('service-detail', 'b2b')} style={{ cursor: 'pointer' }}>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    B2B & Custom Solutions
                  </SplitText>
                </h3>
                <p>Complex workflows, portals, and bespoke tools for ambitious teams.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
