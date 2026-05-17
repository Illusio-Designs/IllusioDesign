import { redirect } from 'next/navigation';

// Privacy + Terms are now managed together under /dashboard/policy.
export default function DashboardPrivacyRedirect() {
  redirect('/dashboard/policy');
}
