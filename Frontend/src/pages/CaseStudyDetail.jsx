import '@/styles/pages/CaseStudyDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

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

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  // Find current project by ID (caseStudyName is now a project ID string)
  const projectId = parseInt(caseStudyName, 10);
  const currentProject = projects.find(project => project.id === projectId) || projects[0];
  
  const handleVisitSite = () => {
    window.open(currentProject.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="case-study-detail-section">
        <div className="case-study-detail-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                {currentProject.title}
              </SplitText>
            </h1>
          </ScrollReveal>

          <div className="case-study-detail-layout">
            <div className="case-study-main-content">
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false}>
                <div className="case-study-image-container">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="case-study-detail-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="case-study-body-text">
                  <p>{currentProject.description}</p>
                  <button 
                    className="visit-site-button"
                    onClick={handleVisitSite}
                  >
                    Visit Site →
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
