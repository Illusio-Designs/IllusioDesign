import '@/styles/pages/AboutUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutUs({ navigateTo, currentPage }) {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Creative Director',
      description: 'Leading our creative vision with 10+ years of experience in design and branding.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Lead Developer',
      description: 'Expert in full-stack development, bringing innovative solutions to life.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'UX/UI Designer',
      description: 'Crafting intuitive user experiences that delight and engage users.'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Digital Marketing Lead',
      description: 'Driving growth through strategic digital marketing and brand positioning.'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Innovation',
      description: 'Continuously push boundaries and explore new technologies to deliver cutting-edge solutions.'
    },
    {
      id: 2,
      title: 'Excellence',
      description: 'Maintain the highest standards in every project, ensuring quality and attention to detail.'
    },
    {
      id: 3,
      title: 'Client Success',
      description: 'Prioritize client goals and work collaboratively to achieve measurable business results.'
    },
    {
      id: 4,
      title: 'Growth',
      description: 'Foster a culture of learning and development, both for our team and our clients.'
    }
  ];

  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="about-section" id="about">
        <div className="about-container">
          {/* Main Title */}
          <ScrollReveal as="div" animation="fadeUp" delay={0.1} duration={1.5} once={false}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                About Us
              </SplitText>
            </h1>
          </ScrollReveal>

          {/* Introduction */}
          <ScrollReveal animation="fadeUp" delay={0.15} duration={1.5} once={false}>
            <div className="about-intro">
              <p>
                At Illusio Designs, we are passionate about creating exceptional digital experiences. 
                Our team of talented designers and developers work together to bring your ideas to life, 
                transforming visions into reality through innovative design and cutting-edge technology.
              </p>
              <p>
                With years of experience in the industry, we have helped numerous clients achieve 
                their business goals through strategic design thinking, user-centered development, 
                and data-driven digital marketing solutions.
              </p>
            </div>
          </ScrollReveal>

          {/* Vision Section */}
          <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5} once={false}>
            <div className="about-card vision-card">
              <div className="card-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="card-title">Our Vision</h2>
              <p className="card-description">
                To be the leading digital design and development agency that transforms businesses 
                through innovative solutions, creating meaningful connections between brands and their 
                audiences. We envision a future where every digital experience is intuitive, beautiful, 
                and purpose-driven.
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Section */}
          <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5} once={false}>
            <div className="about-card mission-card">
              <div className="card-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="#EC691F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="card-title">Our Mission</h2>
              <p className="card-description">
                To empower businesses with exceptional digital solutions that drive growth and success. 
                We combine creative excellence with technical expertise to deliver projects that exceed 
                expectations. Our mission is to understand our clients' unique challenges and provide 
                tailored solutions that make a lasting impact.
              </p>
            </div>
          </ScrollReveal>

          {/* Our Goals Section */}
          <ScrollReveal animation="fadeUp" delay={0.3} duration={1.5} once={false}>
            <div className="goals-section">
              <h2 className="section-subtitle">Our Goals</h2>
              <div className="goals-grid">
                {goals.map((goal, index) => (
                  <ScrollReveal
                    key={goal.id}
                    animation="fadeUp"
                    delay={0.1 + index * 0.05}
                    duration={1.5}
                    once={false}
                  >
                    <div className="goal-card">
                      <h3 className="goal-title">{goal.title}</h3>
                      <p className="goal-description">{goal.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Team Section */}
          <ScrollReveal animation="fadeUp" delay={0.35} duration={1.5} once={false}>
            <div className="team-section">
              <h2 className="section-subtitle">Our Team</h2>
              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <ScrollReveal
                    key={member.id}
                    animation="fadeUp"
                    delay={0.1 + index * 0.05}
                    duration={1.5}
                    once={false}
                  >
                    <div className="team-card">
                      <div className="team-avatar">
                        <div className="avatar-placeholder">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                      <p className="team-description">{member.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
