'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';
import Modal from '@/components/ui/Modal';
import Tooltip from '@/components/ui/Tooltip';
import Pagination from '@/components/ui/Pagination';
import Loader, { Spinner } from '@/components/ui/Loader';
import SplitText from '@/components/ui/SplitText';
import { StarRating, StarRatingInput } from '@/components/ui/StarRating';
import BackgroundRipple from '@/components/ui/BackgroundRipple';
import Tag from '@/components/ui/Tag';
import Skeleton, { SkeletonText, SkeletonTable, SkeletonCards } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';

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
  const { push } = useToast();
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(2);
  const [stars, setStars] = useState(4);
  const [toggle, setToggle] = useState(true);
  const [input, setInput] = useState('');

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'UI Kit' }]}
          eyebrow="Design system"
          title={<>The Illusio <em>UI Kit.</em></>}
          description="Tokens, components and motion patterns powering illusiodesigns.agency."
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
                <div className="type-row">
                  <span>SplitText / Words</span>
                  <SplitText text="Words can move across the screen with rhythm." className="display-3" trigger="onMount" />
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
                  <Tooltip label="Sends a sample toast"><Button onClick={() => push({ tone: 'info', title: 'Hello', body: 'This is a toast notification.' })}>Show toast</Button></Tooltip>
                  <Button onClick={() => setModal(true)} variant="ghost" icon={false}>Open modal</Button>
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
                    <label className="check"><input type="checkbox" defaultChecked /><span>Checkbox</span></label>
                    <label className="check"><input type="radio" name="r" defaultChecked /><span>Radio A</span></label>
                    <label className="check"><input type="radio" name="r" /><span>Radio B</span></label>
                    <button type="button" className={`toggle ${toggle ? 'is-on' : ''}`} onClick={() => setToggle((v) => !v)} aria-pressed={toggle}><span /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">05 — Tags, pills & badges</h2>
              <div className="kit-grid-soft">
                <div className="kit-row">
                  <Tag>Default</Tag>
                  <Tag tone="accent">Accent</Tag>
                  <Tag tone="dark">Dark</Tag>
                  <Tag tone="soft">Soft</Tag>
                  <Tag size="sm">Small</Tag>
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
                  <span className="stat-label">Avg. response</span>
                  <strong className="stat-num"><Counter value={4} suffix="h" /></strong>
                  <span className="stat-trend">→ stable</span>
                </div>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">07 — Avatars & ratings</h2>
              <div className="kit-row">
                <span className="avatar-init av-sm">KS</span>
                <span className="avatar-init">PN</span>
                <span className="avatar-init av-lg">AV</span>
                <span className="avatar-init av-xl">RS</span>
                <StarRating value={5} size={18} />
                <StarRatingInput value={stars} onChange={setStars} size={22} />
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

            <div className="kit-block">
              <h2 className="kit-h">09 — Loaders</h2>
              <div className="kit-row">
                <Loader label="Loading projects" />
                <Spinner size={24} />
                <Spinner size={18} />
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">10 — Pagination</h2>
              <Pagination page={page} total={5} onChange={setPage} />
            </div>

            <div className="kit-block">
              <h2 className="kit-h">11 — Tooltips</h2>
              <div className="kit-row">
                <Tooltip label="Hi from a tooltip"><Button size="sm" icon={false} variant="light">Hover me</Button></Tooltip>
                <Tooltip label="On the right" side="right"><Button size="sm" icon={false} variant="light">Right</Button></Tooltip>
                <Tooltip label="On the bottom" side="bottom"><Button size="sm" icon={false} variant="light">Bottom</Button></Tooltip>
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">12 — Skeleton / shimmer</h2>
              <div className="kit-grid-soft">
                <div className="kit-row" style={{ gap: 20 }}>
                  <Skeleton w={120} h={120} radius={16} />
                  <Skeleton w={56} h={56} radius="50%" />
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <SkeletonText lines={4} />
                  </div>
                </div>
                <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <SkeletonTable rows={4} cols={4} />
                </div>
                <SkeletonCards count={3} height={140} />
              </div>
            </div>

            <div className="kit-block">
              <h2 className="kit-h">13 — Background ripple</h2>
              <div className="ripple-stage">
                <BackgroundRipple rows={8} cols={14} cellSize={36} />
                <div className="ripple-overlay">
                  <p>Click any tile.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Modal example"
        description="Press ESC or click the backdrop to close."
        size="md"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="md" icon={false} onClick={() => setModal(false)}>Cancel</Button>
            <Button variant="primary" size="md" icon={false} onClick={() => { push({ tone: 'success', title: 'Saved', body: 'Settings updated.' }); setModal(false); }}>
              Confirm
            </Button>
          </div>
        }
      >
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Modals support sizes, an optional footer, animated entrance, ESC-to-close and backdrop dismissal. Use them for confirmations, focused forms, and onboarding flows.
        </p>
      </Modal>
    </>
  );
}
