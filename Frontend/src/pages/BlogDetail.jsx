import '@/styles/pages/BlogDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { blogAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

export default function BlogDetail({ blogName, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

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

  // Fetch blog post from API
  useEffect(() => {
    // Prevent double API calls (React StrictMode in development)
    if (hasFetched.current) return;
    hasFetched.current = true;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchBlogPost = async () => {
      try {
        // Fetch current blog by slug
        const response = await blogAPI.getBySlugPublic(blogName);
        
        // Check if component is still mounted before updating state
        if (!isMounted) return;
        
        if (response && response.data) {
          const blog = response.data;
          
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
          }

          const transformedBlog = {
            id: blog.id,
            title: blog.title,
            slug: blog.slug || blog.seoUrl || `blog-${blog.id}`,
            date: formatDate(blog.date || blog.publishDate || blog.createdAt),
            content: blog.content || '',
            image: imageUrl,
            author: blog.author || '',
            category: blog.category || ''
          };

          setCurrentBlog(transformedBlog);

          // Apply SEO metadata directly from blog response
          if (blog.seoTitle || blog.metaDescription) {
            applySEOFromBlog({
              seoTitle: blog.seoTitle,
              metaDescription: blog.metaDescription,
              seoUrl: blog.seoUrl
            });
          }

          // Fetch related posts (all published blogs except current one)
          try {
            const allBlogsResponse = await blogAPI.getAllPublic();
            if (!isMounted) return;
            
            if (allBlogsResponse && allBlogsResponse.data) {
              const related = allBlogsResponse.data
                .filter(b => b.id !== blog.id && b.published)
                .slice(0, 5)
                .map(b => ({
                  id: b.id,
                  title: b.title,
                  slug: b.slug || b.seoUrl || `blog-${b.id}`,
                  date: formatDate(b.date || b.publishDate || b.createdAt)
                }));
              setRelatedPosts(related);
            }
          } catch (relatedError) {
            if (!isMounted) return;
            console.error('Error fetching related posts:', relatedError);
            setRelatedPosts([]);
          }
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post. Please try again later.');
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

  // Show error or loading state
  if (error || !currentBlog) {
    return (
      <>
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        <section className="blog-detail-section">
          <div className="blog-detail-container">
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>{error || 'Blog post not found'}</h2>
              <button onClick={() => navigateTo('blog')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Back to Blog
              </button>
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

          <div className="blog-detail-layout">
            {/* Main Content Column */}
            <div className="blog-main-content">
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
                {currentBlog.image && (
                  <div className="blog-image-container">
                    <img 
                      src={currentBlog.image} 
                      alt={currentBlog.title}
                      className="blog-detail-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {!currentBlog.image && <div className="blog-image-placeholder"></div>}
                <div className="blog-date">{currentBlog.date}</div>
                {currentBlog.author && (
                  <div className="blog-author" style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
                    By {currentBlog.author}
                  </div>
                )}
                <div className="blog-body-text">
                  {currentBlog.content ? (
                    <div dangerouslySetInnerHTML={{ __html: currentBlog.content }} />
                  ) : (
                    <>
                  <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Related Articles Column */}
            {relatedPosts.length > 0 && (
              <div className="blog-related-articles">
                <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
                  {relatedPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="related-article-card"
                      onClick={() => navigateTo('blog-detail', post.slug)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="related-article-image"></div>
                      <div className="related-article-title">{post.title}</div>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
