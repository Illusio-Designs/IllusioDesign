'use client';

import { useState, useEffect, useRef } from 'react';
import '@/styles/pages/Home.css';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SplitText from '@/components/SplitText';
import Counter from '@/components/Counter';

const serviceCards = [
  {
    id: 'branding',
    icon: '/Icons/Brandanddesign.png',
    alt: 'Branding & Design',
    title: ['Branding &', 'Design'],
    className: 'service-card-1',
  },
  {
    id: 'web-app',
    icon: '/Icons/Web&app.png',
    alt: 'Web & App Development',
    title: ['Web & App', 'Development'],
    className: 'service-card-2',
  },
  {
    id: 'marketing',
    icon: '/Icons/digitalmarketing.png',
    alt: 'Digital Marketing',
    title: ['Digital', 'Marketing'],
    className: 'service-card-3',
  },
  {
    id: 'b2b',
    icon: '/Icons/b2bsolution.png',
    alt: 'B2B & Custom Solutions',
    title: ['B2B & Custom', 'Solutions'],
    className: 'service-card-4',
  },
];

const caseStudies = [
  'Branding & Design',
  'Web & App Development',
  'Digital Marketing',
  'B2B & Custom Solutions',
];

const stats = [
  { id: 'projects', value: 883, label: 'Project Completed', suffix: '' },
  { id: 'services', value: 19, label: 'Total Top Services', suffix: '+' },
  { id: 'feedback', value: 98, label: 'Positive Feedback', suffix: '%' },
  { id: 'experience', value: 7, label: 'Years of Experience', suffix: '+' },
];

const faqItems = [
  'What services do you offer?',
  'How long does a typical project take?',
  'What is your pricing structure?',
  'Do you offer ongoing support?',
  'Can you work with our existing team?',
];

const testimonials = [
  {
    id: 'john',
    text: 'Excellent work and professional service. Highly recommended!',
    client: '- John Doe',
  },
  {
    id: 'jane',
    text: 'They transformed our vision into reality. Amazing team!',
    client: '- Jane Smith',
  },
  {
    id: 'mike',
    text: 'Outstanding results and great communication throughout.',
    client: '- Mike Johnson',
  },
];

const blogPosts = [
  'Latest Design Trends 2024',
  'Building Scalable Applications',
  'Digital Marketing Strategies',
];

export default function Home({ navigateTo, currentPage }) {
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const servicesSectionRef = useRef(null);

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

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <ScrollReveal className="hero-container" animation="fadeUp" distance={80} once={false}>
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
            <Image src="/Icons/circle.png" alt="" className="shape shape-circle-1" width={70} height={70} />
            <Image src="/Icons/halfcircle.png" alt="" className="shape shape-half-1" width={60} height={60} />
            <Image src="/Icons/halfcircle.png" alt="" className="shape shape-half-2" width={60} height={60} />
            <Image src="/Icons/circle.png" alt="" className="shape shape-circle-2" width={70} height={70} />
            <Image src="/Icons/square.png" alt="" className="shape shape-square-1" width={50} height={50} />
          </div>
        </ScrollReveal>
      </section>

      {/* Services We Offer */}
      <section ref={servicesSectionRef} className="services-offer-section">
        <div className="services-container">
          <ScrollReveal as="div" className="services-title-wrapper" animation="fadeUp" delay={0.1} once={false}>
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
          <ScrollReveal as="div" animation="fadeUp" once={false}>
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
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <ScrollReveal
                key={study}
                as="div"
                className="case-study-card"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                once={false}
              >
                <div className="case-placeholder"></div>
                <h3>{study}</h3>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={stat.id} className="stat-item">
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
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Topics */}
      <section className="faq-section">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" once={false}>
            <SplitText
              as="h2"
              className="section-title"
              splitBy="words"
              animation="fadeUp"
              delay={0.05}
              trigger="onScroll"
              once={false}
            >
              Frequently Asked Topics
            </SplitText>
          </ScrollReveal>
          <div className="faq-content">
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <ScrollReveal
                  key={item}
                  as="div"
                  className="faq-item"
                  animation="slideLeft"
                  delay={0.1 + index * 0.04}
                  once={false}
                >
                  {item}
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="testimonials-section">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" once={false}>
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
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={testimonial.id}
                as="div"
                className="testimonial-card"
                animation="fadeUp"
                delay={0.1 + index * 0.05}
                once={false}
              >
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">&quot;{testimonial.text}&quot;</p>
                <p className="client-name">{testimonial.client}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Growth Hub */}
      <section className="growth-hub-section">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" once={false}>
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
            {blogPosts.map((post, index) => (
              <ScrollReveal
                key={post}
                as="div"
                className="blog-card"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                once={false}
              >
                <div className="blog-placeholder"></div>
                <p>{post}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </>
  );
}
