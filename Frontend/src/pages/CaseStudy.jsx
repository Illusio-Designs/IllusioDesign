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

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const category = categoryMap[activeCategory];
        const response = await caseStudyAPI.getAllPublic();
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
              category: project.category || 'web',
              tags: Array.isArray(project.tags) ? project.tags : [],
              techStack: Array.isArray(project.techStack) ? project.techStack : [],
              timeline: project.timeline || project.duration || '',
              results: Array.isArray(project.results) ? project.results : [],
              location: project.location || '',
              projectName: project.projectName || project.title.toUpperCase()
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

  const filteredProjects = projects.filter(
    (project) => {
      const projectCategory = project.category?.toLowerCase() || '';
      const activeCategoryLower = activeCategory.toLowerCase();
      
      // Map category values to match
      const categoryMapping = {
        'web': ['web', 'website', 'website development', 'test'], // Include 'test' for now
        'app': ['app', 'mobile', 'mobile app', 'application'],
        'branding': ['branding', 'brand', 'design'],
        'b2b': ['b2b', 'custom', 'custom solution', 'dashboard']
      };
      
      // If category matches exactly
      if (projectCategory === activeCategoryLower) {
        return true;
      }
      
      // Check if project category matches any mapped value for active category
      const mappedCategories = categoryMapping[activeCategoryLower] || [];
      if (mappedCategories.includes(projectCategory)) {
        return true;
      }
      
      // For 'web' category, also show projects with no category or empty category
      if (activeCategoryLower === 'web' && (!projectCategory || projectCategory === '')) {
        return true;
      }
      
      return false;
    }
  );
  
  // If filtered projects is empty but we have projects, show all projects (fallback)
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : projects;

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
    const displayProjects = filteredProjects.length > 0 ? filteredProjects : projects;
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
  }, [filteredProjects, projects, animatedProjects]);

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
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title-main">
                    <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                      {project.title}
                    </SplitText>
                  </h3>
                  <div className="project-buttons">
                    <button className="project-name-button">{project.projectName}</button>
                    <button className="project-location-button">
                      {project.location}
                      {project.location === 'USA'}
                      {project.location === 'India'}
                      {project.location === 'Australia'}
                    </button>
                  </div>
                  <div className="project-details-grid">
                    <div className="project-detail-item">
                      <span className="detail-label">TECH STACK</span>
                      <span className="detail-value">{project.techStack.join(', ')}</span>
                    </div>
                    <div className="project-detail-item">
                      <span className="detail-label">TIMELINE</span>
                      <span className="detail-value">{project.timeline}</span>
                    </div>
                  </div>
                  <div className="project-results">
                    <span className="detail-label">RESULTS</span>
                    <ul className="results-list">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex}>{typeof result === 'string' ? result : result.title || result}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className={`explore-button ${hoveredProject === project.id ? 'hovered' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    EXPLORE →
                  </button>
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
