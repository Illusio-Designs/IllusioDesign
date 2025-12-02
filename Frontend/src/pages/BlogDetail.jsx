import '@/styles/pages/BlogDetail.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState } from 'react';

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

export default function BlogDetail({ blogName, navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Find current blog post
  const currentBlog = blogPosts.find(blog => blog.slug === blogName) || blogPosts[0];
  
  // Get related posts (exclude current one)
  const relatedPosts = blogPosts.filter(blog => blog.slug !== blogName).slice(0, 5);

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="blog-detail-section">
        <div className="blog-detail-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                {currentBlog.title.split(':')[0]}
              </SplitText>
            </h1>
          </ScrollReveal>

          <div className="blog-detail-layout">
            {/* Main Content Column */}
            <div className="blog-main-content">
              <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false} ready={!isLoading}>
                <div className="blog-image-placeholder"></div>
                <div className="blog-date">{currentBlog.date}</div>
                <div className="blog-body-text">
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

            {/* Related Articles Column */}
            <div className="blog-related-articles">
              <ScrollReveal as="div" animation="fadeUp" delay={0.15} duration={1.5} once={false} ready={!isLoading}>
                {relatedPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="related-article-card"
                    onClick={() => navigateTo('blog-detail', post.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="related-article-image"></div>
                    <div className="related-article-title">{post.title}</div>
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
