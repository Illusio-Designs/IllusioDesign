'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/Dashboard/ProtectedRoute';
import Dashboard from '@/pages/Dashboard/Dashboard';

export default function DashboardSlugPage() {
  const params = useParams();
  const slug = params?.slug || [];
  // If slug is empty or undefined, it means we're at /dashboard (home)
  const page = slug && slug.length > 0 ? slug[0] : 'dashboard';

  return (
    <ProtectedRoute>
      <Dashboard initialPage={page} />
    </ProtectedRoute>
  );
}

