import '@/styles/pages/CaseStudyDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { caseStudyAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';
import DOMPurify from 'dompurify';

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [error, setError] = useState(null);

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('case-study-detail');
  }, []);

  // Helper function to clean strings from escaped characters
  const cleanString = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/\\/g, '') // Remove backslashes
      .replace(/\|/g, '') // Remove pipes
      .replace(/[\[\]"]/g, '') // Remove brackets and quotes
      .trim();
  };

  // Helper function to apply SEO metadata from case study data
  const applySEOFromCaseStudy = (seoData) => {
    if (!seoData) return;

    // Update document title
    if (seoData.seoTitle) {
      document.title = seoData.seoTitle;
    }

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (seoData.metaDescription) {
      metaDescription.setAttribute('content', seoData.metaDescription);
    }

    // Update Open Graph tags
    const ogTags = {
      'og:title': seoData.seoTitle,
      'og:description': seoData.metaDescription,
      'og:type': 'website',
      'og:url': typeof window !== 'undefined' ? window.location.href : null
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (content) {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      }
    });

    // Update Twitter Card tags
    if (seoData.seoTitle) {
      let twitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('name', 'twitter:card');
        twitterCard.setAttribute('content', 'summary_large_image');
        document.head.appendChild(twitterCard);
      }

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', seoData.seoTitle);

      if (seoData.metaDescription) {
        let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (!twitterDescription) {
          twitterDescription = document.createElement('meta');
          twitterDescription.setAttribute('name', 'twitter:description');
          document.head.appendChild(twitterDescription);
        }
        twitterDescription.setAttribute('content', seoData.metaDescription);
      }
    }
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Fetch case study from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCaseStudy = async () => {
      try {
        const projectId = parseInt(caseStudyName, 10);
        if (isNaN(projectId)) {
          if (isMounted) {
            setError('Invalid case study ID');
            setIsLoading(false);
          }
          return;
        }

        const response = await caseStudyAPI.getByIdPublic(projectId);
        
        // Process data regardless of mount status
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
            tags: Array.isArray(project.tags) 
              ? project.tags.map(tag => cleanString(tag)).filter(tag => tag)
              : (typeof project.tags === 'string' ? project.tags.split(',').map(t => cleanString(t)).filter(t => t) : []),
            techStack: Array.isArray(project.techStack) 
              ? project.techStack.map(tech => cleanString(tech)).filter(tech => tech)
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
            industry: project.industry || '',
            additionalImages: additionalImages.length > 0 ? additionalImages : [imageUrl] // Fallback to main image if no additional images
          };

          // Only update state if component is still mounted
          if (isMounted) {
            setCurrentProject(transformedProject);
            
            // Apply SEO metadata directly from case study response
            if (project.seoTitle || project.metaDescription) {
              applySEOFromCaseStudy({
                seoTitle: project.seoTitle,
                metaDescription: project.metaDescription,
                seoUrl: project.seoUrl
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        if (isMounted) {
          setError('Failed to load case study. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCaseStudy();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
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
              {(currentProject.tags && currentProject.tags.length > 0) || currentProject.industry ? (
                <div className="project-tags">
                  {currentProject.tags?.map((tag, tagIndex) => {
                    const cleanTag = cleanString(tag);
                    return cleanTag ? (
                      <span key={tagIndex} className="project-tag">{cleanTag}</span>
                    ) : null;
                  })}
                  {currentProject.industry && (
                    <span className="project-tag">{cleanString(currentProject.industry).toUpperCase()}</span>
                  )}
                </div>
              ) : null}
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

          {/* Results Cards Section - Show only first 3 as boxes */}
          {currentProject.results && currentProject.results.length > 0 && (
            <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="results-cards-section">
                {currentProject.results.slice(0, 3).map((result, resultIndex) => (
                  <ScrollReveal 
                    key={resultIndex} 
                    animation="fadeUp" 
                    delay={0.1 + resultIndex * 0.1} 
                    duration={1.2} 
                    trigger="onScroll"
                    ready={!isLoading}
                  >
                    <div className="result-card">
                      <h3 className="result-card-title">
                        {result || ''}
                      </h3>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              {/* Show description after the boxes if there are more than 3 results */}
              {currentProject.results.length > 3 && (
                <div style={{ marginTop: '2rem' }}>
                  {(() => {
                    const description = currentProject.description || 'The platform delivers exceptional results through innovative design and user-focused solutions.';
                    // Normalize content first
                    let contentString = normalizeContentForDisplay(description);
                    
                    // Sanitize content on client side only
                    let sanitizedContent = contentString;
                    if (typeof window !== 'undefined') {
                      try {
                        // Use DOMPurify if available
                        const purify = typeof DOMPurify !== 'undefined' && DOMPurify ? DOMPurify : (window.DOMPurify || null);
                        
                        if (purify && typeof purify.sanitize === 'function') {
                          // More permissive DOMPurify config to preserve TipTap formatting and emojis
                          sanitizedContent = purify.sanitize(contentString, {
                            ALLOWED_TAGS: [
                              'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del', 'ins',
                              'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                              'ul', 'ol', 'li',
                              'a', 'img',
                              'blockquote', 'pre', 'code',
                              'div', 'span',
                              'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
                              'b', 'i', 'sub', 'sup', 'small',
                              'hr', 'bdo', 'bdi'
                            ],
                            ALLOWED_ATTR: [
                              'href', 'src', 'alt', 'title', 'class', 'style', 
                              'target', 'width', 'height', 'rel', 'colspan', 'rowspan',
                              'id', 'dir', 'lang', 'align', 'valign'
                            ],
                            ALLOW_DATA_ATTR: false,
                            KEEP_CONTENT: true, // Preserves all text content including emojis and Unicode characters
                            USE_PROFILES: { html: true },
                            RETURN_DOM: false,
                            RETURN_DOM_FRAGMENT: false,
                            RETURN_TRUSTED_TYPE: false,
                            FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
                            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
                            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
                          });
                          
                          // Fallback to original if sanitization removed everything
                          if (!sanitizedContent || sanitizedContent.trim().length === 0) {
                            sanitizedContent = contentString;
                          }
                        } else {
                          sanitizedContent = contentString;
                        }
                      } catch (error) {
                        console.error('Error sanitizing content:', error);
                        sanitizedContent = contentString;
                      }
                    }
                    
                    return (
                      <div 
                        style={{ color: '#666', lineHeight: '1.6' }}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                      />
                    );
                  })()}
                </div>
              )}
              {/* If 3 or fewer results, show description */}
              {currentProject.results.length <= 3 && currentProject.description && (
                <div style={{ marginTop: '2rem' }}>
                  {(() => {
                    const description = currentProject.description;
                    // Normalize content first
                    let contentString = normalizeContentForDisplay(description);
                    
                    // Sanitize content on client side only
                    let sanitizedContent = contentString;
                    if (typeof window !== 'undefined') {
                      try {
                        // Use DOMPurify if available
                        const purify = typeof DOMPurify !== 'undefined' && DOMPurify ? DOMPurify : (window.DOMPurify || null);
                        
                        if (purify && typeof purify.sanitize === 'function') {
                          // More permissive DOMPurify config to preserve TipTap formatting and emojis
                          sanitizedContent = purify.sanitize(contentString, {
                            ALLOWED_TAGS: [
                              'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del', 'ins',
                              'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                              'ul', 'ol', 'li',
                              'a', 'img',
                              'blockquote', 'pre', 'code',
                              'div', 'span',
                              'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
                              'b', 'i', 'sub', 'sup', 'small',
                              'hr', 'bdo', 'bdi'
                            ],
                            ALLOWED_ATTR: [
                              'href', 'src', 'alt', 'title', 'class', 'style', 
                              'target', 'width', 'height', 'rel', 'colspan', 'rowspan',
                              'id', 'dir', 'lang', 'align', 'valign'
                            ],
                            ALLOW_DATA_ATTR: false,
                            KEEP_CONTENT: true, // Preserves all text content including emojis and Unicode characters
                            USE_PROFILES: { html: true },
                            RETURN_DOM: false,
                            RETURN_DOM_FRAGMENT: false,
                            RETURN_TRUSTED_TYPE: false,
                            FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
                            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
                            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
                          });
                          
                          // Fallback to original if sanitization removed everything
                          if (!sanitizedContent || sanitizedContent.trim().length === 0) {
                            sanitizedContent = contentString;
                          }
                        } else {
                          sanitizedContent = contentString;
                        }
                      } catch (error) {
                        console.error('Error sanitizing content:', error);
                        sanitizedContent = contentString;
                      }
                    }
                    
                    return (
                      <div 
                        style={{ color: '#666', lineHeight: '1.6' }}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                      />
                    );
                  })()}
                </div>
              )}
            </ScrollReveal>
          )}

          {/* Project Details */}
          <ScrollReveal animation="fadeUp" delay={0.5} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="project-details-full">
              <div className="detail-row">
                <span className="detail-label">Client</span>
                <div className="detail-content">
                  <span className="detail-value-bold">{currentProject.clientName || currentProject.title}</span>-
                  {currentProject.location && (
                    <span className="detail-value-bold">
                      {currentProject.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="detail-row">
                <span className="detail-label">Services</span>
                <span className="detail-value-bold">
                  {currentProject.services || 'N/A'}
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
