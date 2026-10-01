import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (e) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="brand" aria-label="ANVI GROUPS home">
        <img
          src="/assets/l.webp"
          alt="ANVI GROUPS Logo"
          className="brand-logo-img"
        />
      </Link>

      <div
        className="header-actions"
        id="tablet-navigation"
        ref={navRef}
        aria-hidden={!menuOpen ? 'true' : undefined}
      >
        <nav className="nav">
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <a href="/#businesses" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <Link
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div className="time-panel">
          <label>Timezone</label>
          <span>9:47 PM&nbsp; • &nbsp;14 July 2026</span>
        </div>

        <button className="sign-up">Sign Up</button>
      </div>

      <button
        className="menu-toggle"
        ref={toggleRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <svg
          className="hamburger-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="4" y1="16" x2="16" y2="4" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="17" y2="7" />
              <line x1="3" y1="13" x2="17" y2="13" />
            </>
          )}
        </svg>
      </button>
    </header>
  );
}
