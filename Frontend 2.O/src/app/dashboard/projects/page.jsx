const rows = [
  { name: 'Amrut App v2', client: 'Amrut Jewels', lead: 'Krunal', stage: 'Design', progress: 64, due: 'Jun 14', tone: 'warn' },
  { name: 'Aicumen Dashboard', client: 'Aicumen AI', lead: 'Priya', stage: 'Build', progress: 82, due: 'May 28', tone: 'success' },
  { name: 'Crosscoin Rebrand', client: 'Crosscoin', lead: 'Riya', stage: 'Discovery', progress: 22, due: 'Jul 02', tone: 'info' },
  { name: 'Flowline Ops', client: 'Flowline', lead: 'Aman', stage: 'Launched', progress: 100, due: '—', tone: 'success' },
  { name: 'Nanak Site', client: 'Nanak Finserv', lead: 'Krunal', stage: 'On hold', progress: 40, due: '—', tone: 'error' },
  { name: 'Vivera Lighting', client: 'Vivera', lead: 'Riya', stage: 'Kickoff', progress: 8, due: 'Aug 01', tone: 'info' },
];

export default function ProjectsPage() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Projects</span>
          <h1>All projects</h1>
          <p>Track every engagement from kickoff to launch.</p>
        </div>
        <button className="btn btn-primary btn-sm">+ New project</button>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Active</h3>
            <span>6 of 12</span>
          </div>
          <input className="dash-mini-search" placeholder="Search projects..." />
        </header>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Lead</th>
              <th>Stage</th>
              <th>Progress</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td><strong>{r.name}</strong></td>
                <td>{r.client}</td>
                <td>{r.lead}</td>
                <td><span className={`kit-badge kit-badge-${r.tone}`}><span className="dot" />{r.stage}</span></td>
                <td>
                  <div className="progress-bar"><span style={{ width: `${r.progress}%` }} /></div>
                  <small style={{ color: 'var(--muted)' }}>{r.progress}%</small>
                </td>
                <td>{r.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
