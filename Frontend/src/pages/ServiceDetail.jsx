import '@/styles/pages/ServiceDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { caseStudyAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

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

// Map each service to industry filter (for web-app service, filter by industry)
const serviceIndustryMap = {
  branding: null, // No filtering
  'web-app': null, // Filter by industry - will be handled dynamically
  marketing: null,
  b2b: null,
};

export default function ServiceDetail({ serviceName, navigateTo, currentPage }) {
  // SEO Integration
  useSEO('service-detail');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('service-detail');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const service = serviceData[serviceName] || serviceData['branding'];
  const otherServices = otherServicesMap[serviceName] || otherServicesMap['branding'];
  const processFlowRef = useRef(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Fetch projects from API based on service category
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchProjects = async () => {
      try {
        let filteredProjects = [];

          // Map service names to categories
          if (serviceName === 'web-app') {
            // For web-app service, fetch both web and app projects
            const [webResponse, appResponse] = await Promise.all([
              caseStudyAPI.getAllPublic('web'),
              caseStudyAPI.getAllPublic('app')
            ]);
            const webProjects = webResponse?.data || [];
            const appProjects = appResponse?.data || [];
            // Combine and remove duplicates
            const allProjects = [...webProjects, ...appProjects];
            const uniqueProjects = allProjects.filter((project, index, self) =>
              index === self.findIndex(p => p.id === project.id)
            );
            filteredProjects = uniqueProjects;
          } else if (serviceName === 'branding') {
            // For branding service, fetch branding projects
            const response = await caseStudyAPI.getAllPublic('branding');
            filteredProjects = response?.data || [];
          } else if (serviceName === 'b2b') {
            // For b2b service, fetch b2b projects
            const response = await caseStudyAPI.getAllPublic('b2b');
            filteredProjects = response?.data || [];
          } else if (serviceName === 'marketing') {
            // For marketing service, fetch marketing projects (if category exists)
            // If marketing category doesn't exist, show all or handle accordingly
            const response = await caseStudyAPI.getAllPublic('marketing');
            filteredProjects = response?.data || [];
          } else {
            // Default: fetch all projects
            const response = await caseStudyAPI.getAllPublic();
            filteredProjects = response?.data || [];
          }

          // Transform API data to match component structure
          const transformedProjects = filteredProjects.map((project) => {
            // Handle image URL - use NEXT_PUBLIC_IMAGE_URL
            let imageUrl = project.image || '/images/placeholder.webp';
            if (project.image) {
              if (project.image.startsWith('http')) {
                // Already a full URL
                imageUrl = project.image;
              } else if (project.image.startsWith('/uploads/')) {
                // Backend upload path - prepend IMAGE URL
                const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
                imageUrl = `${IMAGE_BASE_URL}${project.image}`;
              } else if (!project.image.startsWith('/')) {
                // Relative path without leading slash
                const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
                imageUrl = `${IMAGE_BASE_URL}/${project.image}`;
              }
            }

            return {
              id: project.id,
              title: project.title,
              image: imageUrl,
            };
          });

          // Only update state if component is still mounted
          if (isMounted) {
            setRelatedProjects(transformedProjects);
          }
      } catch (error) {
        console.error('Error fetching projects:', error);
        if (isMounted) {
          setRelatedProjects([]);
        }
      }
    };

    fetchProjects();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [serviceName]);

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
                <div className={`related-projects-slider ${relatedProjects.length === 1 ? 'single-item' : ''}`}>
                  <div className={`related-projects-track ${relatedProjects.length === 1 ? 'single-item' : ''}`}>
                    {relatedProjects.map((project) => (
                      <a
                        key={project.id}
                        href={`/case-study-detail?item=${encodeURIComponent(project.id.toString())}`}
                        className="related-project-card"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('case-study-detail', project.id.toString());
                        }}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
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
                              hoveredProject === project.id ? 'arrow-visible' : ''
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </a>
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
