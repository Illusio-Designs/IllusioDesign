import '@/styles/pages/Blog.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

const blogPosts = [
  {
    id: 'blog-1',
    date: 'July 14, 2025',
    title: 'From Logo to Legacy: How Strong Branding Drives Business Growth',
    slug: 'from-logo-to-legacy-how-strong-branding-drives-business-growth',
  },
  {
    id: 'blog-2',
    date: 'July 14, 2025',
    title: 'Why Your Website Isn\'t Converting And How Smart UI/UX Fixes That',
    slug: 'why-your-website-isnt-converting-and-how-smart-ui-ux-fixes-that',
  },
  {
    id: 'blog-3',
    date: 'July 14, 2025',
    title: 'Custom B2B Dashboards: A Game-Changer for Scaling',
    slug: 'custom-b2b-dashboards-a-game-changer-for-scaling',
  },
  {
    id: 'blog-4',
    date: 'July 10, 2025',
    title: 'The Future of Web Design: Trends to Watch in 2025',
    slug: 'the-future-of-web-design-trends-to-watch-in-2025',
  },
  {
    id: 'blog-5',
    date: 'July 5, 2025',
    title: 'Digital Marketing ROI: Measuring Success in the Modern Era',
    slug: 'digital-marketing-roi-measuring-success-in-the-modern-era',
  },
  {
    id: 'blog-6',
    date: 'June 28, 2025',
    title: 'Building Scalable Web Applications: Best Practices',
    slug: 'building-scalable-web-applications-best-practices',
  },
];

export default function Blog({ navigateTo, currentPage }) {
  const handleBlogClick = (slug) => {
    navigateTo('blog-detail', slug);
  };

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="blog-section" id="blog">
        <div className="container">
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
                Design News & Trends
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                for Inspired Living
              </SplitText>
            </h1>
          </ScrollReveal>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <ScrollReveal
                key={post.id}
                as="div"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                duration={1.5}
                once={false}
              >
                <div 
                  className="blog-card"
                  onClick={() => handleBlogClick(post.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="blog-placeholder"></div>
                  <div className="blog-content">
                    <span className="blog-date">{post.date}</span>
                    <p className="blog-title">{post.title}</p>
                  </div>
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
