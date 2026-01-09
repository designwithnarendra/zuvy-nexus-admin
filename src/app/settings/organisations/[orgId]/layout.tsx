import { ReactNode } from 'react';

interface OrganisationLayoutProps {
  children: ReactNode;
}

export default function OrganisationLayout({ children }: OrganisationLayoutProps) {
  return <>{children}</>;
}
