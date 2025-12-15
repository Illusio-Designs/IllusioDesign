import '@/styles/pages/BlogDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { blogAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';
import DOMPurify from 'dompurify';

export default function BlogDetail({ blogName, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [error, setError] = useState(null);

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('blog-detail');
  }, []);

  // Helper function to apply SEO metadata from blog data
  const applySEOFromBlog = (seoData) => {
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
      'og:type': 'article',
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

  // Debug: Log currentBlog changes
  useEffect(() => {
    if (currentBlog) {
      console.log('🔄 currentBlog state updated:', {
        id: currentBlog.id,
        title: currentBlog.title,
        hasContent: !!currentBlog.content,
        contentLength: currentBlog.content?.length,
        contentType: typeof currentBlog.content,
        contentPreview: currentBlog.content?.substring(0, 200),
        allKeys: Object.keys(currentBlog)
      });
    }
  }, [currentBlog]);

  // Fetch blog post from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchBlogPost = async () => {
      try {
        // Fetch current blog by slug
        const response = await blogAPI.getBySlugPublic(blogName);
        
        // Process data regardless of mount status
        console.log('Raw API response:', response);
        
        if (response && response.data) {
          // Handle case where response.data might be an array or object
          let blog = response.data;
          if (Array.isArray(blog) && blog.length > 0) {
            blog = blog[0];
            console.log('⚠️ Response.data is array, using first item:', blog);
          } else if (typeof blog === 'object' && blog !== null) {
            console.log('✅ Response.data is object:', blog);
          } else {
            console.error('❌ Unexpected response.data format:', typeof blog, blog);
          }
          
          console.log('Blog object from API:', blog);
          console.log('Blog.content value:', blog.content);
          console.log('Blog.content type:', typeof blog.content);
          
          // Format date
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
            return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
          };

          // Handle image URL if exists
          let imageUrl = blog.image || null;
          console.log('🖼️ Processing image:', {
            rawImage: blog.image,
            imageType: typeof blog.image,
            imageExists: !!blog.image
          });
          
          if (blog.image) {
            if (blog.image.startsWith('http')) {
              imageUrl = blog.image;
            } else if (blog.image.startsWith('/uploads/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              imageUrl = `${IMAGE_BASE_URL}${blog.image}`;
            } else if (!blog.image.startsWith('/')) {
              const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
              imageUrl = `${IMAGE_BASE_URL}/${blog.image}`;
            }
            console.log('✅ Final image URL:', imageUrl);
          } else {
            console.log('⚠️ No image in blog data');
          }

          // Ensure content is properly extracted - handle both string and other formats
          let blogContent = '';
          if (blog.content !== undefined && blog.content !== null) {
            blogContent = typeof blog.content === 'string' 
              ? blog.content 
              : String(blog.content);
          } else if (blog.body !== undefined && blog.body !== null) {
            blogContent = typeof blog.body === 'string' 
              ? blog.body 
              : String(blog.body);
          }

          console.log('📦 Processing blog data:', {
            blogId: blog.id,
            blogTitle: blog.title,
            rawContent: blog.content,
            rawContentType: typeof blog.content,
            extractedContent: blogContent,
            extractedContentLength: blogContent.length,
            extractedContentType: typeof blogContent
          });

          const transformedBlog = {
            id: blog.id,
            title: blog.title,
            slug: blog.slug || blog.seoUrl || `blog-${blog.id}`,
            date: formatDate(blog.date || blog.publishDate || blog.createdAt),
            content: blogContent, // Make sure content is always set
            image: imageUrl,
            author: blog.author || '',
            category: blog.category || ''
          };

          // Debug: Log transformed blog
          console.log('✅ Transformed blog object:', {
            id: transformedBlog.id,
            title: transformedBlog.title,
            hasContent: !!transformedBlog.content,
            contentLength: transformedBlog.content?.length,
            contentType: typeof transformedBlog.content,
            contentPreview: transformedBlog.content?.substring(0, 200),
            allKeys: Object.keys(transformedBlog)
          });

          // Only update state if component is still mounted
          if (isMounted) {
            setCurrentBlog(transformedBlog);

            // Apply SEO metadata directly from blog response
            if (blog.seoTitle || blog.metaDescription) {
              applySEOFromBlog({
                seoTitle: blog.seoTitle,
                metaDescription: blog.metaDescription,
                seoUrl: blog.seoUrl
              });
            }
          }

        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        if (isMounted) {
          setError('Failed to load blog post. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBlogPost();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [blogName]);

  // Show loading state until data is loaded
  if (isLoading || !currentBlog) {
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
      <section className="blog-detail-section">
        <div className="blog-detail-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                {currentBlog.title.split(':')[0]}
              </SplitText>
            </h1>
          </ScrollReveal>

          {/* Hero Image */}
          {currentBlog.image && (
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5} trigger="onScroll" ready={!isLoading}>
              <div className="blog-hero-image">
                <img 
                  src={currentBlog.image} 
                  alt={currentBlog.title}
                  className="blog-detail-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </ScrollReveal>
          )}

          {/* Content with Sticky Sidebar */}
          <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} trigger="onScroll" ready={!isLoading}>
            <div className="blog-content-with-sidebar">
              <div className="blog-main-content">
                <div className="blog-body-text">
                  {(() => {
                    const content = currentBlog?.content || '';
                    
                    console.log('=== BLOG CONTENT RENDERING ===');
                    console.log('currentBlog:', currentBlog);
                    console.log('Content value:', content);
                    console.log('Content type:', typeof content);
                    console.log('Content length:', content?.length);
                    console.log('Content preview:', content?.substring(0, 300));
                    console.log('Has content:', !!content && content.length > 0);
                    
                    // Simple check - just verify content exists and has length
                    if (!content || (typeof content === 'string' && content.trim().length === 0)) {
                      return (
                        <div style={{ color: '#999', fontStyle: 'italic', padding: '2rem' }}>
                          <p>No content available for this blog post.</p>
                          <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
                            <summary style={{ cursor: 'pointer' }}>Debug Info</summary>
                            <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
                              {JSON.stringify({
                                hasContent: !!content,
                                contentType: typeof content,
                                contentLength: content?.length,
                                contentValue: String(content || '').substring(0, 500),
                                currentBlogExists: !!currentBlog,
                                currentBlogKeys: currentBlog ? Object.keys(currentBlog) : []
                              }, null, 2)}
                            </pre>
                          </details>
                        </div>
                      );
                    }

                    // Convert to string if needed
                    let contentString = typeof content === 'string' ? content : String(content || '');
                    
                    // Normalize double <br> tags to single <br> tags before sanitizing
                    contentString = normalizeContentForDisplay(contentString);
                    
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
                            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
                          });
                          
                          // Ensure UTF-8 encoding is preserved (DOMPurify should handle this, but explicitly check)
                          if (typeof sanitizedContent === 'string') {
                            // Verify emojis are still present
                            const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
                            const hasEmojis = emojiPattern.test(sanitizedContent);
                            if (hasEmojis) {
                              console.log('✅ Emojis detected in sanitized content');
                            }
                          }
                          
                          console.log('Content sanitized successfully. Original length:', contentString.length, 'Sanitized length:', sanitizedContent.length);
                          
                          // Fallback to original if sanitization removed everything
                          if (!sanitizedContent || sanitizedContent.trim().length === 0) {
                            console.warn('⚠️ DOMPurify removed all content, using original');
                            sanitizedContent = contentString;
                          } else {
                            console.log('✅ Content ready to render:', sanitizedContent.substring(0, 200));
                          }
                        } else {
                          console.warn('⚠️ DOMPurify not available, rendering unsanitized content');
                          sanitizedContent = contentString;
                        }
                      } catch (error) {
                        console.error('❌ Error sanitizing content:', error);
                        console.warn('Using original content due to sanitization error');
                        sanitizedContent = contentString;
                      }
                    }

                    return (
                      <div 
                        className="blog-content-html"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
                      />
                    );
                  })()}
                </div>
              </div>
              <div className="sticky-sidebar">
                <div className="blog-details-sticky">
                  {currentBlog.date && (
                    <div className="blog-detail-row">
                      <span className="blog-detail-label">Date</span>
                      <span className="blog-detail-value">{currentBlog.date}</span>
                    </div>
                  )}
                  {currentBlog.author && (
                    <div className="blog-detail-row">
                      <span className="blog-detail-label">Author</span>
                      <span className="blog-detail-value">{currentBlog.author}</span>
                    </div>
                  )}
                  {currentBlog.category && (
                    <div className="blog-detail-row">
                      <span className="blog-detail-label">Category</span>
                      <span className="blog-detail-value">{currentBlog.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
