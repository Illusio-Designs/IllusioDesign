'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import { reviewAPI, contactAPI, cleanText } from '@/services/api';

const initials = (n = '') =>
  n.split(' ').map((x) => x[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'C';

const fmtDate = (v) => {
  if (!v) return '';
  try {
    return new Date(v).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  } catch {
    return '';
  }
};

export default function TopbarActions() {
  const [menu, setMenu] = useState(null); // 'notif' | 'msg' | null
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgAuthError, setMsgAuthError] = useState(false);
  const [readNotif, setReadNotif] = useState([]);
  const [activeMsg, setActiveMsg] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    let m = true;

    reviewAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        setReviews(
          (Array.isArray(list) ? list : []).filter(Boolean).map((r, i) => ({
            id: r.id ?? `rv-${i}`,
            author: cleanText(r.author || r.client || r.name) || 'A client',
            rating: Number(r.rating) || 5,
            comment: cleanText(r.comment || r.quote || r.message || ''),
          })),
        );
      })
      .catch(() => {});

    contactAPI.getAll()
      .then((list) => {
        if (!m) return;
        setMessages(
          (Array.isArray(list) ? list : []).filter(Boolean).map((c, i) => ({
            id: c.id ?? `m-${i}`,
            name: cleanText(c.name) || 'Unknown',
            email: cleanText(c.email) || '',
            phone: cleanText(c.mobile || c.phone || ''),
            subject: cleanText(c.subject) || '(No subject)',
            message: cleanText(c.message) || '',
            status: (c.status || 'unread').toLowerCase(),
            date: c.createdAt || c.date,
          })),
        );
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setMsgAuthError(true);
      });

    return () => { m = false; };
  }, []);

  useEffect(() => {
    if (!menu) return undefined;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenu(null);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menu]);

  const unreadNotif = useMemo(
    () => reviews.filter((r) => !readNotif.includes(r.id)).length,
    [reviews, readNotif],
  );
  const unreadMsg = useMemo(
    () => messages.filter((m) => m.status === 'unread').length,
    [messages],
  );

  const openMenu = (which) => setMenu((cur) => (cur === which ? null : which));

  const openMessage = (msg) => {
    setActiveMsg(msg);
    setMenu(null);
    if (msg.status === 'unread') {
      setMessages((list) =>
        list.map((m) => (m.id === msg.id ? { ...m, status: 'read' } : m)),
      );
      contactAPI.update(msg.id, { status: 'read' }).catch(() => {});
    }
  };

  return (
    <>
      <div className="dash-top-actions" ref={wrapRef}>
        {/* Notifications — reviews only */}
        <div className="dash-menu">
          <button
            className={`dash-icon-btn ${menu === 'notif' ? 'is-active' : ''}`}
            aria-label="Notifications"
            onClick={() => openMenu('notif')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            {unreadNotif > 0 ? <span className="dash-count">{unreadNotif}</span> : null}
          </button>

          <AnimatePresence>
            {menu === 'notif' ? (
              <motion.div
                className="dash-menu-panel"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <header className="dash-menu-head">
                  <strong>New reviews</strong>
                  {unreadNotif > 0 ? (
                    <button onClick={() => setReadNotif(reviews.map((r) => r.id))}>Mark all read</button>
                  ) : null}
                </header>
                <div className="dash-menu-list">
                  {reviews.length === 0 ? (
                    <p className="dash-menu-empty">No reviews yet.</p>
                  ) : (
                    reviews.map((r) => {
                      const read = readNotif.includes(r.id);
                      return (
                        <button
                          key={r.id}
                          className={`dash-menu-item ${read ? 'is-read' : ''}`}
                          onClick={() => setReadNotif((p) => (p.includes(r.id) ? p : [...p, r.id]))}
                        >
                          <span className="dash-menu-stars">{'★'.repeat(Math.min(5, r.rating))}</span>
                          <span className="dash-menu-text">
                            <strong>{r.author}</strong> left a {r.rating}-star review
                            {r.comment ? <em> — “{r.comment.slice(0, 60)}{r.comment.length > 60 ? '…' : ''}”</em> : null}
                          </span>
                          {!read ? <span className="dash-menu-unread" /> : null}
                        </button>
                      );
                    })
                  )}
                </div>
                <Link href="/dashboard/reviews" className="dash-menu-foot" onClick={() => setMenu(null)}>
                  View all reviews →
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Messages — contact messages */}
        <div className="dash-menu">
          <button
            className={`dash-icon-btn ${menu === 'msg' ? 'is-active' : ''}`}
            aria-label="Messages"
            onClick={() => openMenu('msg')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
            {unreadMsg > 0 ? <span className="dash-count">{unreadMsg}</span> : null}
          </button>

          <AnimatePresence>
            {menu === 'msg' ? (
              <motion.div
                className="dash-menu-panel dash-menu-panel-wide"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <header className="dash-menu-head">
                  <strong>Contact messages</strong>
                </header>
                <div className="dash-menu-list">
                  {msgAuthError ? (
                    <p className="dash-menu-empty">Sign in as an admin to read contact messages.</p>
                  ) : messages.length === 0 ? (
                    <p className="dash-menu-empty">No contact messages yet.</p>
                  ) : (
                    messages.map((m) => (
                      <button
                        key={m.id}
                        className={`dash-msg-item ${m.status === 'read' ? 'is-read' : ''}`}
                        onClick={() => openMessage(m)}
                      >
                        <span className="avatar-init av-sm">{initials(m.name)}</span>
                        <span className="dash-msg-body">
                          <span className="dash-msg-top">
                            <strong>{m.name}</strong>
                            <em>{fmtDate(m.date)}</em>
                          </span>
                          <span className="dash-msg-co">{m.subject}</span>
                          <span className="dash-msg-text">{m.message}</span>
                        </span>
                        {m.status === 'unread' ? <span className="dash-menu-unread" /> : null}
                      </button>
                    ))
                  )}
                </div>
                <Link href="/dashboard/messages" className="dash-menu-foot" onClick={() => setMenu(null)}>
                  Open inbox →
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <Link href="/dashboard/profile" className="avatar-init av-sm">ID</Link>
      </div>

      {/* Message popup */}
      <Modal
        open={!!activeMsg}
        onClose={() => setActiveMsg(null)}
        title={activeMsg?.subject || 'Message'}
        description={activeMsg ? `From ${activeMsg.name}` : ''}
        size="md"
      >
        {activeMsg ? (
          <div className="msg-popup">
            <div className="msg-popup-grid">
              <div className="msg-popup-row">
                <small>Name</small>
                <span>{activeMsg.name}</span>
              </div>
              <div className="msg-popup-row">
                <small>Email</small>
                <a href={`mailto:${activeMsg.email}`}>{activeMsg.email || '—'}</a>
              </div>
              {activeMsg.phone ? (
                <div className="msg-popup-row">
                  <small>Phone</small>
                  <span>{activeMsg.phone}</span>
                </div>
              ) : null}
              <div className="msg-popup-row">
                <small>Status</small>
                <span className="kit-badge kit-badge-success"><span className="dot" />Read</span>
              </div>
            </div>
            <div className="msg-popup-message">
              <small>Message</small>
              <p>{activeMsg.message || 'No message body.'}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
