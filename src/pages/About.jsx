import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, Users, Globe2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { companyApproach } from '../data/slidesData';

export default function About() {
  const leadership = [
    {
      name: 'Vikram Anvi',
      title: 'Group Chairman & Managing Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered the expansion of ANVI GROUPS into multi-sector technology and infrastructure.'
    },
    {
      name: 'Dr. Elena Rostova',
      title: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Oversees enterprise AI, quantum computing systems, and global digital architectures.'
    },
    {
      name: 'Rajesh K. Mehta',
      title: 'CEO, ANVI Infra & Energy',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Drives large-scale urban infrastructure projects and green energy transitions.'
    }
  ];

  return (
    <div className="anvi-page about-page">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-tag">ABOUT ANVI GROUPS</span>
          <h1 className="page-hero-title">Building Businesses With A Long-Term Perspective.</h1>
          <p className="page-hero-lead">
            ANVI GROUPS is an enterprise conglomerate driving value across technology, infrastructure, digital networks, and emerging investments worldwide.
          </p>
        </div>
      </section>

      {/* WHO WE ARE & HERO IMAGE */}
      <section className="section about-who-section">
        <div className="container">
          <div className="about-hero-img-container">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
              alt="ANVI Corporate Headquarters"
              className="about-hero-full-img"
            />
          </div>
          <div className="who-we-are-grid">
            <div className="who-left">
              <span className="section-subtitle">WHO WE ARE</span>
              <h2 className="section-title">Architects of Industrial & Digital Progress</h2>
            </div>
            <div className="who-right">
              <p>
                Founded on the belief that economic strength and innovation must go hand-in-hand, ANVI GROUPS operates as a catalyst for scalable transformation. From high-capacity cloud data platforms to smart transportation hubs, our companies provide the backbone for modern economic ecosystems.
              </p>
              <p>
                We maintain an unyielding commitment to capital efficiency, operational rigor, and environmental responsibility, ensuring every project yields multi-generational benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vm-card">
              <div className="vm-icon"><Compass size={32} /></div>
              <h3>Our Vision</h3>
              <p>
                To be the global reference standard for multi-sector excellence, building resilient infrastructure and intelligent platforms that empower humanity to thrive.
              </p>
            </div>
            <div className="vm-card">
              <div className="vm-icon"><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p>
                To deploy strategic capital and world-class talent toward building enduring businesses, fostering technological leadership, and creating compounding stakeholder value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="container">
          <SectionHeading
            subtitle="OUR CORE VALUES"
            title="What Defines ANVI GROUPS"
            description="Our values shape our culture, govern our decisions, and set the standard for how we build partnerships worldwide."
          />
          <div className="values-grid">
            {companyApproach.map((v) => (
              <div key={v.number} className="value-item">
                <span className="value-num">{v.number}</span>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section leadership-section">
        <div className="container">
          <SectionHeading
            subtitle="EXECUTIVE LEADERSHIP"
            title="Guided by Visionary Stewardship"
            description="Our executive team combines decades of global leadership across industrial, technology, and financial markets."
          />
          <div className="leadership-grid">
            {leadership.map((person) => (
              <div key={person.name} className="leader-card">
                <div className="leader-img-wrapper">
                  <img src={person.image} alt={person.name} className="leader-img" />
                </div>
                <div className="leader-info">
                  <h4>{person.name}</h4>
                  <span className="leader-title">{person.title}</span>
                  <p className="leader-bio">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROWTH & FUTURE CTA */}
      <section className="section about-cta-section">
        <div className="container">
          <div className="about-cta-inner">
            <h2>Shaping the Next Chapter of Global Growth</h2>
            <p>
              Discover how ANVI GROUPS is investing in quantum computing, clean infrastructure, and emerging market technology.
            </p>
            <Link to="/contact" className="anvi-primary-btn">
              <span>Partner With Us</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
