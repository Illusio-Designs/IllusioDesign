import '@/styles/pages/Services.css';

export default function Services({ navigateTo }) {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card" onClick={() => navigateTo('service-detail', 'design')} style={{ cursor: 'pointer' }}>
            <h3>Design</h3>
            <p>Creative and user-centric design solutions that bring your vision to life.</p>
          </div>
          <div className="service-card" onClick={() => navigateTo('service-detail', 'development')} style={{ cursor: 'pointer' }}>
            <h3>Development</h3>
            <p>Robust and scalable web and mobile applications built with cutting-edge technology.</p>
          </div>
          <div className="service-card" onClick={() => navigateTo('service-detail', 'marketing')} style={{ cursor: 'pointer' }}>
            <h3>Marketing</h3>
            <p>Strategic digital marketing campaigns that drive growth and engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
