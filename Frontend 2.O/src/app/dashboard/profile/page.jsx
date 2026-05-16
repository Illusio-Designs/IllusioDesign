'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/providers/Toaster';

export default function DashboardProfile() {
  const { push } = useToast();
  const [form, setForm] = useState({
    name: 'Illusio Designs',
    role: 'Studio Administrator',
    email: 'Info@illusiodesigns.agency',
    phone: '+91 76000 48416',
    bio: 'Studio account for Illusio Designs — branding, UI/UX, web and custom B2B solutions.',
  });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    push({ tone: 'success', title: 'Profile saved', body: 'Your changes have been updated.' });
  };

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Profile</span>
          <h1>Your profile</h1>
          <p>Manage your personal account details.</p>
        </div>
      </div>

      <div className="dash-grid-2">
        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h3>Account</h3>
              <span>Visible to your team</span>
            </div>
          </header>
          <form className="dash-card-body" onSubmit={save}>
            <div className="field-row">
              <div className="field">
                <label>Full name</label>
                <input value={form.name} onChange={change('name')} />
              </div>
              <div className="field">
                <label>Role</label>
                <input value={form.role} onChange={change('role')} />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={change('email')} />
              </div>
              <div className="field">
                <label>Phone</label>
                <input value={form.phone} onChange={change('phone')} />
              </div>
            </div>
            <div className="field">
              <label>Bio</label>
              <textarea value={form.bio} onChange={change('bio')} />
            </div>
            <Button type="submit" variant="primary" size="sm" icon={false}>Save profile</Button>
          </form>
        </section>

        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h3>Identity</h3>
              <span>How you appear</span>
            </div>
          </header>
          <div className="dash-card-body" style={{ alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="avatar-init av-xl">
              {form.name.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()}
            </span>
            <div>
              <strong style={{ fontFamily: 'var(--display)', fontSize: 20 }}>{form.name}</strong>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{form.role}</div>
            </div>
            <Button variant="light" size="sm" icon={false}>Change avatar</Button>
          </div>
        </section>
      </div>
    </>
  );
}
