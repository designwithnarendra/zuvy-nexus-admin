'use client'

import { useParams } from 'next/navigation';
import OrganisationDetailPage from '@/page-components/organisations/OrganisationDetailPage';

export default function OrganisationPage() {
  const params = useParams();
  const orgId = params.orgId as string;

  return <OrganisationDetailPage orgId={orgId} />;
}
