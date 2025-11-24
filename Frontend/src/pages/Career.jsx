import '@/styles/pages/Career.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';

export default function Career({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="career-section" id="career">
      <div className="career-container">
        <h2>
          <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
            Join Our Team
          </SplitText>
        </h2>
        <p className="career-intro">Be part of something amazing. Explore career opportunities at Illusio Designs.</p>
        <div className="job-listings">
          <div className="job-card">
            <h3>
              <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                UI/UX Designer
              </SplitText>
            </h3>
            <p className="job-location">Remote / Rajkot</p>
            <p>We&apos;re looking for a creative UI/UX designer to join our team.</p>
            <button className="apply-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>
              <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                Frontend Developer
              </SplitText>
            </h3>
            <p className="job-location">Remote / Rajkot</p>
            <p>Join us as a frontend developer and build amazing web applications.</p>
            <button className="apply-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>
              <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                Digital Marketing Specialist
              </SplitText>
            </h3>
            <p className="job-location">Remote / Rajkot</p>
            <p>Help our clients grow their business through strategic marketing.</p>
            <button className="apply-button">Apply Now</button>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
