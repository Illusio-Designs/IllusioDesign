'use client';

import { useMemo, useState } from 'react';
import LegalEditor from '@/components/dashboard/LegalEditor';
import { policyAPI } from '@/services/api';

/**
 * Adapt the unified /policy/:type endpoint to the shape LegalEditor expects
 * (getAll → list, create/update → save). There is one row per type, and the
 * backend upserts on save, so create and update both call the same endpoint.
 */
const makePolicyApi = (type) => ({
  getAll: async () => {
    try {
      const policy = await policyAPI.getByType(type);
      return policy ? [policy] : [];
    } catch (err) {
      if (err?.status === 404) return [];
      throw err;
    }
  },
  create: (payload) => policyAPI.upsert(type, payload),
  update: (_id, payload) => policyAPI.upsert(type, payload),
});

const TABS = [
  {
    type: 'privacy',
    label: 'Privacy Policy',
    subtitle: 'Edit the privacy policy shown on the public site.',
    publicHref: '/privacy',
  },
  {
    type: 'terms',
    label: 'Terms of Service',
    subtitle: 'Edit the terms of service shown on the public site.',
    publicHref: '/terms',
  },
];

export default function DashboardPolicy() {
  const [active, setActive] = useState('privacy');
  const tab = TABS.find((t) => t.type === active) || TABS[0];
  // Memoise so LegalEditor's [api] effect only re-runs when the tab changes.
  const api = useMemo(() => makePolicyApi(active), [active]);

  return (
    <>
      <div className="dash-tabs" role="tablist" aria-label="Policy documents">
        {TABS.map((t) => (
          <button
            key={t.type}
            type="button"
            role="tab"
            aria-selected={active === t.type}
            className={`dash-tab ${active === t.type ? 'is-active' : ''}`}
            onClick={() => setActive(t.type)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* key={active} remounts the editor on tab change for a clean reload */}
      <LegalEditor
        key={active}
        api={api}
        eyebrow="Legal"
        title={tab.label}
        subtitle={tab.subtitle}
        publicHref={tab.publicHref}
      />
    </>
  );
}
