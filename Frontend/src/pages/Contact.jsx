import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/pages/Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <Header />
      
      <main>
        <section className="contact-hero">
          <div className="container">
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">Get in touch with our team for any questions or support</p>
          </div>
        </section>

        <section className="contact-content">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <div>
                      <h3>Email</h3>
                      <p>info@illusiodesign.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div>
                      <h3>Phone</h3>
                      <p>+1 (555) 789-0123</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div>
                      <h3>Address</h3>
                      <p>123 Tech Avenue<br />Innovation City, IC 54321</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
