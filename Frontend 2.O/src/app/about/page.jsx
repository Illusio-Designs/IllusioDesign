'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import useSEO from '@/hooks/useSEO';
import { teamAPI, resolveImage } from '@/services/api';

const goals = [
  { num: '01', title: 'Innovation', body: 'Push boundaries, experiment with new technologies, and create solutions that stay ahead of the digital curve.' },
  { num: '02', title: 'Excellence', body: 'Maintain the highest standards of quality, detail, and performance in every project we deliver.' },
  { num: '03', title: 'Client Success', body: 'Understand client goals deeply and work collaboratively to achieve measurable results that matter.' },
  { num: '04', title: 'Growth', body: 'Empower continuous learning and development — for our team, our clients, and the brands we build.' },
];

const stats = [
  { value: 883, suffix: '', label: 'Project Completed' },
  { value: 19, suffix: '+', label: 'Total Top Services' },
  { value: 98, suffix: '%', label: 'Positive Feedback' },
  { value: 7, suffix: '+', label: 'Years of Experience' },
];

const fallbackTeam = [
  { id: '1', name: 'Krunal Soni', role: 'Founder & Lead Designer', image: '/images/founder.webp' },
  { id: '2', name: 'Priya Nair', role: 'Senior Product Designer', image: '/images/IllusioDesignLogoicon.webp' },
  { id: '3', name: 'Aman Verma', role: 'Engineering Lead', image: '/images/IllusioDesignLogoicon.webp' },
  { id: '4', name: 'Riya Shah', role: 'Brand Designer', image: '/images/IllusioDesignLogoicon.webp' },
];

export default function AboutPage() {
  useSEO('about');
  const [team, setTeam] = useState(fallbackTeam);

  useEffect(() => {
    let m = true;
    teamAPI.getAllPublic()
      .then((items) => {
        if (!m || !items?.length) return;
        const mapped = items.filter(Boolean).map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role || '',
          image: resolveImage(t.image) || fallbackTeam[0].image,
          bio: t.bio || '',
          social: t.social || null,
        }));
        if (mapped.length) setTeam(mapped);
      })
      .catch(() => {});
    return () => { m = false; };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
          eyebrow="About us"
          title={<>A creative & technology- <em>driven agency.</em></>}
          description="Illusio Designs is dedicated to building brands and digital experiences that leave a lasting impression. With a blend of strategy, design and development, we help businesses grow, innovate and connect with their audience."
        />

        <section className="about-intro">
          <Container>
            <div className="about-intro-grid">
              <Reveal>
                <div className="about-portrait-wrap">
                  <div className="about-portrait-frame">
                    <Image src="/images/founder.webp" alt="Illusio Designs studio" width={800} height={1000} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="about-intro-text">
                  <h2 className="section-title">Built around craft, run like a product team.</h2>
                  <p>Our team brings fresh ideas, modern design thinking, and technical expertise to every project. From branding to websites to enterprise systems — we deliver solutions that are visually stunning, performance-focused, and built for long-term success.</p>
                  <p>We&apos;ve helped fintech, SaaS, DTC and lifestyle brands rebuild their digital products from scratch — bringing together strategy, design systems and front-end engineering under one roof.</p>
                  <div className="about-intro-stats">
                    {stats.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <strong><Counter value={s.value} suffix={s.suffix} /></strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="values">
          <Container>
            <div className="vision-mission-grid">
              <Reveal>
                <div className="vm-card">
                  <span className="vm-tag">Our Vision</span>
                  <h3>To become a trusted global agency that blends creativity and technology to shape the future of digital experiences.</h3>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="vm-card vm-card-accent">
                  <span className="vm-tag">Our Mission</span>
                  <h3>To deliver innovative, user-focused, and scalable solutions that empower brands, simplify business processes, and create meaningful impact.</h3>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="values">
          <Container>
            <Reveal>
              <h2 className="section-title" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
                Our goals.
              </h2>
            </Reveal>
            <div className="values-grid values-grid-4">
              {goals.map((g, i) => (
                <Reveal key={g.num} delay={i * 0.06}>
                  <div className="value-card">
                    <span className="value-num">{g.num}</span>
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="team">
          <Container>
            <Reveal>
              <div className="team-head">
                <span className="page-eyebrow">Our team</span>
                <h2 className="section-title">A senior, multi-disciplinary team.</h2>
              </div>
            </Reveal>
            <div className="team-grid">
              {team.map((m, i) => (
                <Reveal key={m.id || m.name} delay={i * 0.05}>
                  <div className="team-card">
                    <div className="team-thumb">
                      <Image src={m.image} alt={m.name} width={400} height={400} />
                    </div>
                    <h4>{m.name}</h4>
                    <span>{m.role}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
