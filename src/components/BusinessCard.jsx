import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BusinessCard({ item }) {
  return (
    <div className="business-card">
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
          <button className="business-card-arrow" aria-label={`Explore ${item.title}`}>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
