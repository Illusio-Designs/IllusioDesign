'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaBehance, FaDribbble, FaGoogle } from 'react-icons/fa6';
import { useSettings } from '@/components/providers/SettingsProvider';

const linkCols = [
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
];

// Social icons — rendered only when a URL is set in platform settings.
const socialDefs = [
  { Icon: FaLinkedinIn, key: 'social_linkedin', label: 'LinkedIn' },
  { Icon: FaInstagram, key: 'social_instagram', label: 'Instagram' },
  { Icon: FaFacebookF, key: 'social_facebook', label: 'Facebook' },
  { Icon: FaBehance, key: 'social_behance', label: 'Behance' },
  { Icon: FaDribbble, key: 'social_dribbble', label: 'Dribbble' },
  { Icon: FaGoogle, key: 'gmb_url', label: 'Google Business' },
];

const FALLBACK = {
  contact_phone: '+91 76000 48416',
  contact_email: 'Info@illusiodesigns.agency',
  contact_address: '211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road, Rajkot 360001',
};

export default function Footer() {
  const { settings } = useSettings();
  const get = (k) => settings[k] || FALLBACK[k] || '';

  const phone = get('contact_phone');
  const email = get('contact_email');
  const address = get('contact_address');
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;
  const socials = socialDefs.filter((s) => settings[s.key]);

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
            {socials.length ? (
              <div className="footer-socials" aria-label="Social links">
                {socials.map(({ Icon, key, label }) => (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {linkCols.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="footer-col">
            <h4>Contact</h4>
            {phone ? <a href={telHref}>{phone}</a> : null}
            {email ? <a href={`mailto:${email}`}>{email}</a> : null}
            {address ? <span>{address}</span> : null}
          </div>
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
