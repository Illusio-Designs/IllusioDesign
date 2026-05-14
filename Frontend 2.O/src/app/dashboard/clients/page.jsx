const clients = [
  { name: 'Amrut Jewels', city: 'Mumbai', projects: 4, value: '$64k', mrr: '$8k' },
  { name: 'Aicumen AI', city: 'Bengaluru', projects: 6, value: '$92k', mrr: '$12k' },
  { name: 'Crosscoin', city: 'Dubai', projects: 2, value: '$48k', mrr: '$6k' },
  { name: 'Flowline', city: 'Singapore', projects: 5, value: '$118k', mrr: '$14k' },
  { name: 'Nanak Finserv', city: 'Rajkot', projects: 3, value: '$36k', mrr: '$4k' },
  { name: 'Vivera Lighting', city: 'Delhi', projects: 1, value: '$22k', mrr: '$3k' },
];

const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();

export default function ClientsPage() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Clients</span>
          <h1>Client roster</h1>
          <p>Active accounts and engagement value.</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Add client</button>
      </div>

      <div className="dash-clients-grid">
        {clients.map((c) => (
          <article className="client-card" key={c.name}>
            <span className="avatar-init av-lg">{initials(c.name)}</span>
            <h3>{c.name}</h3>
            <span className="client-city">{c.city}</span>
            <div className="client-stats">
              <div>
                <strong>{c.projects}</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>{c.value}</strong>
                <span>Lifetime</span>
              </div>
              <div>
                <strong>{c.mrr}</strong>
                <span>MRR</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
