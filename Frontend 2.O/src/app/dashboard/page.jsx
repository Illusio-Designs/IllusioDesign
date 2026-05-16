'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Counter from '@/components/ui/Counter';
import Button from '@/components/ui/Button';
import Skeleton, { SkeletonTable } from '@/components/ui/Skeleton';
import { caseStudyAPI, blogAPI, reviewAPI } from '@/services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DashboardOverview() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let m = true;
    Promise.all([
      caseStudyAPI.getAllPublic().catch(() => []),
      blogAPI.getAllPublic().catch(() => []),
      reviewAPI.getAllPublic().catch(() => []),
    ]).then(([p, b, r]) => {
      if (!m) return;
      setProjects(Array.isArray(p) ? p : []);
      setBlogs(Array.isArray(b) ? b : []);
      setReviews(Array.isArray(r) ? r : []);
      setLoading(false);
    });
    return () => { m = false; };
  }, []);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((a, r) => a + (Number(r.rating) || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const stats = [
    { label: 'Case studies', value: projects.length, suffix: '' },
    { label: 'Journal posts', value: blogs.length, suffix: '' },
    { label: 'Client reviews', value: reviews.length, suffix: '' },
    { label: 'Avg. rating', value: avgRating || 4.9, suffix: ' / 5' },
  ];

  const recent = projects.slice(0, 6);

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Dashboard</span>
          <h1>Welcome back.</h1>
          <p>Live snapshot of everything published across illusiodesigns.agency.</p>
        </div>
        <div className="dash-page-actions">
          <Button variant="light" size="sm" icon={false}>Export</Button>
          <Button variant="primary" size="sm" icon={false}>+ New project</Button>
        </div>
      </div>

      {loading ? (
        <>
          <div className="dash-stats-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="dash-stat" key={i}>
                <Skeleton h={11} w="55%" />
                <Skeleton h={34} w="45%" style={{ marginTop: 8 }} />
              </div>
            ))}
          </div>
          <section className="dash-card">
            <SkeletonTable rows={6} cols={3} />
          </section>
        </>
      ) : (
        <>
          <motion.div
            className="dash-stats-grid"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {stats.map((s) => (
              <motion.div className="dash-stat" key={s.label} variants={fadeUp}>
                <span className="dash-stat-label">{s.label}</span>
                <strong className="dash-stat-num">
                  <Counter value={s.value} suffix={s.suffix} />
                </strong>
                <span className="dash-stat-trend up">live</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            className="dash-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <header className="dash-card-head">
              <div>
                <h3>Recent case studies</h3>
                <span>{projects.length} total</span>
              </div>
              <Button href="/dashboard/projects" variant="ghost" size="sm" icon={false}>
                View all
              </Button>
            </header>
            {recent.length ? (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((p, i) => (
                    <tr key={p.id || i}>
                      <td><strong>{p.title || 'Untitled'}</strong></td>
                      <td>{p.clientName || p.client || '—'}</td>
                      <td>
                        <span className="kit-badge kit-badge-info">
                          <span className="dot" />
                          {p.category || 'project'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 24, color: 'var(--muted)', fontSize: 14 }}>
                No case studies published yet.
              </div>
            )}
          </motion.section>

          <motion.section
            className="dash-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <header className="dash-card-head">
              <div>
                <h3>Content mix</h3>
                <span>Published items across the site</span>
              </div>
            </header>
            <div className="dash-chart">
              {[
                { label: 'Case studies', n: projects.length },
                { label: 'Journal posts', n: blogs.length },
                { label: 'Reviews', n: reviews.length },
              ].map((row) => {
                const max = Math.max(projects.length, blogs.length, reviews.length, 1);
                return (
                  <div
                    key={row.label}
                    className="dash-bar"
                    style={{ height: `${Math.max(8, (row.n / max) * 100)}%` }}
                  >
                    <span>{row.n} · {row.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </>
      )}
    </>
  );
}
