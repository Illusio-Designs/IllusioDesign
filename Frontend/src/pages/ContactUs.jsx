import '@/styles/pages/ContactUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { contactAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { toast } from 'react-toastify';

export default function ContactUs({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('contact');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('contact');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const result = await contactAPI.create(formData);
      
      if (result.data) {
        toast.success('Message sent successfully! We will get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Your email address*" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Your mobile number*" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      placeholder="Your subject*" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      placeholder="Your message*" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
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
