'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import Button from '@/components/ui/Button';

const services = [
  {
    label: 'Branding & Design',
    href: '/services/branding',
    desc: 'Build a brand that stands out with identity systems, visual guidelines, and impactful creatives tailored to your audience.',
  },
  {
    label: 'Web & App Development',
    href: '/services/web-app',
    desc: 'Fast, scalable, and user-friendly digital products—from websites to mobile apps—crafted for real-world performance.',
  },
  {
    label: 'Digital Marketing',
    href: '/services/marketing',
    desc: 'Grow your business with performance-driven marketing strategies across SEO, social media, ads, automation, and content.',
  },
  {
    label: 'B2B & Custom Solutions',
    href: '/services/b2b',
    desc: 'Custom-built portals, internal tools, automated workflows, and enterprise solutions to streamline operations.',
  },
];

const simpleLinks = [
  { href: '/work', label: 'Case Study' },
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Career' },
  { href: '/journal', label: 'Blog' },
];

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <motion.header
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand" aria-label="Illusio Designs">
          <Image
            src="/images/IllusioDesignfulllogo.webp"
            alt="Illusio Designs"
            width={220}
            height={48}
            priority
            className="navbar-logo"
          />
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          <div
            className={`mega-trigger ${megaOpen ? 'is-open' : ''} ${isActive('/services') ? 'is-active' : ''}`}
            onMouseEnter={() => setMegaOpen(true)}
            onFocus={() => setMegaOpen(true)}
          >
            <Link href="/services">
              Services
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="caret">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
          </div>
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'is-active' : ''}
              onMouseEnter={() => setMegaOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-cta">
          <MagneticButton strength={0.18}>
            <Button href="/contact" variant="primary" size="sm">
              Let&apos;s Engage
            </Button>
          </MagneticButton>
        </div>

        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      {/* Services Mega Panel */}
      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            className="mega-panel-wrap"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="mega-panel mega-services">
              {services.map((s) => (
                <Link href={s.href} key={s.href} className="mega-service-card">
                  <h4>{s.label}</h4>
                  <p>{s.desc}</p>
                  <span className="mega-feature-cta">
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="navbar-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            {simpleLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" size="sm" onClick={() => setOpen(false)}>
              Let&apos;s Engage
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
