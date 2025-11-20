import '@/styles/pages/AboutUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutUs({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="about-section" id="about">
        <div className="about-container">
          <h2>About Us</h2>
          <div className="about-content">
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
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
