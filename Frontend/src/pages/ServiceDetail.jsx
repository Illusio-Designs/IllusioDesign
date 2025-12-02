import '@/styles/pages/ServiceDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useEffect, useRef, useState } from 'react';

const caseStudyProjects = [
  {
    id: 1,
    title: 'Aicumen AI',
    image: '/images/aicumen-ai.webp',
  },
  {
    id: 2,
    title: 'AMRUTKUMAR GOVINDDAS LLP',
    image: '/images/amrutkumar-jewelry.webp',
  },
  {
    id: 3,
    title: 'Crosscoin',
    image: '/images/crosscoin.webp',
  },
  {
    id: 4,
    title: 'Immune Protector',
    image: '/images/immune-protector.webp',
  },
  {
    id: 5,
    title: 'Nanak Finserv',
    image: '/images/nanak-finserv.webp',
  },
  {
    id: 6,
    title: 'Radhe Consultancy',
    image: '/images/radhe-consultancy.webp',
  },
  {
    id: 7,
    title: 'Vivera Lighting',
    image: '/images/vivera-lighting.webp',
  },
  {
    id: 8,
    title: 'AMRUTKUMAR GOVINDDAS LLP (App)',
    image: '/images/Amrut App.webp',
  },
];

const serviceData = {
  'branding': {
    title: ['Carve Your Brand\'s', 'Iconic Mark.'],
    processTitle: 'Where Identity Begins.',
    layoutType: 'branding',
    description: [
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.'
    ],
    processSteps: [
      { number: 1, title: 'Understand the Brand', position: 'top-right' },
      { number: 2, title: 'Research & Inspiration', position: 'middle-right' },
      { number: 3, title: 'Concept & Sketching', position: 'middle-left' },
      { number: 4, title: 'Digital Drafting', position: 'bottom-left' },
      { number: 5, title: 'Typography & Color', position: 'bottom-middle' },
      { number: 6, title: 'Review & Feedback', position: 'bottom-right' },
    ],
  },
  'web-app': {
    title: ['Shape Your Brand,', 'Stand Out!'],
    processTitle: 'Timeless Brand Identity.',
    layoutType: 'branding',
    description: [
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.'
    ],
    processSteps: [
      { number: 1, title: 'Discovery & Research', position: 'top-right' },
      { number: 2, title: 'Strategy & Positioning', position: 'middle-right' },
      { number: 3, title: 'Visual Direction', position: 'middle-left' },
      { number: 4, title: 'Identity Design', position: 'bottom-left' },
      { number: 5, title: 'Guidelines & Delivery', position: 'bottom-middle' },
      { number: 6, title: 'Review & Feedback', position: 'bottom-right' },
    ],
  },
  'marketing': {
    title: ['Your Product, Our', 'Stunning Wrap!'],
    processTitle: 'Packaging That Speaks.',
    layoutType: 'branding',
    description: [
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.'
    ],
    processSteps: [
      { number: 1, title: 'Research & Understanding', position: 'top-right' },
      { number: 2, title: 'Concept Development', position: 'middle-right' },
      { number: 3, title: 'Design & Visualization', position: 'middle-left' },
      { number: 4, title: 'Refine & Deliver', position: 'bottom-left' },
      { number: 5, title: 'Final Handover', position: 'bottom-middle' },
      { number: 6, title: 'Review & Feedback', position: 'bottom-right' },
    ],
  },
  'b2b': {
    title: ['Spark Your Digital', 'Presence!'],
    processTitle: 'Unified Digital Journeys.',
    layoutType: 'branding',
    description: [
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.'
    ],
    processSteps: [
      { number: 1, title: 'Discovery & Research', position: 'top-right' },
      { number: 2, title: 'Frame & Design Pulse', position: 'middle-right' },
      { number: 3, title: 'UI & Visual Design', position: 'middle-left' },
      { number: 4, title: 'Proto & UX Design', position: 'bottom-left' },
      { number: 5, title: 'Final Handover', position: 'bottom-middle' },
      { number: 6, title: 'Review & Feedback', position: 'bottom-right' },
    ],
  },
};

const otherServicesMap = {
  'branding': [
    'Brand Identity',
    'Packaging Design',
    'Web & App Design',
    'Web Redesign',
  ],
  'web-app': [
    'Logo Design',
    'Packaging Design',
    'Web & App Design',
    'Web Redesign',
  ],
  'marketing': [
    'Logo Design',
    'Brand Identity',
    'Web & App Design',
    'Web Redesign',
  ],
  'b2b': [
    'Logo Design',
    'Brand Identity',
    'Packaging Design',
    'Web Redesign',
  ],
};

// Map each service to related project IDs
const serviceProjectsMap = {
  branding: [],
  'web-app': [1, 2, 3, 4, 5, 6, 7, 8],
  marketing: [],
  b2b: [],
};

export default function ServiceDetail({ serviceName, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const service = serviceData[serviceName] || serviceData['branding'];
  const otherServices = otherServicesMap[serviceName] || otherServicesMap['branding'];
  const processFlowRef = useRef(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const relatedProjectIds = serviceProjectsMap[serviceName] || [];
  const relatedProjects = caseStudyProjects.filter((project) =>
    relatedProjectIds.includes(project.id)
  );

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceName]);

  // Animate line on scroll - reveal from start
  useEffect(() => {
    if (!processFlowRef.current) return;

    const updateProgress = () => {
      const rect = processFlowRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start revealing when element enters viewport
      const startPoint = windowHeight;
      const endPoint = -elementHeight;
      const progress = Math.max(
        0,
        Math.min(1, (startPoint - elementTop) / (startPoint - endPoint))
      );
      
      setLineProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial check

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="service-detail-section">
        <div className="service-detail-container">
          {/* Main Title */}
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                {service.title[0]}
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                {service.title[1]}
              </SplitText>
            </h1>
          </ScrollReveal>

          {/* Content Section - Two Columns */}
          <div className="service-content-layout">
            <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false}>
              <div className="service-image-placeholder">
                {/* Image placeholder */}
              </div>
            </ScrollReveal>
            <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
              <div className="service-description">
                {service.description && service.description.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Our Process Section */}
          <div className="process-section">
            <div className="process-content">
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
                <div className="process-header">
                  <span className="process-label">Our Process</span>
                  <h2 className="process-title">{service.processTitle}</h2>
                </div>
              </ScrollReveal>
              
              <div 
                ref={processFlowRef}
                className={`process-flow process-flow-${service.layoutType}`}
              >
                {/* Flow line image - starts from end of "Begins." title, passes through each card dot in sequence */}
                <img 
                  src="/images/flowline.webp" 
                  alt="Process flow line" 
                  className="process-flow-line"
                />
                {service.processSteps.map((step, index) => (
                  <ScrollReveal 
                    key={step.number} 
                    as="div" 
                    animation="fadeUp" 
                    delay={0.1 + index * 0.05} 
                    duration={1.5} 
                    once={false}
                    ready={!isLoading}
                    className={`process-card-wrapper process-card-${step.position}`}
                  >
                    <div className="process-card">
                      <div className="process-card-dot"></div>
                      <span className="process-card-content">
                        <span className="process-number">{step.number}.</span> {step.title}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Our Other Services Section */}
          <div className="other-services-section">
            <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
              <div className="other-services-content">
                <div className="other-services-header">
                  <h3 className="other-services-title">
                    <span className="other-services-title-small">Our Other</span>
                    <span className="other-services-title-large">Services in Design</span>
                  </h3>
                </div>
                <div className="other-services-divider"></div>
                <div className="other-services-list">
                  {otherServices.map((serviceName, index) => (
                    <span 
                      key={index}
                      className="other-service-link"
                    >
                      {serviceName}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Related Projects Slider - only show if this service has mapped projects */}
          {relatedProjects.length > 0 && (
            <section className="related-projects-section">
              <div className="related-projects-container">
                <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
                  <h2 className="section-title related-projects-title">
                    <SplitText
                      as="span"
                      splitBy="words"
                      animation="fadeUp"
                      delay={0.05}
                      trigger="onScroll"
                      once={false}
                    >
                      Related Projects
                    </SplitText>
                  </h2>
                </ScrollReveal>
                <div className="related-projects-slider">
                  <div className="related-projects-track">
                    {relatedProjects.map((project) => (
                      <div
                        key={`${project.id}-rel-1`}
                        className="related-project-card"
                        onClick={() => navigateTo('case-study-detail', project.id.toString())}
                        onMouseEnter={() => setHoveredProject(`${project.id}-rel-1`)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        <div className="related-project-image-container">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="related-project-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="related-project-title-container">
                          <h3>{project.title}</h3>
                          <span
                            className={`related-project-arrow ${
                              hoveredProject === `${project.id}-rel-1` ? 'arrow-visible' : ''
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    ))}
                    {relatedProjects.map((project) => (
                      <div
                        key={`${project.id}-rel-2`}
                        className="related-project-card"
                        onClick={() => navigateTo('case-study-detail', project.id.toString())}
                        onMouseEnter={() => setHoveredProject(`${project.id}-rel-2`)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        <div className="related-project-image-container">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="related-project-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="related-project-title-container">
                          <h3>{project.title}</h3>
                          <span
                            className={`related-project-arrow ${
                              hoveredProject === `${project.id}-rel-2` ? 'arrow-visible' : ''
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
