import '@/styles/components/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🎨</span>
              <span className="logo-text">ILLUSIO DESIGNS</span>
            </div>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#services">Design</a></li>
              <li><a href="#services">Development</a></li>
              <li><a href="#services">Marketing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#case-study">Case Studies</a></li>
              <li><a href="#blog">Blogs</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>+91 76000 48416</p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road Rajkot 360001</p>
          </div>
          <div className="footer-section">
            <h3>Email</h3>
            <p>info@illusiodesigns.agency</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">f</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a>
            </p>
            <p>Copyright © 2025 Illusio Designs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
