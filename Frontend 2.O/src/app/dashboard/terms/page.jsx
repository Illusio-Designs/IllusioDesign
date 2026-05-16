'use client';

import LegalEditor from '@/components/dashboard/LegalEditor';
import { termsOfServiceAPI } from '@/services/api';

export default function DashboardTerms() {
  return (
    <LegalEditor
      api={termsOfServiceAPI}
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Edit the terms of service shown on the public site."
      publicHref="/terms"
    />
  );
}
