import React from 'react';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import VelaAboutSection from '../components/VelaAboutSection';
import SectionHeading from '../components/SectionHeading';
import BusinessCard from '../components/BusinessCard';
import { businessVerticals } from '../data/slidesData';

export default function Home() {
  return (
    <div className="anvi-page home-page">
      {/* SECTION 1: IMMERSIVE HERO CAROUSEL */}
      <HeroCarousel />

      {/* SECTION 2: CORPORATE OVERVIEW */}
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
                Led by Director Jashwanth Rao Gajvelli, ANVI GROUPS is a multi-sector corporate enterprise dedicated to serving and delivering quality products, next-generation software development, and global mercantile trade logistics across international markets.
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

      {/* SECTION 3: VELA ABOUT SECTION (INFRASTRUCTURE THAT MOVES LIKE LIGHT) */}
      <VelaAboutSection />

      {/* SECTION 4: OUR CORE BUSINESS SECTORS */}
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
    </div>
  );
}
