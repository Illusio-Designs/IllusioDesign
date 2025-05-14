import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import '../styles/pages/Home.css';
import logo from '../assets/logo black.png';
import impactlogo from "../assets/logo.png";
import infinity from "../assets/infinity.png";
import heroImage from '../assets/Animation - 1747050079135.gif';
import { FaPencilRuler, FaCode, FaBullhorn } from 'react-icons/fa';
import Footer from '../components/Footer';

const Home = () => {
  const statsRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const showcaseCardsRef = useRef([]);
  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    rating: 0
  });
  const [openIndex, setOpenIndex] = useState(null);
  const faqData = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a wide range of services including enterprise UX design, AI designs, idea to MVP for startups, design for SaaS, design systems, UX audit, usability testing, and web accessibility solutions.'
    },
    {
      question: 'How long does it take to complete a design project?',
      answer: 'The timeline depends on the project scope and requirements. Typically, a design project can take anywhere from a few weeks to a few months.'
    },
    {
      question: 'Do you provide post-project support?',
      answer: 'Yes, we offer post-project support to ensure smooth implementation and address any issues or enhancements needed.'
    },
    {
      question: 'How do you approach UX design for startups?',
      answer: 'We follow a user-centered approach, starting from understanding your business goals and user needs, to prototyping, testing, and iterating for the best results.'
    }
  ];

  // Data arrays for dynamic sections
  const statsData = [
    { label: 'Experience (In Years)', value: 8, suffix: '+' },
    { label: 'Successful Projects', value: 350, suffix: '+' },
    { label: 'Clients Across Countries', value: 10, suffix: '' },
    { label: 'Client Satisfaction Rating', value: 4.7, suffix: '/5+' },
  ];

  const servicesData = [
    {
      icon: <FaPencilRuler />, title: 'Design', desc: 'Creative and user-focused UI/UX and graphic design solutions.'
    },
    {
      icon: <FaCode />, title: 'Development', desc: 'Robust web and app development for seamless digital experiences.'
    },
    {
      icon: <FaBullhorn />, title: 'Marketing', desc: 'Strategic digital marketing to grow your brand and reach.'
    },
  ];

  const impactStats = [
    { number: '100+', label: 'UX Audits' },
    { number: '20+', label: 'User Interviews' },
    { number: '80+', label: 'MVPs Launched' },
    { number: '150+', label: 'Application Redesigns' },
  ];

  const showcaseData = [
    { img: logo, title: 'Car Lease : An application that features car leasing model in India' },
    { img: logo, title: 'Car Lease : An application that features car leasing model in India' },
    { img: logo, title: 'Car Lease : An application that features car leasing model in India' },
    { img: logo, title: 'Car Lease : An application that features car leasing model in India' },
  ];

  const blogData = [
    {
      img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
      title: "The End of UX Designers? AI's Rise to Dominate the Industry!",
      desc: 'Explore the emerging trends transforming how users interact with digital platforms.'
    },
    {
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      title: "AI vs. UX Designers: Who's Really in Control of 2025?",
      desc: 'Discover the Bold Trends Redefining UX Design in 2025!'
    },
    {
      img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      title: 'Designing for All: Essential Web Accessibility Guidelines from WCAG 2.2',
      desc: 'Design for Everyone: Key Accessibility Tips for an Inclusive Web!'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start counting animation
          const duration = 2000; // 2 seconds
          const steps = 60; // 60 steps for smooth animation
          const stepDuration = duration / steps;

          const targetValues = {
            experience: 8,
            projects: 350,
            clients: 10,
            rating: 4.7
          };

          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
              experience: Math.floor(targetValues.experience * progress),
              projects: Math.floor(targetValues.projects * progress),
              clients: Math.floor(targetValues.clients * progress),
              rating: (targetValues.rating * progress).toFixed(1)
            });

            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);

          // Disconnect observer after animation starts
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    // Service cards animation observer
    const serviceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    serviceCardsRef.current.forEach((card) => {
      if (card) {
        serviceObserver.observe(card);
      }
    });

    // Showcase cards animation observer
    const showcaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    showcaseCardsRef.current.forEach((card) => {
      if (card) {
        showcaseObserver.observe(card);
      }
    });

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
      serviceCardsRef.current.forEach((card) => {
        if (card) {
          serviceObserver.unobserve(card);
        }
      });
      showcaseCardsRef.current.forEach((card) => {
        if (card) {
          showcaseObserver.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <>
      <Header />
      <div className="hero-section">
        <div className="hero-left">
          <h1>Crafting Visual Brilliance That Speaks</h1>
          <p>We blend creativity with code to deliver stunning web, UI/UX, and graphic experiences that captivate, convert, and inspire.</p>
          <div className="hero-btn">
          <button className="engage-btn">Let's Engage</button>
          <button className="engage-btn view-btn">View Our Works</button>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImage} alt="Hero Image" />
        </div>
        
      </div>
      {/* Stats Section */}
        <div className="stats-section" ref={statsRef}>
          {statsData.map((stat, idx) => (
            <div className="stat" key={stat.label}>
              <h2>{counts[Object.keys(counts)[idx]]}{stat.suffix}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      {/* Company Logos Slider */}
      <div className="logo-slider-section">
        <div className="logo-slider">
          {[...Array(12)].map((_, i) => (
            <div className="logo-slide" key={i}>
              <img src={logo} alt={`Logo ${i % 6 + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {/* Services Section */}
      <div className="services-section">
        <h2 className="services-title">Services we offer<span className="dot">.</span><span className="services-icon">⚡</span></h2>
        <div className="services-cards">
          {servicesData.map((service, idx) => (
            <div className="service-card" ref={el => serviceCardsRef.current[idx] = el} key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Impact Section */}
      <div className="impact-section">
        <div className="impact-left">
          <p className="impact-description">
            As a global design firm, we partner with startups and established companies to deliver comprehensive services—from design to testing—enhancing user experiences and empowering businesses to thrive.
          </p>
          <button className="impact-btn">
            Read About Us
            <span className="impact-arrow">🡥</span>
          </button>
        </div>
        <div className="impact-right">
          <div className="impact-stats">
            {impactStats.map(stat => (
              <div className="impact-stat" key={stat.label}>
                <span className="impact-number">{stat.number}</span>
                <span className="impact-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="impact-center-icon">
            <img src={impactlogo} alt="Impact Logo" />
          </div>
        </div>
      </div>
      {/* Design Process Section */}
      <div className="design-process-section">
        <h2 className="design-process-title">Our design process<span className="dot">.</span></h2>
        <div className="design-process-content">
          <div className="process-step empathise">
            <div className="process-icon">{/* head/gear icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6C15.1634 6 8 13.1634 8 22C8 30.8366 15.1634 38 24 38C32.8366 38 40 30.8366 40 22C40 13.1634 32.8366 6 24 6Z" stroke="#E60000" strokeWidth="2.5"/><circle cx="24" cy="22" r="4" stroke="#E60000" strokeWidth="2.5"/></svg>
            </div>
            <h3>Empathise</h3>
            <h4>What are the users' needs?</h4>
            <p>Dive deep into user behaviour, emotions, and context to uncover real needs</p>
          </div>
          <div className="process-step define">
            <div className="process-icon">{/* magnifier icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="22" cy="22" r="10" stroke="#E60000" strokeWidth="2.5"/><line x1="32.0711" y1="32.4853" x2="40" y2="40.4142" stroke="#E60000" strokeWidth="2.5"/></svg>
            </div>
            <h3>Define</h3>
            <h4>Why does the problem matter?</h4>
            <p>Frame a clear, actionable problem statement rooted in user context</p>
          </div>
          <div className="infinity-loop">
            <img src={infinity} alt="Infinity" />
          </div>
          <div className="process-step ideate">
            <div className="process-icon">{/* bulb icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="20" rx="10" ry="12" stroke="#E60000" strokeWidth="2.5"/><rect x="20" y="32" width="8" height="8" rx="2" stroke="#E60000" strokeWidth="2.5"/></svg>
            </div>
            <h3>Ideate</h3>
            <h4>What are possible solutions?</h4>
            <p>Push beyond the obvious. Generate diverse ideas without limits</p>
          </div>
          <div className="process-step prototype">
            <div className="process-icon">{/* prototype icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="12" cy="36" r="4" stroke="#E60000" strokeWidth="2.5"/><circle cx="36" cy="36" r="4" stroke="#E60000" strokeWidth="2.5"/><rect x="12" y="12" width="24" height="12" rx="6" stroke="#E60000" strokeWidth="2.5"/><line x1="24" y1="24" x2="24" y2="32" stroke="#E60000" strokeWidth="2.5"/></svg>
            </div>
            <h3>Prototype</h3>
            <h4>How might we bring it to life?</h4>
            <p>Visualise and build quick, tangible solutions to test ideas early and often</p>
          </div>
          <div className="process-step test">
            <div className="process-icon">{/* test icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="6" stroke="#E60000" strokeWidth="2.5"/><rect x="18" y="18" width="12" height="8" rx="2" stroke="#E60000" strokeWidth="2.5"/></svg>
            </div>
            <div>
            <h3>Test</h3>
            <h4>Is it solving the right problem?</h4>
            <p>Validate with real users. Gather feedback, identify friction, and iterate to refine the experience</p>
            </div>
          </div>
        </div>
      </div>
      {/* Showcasing Solutions Section */}
      <div className="showcase-section">
        <h2 className="showcase-title">Showcasing our latest innovative solutions<span className="dot">.</span><span className="showcase-icon">✨</span></h2>
        <div className="showcase-cards">
          {showcaseData.map((showcase, index) => (
            <div key={index} className="showcase-card" ref={el => showcaseCardsRef.current[index] = el}>
              <div className="showcase-card-inner">
                <img src={showcase.img} alt={showcase.title} className="showcase-img" />
              </div>
              <h3>{showcase.title}</h3>
            </div>
          ))}
        </div>
        <button className="showcase-btn">Check Our Works</button>
      </div>
      {/* Blog Section */}
      <div className="blog-section">
        <h2 className="blog-title">Fresh ideas from the <span className="blog-forefront">forefront</span> of design and tech<span className="dot">.</span></h2>
        <div className="blog-cards">
          {blogData.map((blog) => (
            <div className="blog-card" key={blog.title}>
              <img src={blog.img} alt="Blog" className="blog-img" />
              <h3>{blog.title}</h3>
              <p className="blog-desc">{blog.desc}</p>
            </div>
          ))}
        </div>
        <button className="blog-btn">View All Blogs</button>
      </div>
      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="faq-title">Get quick answers to your queries<span className="dot">.</span></h2>
        <div className="faq-list">
          {faqData.map((faq, idx) => (
            <div key={idx} className={`faq-item${openIndex === idx ? ' open' : ''}`}> 
              <div className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                <span>{faq.question}</span>
                <span className="faq-toggle">{openIndex === idx ? '–' : '+'}</span>
              </div>
              {openIndex === idx && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home; 