import '@/styles/pages/Portfolio.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function Portfolio({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-container">
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
            <h2>
              <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
                Our Portfolio
              </SplitText>
            </h2>
            <p className="portfolio-intro">Explore our latest projects and success stories</p>
          </ScrollReveal>
          <div className="portfolio-grid">
            <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5}>
              <div className="portfolio-item">
                <div className="portfolio-image">Project 1</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Project Title 1
                  </SplitText>
                </h3>
                <p>Brief description of the project</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5}>
              <div className="portfolio-item">
                <div className="portfolio-image">Project 2</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Project Title 2
                  </SplitText>
                </h3>
                <p>Brief description of the project</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5}>
              <div className="portfolio-item">
                <div className="portfolio-image">Project 3</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Project Title 3
                  </SplitText>
                </h3>
                <p>Brief description of the project</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
