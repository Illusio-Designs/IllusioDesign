import '@/styles/components/Footer.css';

export default function Footer({ navigateTo }) {
  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="footer-cta-content">
          <h2 className="footer-cta-title">Ready to Start?</h2>
          <p className="footer-cta-subtitle">Let's craft your next digital success story.</p>
          <button className="footer-cta-button" onClick={() => navigateTo && navigateTo('contact')}>
            Get a Free Consultation
          </button>
        </div>
      </div>

      <hr />

      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img 
                src="/images/IllusioDesignfulllogo.png" 
                alt="Illusio Designs" 
                className="footer-logo-image"
                onClick={() => navigateTo && navigateTo('home')}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('services'); }}>Design</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('services'); }}>Development</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('services'); }}>Marketing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('case-study'); }}>Case Studies</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('blog'); }}>Blogs</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('about'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('contact'); }}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('privacy'); }}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('terms'); }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-info-item">
            <h3>Contact</h3>
            <p><a href="tel:+917600048416" style={{ color: 'inherit', textDecoration: 'none' }}>+91 76000 48416</a></p>
          </div>
          <div className="footer-info-item">
            <h3>Address</h3>
            <p>211-212 2nd Floor, Runway<br />Heights, Ayodhya chowk, 150ft<br />Ring Road Rajkot 360001</p>
          </div>
          <div className="footer-info-item">
            <h3>Email</h3>
            <p><a href="mailto:info@illusiodesigns.agency" style={{ color: 'inherit', textDecoration: 'none' }}>info@illusiodesigns.agency</a></p>
          </div>
          <div className="footer-info-item">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/company/illusio-designs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/illusio_designs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/IllusioDesigns/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('terms'); }}>Terms of Service</a> | <a href="#" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('privacy'); }}>Privacy Policy</a>
            </p>
            <p>Copyright © 2025 Illusio Designs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
