import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/pages/About.css'

export default function About() {
  return (
    <div className="about-page">
      <Header />
      
      <main>
        <section className="about-hero">
          <div className="container">
            <h1 className="page-title">About Illusio Design</h1>
            <p className="page-subtitle">Innovate. Create. Transform. - Empowering Businesses Through Technology</p>
          </div>
        </section>

        <section className="about-story">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Founded with a vision to transform businesses through innovative technology, Illusio Design 
                  has been at the forefront of digital innovation. We believe that every business deserves 
                  cutting-edge digital solutions that drive growth and success.
                </p>
                <p>
                  Our journey began with a simple yet powerful mission: to combine creative excellence 
                  with technical expertise, delivering web and mobile solutions that not only meet expectations 
                  but exceed them, helping businesses thrive in the digital age.
                </p>
              </div>
              <div className="story-image">
                <img src="/api/placeholder/500/400" alt="Our Story" />
              </div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>Excellence</h3>
                <p>Every project is executed with meticulous attention to detail, ensuring exceptional results.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">💎</div>
                <h3>Quality</h3>
                <p>We use cutting-edge technologies and best practices to deliver superior digital solutions.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>Continuously exploring new technologies to create groundbreaking digital experiences.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Client Partnership</h3>
                <p>Your success is our priority, with dedicated support and collaboration every step of the way.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <h2 className="section-title">Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <img src="/api/placeholder/300/300" alt="Team Member" />
                </div>
                <h3>Sarah Johnson</h3>
                <p className="member-role">Chief Executive Officer</p>
                <p className="member-bio">Visionary leader with 15+ years in the technology industry.</p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <img src="/api/placeholder/300/300" alt="Team Member" />
                </div>
                <h3>Michael Chen</h3>
                <p className="member-role">Chief Technology Officer</p>
                <p className="member-bio">Award-winning developer and architect of innovative digital solutions.</p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <img src="/api/placeholder/300/300" alt="Team Member" />
                </div>
                <h3>Emily Rodriguez</h3>
                <p className="member-role">Creative Director</p>
                <p className="member-bio">Crafting beautiful, user-centric designs that deliver exceptional experiences.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
