import '@/styles/pages/Blog.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { blogAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

export default function Blog({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('blog');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('blog');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [hoveredBlog, setHoveredBlog] = useState(null);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleBlogClick = (e, slug) => {
    e.preventDefault();
    navigateTo('blog-detail', slug);
  };

  // Fetch blog posts from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchBlogPosts = async () => {
      try {
        const response = await blogAPI.getAllPublic();
        
        // Process data regardless of mount status
        if (response && response.data) {
          // Transform API data to match component structure
          const transformedPosts = response.data.map((post) => {
            // Format date
            const formatDate = (dateString) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                            'July', 'August', 'September', 'October', 'November', 'December'];
              return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            };

            // Handle image URL - use NEXT_PUBLIC_IMAGE_URL
            let imageUrl = post.image || null;
            if (post.image) {
              if (post.image.startsWith('http')) {
                // Already a full URL
                imageUrl = post.image;
              } else if (post.image.startsWith('/uploads/')) {
                // Backend upload path - prepend IMAGE URL
                const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
                imageUrl = `${IMAGE_BASE_URL}${post.image}`;
              } else if (!post.image.startsWith('/')) {
                // Relative path without leading slash
                const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';
                imageUrl = `${IMAGE_BASE_URL}/${post.image}`;
              }
            }

            return {
              id: post.id,
              date: formatDate(post.date || post.publishDate || post.createdAt),
              title: post.title,
              slug: post.slug || post.seoUrl || `blog-${post.id}`,
              image: imageUrl,
            };
          });
          // Only update state if component is still mounted
          if (isMounted) {
            setBlogPosts(transformedPosts);
          }
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        if (isMounted) {
          setBlogPosts([]);
        }
      }
    };

    fetchBlogPosts();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="blog-section" id="blog">
        <div className="container">
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
                Design News & Trends
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                for Inspired Living
              </SplitText>
            </h1>
          </ScrollReveal>
          <div className="blog-grid">
            {blogPosts.length > 0 && blogPosts.map((post, index) => (
              <ScrollReveal
                key={post.id}
                as="div"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                duration={1.5}
                once={false}
                ready={!isLoading}
              >
                <a 
                  href={`/blog-detail?item=${encodeURIComponent(post.slug)}`}
                  className="blog-card"
                  onClick={(e) => handleBlogClick(e, post.slug)}
                  onMouseEnter={() => setHoveredBlog(post.id)}
                  onMouseLeave={() => setHoveredBlog(null)}
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  {post.image ? (
                    <div className="blog-placeholder" style={{ padding: 0, background: 'transparent', overflow: 'hidden' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = '#e0e0e0';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="blog-placeholder"></div>
                  )}
                  <div className="blog-content">
                    <div className="blog-title-wrapper">
                      <span className="blog-date">{post.date}</span>
                      <p className="blog-title">{post.title}</p>
                    </div>
                    <span className={`blog-arrow ${hoveredBlog === post.id ? 'arrow-visible' : ''}`}>
                      →
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
