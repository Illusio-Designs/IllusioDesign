export default function Tag({ children, tone = 'default', size = 'md' }) {
  return <span className={`tag-comp tag-${tone} tag-${size}`}>{children}</span>;
}
