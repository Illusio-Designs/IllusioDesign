'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Dashboard/Login';

export default function ProtectedRoute({ children, requiredRole = 'user' }) {
  const router = useRouter();
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        router.push('/login');
      } else if (requiredRole === 'admin' && !isAdmin()) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, loading, requiredRole, router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Login />;
  }

  if (requiredRole === 'admin' && !isAdmin()) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '600' }}>Access Denied</div>
        <div style={{ color: '#6b7280' }}>Admin privileges required for this page.</div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{
            padding: '10px 20px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

