'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { SkeletonCards } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import CTA from '@/components/home/CTA';
import useSEO from '@/hooks/useSEO';
import { positionAPI } from '@/services/api';
import { toSlug } from '@/utils/urlSlug';

export default function CareersPage() {
  useSEO('career');
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let m = true;
    positionAPI.getAllPublic()
      .then((items) => {
        if (!m) return;
        const list = (Array.isArray(items) ? items : []).filter(Boolean).map((p) => ({
          id: p.id,
          slug: p.slug || toSlug(p.title) || String(p.id),
          title: p.title,
          department: p.department || 'Studio',
          location: p.location || 'Remote',
          salary: p.salary || 'Competitive · DOE',
          description: p.description || '',
        }));
        setPositions(list);
      })
      .catch(() => { if (m) setPositions([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Career' }]}
          eyebrow="Career"
          title={<>Unleash Your Talent <em>with Illusio.</em></>}
          description="We hire senior craft, generous teammates and curious minds. Below are the seats currently open — apply and we'll be in touch within a week."
        />

        <section style={{ padding: '20px 0 80px' }}>
          <Container>
            {loading ? (
              <SkeletonCards count={4} height={64} />
            ) : positions.length === 0 ? (
              <div className="empty-state">
                <h3>No openings right now</h3>
                <p>Send us your portfolio at <a href="mailto:Info@illusiodesigns.agency">Info@illusiodesigns.agency</a> — we keep great work on file.</p>
              </div>
            ) : (
              <div className="positions">
                {positions.map((p) => (
                  <div className="position-row" key={p.id}>
                    <div>
                      <h3>{p.title}</h3>
                      <span className="position-team">{p.department}</span>
                    </div>
                    <span className="position-tag">{p.salary}</span>
                    <span className="position-location">{p.location}</span>
                    <Button href={`/careers/apply/${p.slug || p.id}`} variant="primary" size="sm">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
