import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import CTA from '@/components/home/CTA';

export const metadata = { title: 'Careers — Illusio Designs' };

const positions = [
  { slug: 'senior-product-designer', title: 'Senior Product Designer', type: 'Full time', location: 'Remote · India / EU', team: 'Design' },
  { slug: 'frontend-engineer', title: 'Frontend Engineer (Next.js)', type: 'Full time', location: 'Remote', team: 'Engineering' },
  { slug: 'brand-designer', title: 'Brand Designer', type: 'Full time', location: 'Hybrid · Rajkot', team: 'Brand' },
  { slug: 'design-intern', title: 'Design Intern', type: 'Internship', location: 'Hybrid · Rajkot', team: 'Design' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
          eyebrow="We are hiring"
          title={<>Build the studio <em>with us.</em></>}
          description="We hire senior craft, generous teammates and curious minds. Below are the seats currently open."
        />

        <section style={{ padding: '20px 0 80px' }}>
          <Container>
            <div className="positions">
              {positions.map((p) => (
                <div className="position-row" key={p.slug}>
                  <div>
                    <h3>{p.title}</h3>
                    <span className="position-team">{p.team}</span>
                  </div>
                  <span className="position-tag">{p.type}</span>
                  <span className="position-location">{p.location}</span>
                  <Link href={`/careers/apply/${p.slug}`} className="btn btn-primary btn-sm">
                    Apply
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
