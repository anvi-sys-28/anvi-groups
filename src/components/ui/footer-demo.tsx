"use client"

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export default function Demo() {
  // w-full matters: 21st centres demos in a flex wrapper, and a flex item
  // left at width:auto shrinks the canvas to 0px wide.
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="ANVI GROUPS"
        label="ANVI GROUPS"
        meta="©2026 · Global Operations"
        columns={[
          {
            title: "Navigation",
            links: [
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" }
            ]
          },
          {
            title: "Businesses",
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
              { label: "hello@anvigroups.com", href: "mailto:hello@anvigroups.com" },
              { label: "+91 (0) 40 2300 0000", href: "tel:+914023000000" }
            ]
          }
        ]}
      />
    </div>
  )
}
