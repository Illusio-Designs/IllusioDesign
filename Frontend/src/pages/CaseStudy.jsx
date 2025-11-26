import '@/styles/pages/CaseStudy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

const caseStudies = [
  {
    name: 'Branding & Design',
    slug: 'branding-design',
  },
  {
    name: 'Web & App Development',
    slug: 'web-app-development',
  },
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
  },
  {
    name: 'B2B & Custom Solutions',
    slug: 'b2b-custom-solutions',
  },
  {
    name: 'E-Commerce Solutions',
    slug: 'e-commerce-solutions',
  },
  {
    name: 'SaaS Platform Development',
    slug: 'saas-platform-development',
  },
];

export default function CaseStudy({ navigateTo, currentPage }) {
  const handleCaseStudyClick = (slug) => {
    navigateTo('case-study-detail', slug);
  };

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="case-study-section" id="case-study">
        <div className="container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false}>
            <SplitText
              as="h1"
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
          <div className="case-study-grid">
            {caseStudies.map((study, index) => (
              <ScrollReveal
                key={`${study.slug}-${index}`}
                as="div"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                duration={1.5}
                once={false}
              >
                <div 
                  className="case-study-card"
                  onClick={() => handleCaseStudyClick(study.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="case-placeholder"></div>
                  <h3>{study.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
