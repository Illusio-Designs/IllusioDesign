import '@/styles/pages/AboutUs.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';

export default function AboutUs({ navigateTo, currentPage }) {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO',
      description: 'Leading our vision with strategic direction and innovative thinking.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CFO',
      description: 'Managing financial operations and driving business growth strategies.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      description: 'Creating beautiful and responsive user interfaces with modern technologies.'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Backend Developer',
      description: 'Building robust and scalable server-side solutions and APIs.'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Innovation',
      description: 'Continuously push boundaries and explore new technologies to deliver cutting-edge solutions.',
      icon: '/Icons/Brandanddesign.webp'
    },
    {
      id: 2,
      title: 'Excellence',
      description: 'Maintain the highest standards in every project, ensuring quality and attention to detail.',
      icon: '/Icons/Web&app.webp'
    },
    {
      id: 3,
      title: 'Client Success',
      description: 'Prioritize client goals and work collaboratively to achieve measurable business results.',
      icon: '/Icons/digitalmarketing.webp'
    },
    {
      id: 4,
      title: 'Growth',
      description: 'Foster a culture of learning and development, both for our team and our clients.',
      icon: '/Icons/b2bsolution.webp'
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

          {/* Vision and Mission Grid */}
          <div className="vision-mission-grid">
            <ScrollReveal animation="fadeUp" delay={0.2} duration={1.5} once={false}>
              <div className="about-card vision-card">
                <h2 className="card-title">Our Vision</h2>
                <p className="card-description">
                  To be the leading digital design and development agency that transforms businesses 
                  through innovative solutions, creating meaningful connections between brands and their 
                  audiences.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.25} duration={1.5} once={false}>
              <div className="about-card mission-card">
                <h2 className="card-title">Our Mission</h2>
                <p className="card-description">
                  To empower businesses with exceptional digital solutions that drive growth and success. 
                  We combine creative excellence with technical expertise to deliver projects that exceed 
                  expectations.
                </p>
              </div>
            </ScrollReveal>
          </div>

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
                      <div className="goal-icon-wrapper">
                        <Image src={goal.icon} alt={goal.title} width={60} height={60} className="goal-icon" />
                      </div>
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
