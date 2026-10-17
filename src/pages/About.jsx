import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, Users, Globe2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { companyApproach } from '../data/slidesData';
import DuotoneTeamRoster from '../components/ui/duotone-team-roster';

export default function About() {
  const executiveMembers = [
    {
      name: 'Jashwanth Rao Gajvelli & Family',
      role: 'Founder & Principal Stewardship',
      craft: 'Founder',
      bio: 'Leading ANVI GROUPS with a dedicated mission: serving with quality, helping businesses grow globally, and empowering enterprises to go digital with great software solutions.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Connect',
      href: '/contact'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Chief Technology Officer',
      craft: 'CTO',
      bio: 'Oversees enterprise AI architectures, quantum computing systems, and global digital infrastructure.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'Rajesh K. Mehta',
      role: 'CEO, ANVI Infra & Energy',
      craft: 'Infra',
      bio: 'Drives large-scale urban infrastructure projects, green energy grids, and port logistics corridors.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'Vikramaditya Rao',
      role: 'Managing Director, Global Exports',
      craft: 'Exports',
      bio: 'Directs international supply chains, multimodal shipping logistics, and cross-border commercial compliance.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'Sophia Lin',
      role: 'VP, Enterprise Software Solutions',
      craft: 'Software',
      bio: 'Architects enterprise cloud platforms, workflow automation suites, and custom digital transformation tools.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Capital Allocation & M&A',
      craft: 'Capital',
      bio: 'Steers private equity investments, international strategic acquisitions, and corporate treasury growth.',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'Ananya Patel',
      role: 'Chief ESG & Sustainability Officer',
      craft: 'ESG',
      bio: 'Guarantees net-zero carbon benchmarks, renewable energy standards, and transparent stakeholder governance.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    },
    {
      name: 'David Chen',
      role: 'Chief Operating Officer',
      craft: 'Operations',
      bio: 'Oversees operational rigor, capital allocation efficiency, and global standard operational consistency.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'Say hello',
      href: '/contact'
    }
  ];

  const openRoles = [
    {
      title: 'Lead AI Systems Architect',
      href: '/contact',
      craft: 'Engineering',
      note: 'Scale high-throughput neural networks and distributed real-time telemetry systems.',
      mark: 'You?'
    },
    {
      title: 'VP of Global Business Development',
      href: '/contact',
      craft: 'Growth',
      note: 'Spearhead cross-border enterprise partnerships across EMEA, APAC, and the Americas.',
      mark: 'Join?'
    }
  ];

  return (
    <div className="anvi-page about-page">
      {/* 1. DUOTONE EXECUTIVE LEADERSHIP ROSTER (FIRST SECTION) */}
      <DuotoneTeamRoster
        preset="ember"
        columns={3}
        height="840px"
        eyebrow="EXECUTIVE LEADERSHIP"
        title={"Guided by\nStewardship"}
        intro="Our executive team combines decades of global leadership across industrial operations, enterprise software solutions, and international capital markets."
        members={executiveMembers}
        openRoles={openRoles}
        cta={{ label: "Connect with leadership", href: "/contact" }}
        secondaryCta={{ label: "Career opportunities", href: "/contact" }}
      />

      {/* 2. FAMILY STEWARDSHIP & MISSION / WHO WE ARE */}
      <section className="section about-who-section">
        <div className="container">
          <div className="family-legacy-box">
            <div className="legacy-icon">
              <Award size={28} />
            </div>
            <div className="legacy-content">
              <span className="legacy-tag">FAMILY STEWARDSHIP & MISSION</span>
              <h3>Serving with Quality · Driving Global Growth · Digital Innovation</h3>
              <p>
                At ANVI GROUPS, <strong>Jashwanth Rao Gajvelli and family</strong> serve with quality, helping businesses grow globally and empowering enterprises to go digitally with great software solutions. We combine integrity, technological leadership, and long-term vision to build sustainable value for businesses across every continent.
              </p>
            </div>
          </div>

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

      {/* 3. OUR CORE VALUES */}
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

      {/* 4. VISION & MISSION */}
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

      {/* 5. GROWTH & FUTURE CTA */}
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
