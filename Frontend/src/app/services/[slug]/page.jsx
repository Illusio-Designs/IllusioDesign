import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Tag from '@/components/ui/Tag';
import RelatedWork from '@/components/home/RelatedWork';
import CTA from '@/components/home/CTA';

const catFor = { branding: 'branding', 'web-app': 'web', marketing: '', b2b: 'b2b' };

// Card positions for the 6-step journey-map (stage is a fixed 1100 x 600 box).
const MAP_POS = [
  { '--top': '2%', '--left': '63%', '--rot': '5deg' },
  { '--top': '32%', '--left': '52%', '--rot': '-5deg' },
  { '--top': '31%', '--left': '28%', '--rot': '4deg' },
  { '--top': '44%', '--left': '4%', '--rot': '-7deg' },
  { '--top': '70%', '--left': '26%', '--rot': '5deg' },
  { '--top': '74%', '--left': '48%', '--rot': '-4deg' },
];

// Dashed connector segments between consecutive cards (pure CSS, no SVG).
const MAP_LINKS = [
  { x: 803, y: 87, w: 217, r: 124 },
  { x: 682, y: 267, w: 264, r: 181 },
  { x: 418, y: 261, w: 275, r: 164 },
  { x: 154, y: 339, w: 288, r: 33 },
  { x: 396, y: 495, w: 243, r: 6 },
];

const services = {
  branding: {
    title: "Carve Your Brand's Iconic Mark.",
    tag: 'Branding & Design',
    image: '/images/Branding&Designing.webp',
    processTitle: 'Where Identity Begins.',
    description: [
      "A powerful brand is the foundation of every successful business. We craft brand identities that not only look stunning but also communicate your story with clarity and purpose. From your logo to your visual elements, each component is thoughtfully designed to reflect your brand's values and leave a strong impression on your audience.",
      "Our team blends strategy with creativity to build a complete identity system that works across every platform—digital, print, and social. Whether you're launching a new brand or refreshing an old one, we create cohesive visuals and guidelines that maintain consistency and help your brand stand out in a competitive market.",
    ],
    technologies: ['Figma', 'Illustrator', 'Photoshop'],
    process: [
      'Brand Discovery',
      'Strategic Direction',
      'Visual Planning',
      'Identity Design',
      'Brand Guidelines',
      'Final Delivery',
    ],
    deliverables: [
      'Logo Design',
      'UI / UX Design',
      'Brand Identity System',
      'Brand Guidelines',
      'Packaging & Print Design',
      'Creative Visuals & Social Media Branding',
    ],
  },
  'web-app': {
    title: 'Shape Your Brand, Stand Out!',
    tag: 'Web & App Development',
    image: '/images/web&app.webp',
    processTitle: 'Timeless Brand Identity.',
    description: [
      "Your website and app are the digital faces of your brand, and we build them with perfection in mind. Our focus is on blending beautiful designs with high performance, ensuring that every page feels smooth, modern, and user-friendly. Whether it's a business website, an e-commerce store, or a full-featured mobile app—we deliver solutions tailored to your business needs.",
      "We use the latest technologies and clean code practices to create digital products that load fast, work on all devices, and scale with your growth. From UI/UX design to backend development, we ensure every project is secure, optimized, and built for long-term success.",
      "We emphasize scalability, security, and performance across every platform we build. With clean code practices and modern frameworks, your website or app becomes a future-ready digital asset.",
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PHP', 'Shopify', 'WordPress', 'Framer', 'Webflow'],
    process: [
      'Project Planning',
      'UX Wireframing',
      'UI Designing',
      'Core Development',
      'Quality Testing',
      'Live Deployment',
    ],
    deliverables: [
      'Website Development',
      'Mobile App Development (iOS & Android)',
      'Landing Pages',
      'Speed Optimization',
      'E-Commerce Solutions',
      'Admin Panels & Dashboards',
    ],
  },
  marketing: {
    title: 'Your Product, Our Stunning Wrap!',
    tag: 'Digital Marketing',
    image: '/images/digitalmarketing.webp',
    processTitle: 'Packaging That Speaks.',
    description: [
      "In a world where attention is the real currency, we help brands grow with strategies that cut through the noise. Our digital marketing approach blends creativity with data-driven insights, allowing your business to reach the right audience with the right message.",
      "Every campaign is tailored to your goals—whether it's brand building, lead generation, or increasing sales. We continuously optimize performance, track metrics, and refine strategies to deliver measurable results.",
      "We don't believe in random posting or generic ads. Every marketing tactic is backed by insight, testing, and data-driven improvements. Our goal is to build long-lasting visibility and consistent growth.",
    ],
    technologies: ['Google Ads', 'Meta Ads', 'Analytics'],
    process: [
      'Market Research',
      'Campaign Planning',
      'Content Creation',
      'Ad Execution',
      'Ad Optimization',
      'Analytics Reporting',
    ],
    deliverables: [
      'Social Media Management',
      'Performance Marketing (Meta & Google Ads)',
      'SEO Optimization',
      'Content Strategy & Copywriting',
      'Lead Generation',
      'Email Marketing & Automation',
    ],
  },
  b2b: {
    title: 'Spark Your Digital Presence!',
    tag: 'B2B & Custom Solutions',
    image: '/images/b2b.webp',
    processTitle: 'Unified Digital Journeys.',
    description: [
      "Every business operates differently, so we develop custom-built solutions designed to match your internal workflow and long-term goals. Whether it's a CRM, ERP, portal, or automation tool, our systems streamline operations, improve efficiency, and help teams work smarter—not harder.",
      "We focus on building secure, scalable, and user-friendly platforms that simplify complex processes and enhance decision-making. With deep technical expertise and an understanding of business needs, we create digital infrastructure that supports growth and delivers real value.",
      "Beyond creating custom workflows, we help businesses streamline operations and reduce repetitive manual tasks. Our tailor-made solutions improve efficiency, accuracy and decision-making by integrating smart automation and easy-to-use dashboards.",
    ],
    technologies: ['Node.js', 'Next.js', 'React', 'PHP'],
    process: [
      'Business Analysis',
      'Process Mapping',
      'System Architecture',
      'Module Development',
      'API Integration',
      'System Deployment',
    ],
    deliverables: [
      'Custom Portals',
      'Automation Systems',
      'CRM & ERP Development',
      'Reporting Dashboards',
      'Data Integration & APIs',
      'B2B eCommerce Solutions',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const s = services[params.slug];
  return { title: `${s?.tag || 'Service'} — Illusio Designs` };
}

export default function ServiceDetailPage({ params }) {
  const service = services[params.slug];
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.tag }]}
          eyebrow={service.tag}
          title={service.title}
        />

        <section style={{ padding: '20px 0 40px' }}>
          <Container>
            <div className="service-cover">
              <Image src={service.image} alt={service.tag} width={1400} height={780} />
            </div>
          </Container>
        </section>

        <section style={{ padding: '40px 0 60px' }}>
          <Container size="md">
            <div className="prose">
              {service.description.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Container>
        </section>

        <section style={{ padding: '20px 0 60px' }}>
          <Container>
            <div className="service-grid">
              <div className="service-block">
                <h3 className="service-block-title">Technologies we use</h3>
                <div className="service-tech-list">
                  {service.technologies.map((t) => <Tag key={t} tone="soft" size="md">{t}</Tag>)}
                </div>
              </div>
              <div className="service-block">
                <h3 className="service-block-title">What you get</h3>
                <ul className="service-deliverables">
                  {service.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section style={{ padding: '20px 0 60px' }}>
          <Container>
            <div className="process-map">
              <div className="process-map-head">
                <span className="process-map-eyebrow">Our Process</span>
                <h2>{service.processTitle}</h2>
              </div>

              <div className="process-map-stage">
                {MAP_LINKS.map((l, i) => (
                  <span
                    key={i}
                    className="process-link"
                    aria-hidden
                    style={{
                      '--lx': `${l.x}px`,
                      '--ly': `${l.y}px`,
                      '--lw': `${l.w}px`,
                      '--lr': `${l.r}deg`,
                    }}
                  />
                ))}

                {service.process.map((step, i) => (
                  <div
                    key={step}
                    className="process-node"
                    style={MAP_POS[i] || { '--top': '50%', '--left': '40%', '--rot': '0deg' }}
                  >
                    <span className="process-node-dot" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v9l6 3" />
                      </svg>
                    </span>
                    <p>
                      <span className="process-node-num">{i + 1}.</span> {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section style={{ padding: '40px 0 20px' }}>
          <Container>
            <div className="related-head">
              <h2 className="section-title">Our other services.</h2>
              <Link href="/services" className="btn btn-light btn-md">All services</Link>
            </div>
            <div className="other-services">
              {Object.entries(services)
                .filter(([slug]) => slug !== params.slug)
                .map(([slug, s]) => (
                  <Link key={slug} href={`/services/${slug}`} className="other-service-row">
                    <span className="other-service-name">{s.tag}</span>
                    <span className="other-service-arrow" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </span>
                  </Link>
                ))}
            </div>
          </Container>
        </section>

        <RelatedWork
          category={catFor[params.slug] || undefined}
          heading="Related projects"
        />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
