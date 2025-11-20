import '@/styles/pages/Portfolio.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Portfolio({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-container">
          <h2>Our Portfolio</h2>
          <p className="portfolio-intro">Explore our latest projects and success stories</p>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-image">Project 1</div>
              <h3>Project Title 1</h3>
              <p>Brief description of the project</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image">Project 2</div>
              <h3>Project Title 2</h3>
              <p>Brief description of the project</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image">Project 3</div>
              <h3>Project Title 3</h3>
              <p>Brief description of the project</p>
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
