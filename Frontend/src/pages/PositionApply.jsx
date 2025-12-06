import '@/styles/pages/PositionApply.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { positionAPI, applicationAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { toast } from 'react-toastify';

export default function PositionApply({ positionId, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState(null);
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [seoPageName, setSeoPageName] = useState(null);

  // SEO Integration - dynamic based on position name
  useSEO(seoPageName);

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('position-apply');
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    portfolio: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper function to create SEO-friendly page name from position title
  const createSEOPageName = (title) => {
    if (!title) return null;
    return `position-apply-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')}`;
  };

  useEffect(() => {
    if (!positionId) return;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchPosition = async () => {
      try {
        if (isMounted) {
          setLoadingPosition(true);
        }
        const result = await positionAPI.getByIdPublic(positionId);
        
        // Process data regardless of mount status
        if (result.data) {
          // Only update state if component is still mounted
          if (isMounted) {
            setPosition(result.data);
            
            // Set SEO page name based on position title
            const seoName = createSEOPageName(result.data.title);
            setSeoPageName(seoName);
          }
        }
      } catch (error) {
        console.error('Error fetching position:', error);
        if (isMounted) {
          toast.error('Failed to load position details. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoadingPosition(false);
        }
      }
    };

    fetchPosition();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [positionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
    // Clear error when file is selected
    if (errors.resume) {
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'This field is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'This field is required';
    }
    if (!formData.resume) {
      newErrors.resume = 'This field is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        email: true,
        contact: true,
        resume: true,
      });
      return;
    }

    if (!positionId || !position) {
      toast.error('Position information is missing. Please try again.');
      return;
    }

    try {
      setSubmitting(true);
      
      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('positionId', positionId);
      submitFormData.append('name', formData.name.trim());
      submitFormData.append('email', formData.email.trim());
      submitFormData.append('contact', formData.contact.trim());
      if (formData.portfolio && formData.portfolio.trim()) {
        submitFormData.append('portfolio', formData.portfolio.trim());
      }
      submitFormData.append('resume', formData.resume);

      const result = await applicationAPI.create(submitFormData);
      
      if (result.data) {
        toast.success('Application submitted successfully!');
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          contact: '',
          portfolio: '',
          resume: null,
        });
        
        // Redirect to career page after 2 seconds
        setTimeout(() => {
          navigateTo('career');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="position-apply-section">
        <div className="position-apply-container">
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
                Unleash Your Talent
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                with Illusio
              </SplitText>
            </h1>
          </ScrollReveal>

          <div className="position-apply-layout">
            {/* Left Side - Job Description */}
            <div className="job-description-section">
              {loadingPosition ? (
                <div className="loading-position">Loading position details...</div>
              ) : position ? (
                <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
                  <div className="job-info">
                    {position.location && (
                      <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{position.location}</span>
                      </div>
                    )}
                    {position.experience && (
                      <div className="info-item">
                        <span className="info-label">Experience Required:</span>
                        <span className="info-value">{position.experience}</span>
                      </div>
                    )}
                    {position.requirements && (
                      <div className="info-item">
                        <span className="info-label">Software Skills:</span>
                        <span className="info-value">{position.requirements}</span>
                      </div>
                    )}
                  </div>
                  <div className="job-role-description">
                    <h2 className="job-role-title">Job Role Description</h2>
                    <p>{position.description || 'No description available.'}</p>
                  </div>
                </ScrollReveal>
              ) : (
                <div className="error-position">Position not found. Please go back and select a valid position.</div>
              )}
            </div>

            {/* Right Side - Application Form */}
            <div className="application-form-section">
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h2>Your application is successfully applied!</h2>
                  <p>We will review your application and get back to you soon.</p>
                </div>
              ) : (
                <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
                  <form className="application-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      placeholder="Contact number*"
                      value={formData.contact}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('contact')}
                      className={errors.contact ? 'error' : ''}
                      required
                    />
                    {errors.contact && (
                      <span className="error-message">{errors.contact}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      placeholder="Portfolio URL (Optional)"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group file-upload-group">
                    <label htmlFor="resume" className="file-label">
                      Attach Resume & Portfolio (PDF, JPG, PNG)*
                    </label>
                    <div className={`file-input-wrapper ${errors.resume ? 'error' : ''}`}>
                      <input
                        type="text"
                        className={`file-display ${errors.resume ? 'error' : ''}`}
                        value={formData.resume ? formData.resume.name : ''}
                        placeholder="No file chosen"
                        readOnly
                        required
                        onClick={() => handleBlur('resume')}
                      />
                      <label htmlFor="resume" className="file-select-button">
                        Select File
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          onBlur={() => handleBlur('resume')}
                          required
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    {errors.resume && (
                      <span className="error-message" style={{ display: 'block' }}>{errors.resume}</span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="submit-apply-button"
                    disabled={submitting || !position}
                  >
                    {submitting ? 'Submitting...' : 'Apply Now'}
                  </button>
                </form>
              </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}

