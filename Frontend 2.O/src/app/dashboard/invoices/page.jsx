const invoices = [
  { id: 'INV-2026-014', client: 'Aicumen AI', issued: 'May 09', due: 'May 23', amount: '$48,000', status: 'Paid', tone: 'success' },
  { id: 'INV-2026-013', client: 'Crosscoin', issued: 'May 06', due: 'May 20', amount: '$18,500', status: 'Sent', tone: 'info' },
  { id: 'INV-2026-012', client: 'Flowline', issued: 'May 03', due: 'May 17', amount: '$56,200', status: 'Paid', tone: 'success' },
  { id: 'INV-2026-011', client: 'Nanak Finserv', issued: 'May 02', due: 'May 16', amount: '$12,000', status: 'Overdue', tone: 'error' },
  { id: 'INV-2026-010', client: 'Amrut Jewels', issued: 'Apr 28', due: 'May 12', amount: '$24,000', status: 'Paid', tone: 'success' },
];

export default function InvoicesPage() {
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Invoices</span>
          <h1>Billing</h1>
          <p>Track invoices, payments and overdue accounts.</p>
        </div>
        <div className="dash-page-actions">
          <button className="btn btn-light btn-sm">Export PDF</button>
          <button className="btn btn-primary btn-sm">+ New invoice</button>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Recent invoices</h3>
            <span>5 invoices · 1 overdue</span>
          </div>
        </header>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Client</th>
              <th>Issued</th>
              <th>Due</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id}>
                <td><strong>{i.id}</strong></td>
                <td>{i.client}</td>
                <td>{i.issued}</td>
                <td>{i.due}</td>
                <td>{i.amount}</td>
                <td><span className={`kit-badge kit-badge-${i.tone}`}><span className="dot" />{i.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
