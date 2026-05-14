'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import CTA from '@/components/home/CTA';
import { caseStudyAPI, resolveImage } from '@/services/api';

const fallbackMap = {
  'amrut-app': { title: 'Amrut App', category: 'Mobile App', image: '/images/Amrut App.webp', summary: 'A heritage jewellery brand made shoppable on mobile — from launch screen to checkout.' },
  'aicumen-ai': { title: 'Aicumen AI', category: 'SaaS', image: '/images/aicumen-ai.webp', summary: 'An AI workspace for analyst teams. Clean data flows, no busy chrome.' },
  crosscoin: { title: 'Crosscoin', category: 'Fintech', image: '/images/crosscoin.webp', summary: 'Cross-border payments redesigned for clarity and confidence.' },
  flowline: { title: 'Flowline', category: 'Dashboard', image: '/images/flowline.webp', summary: 'A logistics ops dashboard that finally feels like a product, not a tool.' },
};

export default function WorkDetailPage({ params }) {
  const slug = params?.slug;
  const [data, setData] = useState(fallbackMap[slug] || null);

  useEffect(() => {
    let m = true;
    caseStudyAPI.getAllPublic().then((items) => {
      if (!m || !items?.length) return;
      const match = items.find((p) =>
        (p.seoUrl && p.seoUrl === slug) ||
        (p.slug && p.slug === slug) ||
        String(p.id) === String(slug)
      );
      if (match) {
        setData({
          title: match.title,
          category: match.category || 'Case Study',
          summary: match.summary || match.description || '',
          image: resolveImage(match.image) || fallbackMap[slug]?.image,
        });
      }
    }).catch(() => {});
    return () => { m = false; };
  }, [slug]);

  const project = data || { title: 'Case Study', category: 'Project', image: '/images/Amrut App.webp', summary: '' };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.title }]}
          eyebrow={project.category}
          title={project.title}
          description={project.summary}
        />

        <section style={{ padding: '20px 0 60px' }}>
          <Container>
            <div className="service-cover">
              <Image src={project.image} alt={project.title} width={1400} height={780} />
            </div>
          </Container>
        </section>

        <section style={{ padding: '40px 0 80px' }}>
          <Container size="md">
            <div className="prose">
              <h2>The brief</h2>
              <p>The team came to us with a product that worked but felt dated. Engagement was flat, support tickets were rising and the visual language no longer matched the ambition of the business.</p>
              <h2>What we did</h2>
              <ul>
                <li>Audit of the existing product and analytics</li>
                <li>Interviews with five power users and three new users</li>
                <li>End-to-end UX redesign across web and mobile</li>
                <li>New visual language and component library</li>
                <li>Engineering handover and launch support</li>
              </ul>
              <h2>The outcome</h2>
              <p>Activation lifted on day one. Onboarding completion rose, support load dropped, and the team finally had a system they could extend without starting from scratch every quarter.</p>
              <p style={{ marginTop: 28 }}>
                <Link href="/work" className="btn btn-ghost btn-sm">← Back to all work</Link>
              </p>
            </div>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
