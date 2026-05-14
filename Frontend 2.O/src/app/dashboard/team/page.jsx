const team = [
  { name: 'Krunal Soni', role: 'Founder & Lead Designer', email: 'krunal@illusiodesigns.agency', tone: 'success' },
  { name: 'Priya Nair', role: 'Senior Product Designer', email: 'priya@illusiodesigns.agency', tone: 'success' },
  { name: 'Aman Verma', role: 'Engineering Lead', email: 'aman@illusiodesigns.agency', tone: 'success' },
  { name: 'Riya Shah', role: 'Brand Designer', email: 'riya@illusiodesigns.agency', tone: 'info' },
];

const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();

export default function TeamPage() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Team</span>
          <h1>Studio team</h1>
          <p>Manage seats, roles and access.</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Invite</button>
      </div>

      <section className="dash-card">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.email}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="avatar-init av-sm">{initials(m.name)}</span>
                    <strong>{m.name}</strong>
                  </div>
                </td>
                <td>{m.role}</td>
                <td>{m.email}</td>
                <td><span className={`kit-badge kit-badge-${m.tone}`}><span className="dot" />{m.tone === 'success' ? 'Active' : 'Invited'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
