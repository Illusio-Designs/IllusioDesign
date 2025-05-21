import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ContactUs.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    mobile: '',
    interests: [],
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const interests = [...formData.interests];
      if (checked) {
        interests.push(value);
      } else {
        const index = interests.indexOf(value);
        if (index > -1) {
          interests.splice(index, 1);
        }
      }
      setFormData(prev => ({ ...prev, interests }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const templateParams = {
        to_email: 'Info@illusiodesigns.agency',
        from_name: formData.name,
        organization_name: formData.organizationName,
        from_email: formData.email,
        mobile: formData.mobile,
        interests: formData.interests.join(', '),
        message: formData.message
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams
      );

      toast.success('Message sent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setFormData({
        name: '',
        organizationName: '',
        email: '',
        mobile: '',
        interests: [],
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="contact-us-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className="contact-us-main">
        <div className="hero-section">

          <p className='hero-title'>Contact Us</p>
          <h2>Questions or comments? Message us<span className="contact-us-exclaim">!</span>
            <span className="contact-us-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
              </svg>
            </span>
          </h2>
        </div>
        <div className="contact-us-content">
          <div className="contact-us-info">
            <div className="contact-us-card">
              <h2>India</h2>
              <p className="contact-us-address">211 - 212, 2nd Floor, <br /> Runway Heights, Ayodhya chowk,<br /> 150ft Ring Road Rajkot, 360001</p>
              <div className="contact-us-contact-row"><a href="mailto:info@illusiodesigns.agency"><FaEnvelope /> Info@illusiodesigns.agency</a></div>
              <div className="contact-us-contact-row"><a href="tel:+917600046416"><FaPhoneAlt /> +91 76000 46416</a></div>
            </div>
          </div>
          <form className="contact-us-form" onSubmit={handleSubmit}>
            <div className="contact-us-form-row">
              <div className="contact-us-form-group">
                <label>Name<span className="contact-us-required">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name" 
                  required 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="contact-us-form-group">
                <label>Organization Name<span className="contact-us-required">*</span></label>
                <input 
                  type="text" 
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter company name" 
                  required 
                />
                {errors.organizationName && <span className="error-message">{errors.organizationName}</span>}
              </div>
            </div>
            <div className="contact-us-form-row">
              <div className="contact-us-form-group">
                <label>Email ID<span className="contact-us-required">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email ID" 
                  required 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="contact-us-form-group">
                <label>Mobile Number<span className="contact-us-required">*</span></label>
                <input 
                  type="text" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number" 
                  required 
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>
            </div>
            <div className="contact-us-form-group">
              <label className="contact-us-checkbox-label">How would you describe your interests?<span className="contact-us-required">*</span></label>
              <div className="contact-us-checkboxes">
                <div className='checkbox-interest'>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Design"
                      onChange={handleChange}
                      checked={formData.interests.includes('Design')}
                    /> Design
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Development"
                      onChange={handleChange}
                      checked={formData.interests.includes('Development')}
                    /> Development
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Marketing"
                      onChange={handleChange}
                      checked={formData.interests.includes('Marketing')}
                    /> Marketing
                  </label>
                </div>
              </div>
              {errors.interests && <span className="error-message">{errors.interests}</span>}
            </div>
            <div className="contact-us-form-group">
              <label>Message<span className="contact-us-required">*</span></label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter message" 
                style={{height: 'auto', minHeight: '100px', maxHeight: '200px', resize: 'vertical'}} 
                maxLength={200} 
                required
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            <button type="submit" className="contact-us-submit">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs; 