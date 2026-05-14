import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import CTA from '@/components/home/CTA';
import Process from '@/components/home/Process';

const services = {
  'ui-ux-design': {
    title: 'UI / UX Design',
    tag: 'Product Design',
    image: '/images/aicumen-ai.webp',
    intro: 'We design products that earn trust on first use and stay easy as they grow. From research through ready-to-ship Figma libraries.',
    deliverables: ['User research & journeys', 'Information architecture & flows', 'Wireframes & clickable prototypes', 'Visual design & motion specs', 'Component-driven design systems'],
  },
  'branding-design': {
    title: 'Branding & Design',
    tag: 'Brand',
    image: '/images/Branding&Designing.webp',
    intro: 'A brand is the sum of every detail your customer sees. We design every detail.',
    deliverables: ['Brand strategy & positioning', 'Logo & identity systems', 'Typography & color systems', 'Packaging & print collateral', 'Brand guidelines & templates'],
  },
  'web-app-development': {
    title: 'Web & App Development',
    tag: 'Engineering',
    image: '/images/web&app.webp',
    intro: 'We engineer the design we ship. Next.js, React Native and headless stacks — performant, accessible, SEO-ready.',
    deliverables: ['Marketing sites & landing pages', 'Web apps & dashboards', 'iOS & Android (React Native)', 'Headless CMS integrations', 'Hosting, CI/CD & observability'],
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    tag: 'Growth',
    image: '/images/digitalmarketing.webp',
    intro: 'Performance creative and lifecycle programs that move qualified pipeline, not vanity metrics.',
    deliverables: ['Landing pages & CRO experiments', 'Paid social & search creatives', 'Email & lifecycle automation', 'Analytics & event tracking setup', 'Monthly growth reporting'],
  },
  'b2b-solutions': {
    title: 'B2B & Custom Solutions',
    tag: 'Enterprise',
    image: '/images/b2b.webp',
    intro: 'Internal tools, ops dashboards and bespoke B2B platforms designed for the people who actually run the business.',
    deliverables: ['Discovery & stakeholder interviews', 'Workflow & process redesign', 'Custom dashboards & reporting', 'Integrations with existing systems', 'Training and handover support'],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const s = services[params.slug];
  return { title: `${s?.title || 'Service'} — Illusio Designs` };
}

export default function ServiceDetailPage({ params }) {
  const service = services[params.slug];
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
          eyebrow={service.tag}
          title={service.title}
          description={service.intro}
        />

        <section style={{ padding: '20px 0 60px' }}>
          <Container>
            <div className="service-cover">
              <Image src={service.image} alt={service.title} width={1400} height={780} />
            </div>
          </Container>
        </section>

        <section style={{ padding: '40px 0 80px' }}>
          <Container size="md">
            <div className="prose">
              <h2>What you get</h2>
              <ul>
                {service.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <h2>How we work</h2>
              <p>We start with a paid discovery sprint to understand your users, competitors and constraints. From there we plan the engagement in short, demo-ready milestones — so you see real progress every week, not just at the end.</p>
              <p>Every project ships with a living design system, clean handover docs and 30 days of post-launch support — so nothing falls through the cracks when the team takes over.</p>
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
