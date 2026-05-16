'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { teamAPI, cleanText } from '@/services/api';

const initials = (n = '') =>
  n.split(' ').map((x) => x[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    teamAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        const mapped = (Array.isArray(list) ? list : []).filter(Boolean).map((t) => ({
          id: t.id,
          name: cleanText(t.name),
          role: cleanText(t.role || '—'),
          bio: cleanText(t.bio || ''),
        }));
        setTeam(mapped);
      })
      .catch(() => { if (m) setTeam([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? team.filter((m) => `${m.name} ${m.role}`.toLowerCase().includes(q))
    : team;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Team</span>
          <h1>Studio team</h1>
          <p>Members published on the public About page.</p>
        </div>
        <Button variant="primary" size="sm" icon={false}>+ Invite</Button>
      </div>

      <section className="dash-card">
        {loading ? (
          <SkeletonTable rows={5} cols={3} />
        ) : filtered.length === 0 ? (
          <div style={{ padding: 24, color: 'var(--muted)', fontSize: 14 }}>
            {q ? 'No team members match your search.' : 'No team members published yet.'}
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id || i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="avatar-init av-sm">{initials(m.name)}</span>
                      <strong>{m.name}</strong>
                    </div>
                  </td>
                  <td>{m.role}</td>
                  <td>
                    <span className="kit-badge kit-badge-success">
                      <span className="dot" />Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
