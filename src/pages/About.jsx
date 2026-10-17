import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, Users, Globe2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { companyApproach } from '../data/slidesData';
import DuotoneTeamRoster from '../components/ui/duotone-team-roster';

export default function About() {
  const executiveMembers = [
    {
      name: 'Jashwanth',
      role: 'Director',
      craft: 'Director',
      bio: 'Directing ANVI GROUPS with enduring vision, leading strategic initiatives across enterprise software, industrial investments, and international business growth.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Connect',
      href: '/contact'
    },
    {
      name: 'Rohan',
      role: 'Managing Director',
      craft: 'MD',
      bio: 'Steering corporate operations, executive execution, and commercial scalability across ANVI GROUPS global business sectors.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Connect',
      href: '/contact'
    },
    {
      name: 'Vasavi',
      role: 'Legal Advisor',
      craft: 'Legal',
      bio: 'Leading corporate legal counsel, cross-border compliance, regulatory affairs, and institutional contract governance.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Legal Desk',
      href: '/contact'
    },
    {
      name: 'Dileep',
      role: 'Legal Advisor',
      craft: 'Legal',
      bio: 'Specializing in international corporate law, strategic joint ventures, commercial agreements, and risk mitigation.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Legal Desk',
      href: '/contact'
    },
    {
      name: 'Prem',
      role: 'Board Member',
      craft: 'Board',
      bio: 'Providing board-level oversight on multi-sector capital allocation, sustainable industrial infrastructure, and governance.',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Board Office',
      href: '/contact'
    },
    {
      name: 'Shashank',
      role: 'Board Member',
      craft: 'Board',
      bio: 'Guiding corporate strategy on technology transformation, international market expansion, and long-term stakeholder value.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&h=960&q=80',
      linkLabel: 'Board Office',
      href: '/contact'
    }
  ];

  const openRoles = [
    {
      title: 'VP of Global Business Development',
      href: '/contact',
      craft: 'Growth',
      note: 'Leading strategic international client partnerships across India, Europe, USA, and the Middle East.',
      mark: 'JOIN'
    },
    {
      title: 'Chief Technology & AI Architect',
      href: '/contact',
      craft: 'Tech / AI',
      note: 'Architecting high-scale enterprise cloud solutions and intelligent automation systems.',
      mark: 'You?'
    },
    {
      title: 'Director of International Trade & Logistics',
      href: '/contact',
      craft: 'Logistics',
      note: 'Directing multimodal shipping corridors, port infrastructure, and global supply distribution.',
      mark: 'BUILD'
    },
    {
      title: 'Head of Strategic Capital & M&A',
      href: '/contact',
      craft: 'Venture',
      note: 'Steering cross-border corporate mergers, capital allocation, and new market ventures.',
      mark: 'SCALE'
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
        intro="Our leadership team drives strategic vision, corporate governance, and sustainable multi-sector growth across ANVI GROUPS global verticals."
        members={executiveMembers}
        openRoles={openRoles}
        cta={{ label: "Connect with leadership", href: "/contact" }}
        secondaryCta={{ label: "Career opportunities", href: "/contact" }}
      />

      {/* 2. WHO WE ARE */}
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
