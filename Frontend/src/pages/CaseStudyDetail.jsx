import '@/styles/pages/CaseStudyDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

const projects = [
  {
    id: 1,
    title: 'Aicumen AI',
    description: 'Intelligent automation system powered by state-of-the-art AI technology, enabling organizations to streamline operations and enhance productivity through smart solutions.',
    image: '/images/aicumen-ai.webp',
    link: 'https://www.aicumen.ai/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    results: [
      { title: 'Enhanced automation capabilities', description: 'The platform now clearly presents intelligent automation solutions with improved clarity and user understanding.' },
      { title: 'Improved user experience', description: 'Designed with clear interfaces and intuitive workflows, helping users leverage AI technology more effectively.' },
      { title: 'Scalable architecture', description: 'The system architecture is built to support future enhancements and scalable growth across all operations.' }
    ],
    location: 'USA',
    projectName: 'AICUMEN',
    overview: 'The Aicumen AI platform was designed to transform how organizations approach automation. The goal was to build an intelligent system that simplifies complex operations while providing powerful AI-driven solutions.',
    overviewExtended: 'The new platform connects businesses with cutting-edge AI technology, creating a seamless experience from initial setup to full automation, enabling faster decision-making and improved productivity across every stage of operations.',
    industry: 'Technology',
    additionalImages: ['/images/aicumen-ai.webp', '/images/aicumen-ai.webp', '/images/aicumen-ai.webp']
  },
  {
    id: 2,
    title: 'AMRUTKUMAR GOVINDDAS LLP',
    description: 'Sophisticated digital storefront presenting luxury jewelry pieces with intuitive navigation, smooth checkout process, and trusted payment security.',
    image: '/images/amrutkumar-jewelry.webp',
    link: 'https://amrutkumargovinddasllp.com/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '4 months',
    results: [
      { title: 'Improved conversion rates', description: 'The website now clearly presents luxury jewelry collections with improved clarity and user understanding.' },
      { title: 'Enhanced user experience', description: 'Designed with intuitive navigation and seamless shopping experience, helping customers explore premium collections.' },
      { title: 'Mobile-responsive design', description: 'The platform is built to support seamless shopping across all devices and screen sizes.' }
    ],
    location: 'India',
    projectName: 'AMRUTKUMAR',
    overview: 'The AMRUTKUMAR GOVINDDAS LLP website was designed to showcase luxury jewelry collections with elegance and sophistication. The goal was to create a premium digital experience that reflects the brand\'s heritage and quality.',
    overviewExtended: 'The new platform presents luxury jewelry pieces with intuitive navigation and seamless shopping experience, creating a trusted environment for customers to explore and purchase premium collections.',
    industry: 'Jewelry',
    additionalImages: ['/images/amrutkumar-jewelry.webp', '/images/amrutkumar-jewelry.webp', '/images/amrutkumar-jewelry.webp']
  },
  {
    id: 3,
    title: 'AMRUTKUMAR GOVINDDAS LLP (App)',
    description: 'Mobile app experience for AMRUTKUMAR GOVINDDAS LLP, bringing their premium jewelry collection and seamless shopping journey directly to users\' devices.',
    image: '/images/Amrut App.webp',
    link: '#',
    tags: ['#MOBILE APP DESIGN', '#MOBILE APP DEVELOPMENT'],
    techStack: ['React Native', 'Node.js'],
    timeline: '5 months',
    results: [
      { title: 'Native mobile experience', description: 'The app now clearly presents premium jewelry collections with improved clarity and mobile-optimized interface.' },
      { title: 'Improved user engagement', description: 'Designed with seamless navigation and intuitive shopping experience, helping users browse and purchase with ease.' },
      { title: 'Seamless shopping journey', description: 'The app flow is built to support smooth checkout and payment processes across all stages.' }
    ],
    location: 'India',
    projectName: 'AMRUTKUMAR APP',
    overview: 'The AMRUTKUMAR mobile app brings the luxury jewelry shopping experience directly to users\' devices. The goal was to create a native mobile experience that matches the premium quality of the brand.',
    overviewExtended: 'The app provides seamless access to premium jewelry collections, enabling customers to browse, explore, and purchase with ease, creating a faster and more convenient shopping journey.',
    industry: 'Jewelry',
    additionalImages: ['/images/Amrut App.webp', '/images/Amrut App.webp', '/images/Amrut App.webp']
  },
  {
    id: 4,
    title: 'Crosscoin',
    description: 'Contemporary e-commerce destination specializing in premium sock collections, combining stylish aesthetics with superior comfort for daily use.',
    image: '/images/crosscoin.webp',
    link: 'https://crosscoin.in/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    results: [
      { title: 'Modern e-commerce platform', description: 'The website now clearly presents premium sock collections with improved clarity and modern design.' },
      { title: 'Improved sales conversion', description: 'Designed with clear calls-to-action and conversion funnels, helping turn visitors into customers.' },
      { title: 'User-friendly interface', description: 'The platform is built to support intuitive navigation and seamless shopping experience.' }
    ],
    location: 'India',
    projectName: 'CROSSCOIN',
    overview: 'Crosscoin was designed as a contemporary e-commerce destination for premium sock collections.',
    overviewExtended: 'The platform combines stylish aesthetics with superior comfort, creating an engaging shopping experience that showcases quality products with intuitive navigation and seamless checkout.',
    industry: 'E-commerce',
    additionalImages: ['/images/crosscoin.webp', '/images/crosscoin.webp', '/images/crosscoin.webp']
  },
  {
    id: 5,
    title: 'Immune Protector',
    description: 'Comprehensive wellness resource center delivering valuable insights and quality supplements designed to naturally boost and maintain immune health.',
    image: '/images/immune-protector.webp',
    link: 'https://www.immuneprotector.in/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '2 months',
    results: [
      { title: 'Enhanced user engagement', description: 'The website now clearly presents wellness resources with improved clarity and user understanding.' },
      { title: 'Improved content delivery', description: 'Designed with valuable insights and quality supplements, helping users maintain their immune health.' },
      { title: 'Better user experience', description: 'The platform is built to support natural health solutions and trusted information delivery.' }
    ],
    location: 'India',
    projectName: 'IMMUNE PROTECTOR',
    overview: 'Immune Protector is a comprehensive wellness resource center focused on immune health.',
    overviewExtended: 'The platform delivers valuable insights and quality supplements, creating a trusted environment for users to learn about and maintain their immune health naturally.',
    industry: 'Healthcare',
    additionalImages: ['/images/immune-protector.webp', '/images/immune-protector.webp', '/images/immune-protector.webp']
  },
  {
    id: 6,
    title: 'Nanak Finserv',
    description: 'Digital banking ecosystem providing creative financial tools and services tailored for individual consumers and corporate clients seeking modern banking solutions.',
    image: '/images/nanak-finserv.webp',
    link: 'https://nanakfinserv.com/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '4 months',
    results: [
      { title: 'Secure banking platform', description: 'The website now clearly presents financial services with improved clarity and security features.' },
      { title: 'Improved user trust', description: 'Designed with secure banking tools and trusted services, helping users manage finances confidently.' },
      { title: 'Enhanced functionality', description: 'The platform is built to support modern banking solutions for both individuals and businesses.' }
    ],
    location: 'India',
    projectName: 'NANAK FINSERV',
    overview: 'Nanak Finserv is a digital banking ecosystem providing modern financial solutions.',
    overviewExtended: 'The platform offers creative financial tools and services tailored for both individual consumers and corporate clients, creating a seamless banking experience with enhanced security and trust.',
    industry: 'Finance',
    additionalImages: ['/images/nanak-finserv.webp', '/images/nanak-finserv.webp', '/images/nanak-finserv.webp']
  },
  {
    id: 7,
    title: 'Radhe Consultancy',
    description: 'Expert advisory network linking companies with seasoned consultants who deliver strategic guidance to drive organizational expansion and success.',
    image: '/images/radhe-consultancy.webp',
    link: 'https://radheconsultancy.co.in/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    results: [
      { title: 'Professional platform', description: 'The website now clearly presents consultancy services with improved clarity and professional design.' },
      { title: 'Improved client engagement', description: 'Designed with expert advisory network and strategic guidance, helping companies connect with consultants.' },
      { title: 'Better service delivery', description: 'The platform is built to support organizational expansion and business success.' }
    ],
    location: 'India',
    projectName: 'RADHE CONSULTANCY',
    overview: 'Radhe Consultancy is an expert advisory network connecting companies with consultants.',
    overviewExtended: 'The platform links businesses with seasoned consultants who deliver strategic guidance, creating a trusted environment for organizational expansion and success.',
    industry: 'Consulting',
    additionalImages: ['/images/radhe-consultancy.webp', '/images/radhe-consultancy.webp', '/images/radhe-consultancy.webp']
  },
  {
    id: 8,
    title: 'Vivera Lighting',
    description: 'Contemporary illumination specialist creating stylish fixtures and eco-friendly lighting options perfect for both home environments and workplace settings.',
    image: '/images/vivera-lighting.webp',
    link: 'https://www.viveralighting.com/',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    results: [
      { title: 'Modern design showcase', description: 'The website now clearly presents lighting fixtures with improved clarity and modern aesthetics.' },
      { title: 'Improved product visibility', description: 'Designed with stylish fixtures and eco-friendly options, helping customers find perfect lighting solutions.' },
      { title: 'Enhanced user experience', description: 'The platform is built to support both home and workplace lighting needs with elegant design.' }
    ],
    location: 'India',
    projectName: 'VIVERA LIGHTING',
    overview: 'Vivera Lighting is a contemporary illumination specialist showcasing stylish fixtures.',
    overviewExtended: 'The platform presents eco-friendly lighting options perfect for both home and workplace settings, creating an elegant showcase that highlights product quality and design excellence.',
    industry: 'Retail',
    additionalImages: ['/images/vivera-lighting.webp', '/images/vivera-lighting.webp', '/images/vivera-lighting.webp']
  }
];

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  // SEO Integration
  useSEO('case-study-detail');

  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Find current project by ID (caseStudyName is now a project ID string)
  const projectId = parseInt(caseStudyName, 10);
  const currentProject = projects.find(project => project.id === projectId) || projects[0];
  
  const handleVisitSite = () => {
    window.open(currentProject.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="case-study-detail-section">
        <div className="case-study-detail-container">
          {/* Top Section - Tags and Title */}
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="case-study-header">
              <div className="project-tags">
                {currentProject.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
                {currentProject.industry && (
                  <span className="project-tag">{currentProject.industry.toUpperCase()}</span>
                )}
              </div>
              <h1 className="project-title-main">
                <SplitText
                  as="span"
                  splitBy="words"
                  animation="fadeUp"
                  delay={0.05}
                  trigger="onScroll"
                  once={false}
                >
                  {currentProject.title}
                </SplitText>
              </h1>
              <button 
                className="view-website-button"
                onClick={handleVisitSite}
              >
                VIEW WEBSITE ↗
              </button>
            </div>
          </ScrollReveal>

          {/* Full Screen Hero Image */}
          <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="case-study-hero-image">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="hero-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </ScrollReveal>

          {/* Results Cards Section */}
          <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="results-cards-section">
              {currentProject.results?.map((result, resultIndex) => (
                <ScrollReveal 
                  key={resultIndex} 
                  animation="fadeUp" 
                  delay={0.1 + resultIndex * 0.1} 
                  duration={1.2} 
                  trigger="onScroll"
                  ready={!isLoading}
                >
                  <div className="result-card">
                    <h3 className="result-card-title">{result.title || result}</h3>
                    <p className="result-card-description">
                      {result.description || 'The platform delivers exceptional results through innovative design and user-focused solutions.'}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Overview Section */}
          <ScrollReveal animation="fadeUp" delay={0.4} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="overview-section">
              <span className="section-label">OVERVIEW</span>
              <h2 className="overview-title">{currentProject.overview || currentProject.title}</h2>
              <div className="overview-description">
                <p>{currentProject.overviewExtended || currentProject.description}</p>
                <p className="overview-para-2">
                  The platform was built with a focus on user experience and modern design principles. 
                  Every aspect of the interface was carefully crafted to ensure intuitive navigation and 
                  seamless interactions. The design system incorporates best practices in accessibility, 
                  performance, and scalability, making it ready for future growth and enhancements.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Project Details */}
          <ScrollReveal animation="fadeUp" delay={0.5} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="project-details-full">
              <div className="detail-row">
                <span className="detail-label">Client</span>
                <div className="detail-content">
                  <span className="detail-value-bold">{currentProject.projectName || currentProject.title.toUpperCase()}</span>
                  {currentProject.location && (
                    <>
                      <span className="flag-icon">
                        {currentProject.location === 'USA' && '🇺🇸'}
                        {currentProject.location === 'India' && '🇮🇳'}
                        {currentProject.location === 'Australia' && '🇦🇺'}
                      </span>
                      <span className="detail-value-bold">{currentProject.location}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="detail-row">
                <span className="detail-label">Services</span>
                <span className="detail-value-bold">{currentProject.tags?.join(' ').replace(/#/g, '') || 'N/A'}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Technologies</span>
                <span className="detail-value-bold">{currentProject.techStack?.join(', ') || 'N/A'}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Additional Images Gallery */}
          <ScrollReveal animation="fadeUp" delay={0.6} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="case-study-gallery">
              {currentProject.additionalImages?.map((image, index) => (
                <ScrollReveal 
                  key={index}
                  animation="fadeUp" 
                  delay={0.1 + index * 0.1} 
                  duration={1.2} 
                  trigger="onScroll"
                  ready={!isLoading}
                >
                  <div className="gallery-item">
                    <img
                      src={image}
                      alt={`${currentProject.title} - Gallery ${index + 1}`}
                      className="gallery-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
