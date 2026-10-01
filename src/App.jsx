import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './components/CountUp';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [showNewUi, setShowNewUi] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const demoCardRef = useRef(null);

  // Motion pending completion handler for Vantage page
  useEffect(() => {
    const cardEl = demoCardRef.current;
    const handleAnimationEnd = (e) => {
      if (e.animationName === 'entrance-card' || e.target === cardEl) {
        document.documentElement.classList.remove('motion-pending');
        if (window.__motionTimeout) {
          clearTimeout(window.__motionTimeout);
        }
      }
    };

    if (cardEl) {
      cardEl.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (cardEl) {
        cardEl.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);

  // Keyboard navigation & click outside for Vantage menu
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {!showNewUi ? (
          /* INITIAL VANTAGE LANDING PAGE WITH TOP-RIGHT COUNTDOWN */
          <motion.main
            key="vantage-landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="viewport"
          >
            {/* TOP RIGHT COUNTDOWN BADGE FROM REACT BITS */}
            <div className="top-right-countdown-badge">
              <span className="badge-pulse" />
              <span className="badge-text">Next Gen ANVI UI in</span>
              <CountUp
                from={5}
                to={0}
                direction="down"
                duration={5}
                className="countdown-number"
                onEnd={() => setShowNewUi(true)}
              />
              <span className="badge-sec">s</span>
              <button
                onClick={() => setShowNewUi(true)}
                className="skip-badge-btn"
                title="Switch directly to new UI"
              >
                Skip ➔
              </button>
            </div>

            <section className="screen" id="screen">
              <video
                className="background"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                aria-hidden="true"
              >
                <source src="/assets/background.mp4" type="video/mp4" />
                <source
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4"
                  type="video/mp4"
                />
              </video>

              <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
                <a href="#" className="brand" aria-label="Vantage home">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="brand-icon"
                  >
                    <g clipPath="url(#vantage-clip)">
                      <rect width="25" height="25" fill="#ededed" />
                      <path d="M 12.5,2 L 23,12.5 L 12.5,23 L 2,12.5 Z" fill="#050606" />
                      <path d="M 12.5,2 L 23,12.5 L 12.5,12.5 Z" fill="#737778" />
                      <path d="M 12.5,12.5 L 23,12.5 L 12.5,23 Z" fill="#fafafa" />
                      <path d="M 2,12.5 L 12.5,12.5 L 12.5,23 Z" fill="#0a0b0b" />
                    </g>
                    <defs>
                      <clipPath id="vantage-clip">
                        <circle cx="12.5" cy="12.5" r="12.5" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>

                <div
                  className="header-actions"
                  id="tablet-navigation"
                  ref={navRef}
                  aria-hidden={!menuOpen ? 'true' : undefined}
                >
                  <nav className="nav">
                    <a
                      href="#"
                      className="active"
                      ref={firstLinkRef}
                      onClick={closeMenu}
                    >
                      Home
                    </a>
                    <a href="#" onClick={closeMenu}>
                      About
                    </a>
                    <a href="#" onClick={closeMenu}>
                      Services
                    </a>
                    <a href="#" onClick={closeMenu}>
                      Contact
                    </a>
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
                  onClick={toggleMenu}
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

              <section className="hero">
                <div className="hero-content">
                  <h1 className="hero-title">
                    <span className="line line-one">
                      <span className="line-reveal">Stop Digging</span>
                    </span>
                    <span className="line line-two">
                      <span className="line-reveal">Through Dashboards.</span>
                    </span>
                  </h1>

                  <p className="hero-copy">
                    Your metrics are scattered across a dozen dashboards.<br />
                    Vantage bring them into one clear signal, so every<br />
                    decision is backed by data you actually trust.
                  </p>

                  <button className="primary-cta" onClick={() => setShowNewUi(true)}>
                    <span className="label">Get Started</span>
                    <span className="arrow-box">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" />
                      </svg>
                    </span>
                  </button>
                </div>

                <article className="demo-card" ref={demoCardRef}>
                  <div className="demo-visual">
                    <img
                      src="/assets/watch-demo-thumbnail.svg"
                      alt="Abstract red and blue smoke"
                    />
                    <button className="play" aria-label="Play demo" onClick={() => setShowNewUi(true)}>
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="#fff">
                        <path d="M1.5 1.5l9 5.5-9 5.5v-11z" />
                      </svg>
                    </button>
                  </div>
                  <button className="watch-button" onClick={() => setShowNewUi(true)}>
                    Watch Demo
                  </button>
                </article>
              </section>
            </section>
          </motion.main>
        ) : (
          /* NEW ANVI GROUPS CORPORATE WEBSITE ROUTER */
          <motion.div
            key="anvi-corporate-website"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="anvi-site-wrapper"
          >
            <BrowserRouter>
              <Header />
              <main className="anvi-main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
