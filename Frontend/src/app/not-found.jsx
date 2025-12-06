'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push('/')}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  );
}


