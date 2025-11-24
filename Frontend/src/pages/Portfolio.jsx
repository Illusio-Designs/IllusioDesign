import '@/styles/pages/Portfolio.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';

export default function Portfolio({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-container">
          <h2>
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Our Portfolio
            </SplitText>
          </h2>
          <p className="portfolio-intro">Explore our latest projects and success stories</p>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-image">Project 1</div>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Project Title 1
                </SplitText>
              </h3>
              <p>Brief description of the project</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image">Project 2</div>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Project Title 2
                </SplitText>
              </h3>
              <p>Brief description of the project</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image">Project 3</div>
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Project Title 3
                </SplitText>
              </h3>
              <p>Brief description of the project</p>
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
