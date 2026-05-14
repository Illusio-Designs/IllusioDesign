import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Services from '@/components/home/Services';
import Work from '@/components/home/Work';
import About from '@/components/home/About';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import Journal from '@/components/home/Journal';
import CTA from '@/components/home/CTA';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Process />
        <Testimonials />
        <Journal />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
