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
            { label: "Contact", href: "/contact" }
          ]
        },
        {
          title: "Enterprises",
          links: [
            { label: "ANVITECH INDIA PVT, LTD.", href: "https://anvitechindia.com/" },
            { label: "ANVI MERCANTILE PVT, LTD.", href: "https://www.anvimercantile.in/" },
            { label: "ANVI Interiors", href: "/#businesses" },
            { label: "ANVI Advertising", href: "/#businesses" }
          ]
        },
        {
          title: "Connect",
          links: [
            { label: "support@anvigroups.in", href: "mailto:support@anvigroups.in" },
            { label: "Global HQ · Kapra, Hyderabad, INDIA", href: "/contact" }
          ]
        }
      ]}
      crop={-0.1}
      height="380px"
    />
  );
}
