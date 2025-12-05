import '@/styles/pages/CaseStudy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { caseStudyAPI } from '@/services/api';

export default function CaseStudy({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('case-study');

  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('web');
  const [animatedProjects, setAnimatedProjects] = useState(new Set());
  const [projects, setProjects] = useState([]);
  const projectRefs = useRef([]);

  // Helper function to clean strings from escaped characters
  const cleanString = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/\\/g, '') // Remove backslashes
      .replace(/\|/g, '') // Remove pipes
      .replace(/[\[\]"]/g, '') // Remove brackets and quotes
      .trim();
  };

  // Map category keys to API category values
  const categoryMap = {
    'branding': 'branding',
    'web': 'web',
    'app': 'app',
    'b2b': 'b2b'
  };

  const categories = [
    { key: 'branding', label: 'Branding & Design' },
    { key: 'web', label: 'Web' },
    { key: 'app', label: 'App' },
    { key: 'b2b', label: 'B2B & Custom Solution' }
  ];

  // Fetch projects from API based on selected category
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get category value for API (map UI key to API value)
        const apiCategory = categoryMap[activeCategory] || activeCategory;
        const response = await caseStudyAPI.getAllPublic(apiCategory);
        if (response && response.data) {
          // Transform API data to match component structure
          const transformedProjects = response.data.map((project) => {
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
              description: project.description || '',
              image: imageUrl,
              link: project.link || '#',
              category: project.category ? cleanString(project.category).toLowerCase() : '',
              tags: Array.isArray(project.tags) 
                ? project.tags.map(tag => cleanString(tag)).filter(t => t)
                : (typeof project.tags === 'string' ? project.tags.split(',').map(t => cleanString(t)).filter(t => t) : []),
              techStack: Array.isArray(project.techStack) 
                ? project.techStack.map(tech => cleanString(tech)).filter(t => t)
                : (typeof project.techStack === 'string' ? project.techStack.split(',').map(t => cleanString(t)).filter(t => t) : []),
              timeline: project.timeline || project.duration || '',
              duration: project.duration || project.timeline || '',
              services: project.services || project.category || '',
              results: (() => {
                try {
                  let resultsArray = project.results;
                  
                  // If results is a string, try to parse it as JSON
                  if (typeof resultsArray === 'string') {
                    try {
                      resultsArray = JSON.parse(resultsArray);
                    } catch (e) {
                      // If not JSON, treat as single string result
                      const cleanResult = cleanString(resultsArray);
                      return cleanResult ? [cleanResult] : [];
                    }
                  }
                  
                  // Handle array of results - just strings now
                  if (Array.isArray(resultsArray)) {
                    return resultsArray.map(result => {
                      // If result is a string, use it directly
                      if (typeof result === 'string') {
                        return cleanString(result);
                      }
                      // For backward compatibility with old object format
                      if (result && typeof result === 'object') {
                        return cleanString(result.title || result.description || '');
                      }
                      return '';
                    }).filter(r => r);
                  }
                  
                  return [];
                } catch (e) {
                  console.error('Error parsing results:', e);
                  return [];
                }
              })(),
              location: project.location || '',
              clientName: project.clientName || project.projectName || '',
              industry: project.industry || ''
            };
          });
          setProjects(transformedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [activeCategory]);

  // Projects are already filtered by API, so use them directly
  const displayProjects = projects;

  // Reset animated projects when category changes
  useEffect(() => {
    setAnimatedProjects(new Set());
    projectRefs.current = [];
  }, [activeCategory]);

  const handleProjectClick = (project) => {
    navigateTo('case-study-detail', project.id.toString());
  };

  // Trigger boom animation when project comes into view
  useEffect(() => {
    if (displayProjects.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = entry.target.dataset.projectId;
          if (projectId && !animatedProjects.has(projectId)) {
            setAnimatedProjects(prev => new Set([...prev, projectId]));
            // Add animation class
            const imageWrapper = entry.target.querySelector('.project-image-wrapper');
            if (imageWrapper) {
              imageWrapper.classList.add('animate-boom');
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [displayProjects, animatedProjects]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="projects-section" id="case-study">
        <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
          <h1 className="section-title">
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Case Studies
            </SplitText>
          </h1>
        </ScrollReveal>
        <div className="projects-tabs">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`projects-tab-button ${
                activeCategory === category.key ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="projects-list">
          {displayProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  projectRefs.current[index] = el;
                }
              }}
              data-project-id={project.id}
              className="project-card-vertical"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
                <div className="project-visual">
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="project-info-wrapper">
                  <div className="project-info">
                  {(project.tags && project.tags.length > 0) || project.industry ? (
                    <div className="project-tags">
                      {project.tags && project.tags.map((tag, tagIndex) => {
                        const cleanTag = cleanString(tag);
                        return cleanTag ? (
                          <span key={tagIndex} className="project-tag">{cleanTag}</span>
                        ) : null;
                      })}
                      {project.industry && (
                        <span className="project-tag">{cleanString(project.industry).toUpperCase()}</span>
                      )}
                    </div>
                  ) : null}
                  <h3 className="project-title-main">
                    <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                      {project.title}
                    </SplitText>
                  </h3>
                  <div className="project-buttons">
                    {project.clientName && (
                      <button className="project-name-button">{project.clientName}</button>
                    )}
                    {project.location && (
                      <button className="project-location-button">
                        {project.location}
                      </button>
                    )}
                  </div>
                  <div className="project-details-grid">
                    <div className="project-detail-item">
                      <span className="detail-label">TECH STACK</span>
                      <span className="detail-value">
                        {project.techStack && project.techStack.length > 0 
                          ? project.techStack.join(', ')
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="project-detail-item">
                      <span className="detail-label">TIMELINE</span>
                      <span className="detail-value">{project.duration || project.timeline || 'N/A'}</span>
                    </div>
                  </div>
                  {project.results && project.results.length > 0 && (
                    <div className="project-results">
                      <span className="detail-label">RESULTS</span>
                      <ul className="results-list">
                        {project.results.map((result, resultIndex) => {
                          if (!result) return null;
                          return (
                            <li key={resultIndex}>{result}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <a 
                    href={`/case-study-detail?item=${encodeURIComponent(project.id.toString())}`}
                    className={`explore-button ${hoveredProject === project.id ? 'hovered' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    EXPLORE →
                  </a>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
