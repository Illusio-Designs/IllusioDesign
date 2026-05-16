import Button from '@/components/ui/Button';

export default function DashboardUsers() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Users</span>
          <h1>Admin users</h1>
          <p>People with access to this dashboard.</p>
        </div>
        <Button variant="primary" size="sm" icon={false}>+ Invite user</Button>
      </div>

      <section className="dash-card">
        <div className="dash-empty">
          <div className="dash-empty-icon" aria-hidden>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.5a4 4 0 0 1 0 7M21 21v-2a4 4 0 0 0-3-3.8" />
            </svg>
          </div>
          <h3>Admin users are private</h3>
          <p>
            The user list comes from a protected admin endpoint and needs an
            authenticated session. Sign in to manage who can access the
            dashboard.
          </p>
        </div>
      </section>
    </>
  );
}
