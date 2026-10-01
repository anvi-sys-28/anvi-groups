import React from 'react';

export default function SectionHeading({ subtitle, title, description, align = 'left', light = false }) {
  return (
    <div className={`section-heading align-${align} ${light ? 'light' : ''}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
