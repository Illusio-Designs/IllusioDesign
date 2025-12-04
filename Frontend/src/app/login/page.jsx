'use client';

import Login from '@/pages/Dashboard/Login';

// Force dynamic rendering since this page uses AuthProvider context
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return <Login />;
}

