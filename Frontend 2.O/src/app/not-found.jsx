import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="notfound">
          <Container size="sm">
            <span className="notfound-tag">Lost in design space</span>
            <h1>404</h1>
            <p>This page took a wrong turn. Let&apos;s get you back on track.</p>
            <div className="notfound-actions">
              <Link href="/" className="btn btn-primary btn-md">
                Back to home
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-md">Get in touch</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
