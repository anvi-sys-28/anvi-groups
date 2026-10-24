import React, { useEffect, useRef, useState } from 'react';
import './VelaAboutSection.css';

export default function VelaAboutSection() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      return w < 700 ? 1 : Math.min(w / 1690, 1);
    }
    return 1;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 700;
    }
    return false;
  });
  const [telemetry, setTelemetry] = useState({
    latency: '41',
    error: '0.00',
    requests: '128'
  });
  const timerRef = useRef(null);
  const frameIndexRef = useRef(0);

  const frames = [
    ['26', '0.17', '139'],
    ['11', '0.63', '104'],
    ['18', '0.42', '147'],
    ['31', '0.21', '116'],
    ['39', '0.08', '134'],
    ['22', '0.37', '112'],
    ['36', '0.14', '143'],
    ['41', '0.00', '128']
  ];

  // Fit scaling for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 700) {
        setIsMobile(true);
        setScale(1);
      } else {
        setIsMobile(false);
        const calculated = Math.min(width / 1690, 1);
        setScale(calculated);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startTelemetry = () => {
    if (timerRef.current !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    frameIndexRef.current = 0;
    const initial = frames[0];
    setTelemetry({ latency: initial[0], error: initial[1], requests: initial[2] });

    timerRef.current = setInterval(() => {
      frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
      const current = frames[frameIndexRef.current];
      setTelemetry({ latency: current[0], error: current[1], requests: current[2] });
    }, 105);
  };

  const stopTelemetry = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTelemetry({ latency: '41', error: '0.00', requests: '128' });
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopTelemetry();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  const scaledHeight = isMobile ? undefined : Math.round(950 * scale);

  return (
    <section className="vela-section-container" ref={containerRef}>
      <div
        className="vela-scaler"
        style={{
          height: scaledHeight ? `${scaledHeight}px` : 'auto'
        }}
      >
        <div
          className="vela-viewport-box"
          style={{
            transform: !isMobile ? `scale(${scale})` : undefined
          }}
        >
          <div className="vela-canvas">
            <main className="vela-shell" aria-labelledby="vela-page-title">
            <header className="vela-nav">
              <div className="vela-brand" aria-label="ANVI GROUPS">
                <span className="vela-brand-mark" aria-hidden="true"></span>
                <span>ANVI GROUPS</span>
              </div>
              <nav className="vela-nav-links" aria-label="Primary navigation">
                <span>Software</span>
                <span aria-hidden="true">·</span>
                <span>Mercantile</span>
                <span aria-hidden="true">·</span>
                <span>Enterprises</span>
              </nav>
            </header>

            <section className="vela-intro">
              <h1 id="vela-page-title">
                <span className="vela-headline-sans">Infrastructure that</span>
                <span className="vela-headline-serif">moves like light.</span>
              </h1>
              <p>
                Built by ANVI GROUPS to accelerate business growth globally. Jashwanth Rao Gajvelli, Director of ANVI GROUPS, and family serve with excellence — serving and delivering quality products, next-generation software development, global mercantile trade logistics, and high-impact enterprise solutions.
              </p>
            </section>

            <section className="vela-cards" aria-label="Platform features">
              {/* CARD 1: Global Mercantile & Trade Logistics */}
              <article
                className="vela-card vela-card-left"
                tabIndex={0}
                aria-label="Mercantile & Global Trade Logistics"
                onClick={() => window.open('https://www.anvimercantile.in/', '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                <div className="vela-left-surface" aria-hidden="true"></div>
                <svg className="vela-card-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.25" />
                  <path
                    d="M4 16h24M16 4c4 4.1 5.8 8.2 5.8 12S20 23.9 16 28c-4-4.1-5.8-8.2-5.8-12S12 8.1 16 4Z"
                    stroke="currentColor"
                    strokeWidth="2.05"
                  />
                </svg>
                <span className="vela-card-site">anvimercantile.in ↗</span>
                <span className="vela-glass-pill vela-region-left">Asia-Pacific</span>
                <span className="vela-glass-pill vela-region-right">Global Markets</span>
                <span className="vela-glass-pill vela-live">
                  <i className="vela-dot"></i>
                  <span className="vela-live-copy">Active Trade</span>
                </span>
                <span className="vela-glass-pill vela-regions">Worldwide Logistics</span>
                <h2 className="vela-card-title">
                  ANVI MERCANTILE PVT, LTD.: Global supply chains for <strong>worldwide commerce.</strong>
                </h2>
              </article>

              {/* CARD 2: Software Development & Next-Gen Cloud */}
              <article
                className="vela-card vela-card-middle"
                tabIndex={0}
                aria-label="Software Development & Next-Gen Tech"
                onClick={() => window.open('https://anvitechindia.com/', '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
                onPointerEnter={startTelemetry}
                onPointerLeave={stopTelemetry}
                onFocus={startTelemetry}
                onBlur={stopTelemetry}
              >
                <svg className="vela-card-icon" viewBox="0 0 34 26" fill="none" aria-hidden="true">
                  <path d="M2 13S7.8 4 17 4s15 9 15 9-5.8 9-15 9S2 13 2 13Z" stroke="currentColor" strokeWidth="2.1" />
                  <circle cx="17" cy="13" r="4.2" stroke="currentColor" strokeWidth="2.1" />
                </svg>
                <span className="vela-card-site">anvitechindia.com ↗</span>
                <div className="vela-orbit" aria-hidden="true">
                  <div className="vela-orbit-dot-bottom"></div>
                </div>
                <div className="vela-sphere" aria-hidden="true"></div>
                <span className="vela-glass-pill vela-latency">
                  <i className="vela-dot"></i>
                  <span className="vela-telemetry-number" data-baseline="41">{telemetry.latency}</span>&nbsp; ms · p99
                </span>
                <span className="vela-glass-pill vela-error">
                  <i className="vela-dot"></i>
                  <span className="vela-telemetry-number" data-baseline="0.00">{telemetry.error}</span>&nbsp; % err
                </span>
                <span className="vela-glass-pill vela-requests">
                  <i className="vela-dot violet"></i>
                  <span className="vela-telemetry-number" data-baseline="128">{telemetry.requests}</span>&nbsp; k req/s
                </span>
                <p className="vela-card-copy">ANVITECH INDIA PVT, LTD.: Enterprise software solutions, custom AI systems & cloud platforms.</p>
              </article>

              {/* CARD 3: Interiors & Brand Advertising */}
              <article className="vela-card vela-card-right" tabIndex={0} aria-label="Interiors & Brand Media">
                <svg className="vela-card-icon vela-pulse" viewBox="0 0 39 29" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 16h8l4.2-11 7.1 23 5.4-17 3.1 5h8.2"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="vela-status-band" aria-hidden="true"></div>
                <div className="vela-status-stack">
                  <div className="vela-status">
                    <i className="vela-dot yellow"></i>
                    <span>ANVI Interiors</span>
                    <em>spatial design</em>
                  </div>
                  <div className="vela-status">
                    <i className="vela-dot"></i>
                    <span>ANVI Advertising</span>
                    <em>brand media</em>
                  </div>
                </div>
                <h2 className="vela-card-title">Visionary.</h2>
              </article>
            </section>
          </main>
        </div>
      </div>
      </div>
    </section>
  );
}
