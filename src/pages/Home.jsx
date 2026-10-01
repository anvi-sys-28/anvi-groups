import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Target, TrendingUp } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import SectionHeading from '../components/SectionHeading';
import BusinessCard from '../components/BusinessCard';
import { businessVerticals, companyApproach } from '../data/slidesData';

export default function Home() {
  return (
    <div className="anvi-page home-page">
      {/* IMMERSIVE HERO CAROUSEL */}
      <HeroCarousel />

      {/* SECTION 1: INTRODUCTION */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-left">
              <span className="intro-tag">CORPORATE OVERVIEW</span>
              <h2 className="intro-title">
                Building Businesses.<br />
                Creating Possibilities.
              </h2>
            </div>
            <div className="intro-right">
              <p className="intro-lead">
                ANVI GROUPS is a multi-sector corporate enterprise building high-impact technology, infrastructure, digital networks, and industrial growth platforms across Asia and global markets.
              </p>
              <p className="intro-text">
                With a commitment to long-term value creation, responsible capital allocation, and continuous innovation, we develop solutions that empower communities and drive sustainable economic progress.
              </p>
              <div className="intro-metrics">
                <div className="metric-item">
                  <span className="metric-val">6+</span>
                  <span className="metric-lbl">Core Sectors</span>
                </div>
                <div className="metric-item">
                  <span className="metric-val">15K+</span>
                  <span className="metric-lbl">Global Team</span>
                </div>
                <div className="metric-item">
                  <span className="metric-val">100%</span>
                  <span className="metric-lbl">ESG Committed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR BUSINESSES */}
      <section className="section businesses-section" id="businesses">
        <div className="container">
          <SectionHeading
            subtitle="PORTFOLIO VERTICALS"
            title="Our Core Business Sectors"
            description="ANVI GROUPS operates integrated businesses engineered to solve complex global challenges across critical industries."
          />
          <div className="businesses-grid">
            {businessVerticals.map((item) => (
              <BusinessCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT ANVI GROUPS */}
      <section className="section about-preview-section">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-preview-img-box">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
                alt="ANVI GROUPS Corporate Tower"
                className="about-preview-img"
              />
              <div className="about-preview-badge">
                <span className="badge-num">25+</span>
                <span className="badge-txt">Years of Excellence</span>
              </div>
            </div>
            <div className="about-preview-content">
              <span className="section-subtitle">ABOUT ANVI GROUPS</span>
              <h2 className="section-title">
                Built for Today.<br />
                Designed for Tomorrow.
              </h2>
              <p className="about-preview-desc">
                From pioneering clean infrastructure to deploying enterprise AI systems, ANVI GROUPS operates at the intersection of scale and purpose. We combine deep domain expertise with agile execution to deliver sustainable compounding growth.
              </p>
              <div className="about-preview-features">
                <div className="feature-row">
                  <ShieldCheck className="feature-icon" size={20} />
                  <div>
                    <strong>Uncompromising Governance</strong>
                    <p>Highest standard of global compliance and ethical management.</p>
                  </div>
                </div>
                <div className="feature-row">
                  <Zap className="feature-icon" size={20} />
                  <div>
                    <strong>Technology Driven</strong>
                    <p>Embedding automation and intelligence into every business operation.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="anvi-primary-btn">
                <span>Discover ANVI GROUPS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR APPROACH */}
      <section className="section approach-section" id="approach">
        <div className="container">
          <SectionHeading
            subtitle="PHILOSOPHY & VALUES"
            title="Our Strategic Approach"
            description="The foundational principles that guide every investment, expansion, and partnership across ANVI GROUPS."
          />
          <div className="approach-grid">
            {companyApproach.map((item) => (
              <div key={item.number} className="approach-card">
                <span className="approach-num">{item.number}</span>
                <h3 className="approach-card-title">{item.title}</h3>
                <p className="approach-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-box">
            <h2 className="cta-banner-title">Let's Build What Comes Next.</h2>
            <p className="cta-banner-desc">
              Partner with ANVI GROUPS to drive transformation, enterprise innovation, and high-growth infrastructure initiatives.
            </p>
            <Link to="/contact" className="cta-banner-btn">
              <span>Contact ANVI GROUPS</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
