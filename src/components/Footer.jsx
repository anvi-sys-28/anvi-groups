import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="anvi-footer">
      <div className="anvi-footer-container">
        <div className="anvi-footer-grid">
          {/* BRAND COLUMN */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-mark">A</span>
              <span className="logo-text">ANVI GROUPS</span>
            </Link>
            <p className="footer-desc">
              Building businesses, technology and solutions that create lasting multi-generational value across global sectors.
            </p>
            <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
              <span>Back to Top</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* COMPANY LINKS */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="/#businesses">Our Businesses</a></li>
              <li><a href="/#approach">Our Approach</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* BUSINESSES LINKS */}
          <div className="footer-col">
            <h4 className="footer-col-title">Businesses</h4>
            <ul className="footer-links">
              <li><a href="/#businesses">ANVI Technologies</a></li>
              <li><a href="/#businesses">ANVI Infra</a></li>
              <li><a href="/#businesses">ANVI Digital</a></li>
              <li><a href="/#businesses">ANVI Ventures</a></li>
            </ul>
          </div>

          {/* CONNECT LINKS */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@anvigroups.com" target="_blank" rel="noreferrer">Email Us</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <p>© 2026 ANVI GROUPS. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
