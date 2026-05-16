import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

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
              <Button href="/" variant="primary" size="md">Back to home</Button>
              <Button href="/contact" variant="ghost" size="md" icon={false}>Get in touch</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
