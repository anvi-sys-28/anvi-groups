import React from 'react';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

export default function Footer() {
  return (
    <HalftoneWordmarkFooter
      wordmark="ANVI GROUPS"
      label="ANVI GROUPS"
      meta="©2026 · Global Enterprise"
      preset="night"
      columns={[
        {
          title: "Navigation",
          links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Services", href: "/#businesses" },
            { label: "Contact", href: "/contact" }
          ]
        },
        {
          title: "Sectors",
          links: [
            { label: "ANVI Technologies", href: "/#businesses" },
            { label: "ANVI Infra", href: "/#businesses" },
            { label: "ANVI Digital", href: "/#businesses" },
            { label: "ANVI Ventures", href: "/#businesses" }
          ]
        },
        {
          title: "Connect",
          links: [
            { label: "info@anvigroups.com", href: "mailto:info@anvigroups.com" },
            { label: "Global HQ · Hyderabad / London", href: "/contact" }
          ]
        }
      ]}
      crop={-0.1}
      height="380px"
    />
  );
}
