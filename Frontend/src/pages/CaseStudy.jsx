import '@/styles/pages/CaseStudy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import { useState, useEffect, useRef } from 'react';

export default function CaseStudy({ navigateTo, currentPage }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('web');
  const [animatedProjects, setAnimatedProjects] = useState(new Set());
  const projectRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: 'Aicumen AI',
      description: 'Intelligent automation system powered by state-of-the-art AI technology, enabling organizations to streamline operations and enhance productivity through smart solutions.',
      image: '/images/aicumen-ai.webp',
      link: 'https://www.aicumen.ai/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '1 months',
      results: ['Enhanced automation capabilities', 'Improved user experience', 'Scalable architecture'],
      location: 'India',
      projectName: 'AICUMEN'
    },
    {
      id: 2,
      title: 'AMRUTKUMAR GOVINDDAS LLP',
      description: 'Sophisticated digital storefront presenting luxury jewelry pieces with intuitive navigation, smooth checkout process, and trusted payment security.',
      image: '/images/amrutkumar-jewelry.webp',
      link: 'https://amrutkumargovinddasllp.com/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '2 Days',
      results: ['Improved conversion rates', 'Enhanced user experience', 'Mobile-responsive design'],
      location: 'India',
      projectName: 'AMRUTKUMAR'
    },
    {
      id: 3,
      title: 'AMRUTKUMAR GOVINDDAS LLP (App)',
      description: 'Mobile app experience for AMRUTKUMAR GOVINDDAS LLP, bringing their premium jewelry collection and seamless shopping journey directly to users\' devices.',
      image: '/images/Amrut App.webp',
      link: '#',
      category: 'app',
      tags: ['#MOBILE APP DESIGN', '#MOBILE APP DEVELOPMENT'],
      techStack: ['React Native', 'Node.js'],
      timeline: '5 months',
      results: ['Native mobile experience', 'Improved user engagement', 'Seamless shopping journey'],
      location: 'India',
      projectName: 'AMRUTKUMAR APP'
    },
    {
      id: 4,
      title: 'Crosscoin',
      description: 'Contemporary e-commerce destination specializing in premium sock collections, combining stylish aesthetics with superior comfort for daily use.',
      image: '/images/crosscoin.webp',
      link: 'https://crosscoin.in/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '3 months',
      results: ['Modern e-commerce platform', 'Improved sales conversion', 'User-friendly interface'],
      location: 'India',
      projectName: 'CROSSCOIN'
    },
    {
      id: 5,
      title: 'Immune Protector',
      description: 'Comprehensive wellness resource center delivering valuable insights and quality supplements designed to naturally boost and maintain immune health.',
      image: '/images/immune-protector.webp',
      link: 'https://www.immuneprotector.in/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '2 months',
      results: ['Enhanced user engagement', 'Improved content delivery', 'Better user experience'],
      location: 'India',
      projectName: 'IMMUNE PROTECTOR'
    },
    {
      id: 6,
      title: 'Nanak Finserv',
      description: 'Digital banking ecosystem providing creative financial tools and services tailored for individual consumers and corporate clients seeking modern banking solutions.',
      image: '/images/nanak-finserv.webp',
      link: 'https://nanakfinserv.com/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '4 months',
      results: ['Secure banking platform', 'Improved user trust', 'Enhanced functionality'],
      location: 'India',
      projectName: 'NANAK FINSERV'
    },
    {
      id: 7,
      title: 'Radhe Consultancy',
      description: 'Expert advisory network linking companies with seasoned consultants who deliver strategic guidance to drive organizational expansion and success.',
      image: '/images/radhe-consultancy.webp',
      link: 'https://radheconsultancy.co.in/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '3 months',
      results: ['Professional platform', 'Improved client engagement', 'Better service delivery'],
      location: 'India',
      projectName: 'RADHE CONSULTANCY'
    },
    {
      id: 8,
      title: 'Vivera Lighting',
      description: 'Contemporary illumination specialist creating stylish fixtures and eco-friendly lighting options perfect for both home environments and workplace settings.',
      image: '/images/vivera-lighting.webp',
      link: 'https://www.viveralighting.com/',
      category: 'web',
      tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
      techStack: ['React', 'Node.js'],
      timeline: '3 months',
      results: ['Modern design showcase', 'Improved product visibility', 'Enhanced user experience'],
      location: 'India',
      projectName: 'VIVERA LIGHTING'
    }
  ];

  const categories = [
    { key: 'branding', label: 'Branding & Design' },
    { key: 'web', label: 'Web' },
    { key: 'app', label: 'App' },
    { key: 'b2b', label: 'B2B & Custom Solution' }
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  // Reset animated projects when category changes
  useEffect(() => {
    setAnimatedProjects(new Set());
    projectRefs.current = [];
  }, [activeCategory]);

  const handleProjectClick = (project) => {
    navigateTo('case-study-detail', project.id.toString());
  };

  // Trigger boom animation when project comes into view
  useEffect(() => {
    if (filteredProjects.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = entry.target.dataset.projectId;
          if (projectId && !animatedProjects.has(projectId)) {
            setAnimatedProjects(prev => new Set([...prev, projectId]));
            // Add animation class
            const imageWrapper = entry.target.querySelector('.project-image-wrapper');
            if (imageWrapper) {
              imageWrapper.classList.add('animate-boom');
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredProjects, animatedProjects]);

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="projects-section" id="case-study">
        <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5}>
          <h1 className="section-title">
            <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
              Case Studies
            </SplitText>
          </h1>
        </ScrollReveal>
        <div className="projects-tabs">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`projects-tab-button ${
                activeCategory === category.key ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="projects-list">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  projectRefs.current[index] = el;
                }
              }}
              data-project-id={project.id}
              className="project-card-vertical"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
                <div className="project-visual">
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="project-info-wrapper">
                  <div className="project-info">
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title-main">
                    <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                      {project.title}
                    </SplitText>
                  </h3>
                  <div className="project-buttons">
                    <button className="project-name-button">{project.projectName}</button>
                    <button className="project-location-button">
                      {project.location}
                      {project.location === 'USA'}
                      {project.location === 'India'}
                      {project.location === 'Australia'}
                    </button>
                  </div>
                  <div className="project-details-grid">
                    <div className="project-detail-item">
                      <span className="detail-label">TECH STACK</span>
                      <span className="detail-value">{project.techStack.join(', ')}</span>
                    </div>
                    <div className="project-detail-item">
                      <span className="detail-label">TIMELINE</span>
                      <span className="detail-value">{project.timeline}</span>
                    </div>
                  </div>
                  <div className="project-results">
                    <span className="detail-label">RESULTS</span>
                    <ul className="results-list">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex}>{typeof result === 'string' ? result : result.title || result}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className={`explore-button ${hoveredProject === project.id ? 'hovered' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    EXPLORE →
                  </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
