import DashboardChrome from '@/components/dashboard/DashboardChrome';

export const metadata = {
  title: 'Dashboard — Illusio Designs',
};

export default function DashboardLayout({ children }) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
