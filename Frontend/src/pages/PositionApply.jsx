import '@/styles/pages/PositionApply.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

const jobDetails = {
  'graphic-designer': {
    title: 'Graphic Designer',
    location: 'Rajkot, Gujarat',
    experience: '5+ Years',
    software: 'CorelDraw, Photoshop, Illustrator',
    description: 'For Graphic Designer Job in Rajkot, We are looking for a creative Designer with up-to-date knowledge to interpret our clients needs and to design solutions with high visual impact. Capable to work on a variety of products, including websites, books, magazines, product packaging, websites, exhibitions, corporate identity etc. Graphic designing requirement, creativity & innovation, carious designing trends. Apply Graphic designer job in Rajkot, Gujarat, India at Illusio Designs as well as Freshers Can also Apply.',
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer',
    location: 'Rajkot, Gujarat',
    experience: '3+ Years',
    software: 'Figma, Adobe XD, Sketch',
    description: 'We are looking for a talented UI/UX Designer to create amazing user experiences. You will be responsible for designing user interfaces and experiences for web and mobile applications.',
  },
  'frontend-developer': {
    title: 'Frontend Developer',
    location: 'Remote',
    experience: '2+ Years',
    software: 'React, Next.js, JavaScript',
    description: 'Join our team as a Frontend Developer and build amazing web applications. You will work with modern technologies to create responsive and interactive user interfaces.',
  },
  'digital-marketing': {
    title: 'Digital Marketing Specialist',
    location: 'Rajkot, Gujarat',
    experience: '2+ Years',
    software: 'Google Analytics, SEO Tools',
    description: 'Help our clients grow their business through strategic digital marketing. You will be responsible for developing and implementing marketing campaigns across various digital channels.',
  },
};

export default function PositionApply({ positionId, navigateTo, currentPage }) {
  // SEO Integration
  useSEO('position-apply');

  const [isLoading, setIsLoading] = useState(true);
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

  const job = jobDetails[positionId] || jobDetails['graphic-designer'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // You can add API call here
      
      // Show success message
      setIsSubmitted(true);
      
      // Redirect to career page after 2 seconds
      setTimeout(() => {
        navigateTo('career');
      }, 2000);
    } else {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        email: true,
        contact: true,
        resume: true,
      });
      // Force re-render to show errors
      console.log('Validation errors:', errors);
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
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
                <div className="job-info">
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{job.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Experience Required:</span>
                    <span className="info-value">{job.experience}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Software Skills:</span>
                    <span className="info-value">{job.software}</span>
                  </div>
                </div>
                <div className="job-role-description">
                  <h2 className="job-role-title">Job Role Description</h2>
                  <p>{job.description}</p>
                </div>
              </ScrollReveal>
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
                      placeholder="Portfolio URL"
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

                  <button type="submit" className="submit-apply-button">
                    Apply Now
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

