import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BusinessCard({ item }) {
  const cardBody = (
    <>
      <div className="business-card-img-wrapper">
        <img src={item.image} alt={item.title} className="business-card-img" />
        <div className="business-card-overlay" />
        <span className="business-card-badge">{item.subtitle}</span>
      </div>
      <div className="business-card-content">
        <h3 className="business-card-title">{item.title}</h3>
        <p className="business-card-desc">{item.description}</p>
        <div className="business-card-footer">
          <span className="business-card-stats">{item.stats}</span>
          <div className="business-card-arrow" aria-label={`Explore ${item.title}`}>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="business-card"
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
      >
        {cardBody}
      </a>
    );
  }

  return (
    <div className="business-card">
      {cardBody}
    </div>
  );
}
