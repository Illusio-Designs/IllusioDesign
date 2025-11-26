import '@/styles/pages/ContactUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactUs({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="contact-section" id="contact">
      <div className="contact-container">
        <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
          <h2>
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Get In Touch
            </SplitText>
          </h2>
          <p className="contact-intro">Have a project in mind? Let&apos;s discuss how we can help you achieve your goals.</p>
        </ScrollReveal>
        
        <div className="contact-content">
          <div className="contact-info">
            <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5}>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Phone
                  </SplitText>
                </h3>
                <p>+91 76000 48416</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5}>
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Email
                  </SplitText>
                </h3>
                <p>info@illusiodesigns.agency</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5}>
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Address
                  </SplitText>
                </h3>
                <p>211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road Rajkot 360001</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5}>
              <div className="info-card">
                <div className="info-icon">🕒</div>
                <h3>
                  <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                    Business Hours
                  </SplitText>
                </h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="fadeUp" delay={0.35} duration={1.5}>
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
          </ScrollReveal>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
