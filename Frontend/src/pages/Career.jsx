import '@/styles/pages/Career.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Career({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="career-section" id="career">
      <div className="career-container">
        <h2>Join Our Team</h2>
        <p className="career-intro">Be part of something amazing. Explore career opportunities at Illusio Designs.</p>
        <div className="job-listings">
          <div className="job-card">
            <h3>UI/UX Designer</h3>
            <p className="job-location">Remote / Rajkot</p>
            <p>We're looking for a creative UI/UX designer to join our team.</p>
            <button className="apply-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p className="job-location">Remote / Rajkot</p>
            <p>Join us as a frontend developer and build amazing web applications.</p>
            <button className="apply-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>Digital Marketing Specialist</h3>
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
