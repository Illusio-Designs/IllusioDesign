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
import Modal from '@/components/common/Modal';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { useSEO } from '@/hooks/useSEO';
import { caseStudyAPI, blogAPI, reviewAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { toast } from 'react-toastify';
import { toSlug } from '@/utils/urlSlug';

// Star Rating Component - displays specific rating
const StarRating = ({ rating = 5 }) => {
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
            fill={index < rating ? "#EC691F" : "#E5E5E5"}
          />
        </svg>
      ))}
    </div>
  );
};

// Star Rating Input Component for Review Form
const StarRatingInput = ({ value, onChange }) => {
  return (
    <div className="rating-input">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          type="button"
          className="star-btn"
          onClick={() => onChange(index + 1)}
          onMouseEnter={() => {
            // Optional: Add hover effect
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill={index < value ? "#EC691F" : "#E5E5E5"}
            />
          </svg>
        </button>
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
    question: 'What services does Illusio Designs offer?',
    answer: 'We provide complete digital solutions including Branding & Design, Web & App Development, Digital Marketing, and B2B & Custom Solutions tailored for startups, businesses, and enterprises.',
  },
  {
    id: 'faq-2',
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while comprehensive projects with custom development can take 2-4 months. We provide detailed timelines during the initial consultation.',
  },
  {
    id: 'faq-3',
    question: 'Do you also handle branding from scratch?',
    answer: 'Yes! We create full brand identities—logo, typography, color palette, packaging, brand guidelines, and everything needed to launch or refresh your brand.',
  },
  {
    id: 'faq-4',
    question: 'Will my website/app be fully responsive?',
    answer: 'Yes, all our websites and apps are fully responsive and optimized for all devices. We ensure seamless user experience across desktops, tablets, and mobile phones.',
  },
  {
    id: 'faq-5',
    question: 'Can you work with international clients?',
    answer: 'Yes, we work with clients across the globe. Communication is managed via WhatsApp, email, Zoom, or Google Meet.',
  },
  {
    id: 'faq-6',
    question: "How do I get started with Illusio Designs?",
    answer: 'It’s simple! Just reach out to us through WhatsApp, email, or our contact form. We’ll schedule a free consultation to discuss your project and explore how we can help you achieve your digital goals.',
  },
];

// Calculate average rating from reviews
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 4.93;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(2);
};


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
  const [openFaqId, setOpenFaqId] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isConsentHidden, setIsConsentHidden] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    quote: '',
    client: '',
  });
  const servicesSectionRef = useRef(null);

  // Fetch projects from API
  useEffect(() => {
    console.log('🎬 Starting projects fetch useEffect');
    let isMounted = true;
    const abortController = new AbortController();

    const fetchProjects = async () => {
      try {
        console.log('🚀 FETCHING PROJECTS...');
        const response = await caseStudyAPI.getAllPublic();
        console.log('📥 PROJECTS RESPONSE RECEIVED:', response);
        
        // Process data regardless of mount status - React will handle cleanup
        // The early return was preventing data from being set due to StrictMode remounting
        
        // CRITICAL DEBUG - Log everything with full details
        console.log('🔍 FULL RESPONSE:', response);
        console.log('🔍 Response type:', typeof response);
        console.log('🔍 Response constructor:', response?.constructor?.name);
        console.log('🔍 Is response array?', Array.isArray(response));
        console.log('🔍 Response keys:', response && typeof response === 'object' ? Object.keys(response) : 'N/A');
        console.log('🔍 Response.data exists?', 'data' in (response || {}));
        console.log('🔍 Response.data:', response?.data);
        console.log('🔍 Response.data type:', typeof response?.data);
        console.log('🔍 Is response.data array?', Array.isArray(response?.data));
        console.log('🔍 response.data length:', response?.data?.length);
        
        // Extract data - handle both { data: [...] } and direct array
        let projectsData = null;
        if (Array.isArray(response)) {
          projectsData = response;
          console.log('✅ Response is direct array');
        } else if (response && typeof response === 'object' && 'data' in response) {
          projectsData = response.data;
          console.log('✅ Extracted from response.data');
        } else {
          console.error('❌ UNEXPECTED RESPONSE STRUCTURE:', response);
          projectsData = [];
        }
        
        console.log('🔍 Extracted projectsData:', projectsData);
        console.log('🔍 projectsData type:', typeof projectsData);
        console.log('🔍 projectsData is array?', Array.isArray(projectsData));
        console.log('🔍 projectsData length:', projectsData?.length);
        console.log('🔍 projectsData value:', JSON.stringify(projectsData, null, 2));
        
        if (Array.isArray(projectsData) && projectsData.length > 0) {
          console.log('✅ Valid projects data found, transforming...');
          try {
            // Transform API data to match component structure
            const transformedProjects = projectsData.map((project) => {
              if (!project) {
                console.warn('Invalid project item:', project);
                return null;
              }
              
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
            }).filter(p => p !== null); // Remove any null items
            
            // Only update state if component is still mounted
            if (isMounted) {
              setProjects(transformedProjects);
              console.log('✅ Projects set successfully:', transformedProjects.length, 'items');
              console.log('✅ Projects data:', transformedProjects);
            } else {
              console.log('⚠️ Component unmounted, but data was:', transformedProjects.length, 'items');
            }
          } catch (transformError) {
            console.error('❌ Error transforming projects:', transformError);
            console.error('❌ Transform error stack:', transformError.stack);
            console.error('❌ Project data that failed:', projectsData);
            if (isMounted) {
              setProjects([]);
            }
          }
        } else {
          console.error('❌ NO VALID PROJECTS DATA FOUND!');
          console.error('❌ Response:', response);
          console.error('❌ projectsData:', projectsData);
          console.error('❌ projectsData is array?', Array.isArray(projectsData));
          console.error('❌ projectsData length:', projectsData?.length);
          console.error('❌ Condition check:', {
            isArray: Array.isArray(projectsData),
            hasLength: projectsData?.length > 0,
            projectsData
          });
          if (isMounted) {
            setProjects([]);
          }
        }
      } catch (error) {
        console.error('❌ ERROR FETCHING PROJECTS:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        // Fallback to empty array on error - only if mounted
        if (isMounted) {
          setProjects([]);
        }
      }
    };

    fetchProjects();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // Check if consent was previously answered
  useEffect(() => {
    const consent = document.cookie
      .split('; ')
      .find((c) => c.startsWith('consentAccepted='))
      ?.split('=')[1];
    setIsConsentHidden(consent === 'yes' || consent === 'no');
  }, []);

  // Fetch blog posts from API
  useEffect(() => {
    console.log('🎬 Starting blogs fetch useEffect');
    let isMounted = true;
    const abortController = new AbortController();

    const fetchBlogPosts = async () => {
      try {
        console.log('🚀 FETCHING BLOGS...');
        const response = await blogAPI.getAllPublic();
        console.log('📥 BLOGS RESPONSE RECEIVED:', response);
        
        // Process data regardless of mount status - React will handle cleanup
        // The early return was preventing data from being set due to StrictMode remounting
        
        // CRITICAL DEBUG - Log everything with full details
        console.log('🔍 FULL RESPONSE:', response);
        console.log('🔍 Response type:', typeof response);
        console.log('🔍 Response constructor:', response?.constructor?.name);
        console.log('🔍 Is response array?', Array.isArray(response));
        console.log('🔍 Response keys:', response && typeof response === 'object' ? Object.keys(response) : 'N/A');
        console.log('🔍 Response.data exists?', 'data' in (response || {}));
        console.log('🔍 Response.data:', response?.data);
        console.log('🔍 Response.data type:', typeof response?.data);
        console.log('🔍 Is response.data array?', Array.isArray(response?.data));
        console.log('🔍 response.data length:', response?.data?.length);
        
        // Extract data - handle both { data: [...] } and direct array
        let blogsData = null;
        if (Array.isArray(response)) {
          blogsData = response;
          console.log('✅ Response is direct array');
        } else if (response && typeof response === 'object' && 'data' in response) {
          blogsData = response.data;
          console.log('✅ Extracted from response.data');
        } else {
          console.error('❌ UNEXPECTED RESPONSE STRUCTURE:', response);
          blogsData = [];
        }
        
        console.log('🔍 Extracted blogsData:', blogsData);
        console.log('🔍 blogsData type:', typeof blogsData);
        console.log('🔍 blogsData is array?', Array.isArray(blogsData));
        console.log('🔍 blogsData length:', blogsData?.length);
        console.log('🔍 blogsData value:', JSON.stringify(blogsData, null, 2));
        
        if (Array.isArray(blogsData) && blogsData.length > 0) {
          console.log('✅ Valid blogs data found, transforming...');
          try {
            // Transform API data to match component structure
            // Limit to 3 posts for home page
            const transformedPosts = blogsData.slice(0, 3).map((post) => {
              if (!post) {
                console.warn('Invalid blog post item:', post);
                return null;
              }
              
              // Format date
              const formatDate = (dateString) => {
                if (!dateString) return '';
                try {
                  const date = new Date(dateString);
                  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                                'July', 'August', 'September', 'October', 'November', 'December'];
                  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
                } catch (e) {
                  console.warn('Date format error:', dateString, e);
                  return '';
                }
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
            }).filter(p => p !== null); // Remove any null items
            
            // Only update state if component is still mounted
            if (isMounted) {
              setBlogPosts(transformedPosts);
              console.log('✅ Blog posts set successfully:', transformedPosts.length, 'items');
              console.log('✅ Blog posts data:', transformedPosts);
            } else {
              console.log('⚠️ Component unmounted, but data was:', transformedPosts.length, 'items');
            }
          } catch (transformError) {
            console.error('❌ Error transforming blog posts:', transformError);
            console.error('❌ Transform error stack:', transformError.stack);
            console.error('❌ Blog data that failed:', blogsData);
            if (isMounted) {
              setBlogPosts([]);
            }
          }
        } else {
          console.error('❌ NO VALID BLOG POSTS DATA FOUND!');
          console.error('❌ Response:', response);
          console.error('❌ blogsData:', blogsData);
          console.error('❌ blogsData is array?', Array.isArray(blogsData));
          console.error('❌ blogsData length:', blogsData?.length);
          console.error('❌ Condition check:', {
            isArray: Array.isArray(blogsData),
            hasLength: blogsData?.length > 0,
            blogsData
          });
          if (isMounted) {
            setBlogPosts([]);
          }
        }
      } catch (error) {
        console.error('❌ ERROR FETCHING BLOG POSTS:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
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

  // Fetch reviews from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchReviews = async () => {
      try {
        const response = await reviewAPI.getAllPublic();
        if (response && response.data && Array.isArray(response.data)) {
          if (isMounted) {
            setReviews(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        if (isMounted) {
          setReviews([]);
        }
      }
    };

    fetchReviews();

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


  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const acceptConsent = async () => {
    try {
      await fetch('/api/consent-accept', { method: 'POST', credentials: 'include' });
    } catch (error) {
      console.error('Failed to persist consent acceptance:', error);
    } finally {
      setIsConsentHidden(true);
    }
  };

  const declineConsent = () => {
    // Store decline locally so we don't nag the user again immediately
    const thirtyDays = 30 * 24 * 60 * 60;
    document.cookie = [
      'consentAccepted=no',
      'path=/',
      `max-age=${thirtyDays}`,
      'samesite=lax'
    ].join('; ');
    setIsConsentHidden(true);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      {!isConsentHidden && (
        <div
          className="consent-banner"
          style={{
            background: '#FAF9F6',
            color: '#2d2d2d',
            border: '1px solid #EC691F',
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            position: 'fixed',
            bottom: 18,
            left: 18,
            right: 18,
            zIndex: 1000,
            borderRadius: '14px',
            boxShadow: '0 18px 42px rgba(0,0,0,0.25)',
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '30%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 240 }}>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: 0.1 }}>
              Cookies & Experience
            </span>
            <span style={{ fontSize: 13, opacity: 0.92, lineHeight: 1.4 }}>
              We use cookies to improve performance and tailor content. Accept to allow all, or decline to continue with essential cookies only.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <button
              onClick={declineConsent}
              style={{
                background: '#2d2d2d',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 700,
                backdropFilter: 'blur(4px)',
                width: '100%',
              }}
            >
              Decline
            </button>
            <button
              onClick={acceptConsent}
              style={{
                background: '#EC691F',
                color: '#FAF9F6',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 800,
                boxShadow: '0 12px 30px rgba(236,105,31,0.4)',
                width: '100%',
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
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
          <div className={`case-studies-slider ${projects.length === 1 ? 'single-item' : ''}`}>
            <div className={`case-studies-track ${projects.length === 1 ? 'single-item' : ''}`}>
              {projects.length > 0 ? (
                <>
                  {/* First set of cards */}
                  {projects.map((project, index) => (
                    <a 
                      key={`original-${project.id}`} 
                      href={`/case-studies/${project.seoUrl || (project.title ? toSlug(project.title) : project.id)}`}
                      className="case-study-card"
                      onClick={(e) => {
                        e.preventDefault();
                        const slug = project.seoUrl || (project.title ? toSlug(project.title) : project.id.toString());
                        navigateTo('case-study-detail', slug);
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
                  {/* Duplicate set for seamless infinite loop */}
                  {projects.map((project, index) => (
                    <a 
                      key={`duplicate-${project.id}`} 
                      href={`/case-studies/${project.seoUrl || (project.title ? toSlug(project.title) : project.id)}`}
                      className="case-study-card"
                      onClick={(e) => {
                        e.preventDefault();
                        const slug = project.seoUrl || (project.title ? toSlug(project.title) : project.id.toString());
                        navigateTo('case-study-detail', slug);
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
                </>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  {process.env.NODE_ENV === 'development' ? 'No projects to display' : ''}
                </div>
              )}
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
      <section className="testimonials-section">
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

          <div className="testimonials-wrapper">
            {/* Left Sidebar */}
            <div className="testimonials-sidebar">
              <div className="rating-summary">
                <h3 className="rating-text">
                  Rated {calculateAverageRating(reviews)}/5 based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </h3>
                <p className="trusted-text">Trusted globally by clients</p>
                <button 
                  className="share-experience-btn"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Share Your Experience
                </button>
              </div>
            </div>

            {/* Right Side - 2 Independent Scrolling Columns */}
            {reviews.length > 0 ? (
              <div className="testimonials-columns">
                {/* Column 1 */}
                <div className="testimonial-column testimonial-column-1">
                  <div className="testimonial-column-track">
                    {[...reviews, ...reviews].map((review, index) => (
                      <article key={`col1-${review.id}-${index}`} className="testimonial-card">
                        <StarRating rating={review.rating} />
                        <p className="testimonial-text">&quot;{review.quote}&quot;</p>
                        <div className="testimonial-signature">
                          <h1 className="client-name">{review.client}</h1>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="testimonial-column testimonial-column-2">
                  <div className="testimonial-column-track">
                    {[...reviews, ...reviews].map((review, index) => (
                      <article key={`col2-${review.id}-${index}`} className="testimonial-card">
                        <StarRating rating={review.rating} />
                        <p className="testimonial-text">&quot;{review.quote}&quot;</p>
                        <div className="testimonial-signature">
                          <h1 className="client-name">{review.client}</h1>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="testimonials-columns">
                <div style={{ padding: '40px', textAlign: 'center', color: '#999', gridColumn: '1 / -1' }}>
                  No reviews yet. Be the first to share your experience!
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <Modal 
        isOpen={isReviewModalOpen} 
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewForm({ rating: 5, quote: '', client: '' });
        }}
        title="Share Your Experience"
        size="large"
      >
        <form 
          className="review-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmittingReview(true);
            try {
              await reviewAPI.submit({
                rating: reviewForm.rating,
                quote: reviewForm.quote.trim(),
                client: reviewForm.client.trim()
              });
              toast.success('Review submitted successfully! It will be reviewed before being published.');
              setIsReviewModalOpen(false);
              setReviewForm({ rating: 5, quote: '', client: '' });
            } catch (error) {
              console.error('Error submitting review:', error);
              toast.error(error.message || 'Failed to submit review. Please try again.');
            } finally {
              setIsSubmittingReview(false);
            }
          }}
        >
          <div className="form-group">
            <label>Your Rating</label>
            <StarRatingInput 
              value={reviewForm.rating} 
              onChange={(rating) => setReviewForm({ ...reviewForm, rating })}
            />
          </div>
          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={reviewForm.quote}
              onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
              placeholder="Share your experience with us..."
              rows={6}
              required
            />
          </div>
          <div className="form-group">
            <label>Your Name & Title</label>
            <input
              type="text"
              value={reviewForm.client}
              onChange={(e) => setReviewForm({ ...reviewForm, client: e.target.value })}
              placeholder="e.g., John Doe, Founder, Company Name"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmittingReview}>
              {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </Modal>

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
            {blogPosts.length > 0 ? blogPosts.map((post, index) => (
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
                  href={`/blog/${post.slug}`}
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
            )) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#999', gridColumn: '1 / -1' }}>
                {process.env.NODE_ENV === 'development' ? 'No blog posts to display' : ''}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </>
  );
}
