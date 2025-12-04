import '@/styles/pages/AboutUs.css';
import '@/styles/pages/Home.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import Image from 'next/image';
import Counter from '@/components/Counter';
import { useState, useEffect, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';

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

export default function AboutUs({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('about');

  const [isLoading, setIsLoading] = useState(true);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isTestimonialsHovered, setIsTestimonialsHovered] = useState(false);
  const [isTestimonialsSliding, setIsTestimonialsSliding] = useState(false);
  const testimonialsSectionRef = useRef(null);
  const testimonialsSlideTimeoutRef = useRef(null);
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO',
      description: 'Leading our vision with strategic direction and innovative thinking.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CFO',
      description: 'Managing financial operations and driving business growth strategies.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      description: 'Creating beautiful and responsive user interfaces with modern technologies.'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Backend Developer',
      description: 'Building robust and scalable server-side solutions and APIs.'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Innovation',
      description: 'Continuously push boundaries and explore new technologies to deliver cutting-edge solutions.',
      icon: '/Icons/Brandanddesign.webp'
    },
    {
      id: 2,
      title: 'Excellence',
      description: 'Maintain the highest standards in every project, ensuring quality and attention to detail.',
      icon: '/Icons/Web&app.webp'
    },
    {
      id: 3,
      title: 'Client Success',
      description: 'Prioritize client goals and work collaboratively to achieve measurable business results.',
      icon: '/Icons/digitalmarketing.webp'
    },
    {
      id: 4,
      title: 'Growth',
      description: 'Foster a culture of learning and development, both for our team and our clients.',
      icon: '/Icons/b2bsolution.webp'
    }
  ];

  const stats = [
    { id: 'projects', value: 883, label: 'Project Completed', suffix: '' },
    { id: 'services', value: 19, label: 'Total Top Services', suffix: '+' },
    { id: 'feedback', value: 98, label: 'Positive Feedback', suffix: '%' },
    { id: 'experience', value: 7, label: 'Years of Experience', suffix: '+' },
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
                At Illusio Designs, we are passionate about creating exceptional digital experiences. 
                Our team of talented designers and developers work together to bring your ideas to life, 
                transforming visions into reality through innovative design and cutting-edge technology.
              </p>
              <p>
                With years of experience in the industry, we have helped numerous clients achieve 
                their business goals through strategic design thinking, user-centered development, 
                and data-driven digital marketing solutions.
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
                    To be the leading digital design and development agency that transforms businesses 
                    through innovative solutions, creating meaningful connections between brands and their 
                    audiences.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeUp" delay={0.35} duration={1.5} once={false} ready={!isLoading}>
                <div className="about-card mission-card">
                  <h2 className="card-title">Our Mission</h2>
                  <p className="card-description">
                    To empower businesses with exceptional digital solutions that drive growth and success. 
                    We combine creative excellence with technical expertise to deliver projects that exceed 
                    expectations.
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
                        <Image src={goal.icon} alt={goal.title} width={60} height={60} className="goal-icon" />
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
                {teamMembers.map((member, index) => (
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
                        <div className="avatar-placeholder">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                      <p className="team-description">{member.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* What Our Clients Say */}
          <ScrollReveal animation="fadeUp" delay={0.5} duration={1.5} once={false} ready={!isLoading}>
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
          </ScrollReveal>
        </div>
      </section>

     

      <Footer navigateTo={navigateTo} />
    </>
  );
}
