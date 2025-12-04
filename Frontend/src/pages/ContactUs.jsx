import '@/styles/pages/ContactUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

export default function ContactUs({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('contact');

  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                Vision in Mind?
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                Talk Now!
              </SplitText>
            </h1>
          </ScrollReveal>
          
          <div className="contact-content">
            {/* Left Side - Orange Block */}
            <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
              <div className="contact-message-block">
                <div className="message-text">
                  <p>Convert Your</p>
                  <p>Ideas into</p>
                  <p>Successful</p>
                  <p>Business</p>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Right Side - Contact Form */}
            <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Your name*" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Your email address*" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Your mobile number*" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      placeholder="Your subject*" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      placeholder="Your message*" 
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">
                    Send Message
                  </button>
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
