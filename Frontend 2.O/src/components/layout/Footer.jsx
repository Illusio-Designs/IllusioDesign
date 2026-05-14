'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const cols = [
  {
    title: 'For Clients',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Case studies', href: '#work' },
      { label: 'Start a project', href: '#contact' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Journal', href: '#blog' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Careers', href: '#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

const socials = [
  { Icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
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
              A product design studio crafting interfaces, brands and digital
              experiences — built on a decade of craft.
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
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© {new Date().getFullYear()} Illusio Designs. All rights reserved.</span>
            <span>
              Managed by <strong>Finvera Solution LLP</strong>
            </span>
          </div>
          <div className="footer-bottom-right">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookies</Link>
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
