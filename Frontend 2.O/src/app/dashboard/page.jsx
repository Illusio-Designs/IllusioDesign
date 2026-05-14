'use client';

import Counter from '@/components/ui/Counter';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active projects', value: 12, trend: '+2', up: true },
  { label: 'Monthly revenue', value: 84, suffix: 'k', trend: '+12%', up: true },
  { label: 'Avg. cycle time', value: 18, suffix: 'd', trend: '-3d', up: true },
  { label: 'Client satisfaction', value: 4.9, trend: '+0.1', up: true },
];

const recent = [
  { project: 'Amrut App v2', client: 'Amrut Jewels', status: 'In review', amount: '$24,000', date: 'May 12', tone: 'warn' },
  { project: 'Aicumen Dashboard', client: 'Aicumen AI', status: 'Active', amount: '$48,000', date: 'May 09', tone: 'success' },
  { project: 'Crosscoin Rebrand', client: 'Crosscoin', status: 'Draft', amount: '$18,500', date: 'May 06', tone: 'info' },
  { project: 'Flowline Ops', client: 'Flowline', status: 'Complete', amount: '$56,200', date: 'May 03', tone: 'success' },
  { project: 'Nanak Site', client: 'Nanak Finserv', status: 'On hold', amount: '$12,000', date: 'May 02', tone: 'error' },
];

const tasks = [
  { label: 'Send revised brand deck to Aicumen', due: 'Today · 4pm' },
  { label: 'Review Crosscoin onboarding flows', due: 'Today · 6pm' },
  { label: 'Kickoff call — Vivera Lighting', due: 'Tomorrow · 10:30am' },
  { label: 'Invoice draft — Flowline phase 2', due: 'Wed' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DashboardOverview() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Dashboard</span>
          <h1>Welcome back, Krunal.</h1>
          <p>Here&apos;s what&apos;s moving across the studio this week.</p>
        </div>
        <div className="dash-page-actions">
          <button className="btn btn-light btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">+ New project</button>
        </div>
      </div>

      <motion.div className="dash-stats-grid" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {stats.map((s) => (
          <motion.div className="dash-stat" key={s.label} variants={fadeUp}>
            <span className="dash-stat-label">{s.label}</span>
            <strong className="dash-stat-num">
              <Counter value={s.value} suffix={s.suffix || ''} />
            </strong>
            <span className={`dash-stat-trend ${s.up ? 'up' : 'down'}`}>{s.trend}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="dash-grid-2">
        <motion.section className="dash-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <header className="dash-card-head">
            <div>
              <h3>Recent projects</h3>
              <span>Last 30 days</span>
            </div>
            <button className="btn btn-ghost btn-sm">View all</button>
          </header>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.project}>
                  <td><strong>{r.project}</strong></td>
                  <td>{r.client}</td>
                  <td><span className={`kit-badge kit-badge-${r.tone}`}><span className="dot" />{r.status}</span></td>
                  <td>{r.amount}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        <motion.section className="dash-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
          <header className="dash-card-head">
            <div>
              <h3>Today&apos;s tasks</h3>
              <span>4 open</span>
            </div>
            <button className="btn btn-ghost btn-sm">+ Add</button>
          </header>
          <ul className="dash-tasks">
            {tasks.map((t, i) => (
              <li key={t.label}>
                <label className="check">
                  <input type="checkbox" defaultChecked={i === 1} />
                  <span>{t.label}</span>
                </label>
                <span className="task-due">{t.due}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section className="dash-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
        <header className="dash-card-head">
          <div>
            <h3>Revenue · last 12 weeks</h3>
            <span>Weekly billings · USD</span>
          </div>
          <span className="kit-badge kit-badge-success"><span className="dot" />+12%</span>
        </header>
        <div className="dash-chart">
          {[40, 56, 48, 72, 60, 80, 66, 92, 78, 104, 88, 116].map((v, i) => (
            <div className="dash-bar" key={i} style={{ height: `${v}%` }} aria-label={`Week ${i + 1}: $${v}k`}>
              <span>{`$${v}k`}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
}
