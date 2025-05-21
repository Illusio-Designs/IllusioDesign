import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import '../styles/pages/Home.css';
import logo from '../assets/logo black.png';
import impactlogo from "../assets/logo.png";
import infinity from "../assets/infinity.png";
import heroImage from '../assets/Animation - 1747050079135.gif';
import { FaPencilRuler, FaCode, FaBullhorn } from 'react-icons/fa';
import Footer from '../components/Footer';
import { blogData, BlogCards } from './Blog';
import { showcaseData } from './CaseStudies';
import FAQ from '../components/FAQ';

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

  // Data arrays for dynamic sections
  const statsData = [
    { label: 'Experience (In Years)', value: 8, suffix: '+' },
    { label: 'Successful Projects', value: 350, suffix: '+' },
    { label: 'Clients Across Countries', value: 10, suffix: '' },
    { label: 'Client Satisfaction Rating', value: 4.7, suffix: '/5+' },
  ];

  const servicesData = [
    {
      icon: <FaPencilRuler />,
      title: 'Design',
      subServices: [
        'Logo Design',
        'Brand Identity',
        'Packing Design',
        'Social Design',
        'UI & UX Design'
      ]
    },
    {
      icon: <FaCode />,
      title: 'Development',
      subServices: [
        'Web Design',
        'Web Development',
        'Hosting Services',
        'Application Design',
        'Application Development',
        'Application Search Optimisation'
      ]
    },
    {
      icon: <FaBullhorn />,
      title: 'Marketing',
      subServices: [
        'Social Media Management',
        'Brand Strategy',
        'Analytics & Optimization',
        'Paid Advertisement',
        'Search Engine Optimisation'
      ]
    }
  ];

  const impactStats = [
    { number: '100+', label: 'UX Audits' },
    { number: '20+', label: 'User Interviews' },
    { number: '80+', label: 'MVPs Launched' },
    { number: '150+', label: 'Application Redesigns' },
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
          <button className="engage-btn" onClick={() => window.location.href = '/contact-us'}>Let's Engage</button>
          <button className="engage-btn view-btn" onClick={() => window.location.href = '/case-studies'}>Explore Our Creations</button>
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
        <h2 className="services-title">Services we offer<span className="dot">.</span>
          <span className="services-icon">
            <svg width="34" height="47" viewBox="0 0 34 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="charge-path" d="M16.5388 14.8571H30.6238L4.66261 46L14.1399 21.1857H3L22.973 1L16.5388 14.8571Z"></path>
            </svg>
          </span>
        </h2>
        <div className="services-cards">
          {servicesData.map((service, idx) => (
            <div className="service-card" ref={el => serviceCardsRef.current[idx] = el} key={service.title} onClick={() => window.location.href = `/services/${service.title}`}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <ul>
                {service.subServices.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
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
          <button className="impact-btn" onClick={() => window.location.href = '/about-us'}>
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
        <h2 className="design-process-title">Our design process<span className="dot">.</span>
          <svg className="home-flov-sv position-absolute" width="35" height="42" viewBox="0 0 35 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="path" d="M16.2071 40.0405C22.4877 36.8067 34.7368 29.7913 33.488 27.5997C31.927 24.8602 17.9393 28.5972 15.0961 30.6393C12.2529 32.6815 29.1452 17.9843 29.4767 12.5314C29.8082 7.07846 12.0289 22.528 10.5404 25.2681C9.05184 28.0083 12.0333 5.90058 7.90569 2.38272C3.77809 -1.13514 -3.04335 29.0316 5.47319 35.4764" stroke="#ec691f" strokeWidth="2.25" strokeLinecap="round"/>
          </svg>
        </h2>
        <div className="design-process-content">
          <div className="process-step empathise">
            <div className="process-icon">{/* head/gear icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6C15.1634 6 8 13.1634 8 22C8 30.8366 15.1634 38 24 38C32.8366 38 40 30.8366 40 22C40 13.1634 32.8366 6 24 6Z" stroke="#EC691F" strokeWidth="2.5"/><circle cx="24" cy="22" r="4" stroke="#EC691F" strokeWidth="2.5"/></svg>
            </div>
            <h3>Empathise</h3>
            <h4>What are the users' needs?</h4>
            <p>Dive deep into user behaviour, emotions, and context to uncover real needs</p>
          </div>
          <div className="process-step define">
            <div className="process-icon">{/* magnifier icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="22" cy="22" r="10" stroke="#EC691F" strokeWidth="2.5"/><line x1="32.0711" y1="32.4853" x2="40" y2="40.4142" stroke="#EC691F" strokeWidth="2.5"/></svg>
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
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="20" rx="11" ry="12" stroke="#EC691F" strokeWidth="2.5"/><rect x="20" y="32" width="8" height="8" rx="2" stroke="#EC691F" strokeWidth="2.5"/></svg>
            </div>
            <h3>Ideate</h3>
            <h4>What are possible solutions?</h4>
            <p>Push beyond the obvious. Generate diverse ideas without limits</p>
          </div>
          <div className="process-step prototype">
            <div className="process-icon">{/* prototype icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="12" cy="36" r="4" stroke="#EC691F" strokeWidth="2.5"/><circle cx="36" cy="36" r="4" stroke="#EC691F" strokeWidth="2.5"/><rect x="12" y="12" width="24" height="12" rx="6" stroke="#EC691F" strokeWidth="2.5"/><line x1="24" y1="24" x2="24" y2="32" stroke="#EC691F" strokeWidth="2.5"/></svg>
            </div>
            <h3>Prototype</h3>
            <h4>How might we bring it to life?</h4>
            <p>Visualise and build quick, tangible solutions to test ideas early and often</p>
          </div>
          <div className="process-step test">
            <div className="process-icon">{/* test icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="6" stroke="#EC691F" strokeWidth="2.5"/><rect x="18" y="18" width="12" height="8" rx="2" stroke="#EC691F" strokeWidth="2.5"/></svg>
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
        <h2 className="showcase-title">Showcasing our latest innovative solutions<span className="dot">.</span>
          <span className="position-relative">
            <svg className="position-absolute home-diamond-1" width="20" height="26" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1123_13950)">
                <path className="stroke-path" d="M1.88234 14.5994C7.54725 11.4093 13.0091 6.9028 14.8425 0.435296C15.0566 -0.313056 12.9267 -0.0180849 12.7236 0.697492C10.9945 6.78263 5.89499 10.9723 0.570403 13.9766C0.241048 14.1624 -0.0169476 14.5557 0.383768 14.8015C0.784484 15.0473 1.50907 14.8179 1.88783 14.6048L1.88234 14.5994Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M12.6641 0.949173C13.4875 7.02885 16.0125 13.114 20.9199 17.0305C21.2987 17.3364 21.908 17.2327 22.3252 17.0524C22.5283 16.965 23.2748 16.5116 22.8906 16.2057C18.0435 12.3329 15.6008 6.38428 14.7884 0.381081C14.6951 -0.323571 12.5598 0.157122 12.6696 0.949173H12.6641Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M0.0974525 14.802C4.18146 18.6858 7.82633 23.1814 9.53898 28.6165C9.76953 29.3539 11.8884 28.764 11.6578 28.0484C9.91225 22.5313 6.21249 17.9211 2.06261 13.9717C1.52466 13.4637 -0.473431 14.2558 0.0919632 14.7965H0.0974525V14.802Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M12.4005 28.4682C14.9804 23.9289 18.4551 19.9632 22.6764 16.866C23.0496 16.5929 22.863 16.216 22.4733 16.1177C21.9573 15.992 21.3809 16.216 20.9747 16.5164C16.6601 19.6846 13.0647 23.776 10.4243 28.419C9.93578 29.2821 12.0546 29.0691 12.4005 28.4627V28.4682Z" fill="#ec691f"></path>
              </g>
              <defs>
                <clipPath id="clip0_1123_13950">
                  <rect width="23" height="29" fill="white" transform="translate(0 -0.00195312)"></rect>
                </clipPath>
              </defs>
            </svg>

            <svg className="position-absolute home-diamond-2" width="10" height="14" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1123_13955)">
                <path className="stroke-path" d="M1.06393 8.55744C4.26584 6.6874 7.35295 4.04566 8.38923 0.254365C8.51023 -0.184324 7.30641 -0.0114097 7.19161 0.408067C6.21429 3.97522 3.33195 6.43123 0.322402 8.1924C0.136244 8.30127 -0.00957911 8.53182 0.216913 8.67591C0.443404 8.82001 0.852951 8.68552 1.06703 8.56064L1.06393 8.55744Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M7.15625 0.554998C7.62164 4.11895 9.04885 7.6861 11.8226 9.98201C12.0367 10.1613 12.3811 10.1005 12.6169 9.99482C12.7317 9.94358 13.1536 9.67781 12.9364 9.49849C10.1968 7.22819 8.81615 3.7411 8.35697 0.221978C8.30422 -0.191094 7.0973 0.0906917 7.15935 0.554998H7.15625Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M0.0594976 8.6761C2.36785 10.9528 4.42799 13.5881 5.39601 16.7742C5.52632 17.2065 6.72394 16.8607 6.59363 16.4412C5.60699 13.2071 3.51582 10.5045 1.17024 8.18938C0.86618 7.89158 -0.263175 8.35589 0.056395 8.6729H0.0594976V8.6761Z" fill="#ec691f"></path>
                <path className="stroke-path" d="M7.00963 16.6866C8.46787 14.0257 10.4318 11.701 12.8177 9.88536C13.0287 9.72526 12.9232 9.50431 12.703 9.44668C12.4113 9.37303 12.0855 9.50431 11.8559 9.68043C9.41727 11.5377 7.38505 13.936 5.89269 16.6578C5.61656 17.1638 6.81417 17.0389 7.00963 16.6834V16.6866Z" fill="#ec691f"></path>
              </g>
              <defs>
                <clipPath id="clip0_1123_13955">
                  <rect width="13" height="17" fill="white" transform="translate(0 -0.00195312)"></rect>
                </clipPath>
              </defs>
            </svg>
          </span>
        </h2>
        <div className="showcase-cards">
          {showcaseData.all.slice(0, 4).map((showcase, index) => (
            <div key={index} className="showcase-card" ref={el => showcaseCardsRef.current[index] = el}>
              <div className="showcase-card-inner">
                <img src={showcase.img} alt={showcase.title} className="showcase-img" />
              </div>
              <h3>{showcase.title}</h3>
            </div>
          ))}
        </div>
        <button className="showcase-btn" onClick={() => window.location.href = '/case-studies'}>Explore Our Creations</button>
      </div>
      {/* Blog Section */}
      <div className="blog-section">
        <h2 className="blog-title">Fresh ideas from the <span className="blog-forefront">forefront</span> of design and tech<span className="dot">.</span></h2>
        <BlogCards blogs={blogData.slice(0, 3)} />
        <button className="blog-btn" onClick={() => window.location.href = '/blog'}>View All Blogs</button>
      </div>
      {/* FAQ Section */}
      <FAQ />
      <Footer />
    </>
  );
};

export default Home; 