import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export const metadata = {
  title: 'About — Illusio Designs',
};

const values = [
  { num: '01', title: 'Outcome over output', body: 'We measure success by what your business and customers feel after launch, not deliverables shipped.' },
  { num: '02', title: 'Craft you can sense', body: 'From spacing to motion — every detail is decided, never default. Polish is the floor, not the ceiling.' },
  { num: '03', title: 'Honest collaboration', body: 'Clear scope, weekly reviews, no surprises. We work like an embedded team, not an external vendor.' },
];

const team = [
  { name: 'Krunal Soni', role: 'Founder & Lead Designer', image: '/images/founder.webp' },
  { name: 'Priya Nair', role: 'Senior Product Designer', image: '/images/IllusioDesignLogoicon.webp' },
  { name: 'Aman Verma', role: 'Engineering Lead', image: '/images/IllusioDesignLogoicon.webp' },
  { name: 'Riya Shah', role: 'Brand Designer', image: '/images/IllusioDesignLogoicon.webp' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
          eyebrow="About the studio"
          title={<>A studio built on <em>craft.</em></>}
          description="Illusio Designs is a senior product design studio. We partner with founders and product teams to ship interfaces, brands and digital experiences that actually move the needle."
        />

        <section className="about-intro">
          <Container>
            <div className="about-intro-grid">
              <Reveal>
                <div className="about-portrait-wrap">
                  <div className="about-portrait-frame">
                    <Image src="/images/founder.webp" alt="Illusio Designs studio" width={800} height={1000} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="about-intro-text">
                  <h2 className="section-title">Built around craft, run like a product team.</h2>
                  <p>We started Illusio with one rule: never ship work we wouldn&apos;t put in our own portfolio. Eighteen years on, that rule still drives every roadmap, review and revision.</p>
                  <p>We&apos;ve helped fintech, SaaS, DTC and lifestyle brands rebuild their digital products from scratch — bringing together strategy, design systems and front-end engineering under one roof.</p>
                  <div className="about-intro-stats">
                    <div>
                      <strong><Counter value={600} suffix="+" /></strong>
                      <span>Projects shipped</span>
                    </div>
                    <div>
                      <strong><Counter value={50} suffix="+" /></strong>
                      <span>Industries served</span>
                    </div>
                    <div>
                      <strong><Counter value={18} suffix="" /></strong>
                      <span>Years in craft</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="values">
          <Container>
            <Reveal>
              <h2 className="section-title" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
                What we stand for.
              </h2>
            </Reveal>
            <div className="values-grid">
              {values.map((v, i) => (
                <Reveal key={v.num} delay={i * 0.06}>
                  <div className="value-card">
                    <span className="value-num">{v.num}</span>
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="team">
          <Container>
            <Reveal>
              <div className="team-head">
                <span className="section-eyebrow"><em>03</em> The studio</span>
                <h2 className="section-title">A senior, multi-disciplinary team.</h2>
              </div>
            </Reveal>
            <div className="team-grid">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.05}>
                  <div className="team-card">
                    <div className="team-thumb">
                      <Image src={m.image} alt={m.name} width={400} height={400} />
                    </div>
                    <h4>{m.name}</h4>
                    <span>{m.role}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
