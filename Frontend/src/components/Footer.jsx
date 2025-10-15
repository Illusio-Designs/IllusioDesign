import '@/styles/components/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Illusio Design</h3>
            <p className="footer-tagline">Innovate. Create. Transform.</p>
            <p className="footer-description">
              We are a leading IT company specializing in web development, mobile apps, UI/UX design, and digital transformation solutions.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Services</h4>
            <ul className="footer-links">
              <li><a href="/web-development">Web Development</a></li>
              <li><a href="/mobile-apps">Mobile Apps</a></li>
              <li><a href="/ui-ux-design">UI/UX Design</a></li>
              <li><a href="/digital-marketing">Digital Marketing</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@illusiodesign.com</p>
              <p>📞 +1 (555) 789-0123</p>
              <p>📍 123 Tech Avenue, Innovation City, IC 54321</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Illusio Design. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
