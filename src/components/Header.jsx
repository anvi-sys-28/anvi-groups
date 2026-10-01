import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <header className="anvi-header">
      <div className="anvi-header-inner">
        {/* LOGO */}
        <Link to="/" className="anvi-logo" aria-label="ANVI GROUPS Home">
          <span className="anvi-logo-mark">A</span>
          <span className="anvi-logo-text">ANVI GROUPS</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="anvi-desktop-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            ABOUT
          </Link>
          <a href="/#businesses" className="nav-link">
            BUSINESSES
          </a>
          <Link
            to="/contact"
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            CONTACT
          </Link>
        </nav>

        {/* RIGHT ACTION CONTROLS */}
        <div className="anvi-header-actions">
          {/* SEARCH BAR */}
          <div className={`search-container ${searchOpen ? 'open' : ''}`}>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search ANVI GROUPS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-btn"
              aria-label="Search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          <div className="lang-selector">
            <Globe size={18} />
            <span>EN</span>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <div className={`anvi-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            HOME
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            ABOUT
          </Link>
          <a href="/#businesses" onClick={() => setMobileOpen(false)}>
            BUSINESSES
          </a>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}
