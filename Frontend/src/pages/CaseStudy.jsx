import '@/styles/pages/CaseStudy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';

export default function CaseStudy({ navigateTo, currentPage }) {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Aicumen AI',
      description: 'Intelligent automation system powered by state-of-the-art AI technology, enabling organizations to streamline operations and enhance productivity through smart solutions.',
      image: '/images/aicumen-ai.webp',
      link: 'https://www.aicumen.ai/'
    },
    {
      id: 2,
      title: 'AMRUTKUMAR GOVINDDAS LLP',
      description: 'Sophisticated digital storefront presenting luxury jewelry pieces with intuitive navigation, smooth checkout process, and trusted payment security.',
      image: '/images/amrutkumar-jewelry.webp',
      link: 'https://amrutkumargovinddasllp.com/'
    },
    {
      id: 3,
      title: 'Crosscoin',
      description: 'Contemporary e-commerce destination specializing in premium sock collections, combining stylish aesthetics with superior comfort for daily use.',
      image: '/images/crosscoin.webp',
      link: 'https://crosscoin.in/'
    },
    {
      id: 4,
      title: 'Immune Protector',
      description: 'Comprehensive wellness resource center delivering valuable insights and quality supplements designed to naturally boost and maintain immune health.',
      image: '/images/immune-protector.webp',
      link: 'https://www.immuneprotector.in/'
    },
    {
      id: 5,
      title: 'Nanak Finserv',
      description: 'Digital banking ecosystem providing creative financial tools and services tailored for individual consumers and corporate clients seeking modern banking solutions.',
      image: '/images/nanak-finserv.webp',
      link: 'https://nanakfinserv.com/'
    },
    {
      id: 6,
      title: 'Radhe Consultancy',
      description: 'Expert advisory network linking companies with seasoned consultants who deliver strategic guidance to drive organizational expansion and success.',
      image: '/images/radhe-consultancy.webp',
      link: 'https://radheconsultancy.co.in/'
    },
    {
      id: 7,
      title: 'Vivera Lighting',
      description: 'Contemporary illumination specialist creating stylish fixtures and eco-friendly lighting options perfect for both home environments and workplace settings.',
      image: '/images/vivera-lighting.webp',
      link: 'https://www.viveralighting.com/'
    }
  ];

  const handleProjectClick = (project) => {
    navigateTo('case-study-detail', project.id.toString());
  };

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
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} animation="fadeUp" delay={0.15 + index * 0.05} duration={1.5}>
              <div
                className="project-card"
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-image">
                  <div className="project-thumbnail">
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
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">
                      <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                        {project.title}
                      </SplitText>
                      <span className={`project-arrow ${hoveredProject === project.id ? 'arrow-visible' : ''}`}>
                        →
                      </span>
                    </h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
