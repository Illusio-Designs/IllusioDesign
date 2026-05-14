'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import Button from '@/components/ui/Button';

const megaItems = [
  {
    key: 'services',
    label: 'Services',
    href: '/services',
    columns: [
      {
        title: 'What we do',
        links: [
          { label: 'UI / UX Design', href: '/services/ui-ux-design', desc: 'Product design end-to-end' },
          { label: 'Branding & Design', href: '/services/branding-design', desc: 'Identity, logo, packaging' },
          { label: 'Web & App Development', href: '/services/web-app-development', desc: 'Next.js, React Native' },
          { label: 'Digital Marketing', href: '/services/digital-marketing', desc: 'CRO, paid, lifecycle' },
        ],
      },
      {
        title: 'How we work',
        links: [
          { label: 'Our process', href: '/about#process', desc: '4 short phases, weekly demos' },
          { label: 'Pricing & retainers', href: '/contact', desc: 'Pick a model that fits' },
          { label: 'Engagement models', href: '/services', desc: 'Project, retainer, embed' },
        ],
      },
      {
        featured: true,
        title: 'Featured service',
        href: '/services/ui-ux-design',
        image: '/images/aicumen-ai.webp',
        body: 'UI/UX product design from research through ready-to-ship Figma libraries.',
      },
    ],
  },
  {
    key: 'work',
    label: 'Work',
    href: '/work',
    columns: [
      {
        title: 'Case studies',
        links: [
          { label: 'Amrut App', href: '/work/amrut-app', desc: 'Mobile · DTC jewellery' },
          { label: 'Aicumen AI', href: '/work/aicumen-ai', desc: 'SaaS · AI workspace' },
          { label: 'Crosscoin', href: '/work/crosscoin', desc: 'Fintech · payments' },
          { label: 'Flowline', href: '/work/flowline', desc: 'Dashboard · ops' },
        ],
      },
      {
        title: 'By industry',
        links: [
          { label: 'Fintech', href: '/work?industry=fintech' },
          { label: 'SaaS', href: '/work?industry=saas' },
          { label: 'D2C / E-commerce', href: '/work?industry=ecommerce' },
          { label: 'B2B & Internal tools', href: '/work?industry=b2b' },
        ],
      },
      {
        featured: true,
        title: 'Latest project',
        href: '/work/flowline',
        image: '/images/flowline.webp',
        body: 'A logistics ops dashboard that finally feels like a product, not a tool.',
      },
    ],
  },
  {
    key: 'studio',
    label: 'Studio',
    href: '/about',
    columns: [
      {
        title: 'About',
        links: [
          { label: 'About the studio', href: '/about', desc: 'Who we are, what we value' },
          { label: 'Careers', href: '/careers', desc: 'We are hiring' },
          { label: 'Contact', href: '/contact', desc: 'Get in touch' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Journal', href: '/journal', desc: 'Notes on craft and growth' },
          { label: 'UI Kit', href: '/ui-kit', desc: 'Design system showcase' },
          { label: 'Dashboard demo', href: '/dashboard', desc: 'Internal studio dashboard' },
        ],
      },
      {
        featured: true,
        title: 'Reach the studio',
        href: 'mailto:Info@illusiodesigns.agency',
        image: '/images/IllusioDesignfulllogo.webp',
        body: 'Tell us about your project. We reply within one working day.',
      },
    ],
  },
];

const simpleLinks = [
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMega(null);
  }, [pathname]);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={() => setActiveMega(null)}
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
          {megaItems.map((item) => (
            <div
              key={item.key}
              className={`mega-trigger ${activeMega === item.key ? 'is-open' : ''} ${isActive(item.href) ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveMega(item.key)}
              onFocus={() => setActiveMega(item.key)}
            >
              <Link href={item.href}>
                {item.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="caret">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
          ))}
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'is-active' : ''}
              onMouseEnter={() => setActiveMega(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-cta">
          <MagneticButton strength={0.18}>
            <Button href="/contact" variant="primary" size="sm">
              Let&apos;s talk
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

      {/* Mega Menu Panel */}
      <AnimatePresence>
        {activeMega ? (
          <motion.div
            className="mega-panel-wrap"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setActiveMega(activeMega)}
            onMouseLeave={() => setActiveMega(null)}
          >
            {megaItems
              .filter((m) => m.key === activeMega)
              .map((item) => (
                <div className="mega-panel" key={item.key}>
                  {item.columns.map((col, i) => (
                    <div
                      key={i}
                      className={`mega-col ${col.featured ? 'mega-col-featured' : ''}`}
                    >
                      <h5>{col.title}</h5>
                      {col.featured ? (
                        <Link href={col.href} className="mega-feature-card">
                          <div className="mega-feature-thumb">
                            <Image src={col.image} alt="" width={420} height={260} />
                          </div>
                          <p>{col.body}</p>
                          <span className="mega-feature-cta">
                            Explore
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17L17 7M17 7H8M17 7V16" />
                            </svg>
                          </span>
                        </Link>
                      ) : (
                        <ul className="mega-link-list">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href}>
                                <span className="mega-link-label">
                                  {link.label}
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                                  </svg>
                                </span>
                                {link.desc ? <span className="mega-link-desc">{link.desc}</span> : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
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
            {megaItems.map((item) => (
              <Link key={item.key} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            {simpleLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" size="sm" onClick={() => setOpen(false)}>
              Let&apos;s talk
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
