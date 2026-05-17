const items = [
  'UI / UX Design',
  'Brand Identity',
  'Web Development',
  'Mobile Apps',
  'Design Systems',
  'Motion Design',
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
            <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
