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
  { slug: 'ui-ux-design', title: 'UI / UX Design', tag: 'Product Design', image: '/images/aicumen-ai.webp', body: 'Research, journeys, hi-fi screens and design systems engineered to scale.' },
  { slug: 'branding-design', title: 'Branding & Design', tag: 'Brand', image: '/images/Branding&Designing.webp', body: 'Logos, identity systems, packaging and brand guidelines that earn loyalty.' },
  { slug: 'web-app-development', title: 'Web & App Development', tag: 'Engineering', image: '/images/web&app.webp', body: 'Next.js, React Native and headless stacks — performance and accessibility built in.' },
  { slug: 'digital-marketing', title: 'Digital Marketing', tag: 'Growth', image: '/images/digitalmarketing.webp', body: 'Landing pages, paid creative and lifecycle programs that move qualified pipeline.' },
  { slug: 'b2b-solutions', title: 'B2B & Custom Solutions', tag: 'Enterprise', image: '/images/b2b.webp', body: 'Bespoke internal tools and dashboards that make complex ops feel effortless.' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
          eyebrow="What we do"
          title={<>Services that ship <em>outcomes.</em></>}
          description="Five focused capabilities. One senior team. Every engagement is scoped around the outcome you actually want."
        />

        <section style={{ padding: '40px 0 80px' }}>
          <Container>
            <div className="services-list">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.04}>
                  <Link href={`/services/${s.slug}`} className="service-row">
                    <div className="service-row-thumb">
                      <Image src={s.image} alt={s.title} width={520} height={340} />
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
