import '@/styles/pages/CaseStudyDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { caseStudyAPI } from '@/services/api';

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  // SEO Integration
  useSEO('case-study-detail');

  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [error, setError] = useState(null);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Fetch case study from API
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const projectId = parseInt(caseStudyName, 10);
        if (isNaN(projectId)) {
          setError('Invalid case study ID');
          setIsLoading(false);
          return;
        }

        const response = await caseStudyAPI.getByIdPublic(projectId);
        if (response && response.data) {
          const project = response.data;
          
          // Handle image URLs - use NEXT_PUBLIC_IMAGE_URL
          let imageUrl = project.image || '/images/placeholder.webp';
          if (project.image) {
            if (project.image.startsWith('http')) {
              imageUrl = project.image;
            } else if (project.image.startsWith('/uploads/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              imageUrl = `${IMAGE_BASE_URL}${project.image}`;
            } else if (!project.image.startsWith('/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              imageUrl = `${IMAGE_BASE_URL}/${project.image}`;
            }
          }

          // Handle additional images
          const additionalImages = (Array.isArray(project.additionalImages) ? project.additionalImages : []).map((img) => {
            if (img.startsWith('http')) {
              return img;
            } else if (img.startsWith('/uploads/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              return `${IMAGE_BASE_URL}${img}`;
            } else if (!img.startsWith('/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              return `${IMAGE_BASE_URL}/${img}`;
            }
            return img;
          });

          // Transform API data to match component structure
          const transformedProject = {
            id: project.id,
            title: project.title,
            description: project.description || '',
            image: imageUrl,
            link: project.link || '#',
            tags: Array.isArray(project.tags) ? project.tags : [],
            techStack: Array.isArray(project.techStack) ? project.techStack : [],
            timeline: project.timeline || project.duration || '',
            results: Array.isArray(project.results) 
              ? project.results.map(result => 
                  typeof result === 'string' 
                    ? { title: result, description: '' }
                    : result
                )
              : [],
            location: project.location || '',
            projectName: project.projectName || project.title.toUpperCase(),
            overview: project.overview || project.description || '',
            overviewExtended: project.overviewExtended || project.description || '',
            industry: project.industry || '',
            additionalImages: additionalImages.length > 0 ? additionalImages : [imageUrl] // Fallback to main image if no additional images
          };

          setCurrentProject(transformedProject);
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        setError('Failed to load case study. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [caseStudyName]);

  const handleVisitSite = () => {
    if (currentProject && currentProject.link && currentProject.link !== '#') {
      window.open(currentProject.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Show error or loading state
  if (error || !currentProject) {
    return (
      <>
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        <section className="case-study-detail-section">
          <div className="case-study-detail-container">
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>{error || 'Case study not found'}</h2>
              <button onClick={() => navigateTo('case-study')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Back to Case Studies
              </button>
            </div>
          </div>
        </section>
        <Footer navigateTo={navigateTo} />
      </>
    );
  }

  if (!currentProject) {
    return (
      <>
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        <section className="case-study-detail-section">
          <div className="case-study-detail-container">
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>Loading case study...</h2>
            </div>
          </div>
        </section>
        <Footer navigateTo={navigateTo} />
      </>
    );
  }

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
              {currentProject.link && currentProject.link !== '#' && (
                <button 
                  className="view-website-button"
                  onClick={handleVisitSite}
                >
                  VIEW WEBSITE ↗
                </button>
              )}
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
          {currentProject.results && currentProject.results.length > 0 && (
            <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="results-cards-section">
                {currentProject.results.map((result, resultIndex) => (
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
          )}

          {/* Overview Section */}
          <ScrollReveal animation="fadeUp" delay={0.4} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="overview-section">
              <span className="section-label">OVERVIEW</span>
              <h2 className="overview-title">{currentProject.overview || currentProject.title}</h2>
              <div className="overview-description">
                <p>{currentProject.overviewExtended || currentProject.description}</p>
                {currentProject.overviewExtended && (
                  <p className="overview-para-2">
                    The platform was built with a focus on user experience and modern design principles. 
                    Every aspect of the interface was carefully crafted to ensure intuitive navigation and 
                    seamless interactions. The design system incorporates best practices in accessibility, 
                    performance, and scalability, making it ready for future growth and enhancements.
                  </p>
                )}
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
                <span className="detail-value-bold">
                  {currentProject.tags && currentProject.tags.length > 0 
                    ? currentProject.tags.join(' ').replace(/#/g, '') 
                    : 'N/A'}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Technologies</span>
                <span className="detail-value-bold">
                  {currentProject.techStack && currentProject.techStack.length > 0 
                    ? currentProject.techStack.join(', ') 
                    : 'N/A'}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Additional Images Gallery */}
          {currentProject.additionalImages && currentProject.additionalImages.length > 0 && (
            <ScrollReveal animation="fadeUp" delay={0.6} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="case-study-gallery">
                {currentProject.additionalImages.map((image, index) => (
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
          )}
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
