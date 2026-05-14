import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';

export const metadata = { title: 'Privacy Policy — Illusio Designs' };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
          eyebrow="Legal"
          title={<>Privacy <em>Policy</em></>}
          description="How we collect, use and protect your data when you visit illusiodesigns.agency."
        />

        <article style={{ padding: '20px 0 100px' }}>
          <Container size="md">
            <div className="prose">
              <p><strong>Effective date:</strong> May 14, 2026</p>
              <p>This Privacy Policy explains how Illusio Designs (&quot;we&quot;, &quot;us&quot;) handles personal information. By using our website or services you agree to the practices described below.</p>

              <h2>1. Information we collect</h2>
              <p>We collect information you provide directly — for example when you submit a contact form, apply for a position, or sign up for our newsletter. This may include your name, email address, phone number and any details you choose to share about your project.</p>

              <h2>2. How we use information</h2>
              <ul>
                <li>To respond to enquiries and provide the services you request</li>
                <li>To send proposals, contracts and project communications</li>
                <li>To improve our website and the work we ship</li>
                <li>To comply with legal and tax obligations</li>
              </ul>

              <h2>3. Cookies and analytics</h2>
              <p>We use first-party analytics to understand how visitors find and use our website. Our cookie banner lets you accept or decline at any time. Cookies can be disabled in your browser without affecting core functionality.</p>

              <h2>4. Sharing</h2>
              <p>We do not sell personal information. We share data only with vetted processors that help us deliver services (hosting, email, analytics) and only when required to do so.</p>

              <h2>5. Your rights</h2>
              <p>You may request access to, correction of, or deletion of any personal data we hold about you. Email <a href="mailto:Info@illusiodesigns.agency">Info@illusiodesigns.agency</a> and we&apos;ll respond within seven working days.</p>

              <h2>6. Updates</h2>
              <p>We&apos;ll publish any changes to this policy on this page along with an updated effective date.</p>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
