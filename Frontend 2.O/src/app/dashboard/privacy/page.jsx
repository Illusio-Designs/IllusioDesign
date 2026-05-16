'use client';

import LegalEditor from '@/components/dashboard/LegalEditor';
import { privacyPolicyAPI } from '@/services/api';

export default function DashboardPrivacy() {
  return (
    <LegalEditor
      api={privacyPolicyAPI}
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="Edit the privacy policy shown on the public site."
      publicHref="/privacy"
    />
  );
}
