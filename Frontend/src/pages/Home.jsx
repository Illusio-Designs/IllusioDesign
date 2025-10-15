import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Testimonial from '@/components/Testimonial'
import '@/styles/pages/Home.css'

export default function Home() {
  const testimonials = [
    {
      testimonial: "Illusio Design transformed our outdated website into a modern, responsive platform. Our online engagement has increased by 300%!",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      image: "/api/placeholder/50/50"
    },
    {
      testimonial: "The team delivered our mobile app ahead of schedule with exceptional quality. Their expertise in UI/UX is unmatched.",
      author: "Mike Chen",
      role: "Founder, AppVenture",
      image: "/api/placeholder/50/50"
    }
  ]

  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Innovate. Create. Transform.</h1>
            <p className="hero-subtitle">Transforming ideas into powerful digital solutions with cutting-edge technology and creative excellence</p>
            <div className="hero-buttons">
              <button className="btn-primary">View Our Services</button>
              <button className="btn-secondary">Get Started</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2 className="section-title">Why Choose Illusio Design?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💻</div>
                <h3>Expert Development</h3>
                <p>Cutting-edge web and mobile solutions built with the latest technologies</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Creative Design</h3>
                <p>Beautiful, user-centric UI/UX designs that engage and convert</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Digital Innovation</h3>
                <p>Transform your business with our comprehensive digital solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="container">
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
