import '@/styles/pages/ContactUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactUs({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        <p className="contact-intro">Have a project in mind? Let's discuss how we can help you achieve your goals.</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+91 76000 48416</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>info@illusiodesigns.agency</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road Rajkot 360001</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🕒</div>
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
          
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select id="service" name="service">
                  <option value="">Select a service</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." required></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
