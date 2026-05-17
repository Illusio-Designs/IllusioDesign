import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import CTA from '@/components/home/CTA';
import Process from '@/components/home/Process';

export const metadata = { title: 'Services — Illusio Designs' };

const services = [
  {
    slug: 'branding',
    tag: 'Branding & Design',
    title: "Carve Your Brand's Iconic Mark.",
    image: '/images/Branding&Designing.webp',
    body: 'Build a brand that stands out with identity systems, visual guidelines, and impactful creatives tailored to your audience.',
  },
  {
    slug: 'web-app',
    tag: 'Web & App Development',
    title: 'Shape Your Brand, Stand Out!',
    image: '/images/web&app.webp',
    body: 'Fast, scalable, and user-friendly digital products — from websites to mobile apps — crafted for real-world performance.',
  },
  {
    slug: 'marketing',
    tag: 'Digital Marketing',
    title: 'Your Product, Our Stunning Wrap!',
    image: '/images/digitalmarketing.webp',
    body: 'Grow your business with performance-driven strategies across SEO, social media, ads, automation, and content.',
  },
  {
    slug: 'b2b',
    tag: 'B2B & Custom Solutions',
    title: 'Spark Your Digital Presence!',
    image: '/images/b2b.webp',
    body: 'Custom-built portals, internal tools, automated workflows, and enterprise solutions to streamline operations.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
          eyebrow="What we do"
          title={<>Services <em>we offer.</em></>}
          description="Four focused capabilities. One senior team. Every engagement is scoped around the outcome you actually want."
        />

        <section style={{ padding: '40px 0 80px' }}>
          <Container>
            <div className="services-list">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.04}>
                  <Link href={`/services/${s.slug}`} className="service-row">
                    <div className="service-row-thumb">
                      <Image src={s.image} alt={s.tag} width={520} height={340} />
                    </div>
                    <div className="service-row-body">
                      <span className="service-row-tag">{s.tag}</span>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                    <span className="service-row-arrow">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
