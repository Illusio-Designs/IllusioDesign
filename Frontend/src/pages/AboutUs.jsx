import '@/styles/pages/AboutUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutUs({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="about-section" id="about">
        <div className="about-container">
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                About Us
              </SplitText>
            </h2>
          </ScrollReveal>
          <div className="about-content">
            <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5}>
              <div className="about-text">
                <p>
                  At Illusio Designs, we are passionate about creating exceptional digital experiences. 
                  Our team of talented designers and developers work together to bring your ideas to life.
                </p>
                <p>
                  With years of experience in the industry, we have helped numerous clients achieve 
                  their business goals through innovative design and development solutions.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5}>
              <div className="about-stats">
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                  <h3>5+</h3>
                  <p>Years Experience</p>
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
