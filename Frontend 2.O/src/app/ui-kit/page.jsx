'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';

const palette = [
  { name: 'Ink', value: '#0D0D0D', token: '--ink' },
  { name: 'Surface', value: '#FAF9F6', token: '--bg' },
  { name: 'Paper', value: '#FFFFFF', token: '--paper' },
  { name: 'Soft', value: '#F4F2EB', token: '--bg-soft' },
  { name: 'Accent', value: '#EC691F', token: '--accent' },
  { name: 'Accent 2', value: '#FF8A4C', token: '--accent-2' },
  { name: 'Muted', value: '#696969', token: '--muted' },
  { name: 'Line', value: '#E9E5DB', token: '--line' },
];

export default function UIKitPage() {
  const [input, setInput] = useState('');
  const [check, setCheck] = useState(true);
  const [radio, setRadio] = useState('a');
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'UI Kit' }]}
          eyebrow="Design system"
          title={<>The Illusio <em>UI Kit.</em></>}
          description="The components, tokens and motion patterns that power illusiodesigns.agency."
        />

        <section className="kit-section">
          <Container>
            <div className="kit-block">
              <h2 className="kit-h">01 — Color</h2>
              <div className="kit-palette">
                {palette.map((c) => (
                  <div className="palette-card" key={c.name}>
                    <div className="palette-swatch" style={{ background: c.value, border: c.value === '#FFFFFF' ? '1px solid var(--line)' : 'none' }} />
                    <div className="palette-meta">
                      <strong>{c.name}</strong>
                      <span>{c.value}</span>
                      <span className="muted">var({c.token})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">02 — Typography</h2>
              <div className="kit-type">
                <div className="type-row">
                  <span>Display / H1</span>
                  <p className="display-1">Design that feels inevitable.</p>
                </div>
                <div className="type-row">
                  <span>Display / H2</span>
                  <p className="display-2">Four capabilities, one team.</p>
                </div>
                <div className="type-row">
                  <span>Display / H3</span>
                  <p className="display-3">Section title goes here</p>
                </div>
                <div className="type-row">
                  <span>Body / Lead</span>
                  <p className="body-lead">A senior product design studio crafting interfaces, brands and digital experiences for fintech, SaaS and DTC teams.</p>
                </div>
                <div className="type-row">
                  <span>Body / Base</span>
                  <p>Every engagement is scoped around the outcome you actually want — not a list of deliverables.</p>
                </div>
                <div className="type-row">
                  <span>Eyebrow / 12px</span>
                  <span className="eyebrow-sample">DESIGN SYSTEM · TYPOGRAPHY</span>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">03 — Buttons</h2>
              <div className="kit-grid-soft">
                <div className="kit-row">
                  <Button variant="primary" size="md">Primary</Button>
                  <Button variant="accent" size="md">Accent</Button>
                  <Button variant="ghost" size="md" icon={false}>Ghost</Button>
                  <Button variant="light" size="md">Light</Button>
                </div>
                <div className="kit-row">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
                <div className="kit-row">
                  <MagneticButton><Button variant="primary" size="md">Magnetic</Button></MagneticButton>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">04 — Form fields</h2>
              <div className="kit-grid-form">
                <div className="form-card">
                  <div className="field">
                    <label>Input</label>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type something..." />
                  </div>
                  <div className="field">
                    <label>Select</label>
                    <select defaultValue="">
                      <option value="">Select an option</option>
                      <option>Option A</option>
                      <option>Option B</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Textarea</label>
                    <textarea placeholder="Multi-line input..." />
                  </div>
                  <div className="kit-row">
                    <label className="check">
                      <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} />
                      <span>Checkbox</span>
                    </label>
                    <label className="check">
                      <input type="radio" name="r" checked={radio === 'a'} onChange={() => setRadio('a')} />
                      <span>Radio A</span>
                    </label>
                    <label className="check">
                      <input type="radio" name="r" checked={radio === 'b'} onChange={() => setRadio('b')} />
                      <span>Radio B</span>
                    </label>
                    <button type="button" className={`toggle ${toggle ? 'is-on' : ''}`} onClick={() => setToggle((v) => !v)} aria-pressed={toggle}>
                      <span />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">05 — Tags, pills & badges</h2>
              <div className="kit-grid-soft">
                <div className="kit-row">
                  <span className="kit-pill">UI / UX</span>
                  <span className="kit-pill kit-pill-accent">Featured</span>
                  <span className="kit-pill kit-pill-dark">Branding</span>
                  <span className="kit-pill kit-pill-soft">2026</span>
                </div>
                <div className="kit-row">
                  <span className="kit-badge"><span className="dot" /> Live</span>
                  <span className="kit-badge kit-badge-warn"><span className="dot" /> Pending</span>
                  <span className="kit-badge kit-badge-info"><span className="dot" /> Draft</span>
                  <span className="kit-badge kit-badge-error"><span className="dot" /> Closed</span>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">06 — Cards & stats</h2>
              <div className="kit-grid-stats">
                <div className="stat-card">
                  <span className="stat-label">Projects shipped</span>
                  <strong className="stat-num"><Counter value={600} suffix="+" /></strong>
                  <span className="stat-trend up">↑ 12.3%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Client rating</span>
                  <strong className="stat-num"><Counter value={4.9} /></strong>
                  <span className="stat-trend up">↑ 0.2</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Active retainers</span>
                  <strong className="stat-num"><Counter value={12} /></strong>
                  <span className="stat-trend down">↓ 1</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Avg. response time</span>
                  <strong className="stat-num"><Counter value={4} suffix="h" /></strong>
                  <span className="stat-trend">→ stable</span>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">07 — Avatars</h2>
              <div className="kit-row">
                <span className="avatar-init av-sm">KS</span>
                <span className="avatar-init">PN</span>
                <span className="avatar-init av-lg">AV</span>
                <span className="avatar-init av-xl">RS</span>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">08 — Alerts</h2>
              <div className="kit-grid-soft">
                <div className="alert alert-info"><strong>Info.</strong> Your changes have been saved as a draft.</div>
                <div className="alert alert-success"><strong>Success.</strong> Your project has been published.</div>
                <div className="alert alert-warn"><strong>Heads up.</strong> One of your retainers expires next week.</div>
                <div className="alert alert-error"><strong>Error.</strong> We couldn&apos;t reach the server.</div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
