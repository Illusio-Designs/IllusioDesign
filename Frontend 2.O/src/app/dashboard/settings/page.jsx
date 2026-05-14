'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [form, setForm] = useState({
    studio: 'Illusio Designs',
    email: 'Info@illusiodesigns.agency',
    timezone: 'IST (UTC+5:30)',
    currency: 'USD',
    notifyEmail: true,
    notifyDigest: false,
    notifyMobile: true,
  });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const toggle = (k) => setForm((p) => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Settings</span>
          <h1>Studio settings</h1>
          <p>Update preferences for your studio workspace.</p>
        </div>
      </div>

      <div className="dash-grid-2">
        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h3>Studio profile</h3>
              <span>Public information</span>
            </div>
          </header>
          <div className="dash-card-body">
            <div className="field">
              <label>Studio name</label>
              <input value={form.studio} onChange={change('studio')} />
            </div>
            <div className="field">
              <label>Contact email</label>
              <input type="email" value={form.email} onChange={change('email')} />
            </div>
            <div className="field-row">
              <div className="field">
                <label>Timezone</label>
                <select value={form.timezone} onChange={change('timezone')}>
                  <option>IST (UTC+5:30)</option>
                  <option>GMT (UTC+0)</option>
                  <option>PST (UTC-8)</option>
                </select>
              </div>
              <div className="field">
                <label>Currency</label>
                <select value={form.currency} onChange={change('currency')}>
                  <option>USD</option>
                  <option>INR</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary btn-sm">Save changes</button>
          </div>
        </section>

        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h3>Notifications</h3>
              <span>Choose what gets delivered</span>
            </div>
          </header>
          <ul className="dash-prefs">
            <li>
              <div>
                <strong>Project email updates</strong>
                <span>New comments, approvals, and reminders</span>
              </div>
              <button className={`toggle ${form.notifyEmail ? 'is-on' : ''}`} onClick={() => toggle('notifyEmail')} aria-pressed={form.notifyEmail}><span /></button>
            </li>
            <li>
              <div>
                <strong>Weekly digest</strong>
                <span>Friday recap of activity, pipeline and revenue</span>
              </div>
              <button className={`toggle ${form.notifyDigest ? 'is-on' : ''}`} onClick={() => toggle('notifyDigest')} aria-pressed={form.notifyDigest}><span /></button>
            </li>
            <li>
              <div>
                <strong>Mobile push</strong>
                <span>Approvals and overdue invoices only</span>
              </div>
              <button className={`toggle ${form.notifyMobile ? 'is-on' : ''}`} onClick={() => toggle('notifyMobile')} aria-pressed={form.notifyMobile}><span /></button>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
