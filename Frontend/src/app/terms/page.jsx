'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { SkeletonText } from '@/components/ui/Skeleton';
import { termsOfServiceAPI } from '@/services/api';
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';

const fallback = `
  <p><strong>Effective date:</strong> May 14, 2026</p>
  <p>These terms apply to anyone using our website or engaging Illusio Designs for paid services. By accessing the site you agree to the terms set out below.</p>
  <h2>1. Engagements</h2>
  <p>Every paid engagement is governed by a separate Statement of Work which describes scope, deliverables, timelines, fees and intellectual property terms specific to that project.</p>
  <h2>2. Intellectual property</h2>
  <p>Final deliverables are transferred to the client upon full payment. We retain the right to display work in our portfolio and marketing materials unless the project is covered by a separate NDA.</p>
  <h2>3. Payment</h2>
  <p>Invoices are payable within the period stated on each invoice. Recurring engagements may require an upfront retainer.</p>
  <h2>4. Liability</h2>
  <p>Our liability for any single engagement is capped at the fees paid for that engagement. We are not liable for indirect, consequential or punitive damages.</p>
  <h2>5. Termination</h2>
  <p>Either party may terminate an engagement with the notice period described in the relevant Statement of Work. Work in progress will be invoiced up to the date of termination.</p>
  <h2>6. Governing law</h2>
  <p>These terms are governed by the laws of India. Disputes will be resolved in the courts of Rajkot, Gujarat unless otherwise agreed in writing.</p>
`;

export default function TermsPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    document.title = 'Terms of Service — Illusio Designs';
    let m = true;
    termsOfServiceAPI.getPublic()
      .then((d) => {
        if (!m || !d) return;
        setContent(d.content || '');
        if (d.updatedAt) {
          try { setUpdatedAt(new Date(d.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const html = DOMPurify.sanitize(normalizeContentForDisplay(content || fallback), {
    ADD_TAGS: ['iframe', 'video', 'audio', 'source'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'controls', 'target'],
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
          eyebrow="Legal"
          title={<>Terms of <em>Service</em></>}
          description={updatedAt ? `Last updated ${updatedAt}` : 'The agreement that governs your use of illusiodesigns.agency and any services we provide.'}
        />
        <article style={{ padding: '20px 0 100px' }}>
          <Container size="md">
            {loading && !content ? <SkeletonText lines={10} /> : (
              <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
