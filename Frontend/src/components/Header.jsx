import '@/styles/components/Header.css';

export default function Header({ navigateTo, currentPage }) {
  // Map detail pages to their parent pages for active state
  const getActivePage = () => {
    if (!currentPage) return '';
    
    // Map detail pages to their parent pages
    if (currentPage === 'service-detail') return 'services';
    if (currentPage === 'case-study-detail') return 'portfolio';
    if (currentPage === 'blog-detail') return 'blog';
    
    return currentPage;
  };

  const activePage = getActivePage();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <img src="/images/IllusioDesignfulllogo.png" alt="Illusio Designs" className="logo-image" />
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a 
                onClick={() => navigateTo('services')}
                className={activePage === 'services' ? 'active' : ''}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('portfolio')}
                className={activePage === 'portfolio' ? 'active' : ''}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('about')}
                className={activePage === 'about' ? 'active' : ''}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('career')}
                className={activePage === 'career' ? 'active' : ''}
              >
                Career
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('blog')}
                className={activePage === 'blog' ? 'active' : ''}
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <button className="engage-button" onClick={() => navigateTo('contact')}>Let&apos;s Engage</button>
      </div>
    </header>
  );
}
