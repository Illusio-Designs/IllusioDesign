import '@/styles/components/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/images/IllusioDesignfulllogo.png" alt="Illusio Designs" className="logo-image" />
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
        <button className="engage-button">Let's Engage</button>
      </div>
    </header>
  );
}
