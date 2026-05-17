export default function Container({ children, className = '', size = 'lg', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`container container-${size} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
