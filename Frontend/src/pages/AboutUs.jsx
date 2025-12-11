import '@/styles/pages/AboutUs.css';
import '@/styles/components/common/SharedComponents.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import Counter from '@/components/Counter';
import Modal from '@/components/common/Modal';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { teamAPI, reviewAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { toast } from 'react-toastify';

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

// Use NEXT_PUBLIC_IMAGE_URL for images (consistent with other pages)
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath.trim() === '') return null;
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Ensure path starts with / for proper URL construction
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalizedPath}`;
};

// Helper function to get image URL with fallback for old team image paths
const getTeamImageUrl = (imagePath) => {
  const primaryUrl = getImageUrl(imagePath);
  if (!primaryUrl) return null;
  
  // If path doesn't include /team/ or /project/, try fallback paths for old images
  if (!imagePath.includes('/team/') && !imagePath.includes('/project/') && imagePath.includes('/uploads/images/')) {
    // Extract filename from path
    const filename = imagePath.split('/').pop();
    // Try team directory first (new location), then project (old location)
    return {
      primary: primaryUrl,
      fallbacks: [
        `${IMAGE_BASE_URL}/uploads/images/team/${filename}`,
        `${IMAGE_BASE_URL}/uploads/images/project/${filename}`
      ]
    };
  }
  
  return { primary: primaryUrl, fallbacks: [] };
};

export default function AboutUs({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('about');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('about');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    quote: '',
    client: '',
  });

  const goals = [
    {
      id: 1,
      title: 'Innovation',
      description: 'Push boundaries, experiment with new technologies, and create solutions that stay ahead of the digital curve.',
      icon: '/Icons/Brandanddesign.webp'
    },
    {
      id: 2,
      title: 'Excellence',
      description: 'Maintain the highest standards of quality, detail, and performance in every project we deliver.',
      icon: '/Icons/Web&app.webp'
    },
    {
      id: 3,
      title: 'Client Success',
      description: 'Understand client goals deeply and work collaboratively to achieve measurable results that matter.',
      icon: '/Icons/digitalmarketing.webp'
    },
    {
      id: 4,
      title: 'Growth',
      description: 'Empower continuous learning and development—for our team, our clients, and the brands we build.',
      icon: '/Icons/b2bsolution.webp'
    }
  ];

  const stats = [
    { id: 'projects', value: 883, label: 'Project Completed', suffix: '' },
    { id: 'services', value: 19, label: 'Total Top Services', suffix: '+' },
    { id: 'feedback', value: 98, label: 'Positive Feedback', suffix: '%' },
    { id: 'experience', value: 7, label: 'Years of Experience', suffix: '+' },
  ];

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 4.93;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };


  // Fetch team members from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchTeamMembers = async () => {
      try {
        const response = await teamAPI.getAllPublic();
        
        // Process data regardless of mount status
        if (response && response.data) {
          console.log('Team members fetched:', response.data);
          // Log image URLs for debugging
          response.data.forEach(member => {
            if (member.image) {
              console.log(`Member ${member.name} image:`, {
                original: member.image,
                constructed: getImageUrl(member.image)
              });
            }
          });
          // Only update state if component is still mounted
          if (isMounted) {
            setTeamMembers(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Keep empty array on error - only if mounted
        if (isMounted) {
          setTeamMembers([]);
        }
      }
    };

    fetchTeamMembers();

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


  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="about-section" id="about">
        <div className="about-container">
          {/* Main Title */}
          <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                About Us
              </SplitText>
            </h1>
          </ScrollReveal>

          {/* Introduction */}
          <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
            <div className="about-intro">
              <p>
              Illusio Designs is a creative and technology-driven agency dedicated to building brands and digital experiences that leave a lasting impression. With a blend of strategy, design, and development, we help businesses grow, innovate, and connect with their audience.
              </p>
              <p>
              Our team brings fresh ideas, modern design thinking, and technical expertise to every project. From branding to websites to enterprise systems—we deliver solutions that are visually stunning, performance-focused, and built for long-term success.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Section */}
          <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5} once={false} ready={!isLoading}>
            <div className="about-stats-section">
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
          </ScrollReveal>

          {/* Vision and Mission Grid */}
          <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5} once={false} ready={!isLoading}>
            <div className="vision-mission-grid">
              <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} once={false} ready={!isLoading}>
                <div className="about-card vision-card">
                  <h2 className="card-title">Our Vision</h2>
                  <p className="card-description">
                  To become a trusted global agency that blends creativity and technology to shape the future of digital experiences.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeUp" delay={0.35} duration={1.5} once={false} ready={!isLoading}>
                <div className="about-card mission-card">
                  <h2 className="card-title">Our Mission</h2>
                  <p className="card-description">
                  To deliver innovative, user-focused, and scalable solutions that empower brands, simplify business processes, and create meaningful impact.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Our Goals Section */}
          <ScrollReveal animation="fadeUp" delay={0.4} duration={1.5} once={false} ready={!isLoading}>
            <div className="goals-section">
              <h2 className="section-subtitle">Our Goals</h2>
              <div className="goals-grid">
                {goals.map((goal, index) => (
                  <ScrollReveal
                    key={goal.id}
                    animation="fadeUp"
                    delay={0.1 + index * 0.05}
                    duration={1.5}
                    once={false}
                    ready={!isLoading}
                  >
                    <div className="goal-card">
                      <div className="goal-icon-wrapper">
                        <img src={goal.icon} alt={goal.title} width={60} height={60} className="goal-icon" />
                      </div>
                      <h3 className="goal-title">{goal.title}</h3>
                      <p className="goal-description">{goal.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Team Section */}
          <ScrollReveal animation="fadeUp" delay={0.45} duration={1.5} once={false} ready={!isLoading}>
            <div className="team-section">
              <h2 className="section-subtitle">Our Team</h2>
              <div className="team-grid">
                {teamMembers.length > 0 ? (
                  teamMembers.map((member, index) => (
                    <ScrollReveal
                      key={member.id}
                      animation="fadeUp"
                      delay={0.1 + index * 0.05}
                      duration={1.5}
                      once={false}
                      ready={!isLoading}
                    >
                      <div className="team-card">
                        <div className="team-avatar">
                          {(() => {
                            const hasImage = member.image && typeof member.image === 'string' && member.image.trim() !== '';
                            if (!hasImage) {
                              return (
                                <div className="avatar-placeholder">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              );
                            }
                            
                            const imageUrls = getTeamImageUrl(member.image);
                            if (!imageUrls) {
                              return (
                                <div className="avatar-placeholder">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              );
                            }
                            
                            return (
                              <img
                                src={imageUrls.primary}
                                alt={member.name}
                                className="team-avatar-image"
                                style={{ 
                                  width: '200px',
                                  height: '200px',
                                  objectFit: 'cover', 
                                  borderRadius: '50%',
                                  display: 'block'
                                }}
                                onError={(e) => {
                                  // Try fallback URLs if primary fails
                                  if (imageUrls.fallbacks && imageUrls.fallbacks.length > 0) {
                                    const fallbackUrl = imageUrls.fallbacks.shift();
                                    console.log('Trying fallback URL for', member.name, ':', fallbackUrl);
                                    e.target.src = fallbackUrl;
                                  } else {
                                    console.error('Image load error for', member.name, ':', {
                                      original: member.image,
                                      constructed: imageUrls.primary,
                                      IMAGE_BASE_URL
                                    });
                                    e.target.style.display = 'none';
                                    if (e.target.parentElement) {
                                      e.target.parentElement.innerHTML = `<div class="avatar-placeholder">${member.name.split(' ').map(n => n[0]).join('')}</div>`;
                                    }
                                  }
                                }}
                                onLoad={() => {
                                  console.log('Image loaded successfully for', member.name, ':', imageUrls.primary);
                                }}
                              />
                            );
                          })()}
                        </div>
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        {member.bio && <p className="team-description">{member.bio}</p>}
                      </div>
                    </ScrollReveal>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>
                    No team members available
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* What Our Clients Say */}
          <ScrollReveal animation="fadeUp" delay={0.5} duration={1.5} once={false} ready={!isLoading}>
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
          </ScrollReveal>
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

      <Footer navigateTo={navigateTo} />
    </>
  );
}
