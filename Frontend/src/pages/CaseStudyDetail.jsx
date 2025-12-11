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

// Helper function to sanitize HTML content while preserving emojis
const sanitizeHTMLContent = (content) => {
  if (!content || typeof content !== 'string') {
    return '';
  }
  
  // Normalize content first
  let contentString = normalizeContentForDisplay(content);
  
  // Sanitize content on client side only
  let sanitizedContent = contentString;
  if (typeof window !== 'undefined') {
    try {
      // Use DOMPurify if available
      const purify = typeof DOMPurify !== 'undefined' && DOMPurify ? DOMPurify : (window.DOMPurify || null);
      
      if (purify && typeof purify.sanitize === 'function') {
        // More permissive DOMPurify config to preserve TipTap formatting and emojis
        // KEEP_CONTENT: true ensures all text content including emojis (Unicode characters) is preserved
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
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          WHOLE_DOCUMENT: false
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
  
  return sanitizedContent;
};

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
        // Use slug/identifier directly (can be ID or slug)
        const response = await caseStudyAPI.getByIdPublic(caseStudyName);
        
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
            challenges: project.challenges || '',
            solution: project.solution || '',
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
            conclusion: project.conclusion || '',
            results: (() => {
                try {
                  let resultsData = project.results;
                  
                  // If results is a string, check if it's HTML content
                  if (typeof resultsData === 'string') {
                    // Check if it's HTML content (from rich text editor) - check for various HTML tags
                    if (resultsData.includes('<p>') || resultsData.includes('<ul>') || resultsData.includes('<ol>') || resultsData.includes('<li>') || resultsData.includes('<div>') || resultsData.includes('<h1>') || resultsData.includes('<h2>') || resultsData.includes('<h3>') || resultsData.includes('<h4>') || resultsData.includes('<h5>') || resultsData.includes('<h6>') || resultsData.includes('<br>') || resultsData.includes('<strong>') || resultsData.includes('<em>') || resultsData.includes('<b>') || resultsData.includes('<i>')) {
                      // Return HTML string directly for rendering (preserves all formatting and emojis)
                      return resultsData;
                    }
                    
                    // If it's a plain string (no HTML tags), wrap it in a paragraph to preserve emojis
                    if (resultsData.trim()) {
                      return `<p>${resultsData}</p>`;
                    }
                    
                    // Try to parse as JSON array (for backward compatibility with old data)
                    try {
                      const parsed = JSON.parse(resultsData);
                      if (Array.isArray(parsed)) {
                        resultsData = parsed;
                      } else {
                        return '';
                      }
                    } catch (e) {
                      // Not JSON, return empty
                      return '';
                    }
                  }
                  
                  // Handle array of results - convert to HTML list for display (backward compatibility)
                  if (Array.isArray(resultsData)) {
                    const items = resultsData.map(result => {
                      // If result is a string, use it directly (don't clean to preserve emojis)
                      if (typeof result === 'string') {
                        return result.trim();
                      }
                      // For backward compatibility with old object format
                      if (result && typeof result === 'object') {
                        return (result.title || result.description || '').trim();
                      }
                      return '';
                    }).filter(r => r);
                    
                    // Convert array to HTML list for consistent display
                    if (items.length > 0) {
                      return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                    }
                  }
                  
                  return '';
                } catch (e) {
                  console.error('Error parsing results:', e);
                  return '';
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

  // Show loading state until data is loaded
  if (isLoading || !currentProject) {
    return (
      <>
        <Loader onComplete={handleLoaderComplete} />
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

          {/* Description Section with Sticky Project Details */}
          {currentProject.description && (
            <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="description-with-sidebar">
                <div className="description-main">
                  <div className="description-section">
                    {(() => {
                      const description = currentProject.description;
                      const sanitizedContent = sanitizeHTMLContent(description);
                      
                      return (
                        <div 
                          className="description-content"
                          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                        />
                      );
                    })()}
                  </div>
                </div>
                <div className="sticky-sidebar">
                  <div className="project-details-sticky">
                    <div className="detail-row">
                      <span className="detail-label">Client</span>
                      <div className="detail-content">
                        <span className="detail-value-bold">{currentProject.clientName || currentProject.title}</span>
                        {currentProject.location && (
                          <>
                            <span style={{ margin: '0 0.5rem' }}>-</span>
                            <span className="detail-value-bold">
                              {currentProject.location}
                            </span>
                          </>
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
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Additional Images Gallery - Full Width */}
          {currentProject.additionalImages && currentProject.additionalImages.length > 0 && (
            <ScrollReveal animation="fadeUp" delay={0.35} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="case-study-gallery-grid">
                {currentProject.additionalImages.map((image, index) => (
                  <ScrollReveal 
                    key={index}
                    animation="fadeUp" 
                    delay={0.1 + index * 0.05} 
                    duration={1.2} 
                    trigger="onScroll"
                    ready={!isLoading}
                  >
                    <div className="gallery-item-grid">
                      <img
                        src={image}
                        alt={`${currentProject.title} - Gallery ${index + 1}`}
                        className="gallery-image-grid"
                        loading="lazy"
                        onLoad={(e) => {
                          const img = e.target;
                          const container = img.parentElement;
                          if (img.naturalWidth && img.naturalHeight && container) {
                            const aspectRatio = img.naturalWidth / img.naturalHeight;
                            container.classList.remove('wide', 'tall', 'square');
                            if (aspectRatio > 1.3) {
                              container.classList.add('wide');
                            } else if (aspectRatio < 0.8) {
                              container.classList.add('tall');
                            } else {
                              container.classList.add('square');
                            }
                          }
                        }}
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

          {/* Solution & Results Section - 2 Column Layout (50% 50%) */}
          {(currentProject.solution || currentProject.results) && (
            <ScrollReveal animation="fadeUp" delay={0.4} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="solution-results-grid">
                {/* Left Column - Solution */}
                <div className="solution-column">
                  {currentProject.solution && (
                    <div className="solution-section">
                      {(() => {
                        const solution = currentProject.solution;
                        const sanitizedContent = sanitizeHTMLContent(solution);
                        
                        return (
                          <div 
                            className="solution-content"
                            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                          />
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Right Column - Results */}
                <div className="results-column">
                  {currentProject.results && (
                    <div className="results-section">
                      {(() => {
                        const results = currentProject.results;
                        if (!results) return null;
                        
                        const sanitizedContent = sanitizeHTMLContent(results);
                        
                        return (
                          <div 
                            className="results-content"
                            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                          />
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Conclusion Section with Sticky Project Details */}
          {currentProject.conclusion && (
            <ScrollReveal animation="fadeUp" delay={0.5} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="conclusion-with-sidebar">
                <div className="conclusion-main">
                  <div className="conclusion-section">
                    {(() => {
                      const conclusion = currentProject.conclusion;
                      if (!conclusion) return null;
                      
                      const sanitizedContent = sanitizeHTMLContent(conclusion);
                      
                      return (
                        <div 
                          className="conclusion-content"
                          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                        />
                      );
                    })()}
                  </div>
                </div>
                <div className="sticky-sidebar">
                  <div className="project-details-sticky">
                    <div className="detail-row">
                      <span className="detail-label">Client</span>
                      <div className="detail-content">
                        <span className="detail-value-bold">{currentProject.clientName || currentProject.title}</span>
                        {currentProject.location && (
                          <>
                            <span style={{ margin: '0 0.5rem' }}>-</span>
                            <span className="detail-value-bold">
                              {currentProject.location}
                            </span>
                          </>
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
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
