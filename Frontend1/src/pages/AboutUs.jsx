import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/AboutUs.css';
import img from "../assets/logo.png";

const AboutUs = () => {
  const statsRef = useRef(null);
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

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-us-page">
      <Header />
      <div className="about-us-main">
        <div className="hero-section">
          <div className="hero-section-text">
            <p className='hero-title'>About Us</p>
            <h2 className="animated-heading">
              Design With<br />a Heart
              <span className="dot">.</span>
              <svg className="about-arrow-cont" width="159" height="66" viewBox="0 0 159 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M151.291 1.47231C150.994 -0.477626 148.677 -0.398757 148.571 1.16772C148.212 5.98953 144.886 12.0732 140.57 15.16C140.549 15.1756 140.531 15.1961 140.519 15.2197C140.507 15.2433 140.501 15.2694 140.501 15.2959C140.501 15.3224 140.507 15.3485 140.519 15.3722C140.531 15.3958 140.549 15.4163 140.57 15.4319C140.638 15.4884 140.717 15.5297 140.801 15.5532C140.886 15.5766 140.975 15.5817 141.062 15.5679C143.763 15.1355 148.764 11.9182 148.927 9.389C146.665 44.254 120.413 53.2857 89.8091 52.459C74.0519 52.4834 58.4768 48.7087 42.7332 48.5319C27.286 48.6842 10.1608 52.8832 0.0657501 65.3634C0.0366862 65.3972 0.0163759 65.4376 0.00660786 65.4811C-0.00316017 65.5246 -0.00208322 65.5698 0.00973677 65.6128C0.0215568 65.6558 0.0437638 65.6952 0.0743981 65.7276C0.105032 65.76 0.143152 65.7843 0.185412 65.7985C0.258725 65.8263 0.338821 65.8307 0.414752 65.8112C0.490684 65.7918 0.558749 65.7493 0.609666 65.6897C10.8842 53.7345 27.5145 50.0358 42.7006 50.3078C58.4741 50.9143 73.8343 55.203 89.684 55.5348C121.946 57.6398 150.983 47.648 150.505 9.84589C150.521 10.95 154.997 15.7093 158.571 15.8643C158.673 15.8687 158.774 15.8351 158.852 15.7697C158.931 15.7044 158.983 15.6121 158.998 15.5108V15.4972C159.006 15.4393 158.991 15.3806 158.956 15.3334C158.922 15.2862 158.871 15.2543 158.813 15.2443C154.872 14.4365 151.881 5.39666 151.291 1.47231Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path d="M84.284 47.1893C97.1368 47.6842 116.182 46.0253 127.327 39.9117C127.362 39.8993 127.4 39.8992 127.436 39.9114C127.471 39.9236 127.501 39.9473 127.521 39.9788C127.542 40.0103 127.55 40.0476 127.547 40.0848C127.543 40.122 127.527 40.1568 127.501 40.1836C116.805 47.6489 97.1911 49.403 84.2595 47.5047C84.2251 47.4932 84.1956 47.4704 84.1755 47.4401C84.1555 47.4098 84.1461 47.3737 84.1489 47.3375C84.1517 47.3013 84.1666 47.267 84.191 47.2402C84.2155 47.2133 84.2482 47.1954 84.284 47.1893Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path d="M80.6282 46.3309C80.6754 46.3591 80.713 46.401 80.736 46.451C80.7589 46.501 80.7662 46.5568 80.7567 46.611C80.7473 46.6652 80.7217 46.7153 80.6832 46.7547C80.6447 46.794 80.5952 46.8207 80.5412 46.8313C80.3834 46.8313 80.223 46.8313 80.0652 46.815C79.5428 46.7822 79.0225 46.7204 78.5069 46.63C77.9909 46.54 77.4806 46.4202 76.9785 46.2711C76.8235 46.2248 76.6712 46.1759 76.5189 46.1242C76.4707 46.0964 76.4321 46.0544 76.4085 46.004C76.3849 45.9536 76.3773 45.8971 76.3868 45.8423C76.3963 45.7874 76.4224 45.7368 76.4616 45.6972C76.5008 45.6577 76.5512 45.6311 76.6059 45.6211C76.7691 45.6211 76.9296 45.6211 77.09 45.6401C78.1361 45.7049 79.1715 45.8874 80.1767 46.184C80.3399 46.2276 80.4895 46.2792 80.6282 46.3309Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
              </svg>
              <svg className="about-arrow-heart" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.63697 2.35516C8.26683 -0.574749 10.975 9.65116 12.1199 10.6278C13.2649 11.6045 16.5834 -0.252546 23.0245 3.72269C29.4656 7.69792 12.6715 22.7406 11.0818 22.4049C9.09468 21.9852 -2.9929 5.28507 2.63697 2.35516Z" stroke="#ec691f" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </h2>
            <p>We don't just create designs. We craft experiences.</p>
          </div>
          {/* Collage grid of images */}
          <div className="hero-image-collage">
            <img src={img} alt="logo1" className="collage-img rect-horiz" />
            <img src={img} alt="logo2" className="collage-img square" />
            <img src={img} alt="logo3" className="collage-img square" />
            <img src={img} alt="logo4" className="collage-img rect-horiz down" />
          </div>
        </div>
      </div>
      <div className="about-us-content">
        <div className="about-us-content-text">
          <p>Illusio Designs is a premium agency that focuses on quality. We offer a wide range of digital marketing & web development services including graphic design,web design, web development, social media marketing, SEO & more.</p>
          <p>We are a team of designers who are passionate about creating beautiful and functional designs. We are a team of designers who are passionate about creating beautiful and functional designs. We are a team of designers who are passionate about creating beautiful and functional designs.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section" ref={statsRef}>
        <h2 className="stats-title">
          The numbers speak for us
          <span className="dot">.</span>
        </h2>
        <div className="stats-row">
          {statsData.map((stat, idx) => (
            <div className="stat" key={stat.label}>
              <h2 className="stat-number">
                {counts[Object.keys(counts)[idx]]}{stat.suffix}
              </h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision, Goals, Mission Section */}
      <div className="vgm-section">
        <h2 className="vgm-title">We are <span className="vgm-highlight">Illusio Designs.</span></h2>
        <div className="vgm-cards">
          <div className="vgm-card">
            <div className="vgm-icon vgm-icon-vision">
              <svg width="40" height="40" fill="none" stroke="#ec691f" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 12s2.5-7 8-7 8 7 8 7-2.5 7-8 7-8-7-8-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>Our Vision<span className="vgm-dot">.</span></h3>
            <p>To be the leading UX design studio that sets new industry standards while continually pushing the boundaries of creativity and innovation.</p>
          </div>
          <div className="vgm-card">
            <div className="vgm-icon vgm-icon-goals">
              <svg width="40" height="40" fill="none" stroke="#ec691f" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3>Our Goals<span className="vgm-dot">.</span></h3>
            <p>To foster trust, inclusivity, and growth. We welcome individuals from all backgrounds and offer support and encouragement to help them excel and build strong skills. We cultivate teamwork and celebrate individual strengths.</p>
          </div>
          <div className="vgm-card">
            <div className="vgm-icon vgm-icon-mission">
              <svg width="40" height="40" fill="none" stroke="#ec691f" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>Our Mission<span className="vgm-dot">.</span></h3>
            <p>To seamlessly bridge industry solutions with user needs through design, creating intuitive experiences that drive innovation and growth.</p>
          </div>
        </div>
      </div>

     
      {/* Meet the Team Section */}
      <div className="team-section">
        <h2 className="team-title">Meet the Team<span className="dot">.</span></h2>
        <div className="team-row">
          {/* Example team member card, repeat for each role */}
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=ceo" alt="CEO Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Founder</h3>
              <p>Mr. Rushikesh Zinzuvadiya</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=cfo" alt="CFO Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Co-Founder</h3>
              <p>Mrs. Neha Zinzuvadiya</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=backend" alt="Backend Developer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Backend Developer</h3>
              <p>Mr. Maharshi Bhogayata</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=frontend" alt="Frontend Developer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Frontend Developer</h3>
              <p>Ms. Riya Lunagariya</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=frontend" alt="Frontend Developer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Junior Frontend Developer</h3>
              <p>Ms. Mansi Fichadiya</p>
            </div>
          </div>
          
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=uiux" alt="UI/UX Designer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>UI/UX Designer</h3>
              <p>Ms. Mahek Gajipara</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=appdev" alt="Application Developer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Application Developer</h3>
              <p>Ms. Amatullah Bharmal</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=graphics" alt="Graphics Designer Avatar" className="team-avatar" />
            <div className="team-info">
              <h3>Graphics Designer</h3>
              <p>Mr. Abhi Timbadiya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Founder Section */}
      <div className="founder-section">
        <h2 className="founder-title">
          Meet the Founder<span className="dot">.</span>
        </h2>
        <div className="founder-content">
          <div className="founder-quote">
            <span className="founder-quote-mark">“</span>
            <p>
              At Illusio Designs, we believe in the power of design to transform ideas into impactful experiences. Our team is dedicated to pushing boundaries and creating innovative solutions that resonate with users. Together, we're not just designing products; we're crafting stories that inspire and connect.
            </p>
            <span className="founder-name">— Rushikesh Zinzuvadiya.</span>
          </div>
          <div className="founder-image">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=ceo" alt="Founder" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs; 