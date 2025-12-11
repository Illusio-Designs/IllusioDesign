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
import { toSlug } from '@/utils/urlSlug';

const serviceData = {
  'branding': {
    title: ['Carve Your Brand\'s', 'Iconic Mark.'],
    processTitle: 'Where Identity Begins.',
    layoutType: 'branding',
    image: '/images/Branding&Designing.webp',
    description: [
      'A powerful brand is the foundation of every successful business. We craft brand identities that not only look stunning but also communicate your story with clarity and purpose. From your logo to your visual elements, each component is thoughtfully designed to reflect your brand’s values and leave a strong impression on your audience.',
      'Our team blends strategy with creativity to build a complete identity system that works across every platform—digital, print, and social. Whether you\'re launching a new brand or refreshing an old one, we create cohesive visuals and guidelines that maintain consistency and help your brand stand out in a competitive market.',
    ],
    processSteps: [
      { number: 1, title: 'Brand Discovery', position: 'top-right' },
      { number: 2, title: 'Strategic Direction', position: 'middle-right' },
      { number: 3, title: 'Visual Planning', position: 'middle-left' },
      { number: 4, title: 'Identity Design', position: 'bottom-left' },
      { number: 5, title: 'Brand Guidelines', position: 'bottom-middle' },
      { number: 6, title: 'Final Delivery', position: 'bottom-right' },
    ],
  },
  'web-app': {
    title: ['Shape Your Brand,', 'Stand Out!'],
    processTitle: 'Timeless Brand Identity.',
    layoutType: 'branding',
    image: '/images/web&app.webp',
    description: [
      'Your website and app are the digital faces of your brand, and we build them with perfection in mind. Our focus is on blending beautiful designs with high performance, ensuring that every page feels smooth, modern, and user-friendly. Whether it’s a business website, an e-commerce store, or a full-featured mobile app—we deliver solutions tailored to your business needs.',
      'We use the latest technologies and clean code practices to create digital products that load fast, work on all devices, and scale with your growth. From UI/UX design to backend development, we ensure every project is secure, optimized, and built for long-term success.',
      'We emphasize scalability, security, and performance across every platform we build. With clean code practices and modern frameworks, your website or app becomes a future-ready digital asset. From adding new modules to integrating complex systems, we ensure your product grows smoothly as your business expands.',
    ],
    processSteps: [
      { number: 1, title: 'Project Planning', position: 'top-right' },
      { number: 2, title: 'UX Wireframing', position: 'middle-right' },
      { number: 3, title: 'UI Designing', position: 'middle-left' },
      { number: 4, title: 'Core Development', position: 'bottom-left' },
      { number: 5, title: 'Quality Testing', position: 'bottom-middle' },
      { number: 6, title: 'Live Deployment', position: 'bottom-right' },
    ],
  },
  'marketing': {
    title: ['Your Product, Our', 'Stunning Wrap!'],
    processTitle: 'Packaging That Speaks.',
    layoutType: 'branding',
    image: '/images/digitalmarketing.webp',
    description: [
      'In a world where attention is the real currency, we help brands grow with strategies that cut through the noise. Our digital marketing approach blends creativity with data-driven insights, allowing your business to reach the right audience with the right message. From social media to paid ads, we ensure your brand stays visible and engaging.',
      'Every campaign is tailored to your goals—whether it’s brand building, lead generation, or increasing sales. We continuously optimize performance, track metrics, and refine strategies to deliver measurable results. With consistent execution and smart planning, we help your brand grow across all digital platforms.',
      'We don\'t believe in random posting or generic ads. Every marketing tactic is backed by insight, testing, and data-driven improvements. Our goal is to build long-lasting visibility and consistent growth, ensuring your brand stays relevant in a fast-changing digital landscape.',
    ],
    processSteps: [
      { number: 1, title: 'Market Research', position: 'top-right' },
      { number: 2, title: 'Campaign Planning', position: 'middle-right' },
      { number: 3, title: 'Content Creation', position: 'middle-left' },
      { number: 4, title: 'Ad Execution', position: 'bottom-left' },
      { number: 5, title: 'Ad Optimization', position: 'bottom-middle' },
      { number: 6, title: 'Analytics Reporting', position: 'bottom-right' },
    ],
  },
  'b2b': {
    title: ['Spark Your Digital', 'Presence!'],
    processTitle: 'Unified Digital Journeys.',
    layoutType: 'branding',
    image: '/images/b2b.webp',  
    description: [
      'Every business operates differently, so we develop custom-built solutions designed to match your internal workflow and long-term goals. Whether it’s a CRM, ERP, portal, or automation tool, our systems streamline operations, improve efficiency, and help teams work smarter—not harder.',
      'We focus on building secure, scalable, and user-friendly platforms that simplify complex processes and enhance decision-making. With deep technical expertise and an understanding of business needs, we create digital infrastructure that supports growth and delivers real value to your organization.',
      'Beyond creating custom workflows, we help businesses streamline operations and reduce repetitive manual tasks. Our tailor-made solutions improve efficiency, accuracy and decision-making by integrating smart automation and easy-to-use dashboards. The result is a system built around your business — not the other way around.',
    ],
    processSteps: [
      { number: 1, title: 'Business Analysis', position: 'top-right' },
      { number: 2, title: 'Process Mapping', position: 'middle-right' },
      { number: 3, title: 'System Architecture', position: 'middle-left' },
      { number: 4, title: 'Module Development', position: 'bottom-left' },
      { number: 5, title: 'API Integration', position: 'bottom-middle' },
      { number: 6, title: 'System Deployment', position: 'bottom-right' },
    ],
  },
};

const otherServicesMap = {
  'branding': [
    'Logo Design',
    'UI/UX Design',
    'Brand Identity System',
    'Brand Guidelines',
    'Packaging & Print Design',
    'Creative Visuals & Social Media Branding',
  ],
  'web-app': [
    'Website Development',
    'Mobile App Development (iOS & Android)',
    'Landing Pages',
    'Speed Optimization',
    'E-Commerce Solutions',
    'Admin Panels & Dashboards',
  ],
  'marketing': [
    'Social Media Management',
    'Performance Marketing (Meta & Google Ads)',
    'SEO Optimization',
    'Content Strategy & Copywriting',
    'Lead Generation',
    'Email Marketing & Automation',
  ],
  'b2b': [
    'Custom Portals',
    'Automation Systems',
    'CRM & ERP Development',
    'Reporting Dashboards',
    'Data Integration & APIs',
    'B2B eCommerce Solutions',
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
                {service.image && (
                  <img
                    src={service.image}
                    alt={`${serviceName || 'service'} visual`}
                    className="service-image"
                  />
                )}
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
                    <>
                      {/* First set of cards */}
                      {relatedProjects.map((project) => (
                        <a
                          key={`original-${project.id}`}
                          href={`/case-studies/${project.seoUrl || (project.title ? toSlug(project.title) : project.id)}`}
                          className="related-project-card"
                          onClick={(e) => {
                            e.preventDefault();
                            const slug = project.seoUrl || (project.title ? toSlug(project.title) : project.id.toString());
                            navigateTo('case-study-detail', slug);
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
                      {/* Duplicate set for seamless infinite loop */}
                      {relatedProjects.map((project) => (
                        <a
                          key={`duplicate-${project.id}`}
                          href={`/case-studies/${project.seoUrl || (project.title ? toSlug(project.title) : project.id)}`}
                          className="related-project-card"
                          onClick={(e) => {
                            e.preventDefault();
                            const slug = project.seoUrl || (project.title ? toSlug(project.title) : project.id.toString());
                            navigateTo('case-study-detail', slug);
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
                    </>
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
