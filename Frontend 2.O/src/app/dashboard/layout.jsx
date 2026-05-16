import DashboardChrome from '@/components/dashboard/DashboardChrome';
import { DashSearchProvider } from '@/components/dashboard/SearchContext';

export const metadata = {
  title: 'Dashboard — Illusio Designs',
};

export default function DashboardLayout({ children }) {
  return (
    <DashSearchProvider>
      <DashboardChrome>{children}</DashboardChrome>
    </DashSearchProvider>
  );
}
