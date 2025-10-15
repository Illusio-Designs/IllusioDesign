import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/pages/Services.css'

export default function Services() {
  const services = [
    {
      id: 1,
      name: "Web Development",
      description: "Custom websites & web applications",
      image: "/api/placeholder/300/200",
      category: "Development"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "iOS & Android native apps",
      image: "/api/placeholder/300/200",
      category: "Development"
    },
    {
      id: 3,
      name: "UI/UX Design",
      description: "User-centered design solutions",
      image: "/api/placeholder/300/200",
      category: "Design"
    },
    {
      id: 4,
      name: "E-Commerce Solutions",
      description: "Online stores & marketplaces",
      image: "/api/placeholder/300/200",
      category: "Development"
    },
    {
      id: 5,
      name: "Digital Marketing",
      description: "SEO, SEM & social media",
      image: "/api/placeholder/300/200",
      category: "Marketing"
    },
    {
      id: 6,
      name: "Brand Identity",
      description: "Logo & visual identity design",
      image: "/api/placeholder/300/200",
      category: "Design"
    }
  ]

  const categories = ["All", "Development", "Design", "Marketing"]

  return (
    <div className="services-page">
      <Header />
      
      <main>
        <section className="services-hero">
          <div className="container">
            <h1 className="page-title">Our Services</h1>
            <p className="page-subtitle">Comprehensive digital solutions tailored to your business needs</p>
          </div>
        </section>

        <section className="services-content">
          <div className="container">
            <div className="filters">
              <h3>Filter by Category</h3>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button key={category} className="filter-btn">
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                    <div className="service-overlay">
                      <button className="learn-more-btn">Learn More</button>
                      <button className="get-quote-btn">Get Quote</button>
                    </div>
                  </div>
                  <div className="service-info">
                    <span className="service-category">{service.category}</span>
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
