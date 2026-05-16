'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Branding & Design', href: '/services/branding' },
      { label: 'Web & App Development', href: '/services/web-app' },
      { label: 'Digital Marketing', href: '/services/marketing' },
      { label: 'B2B & Custom Solutions', href: '/services/b2b' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/work' },
      { label: 'Blogs', href: '/journal' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Contact',
    items: [
      { label: '+91 76000 48416', href: 'tel:+917600048416' },
      { label: 'Info@illusiodesigns.agency', href: 'mailto:Info@illusiodesigns.agency' },
      { label: '211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road, Rajkot 360001' },
    ],
  },
];

const socials = [
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <motion.div
        className="footer-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-logo" aria-label="Illusio Designs">
              <Image
                src="/images/IllusioDesignfulllogo.webp"
                alt="Illusio Designs"
                width={220}
                height={52}
              />
            </Link>
            <p className="footer-tag">
              Illusio Designs is a creative and technology-driven agency
              dedicated to building brands and digital experiences that leave a
              lasting impression.
            </p>
            <div className="footer-socials" aria-label="Social links">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links?.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
              {col.items?.map((item) =>
                item.href ? (
                  <a key={item.label} href={item.href}>{item.label}</a>
                ) : (
                  <span key={item.label}>{item.label}</span>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>Copyright © {new Date().getFullYear()} Illusio Designs. All rights reserved.</span>
            <span>
              Managed by <strong>Finvera Solutions LLP</strong>
            </span>
          </div>
          <div className="footer-bottom-right">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <button
              type="button"
              className="footer-cookie-btn"
              onClick={() => window.dispatchEvent(new Event('illusio:cookie-settings'))}
            >
              Cookie Settings
            </button>
          </div>
        </div>

        <div className="footer-crafted">
          Crafted with <span className="heart">♥</span> in Rajkot, India
        </div>
      </motion.div>

      <div className="footer-wordmark" aria-hidden>
        <span className="wordmark-big">Illusio Designs</span>
      </div>
    </footer>
  );
}
