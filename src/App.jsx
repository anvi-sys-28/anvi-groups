import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './components/CountUp';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function MainAppContent() {
  const [showNewUi, setShowNewUi] = useState(false);
  const demoCardRef = useRef(null);

  // Motion pending completion handler for initial page
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

  return (
    <AnimatePresence mode="wait">
      {!showNewUi ? (
        /* INITIAL VANTAGE PAGE BEFORE COUNTDOWN FINISHES */
        <motion.main
          key="vantage-initial-page"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="viewport"
        >
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

            {/* IDENTICAL HEADER */}
            <Header />

            {/* TOP RIGHT MINIMAL COUNTDOWN NUMBERS (10 DOWN TO 0) */}
            <div className="top-right-minimal-countdown">
              <CountUp
                from={10}
                to={0}
                direction="down"
                duration={10}
                className="minimal-countdown-number"
                onEnd={() => setShowNewUi(true)}
              />
            </div>

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
        /* AFTER COUNTDOWN FINISHES - HERO CAROUSEL AND CONTENT WITH SAME HEADER */
        <motion.div
          key="anvi-new-hero-and-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="anvi-site-wrapper"
        >
          <Header />
          <main className="anvi-main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppContent />
    </BrowserRouter>
  );
}
