'use client';

import Register from '@/pages/Dashboard/Register';

// Force dynamic rendering since this page uses AuthProvider context
export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  return <Register />;
}

