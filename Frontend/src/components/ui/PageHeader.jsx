'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  align = 'left',
}) {
  return (
    <section className="page-hero">
      <Container>
        <motion.div
          className={`page-hero-inner page-hero-${align}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {crumbs?.length ? (
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={i}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                  {i < crumbs.length - 1 ? <span className="crumb-sep">/</span> : null}
                </span>
              ))}
            </nav>
          ) : null}
          {eyebrow ? <span className="page-eyebrow">{eyebrow}</span> : null}
          {title ? <h1 className="page-title">{title}</h1> : null}
          {description ? <p className="page-description">{description}</p> : null}
        </motion.div>
      </Container>
    </section>
  );
}
