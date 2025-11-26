import '@/styles/pages/CaseStudyDetail.css';
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

export default function CaseStudyDetail({ caseStudyName, navigateTo, currentPage }) {
  // Find current case study
  const currentCaseStudy = caseStudies.find(study => study.slug === caseStudyName) || caseStudies[0];
  
  // Get related case studies (exclude current one)
  const relatedCaseStudies = caseStudies.filter(study => study.slug !== caseStudyName).slice(0, 5);

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
                {currentCaseStudy.name}
              </SplitText>
            </h1>
          </ScrollReveal>

          <div className="case-study-detail-layout">
            {/* Main Content Column */}
            <div className="case-study-main-content">
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false}>
                <div className="case-study-image-placeholder"></div>
                <div className="case-study-body-text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Related Case Studies Column */}
            <div className="case-study-related">
              <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false}>
                {relatedCaseStudies.map((study, index) => (
                  <div 
                    key={study.slug} 
                    className="related-case-study-card"
                    onClick={() => navigateTo('case-study-detail', study.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="related-case-study-image"></div>
                    <div className="related-case-study-title">{study.name}</div>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
