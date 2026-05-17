'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import TopbarActions from '@/components/dashboard/TopbarActions';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { authAPI } from '@/services/api';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: 'home' },
  { href: '/dashboard/blog', label: 'Blog', icon: 'doc' },
  { href: '/dashboard/projects', label: 'Project', icon: 'grid' },
  { href: '/dashboard/positions', label: 'Position', icon: 'badge' },
  { href: '/dashboard/applications', label: 'Applications', icon: 'inbox' },
  { href: '/dashboard/messages', label: 'Messages', icon: 'mail' },
  { href: '/dashboard/team', label: 'Team', icon: 'user' },
  { href: '/dashboard/reviews', label: 'Reviews', icon: 'star' },
  { href: '/dashboard/seo', label: 'SEO', icon: 'search' },
  { href: '/dashboard/policy', label: 'Policy', icon: 'shield' },
  { href: '/dashboard/content', label: 'Content', icon: 'layers' },
  { href: '/dashboard/users', label: 'Users', icon: 'users' },
];

const icons = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>,
  grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  doc: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  badge: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
  inbox: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  layers: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5M3 17l9 5 9-5" /></svg>,
};

export default function DashboardChrome({ children }) {
  const pathname = usePathname() || '/dashboard';
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [authed, setAuthed] = useState(false);
  const { query, setQuery } = useDashSearch();

  // Clear the shared search whenever the page changes.
  useEffect(() => {
    setQuery('');
  }, [pathname, setQuery]);

  // Protect the dashboard — redirect to /login when there is no token.
  useEffect(() => {
    let token = null;
    try { token = localStorage.getItem('auth_token'); } catch {}
    if (!token) {
      router.replace('/login');
      return;
    }
    setAuthed(true);
  }, [router]);

  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } catch {}
    router.replace('/login');
  };

  if (!authed) {
    return (
      <div className="dash-auth-gate">
        <span className="loader-disc" />
        <span>Checking session…</span>
      </div>
    );
  }

  return (
    <div className={`dash ${open ? 'dash-open' : ''} ${collapsed ? 'dash-collapsed' : ''}`}>
      <aside className="dash-sidebar">
        <div className="dash-brand-row">
          <Link href="/" className="dash-brand">
            <Image
              className="dash-brand-full"
              src="/images/IllusioDesignfulllogo.webp"
              alt="Illusio Designs"
              width={180}
              height={42}
            />
            <Image
              className="dash-brand-mark"
              src="/images/IllusioDesignLogoicon.webp"
              alt="Illusio Designs"
              width={34}
              height={34}
            />
          </Link>
          <button
            className="dash-collapse-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
            </svg>
          </button>
        </div>

        <nav className="dash-nav">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`dash-nav-item ${active ? 'is-active' : ''}`}
              >
                <span className="dash-nav-icon">{icons[item.icon]}</span>
                <span className="dash-nav-label">{item.label}</span>
                <span className="dash-nav-tip">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dash-side-foot">
          <Link href="/dashboard/profile" className="dash-profile">
            <span className="avatar-init">ID</span>
            <div className="dash-profile-meta">
              <strong>Illusio Designs</strong>
              <span>Account</span>
            </div>
          </Link>
          <button className="dash-logout" onClick={logout}>
            <span className="dash-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5M21 12H9" />
              </svg>
            </span>
            <span className="dash-nav-label">Log out</span>
            <span className="dash-nav-tip">Log out</span>
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle sidebar">
            <span /><span /><span />
          </button>

          <div className="dash-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input
              placeholder="Search this page…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <button className="dash-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            ) : null}
          </div>

          <TopbarActions />
        </header>

        <motion.div
          className="dash-content"
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
