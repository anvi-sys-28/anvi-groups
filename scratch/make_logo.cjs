const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="60" viewBox="0 0 240 60">
  <rect width="240" height="60" fill="none"/>
  <rect x="4" y="10" width="40" height="40" rx="8" fill="#111827"/>
  <path d="M24 18 L34 38 L29 38 L27 34 L21 34 L19 38 L14 38 Z M24 24 L22.5 30 L25.5 30 Z" fill="#ff6b00"/>
  <text x="56" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" fill="#ffffff" letter-spacing="0.5">ANVI GROUPS</text>
</svg>`;

fs.writeFileSync('public/assets/l.svg', svg);
fs.writeFileSync('public/l.svg', svg);

// Also copy to l.webp filename so /assets/l.webp serves the logo
fs.writeFileSync('public/assets/l.webp', svg);
fs.writeFileSync('public/l.webp', svg);

console.log('Successfully created logo files l.svg and l.webp!');
