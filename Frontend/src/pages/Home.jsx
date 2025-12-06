'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '@/styles/pages/Home.css';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SplitText from '@/components/SplitText';
import Counter from '@/components/Counter';
import Loader from '@/components/Loader';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { useSEO } from '@/hooks/useSEO';
import { caseStudyAPI, blogAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

// Star Rating Component
const StarRating = () => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#EC691F"
          />
        </svg>
      ))}
    </div>
  );
};

const serviceCards = [
  {
    id: 'branding',
    icon: '/Icons/Brandanddesign.webp',
    alt: 'Branding & Design',
    title: ['Branding &', 'Design'],
    className: 'service-card-1',
  },
  {
    id: 'web-app',
    icon: '/Icons/Web&app.webp',
    alt: 'Web & App Development',
    title: ['Web & App', 'Development'],
    className: 'service-card-2',
  },
  {
    id: 'marketing',
    icon: '/Icons/digitalmarketing.webp',
    alt: 'Digital Marketing',
    title: ['Digital', 'Marketing'],
    className: 'service-card-3',
  },
  {
    id: 'b2b',
    icon: '/Icons/b2bsolution.webp',
    alt: 'B2B & Custom Solutions',
    title: ['B2B & Custom', 'Solutions'],
    className: 'service-card-4',
  },
];

// Projects will be loaded from API

const stats = [
  { id: 'projects', value: 883, label: 'Project Completed', suffix: '' },
  { id: 'services', value: 19, label: 'Total Top Services', suffix: '+' },
  { id: 'feedback', value: 98, label: 'Positive Feedback', suffix: '%' },
  { id: 'experience', value: 7, label: 'Years of Experience', suffix: '+' },
];

const faqItems = [
  {
    id: 'faq-1',
    question: 'What industries do you specialize in?',
    answer: 'We work across various industries including e-commerce, healthcare, technology, finance, and B2B services. Our expertise spans from startups to established enterprises, helping businesses of all sizes achieve their digital goals.',
  },
  {
    id: 'faq-2',
    question: 'Do you provide both design and development services?',
    answer: 'Yes, we offer comprehensive design and development services under one roof. From initial brand identity and UI/UX design to full-stack development and deployment, we handle every aspect of your digital project.',
  },
  {
    id: 'faq-3',
    question: 'Do you build custom CRM or B2B dashboards?',
    answer: 'Absolutely! We specialize in building custom B2B solutions including CRM systems, analytics dashboards, and enterprise applications tailored to your specific business needs and workflows.',
  },
  {
    id: 'faq-4',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while comprehensive projects with custom development can take 2-4 months. We provide detailed timelines during the initial consultation.',
  },
  {
    id: 'faq-5',
    question: "What's the process to get started?",
    answer: 'Our process begins with a discovery call to understand your needs. We then provide a detailed proposal, timeline, and quote. Once approved, we move through design, development, testing, and launch phases with regular check-ins and updates.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer ongoing support after project delivery?',
    answer: 'Yes, we offer maintenance and support packages to ensure your digital assets continue to perform optimally. This includes updates, security patches, content changes, and technical support as needed.',
  },
];

const testimonials = [
  {
    id: 'card-1',
    quote: 'Illusio Designs transformed our brand identity and built a website that truly reflects who we are.',
    client: 'Rajesh, Founder, Vivera Lights',
  },
  {
    id: 'card-2',
    quote: 'From concept to launch, their team was supportive and creative. Highly recommended.',
    client: 'Kunal, Director, Gold B2B Pvt.',
  },
  {
    id: 'card-3',
    quote: 'From concept to launch, their team was supportive and creative. Highly recommended.',
    client: 'Kunal, Director, Gold B2B Pvt.',
  },
  {
    id: 'card-4',
    quote: 'Illusio Designs transformed our brand identity and built a website that truly reflects who we are.',
    client: 'Rajesh, Founder, Vivera Lights',
  },
  {
    id: 'card-5',
    quote: 'From concept to launch, their team was supportive and creative. Highly recommended.',
    client: 'Kunal, Director, Gold B2B Pvt.',
  },
  {
    id: 'card-6',
    quote: 'Illusio Designs transformed our brand identity and built a website that truly reflects who we are.',
    client: 'Rajesh, Founder, Vivera Lights',
  },
];

const topRowTestimonials = testimonials.slice(0, 3);
const bottomRowTestimonials = testimonials.slice(3, 6);

// Blog posts will be loaded from API

export default function Home({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('home');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('home');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isTestimonialsHovered, setIsTestimonialsHovered] = useState(false);
  const [isTestimonialsSliding, setIsTestimonialsSliding] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const servicesSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const testimonialsSlideTimeoutRef = useRef(null);
  const hasFetchedProjects = useRef(false);
  const hasFetchedBlogs = useRef(false);

  // Fetch projects from API
  useEffect(() => {
    // Prevent double API calls (React StrictMode in development)
    if (hasFetchedProjects.current) return;
    hasFetchedProjects.current = true;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await caseStudyAPI.getAllPublic();
        
        // Check if component is still mounted before updating state
        if (!isMounted) return;
        
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
              image: imageUrl,
            };
          });
          setProjects(transformedProjects);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching projects:', error);
        // Fallback to empty array on error
        setProjects([]);
      }
    };

    fetchProjects();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // Fetch blog posts from API
  useEffect(() => {
    // Prevent double API calls (React StrictMode in development)
    if (hasFetchedBlogs.current) return;
    hasFetchedBlogs.current = true;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchBlogPosts = async () => {
      try {
        const response = await blogAPI.getAllPublic();
        
        // Check if component is still mounted before updating state
        if (!isMounted) return;
        
        if (response && response.data) {
          // Transform API data to match component structure
          // Limit to 3 posts for home page
          const transformedPosts = response.data.slice(0, 3).map((post) => {
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
          setBlogPosts(transformedPosts);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (!servicesSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsServicesVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-50px 0px', // Add some margin to trigger slightly before fully visible
      }
    );

    observer.observe(servicesSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle testimonials visibility
  useEffect(() => {
    if (!testimonialsSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsTestimonialsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    observer.observe(testimonialsSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle testimonials hover and sliding
  useEffect(() => {
    if (isTestimonialsHovered) {
      // Clear any existing timeout
      if (testimonialsSlideTimeoutRef.current) {
        clearTimeout(testimonialsSlideTimeoutRef.current);
      }
      // Set sliding state after 2 seconds when hovered
      testimonialsSlideTimeoutRef.current = setTimeout(() => {
        setIsTestimonialsSliding(true);
      }, 2000);
    } else {
      // Reset both sliding and hover states when not hovered
      setIsTestimonialsSliding(false);
      if (testimonialsSlideTimeoutRef.current) {
        clearTimeout(testimonialsSlideTimeoutRef.current);
      }
    }

    return () => {
      if (testimonialsSlideTimeoutRef.current) {
        clearTimeout(testimonialsSlideTimeoutRef.current);
      }
    };
  }, [isTestimonialsHovered]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div className="hero-background-wrapper">
        <BackgroundRippleEffect />
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        
        {/* Hero Section */}
        <section className="hero-section">
          <ScrollReveal className="hero-container" animation="fadeUp" distance={80} duration={1.5} once={false} ready={!isLoading}>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">
                <SplitText
                  splitBy="words"
                  animation="fadeUp"
                  delay={0.08}
                  trigger="onScroll"
                  once={false}
                  className="hero-split-text"
                >
                  Designate
                </SplitText>
                <span className="highlight-box">Illusio</span>
              </span>
              <SplitText
                as="span"
                className="title-line"
                splitBy="words"
                animation="fadeUp"
                delay={0.06}
                trigger="onScroll"
                once={false}
              >
                Thoughts to Flow Into Magic.
              </SplitText>
            </h1>
          </div>
          
          <div className="floating-shapes">
            <Image src="/Icons/circle.webp" alt="" className="shape shape-circle-1" width={55} height={55} />
            <Image src="/Icons/halfcircle.webp" alt="" className="shape shape-half-1" width={55} height={55} />
            <Image src="/Icons/halfcircle.webp" alt="" className="shape shape-half-2" width={55} height={55} />
            <Image src="/Icons/circle.webp" alt="" className="shape shape-circle-2" width={55} height={55} />
            <Image src="/Icons/square.webp" alt="" className="shape shape-square-1" width={55} height={55} />
          </div>
        </ScrollReveal>
      </section>
      </div>

      {/* Services We Offer */}
      <section ref={servicesSectionRef} className="services-offer-section">
        <div className="services-container">
          <ScrollReveal as="div" className="services-title-wrapper" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
            <h2 className="section-title services-title">
              <SplitText
                as="span"
                className="services-title-line"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                Services
              </SplitText>
              <SplitText
                as="span"
                className="services-title-line"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                We Offer
              </SplitText>
            </h2>
          </ScrollReveal>
          <div className={`services-cards-wrapper ${isServicesVisible ? 'is-visible' : ''}`}>
            {serviceCards.map((card) => (
              <div key={card.id} className={`service-card ${card.className}`}>
                <div className="service-icon">
                  <Image src={card.icon} alt={card.alt} width={60} height={60} />
                </div>
                <h3 className="service-name">
                  {card.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <SplitText
              as="h2"
              className="section-title"
              splitBy="words"
              animation="fadeUp"
              delay={0.05}
              trigger="onScroll"
              once={false}
            >
              Case Studies
            </SplitText>
          </ScrollReveal>
          <div className="case-studies-slider">
            <div className="case-studies-track">
              {projects.length > 0 && projects.map((project, index) => (
                <a 
                  key={project.id} 
                  href={`/case-study-detail?item=${encodeURIComponent(project.id.toString())}`}
                  className="case-study-card"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('case-study-detail', project.id.toString());
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div className="case-study-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="case-study-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="case-study-title-container">
                    <h3>{project.title}</h3>
                    <span className={`case-study-arrow ${hoveredProject === project.id ? 'arrow-visible' : ''}`}>
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.id}
                animation="fadeUp"
                delay={0.1 + index * 0.05}
                duration={1.5}
                once={false}
                ready={!isLoading}
              >
                <div className="stat-item">
                  <h3 className="stat-value">
                    <Counter
                      value={stat.value}
                      fontSize={72}
                      textColor="#EC691F"
                      fontWeight={700}
                      gap={4}
                    />
                    {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Topics */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-wrapper">
            <div className="faq-left">
              <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
                <h1 className="section-title faq-title">Frequently Asked Topics</h1>
                <p className="faq-subtitle">
                  We turn ideas into digital brilliance — here&apos;s everything you need to know.
                </p>
              </ScrollReveal>
            </div>
            <div className="faq-right">
              <div className="faq-list">
                {faqItems.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    as="div"
                    className={`faq-item ${openFaqId === item.id ? 'is-open' : ''}`}
                    animation="fadeUp"
                    delay={0.1 + index * 0.05}
                    duration={1.5}
                    once={false}
                    ready={!isLoading}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span className="faq-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section ref={testimonialsSectionRef} className="testimonials-section">
        <div className="container testimonials-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <SplitText
              as="h2"
              className="section-title"
              splitBy="words"
              animation="fadeUp"
              delay={0.05}
              trigger="onScroll"
              once={false}
            >
              What Our Clients Say
            </SplitText>
          </ScrollReveal>

          {!isTestimonialsSliding ? (
            <div
              className={`testimonial-static-grid ${isTestimonialsHovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setIsTestimonialsHovered(true)}
              onMouseLeave={() => setIsTestimonialsHovered(false)}
            >
              {testimonials.map((testimonial, index) => (
                <article key={testimonial.id} className={`testimonial-card static-card-${index + 1}`}>
                  <StarRating />
                  <p className="testimonial-text">&quot;{testimonial.quote}&quot;</p>
                  <div className="testimonial-signature">
                    <h1 className="client-name">{testimonial.client}</h1>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div 
              className="testimonial-marquee is-sliding"
              onMouseLeave={() => setIsTestimonialsHovered(false)}
            >
              <div className="marquee-row marquee-row--top">
                <div className="marquee-track">
                  {[...topRowTestimonials, ...topRowTestimonials].map((testimonial, index) => (
                    <article key={`${testimonial.id}-top-${index}`} className="testimonial-card">
                      <StarRating />
                      <p className="testimonial-text">&quot;{testimonial.quote}&quot;</p>
                      <div className="testimonial-signature">
                        <h1 className="client-name">{testimonial.client}</h1>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="marquee-row marquee-row--bottom">
                <div className="marquee-track">
                  {[...bottomRowTestimonials, ...bottomRowTestimonials].map((testimonial, index) => (
                    <article key={`${testimonial.id}-bottom-${index}`} className="testimonial-card">
                      <StarRating />
                      <p className="testimonial-text">&quot;{testimonial.quote}&quot;</p>
                      <div className="testimonial-signature">
                        <h1 className="client-name">{testimonial.client}</h1>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Digital Growth Hub */}
      <section className="growth-hub-section">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <SplitText
              as="h2"
              className="section-title"
              splitBy="words"
              animation="fadeUp"
              delay={0.05}
              trigger="onScroll"
              once={false}
            >
              Digital Growth Hub
            </SplitText>
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
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('blog-detail', post.slug);
                  }}
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
