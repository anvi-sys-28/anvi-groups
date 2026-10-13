import React, { useEffect, useRef, useState } from 'react';
import './VelaAboutSection.css';

export default function VelaAboutSection() {
  const containerRef = useRef(null);
  const viewportBoxRef = useRef(null);
  const [scale, setScale] = useState(1);
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
        setScale(1);
      } else {
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

  return (
    <section className="vela-section-container" ref={containerRef}>
      <div
        className="vela-viewport-box"
        ref={viewportBoxRef}
        style={{
          transform: scale < 1 && window.innerWidth >= 700 ? `scale(${scale})` : undefined,
          marginBottom: scale < 1 && window.innerWidth >= 700 ? `-${(1 - scale) * 950}px` : undefined
        }}
      >
        <div className="vela-canvas">
          <main className="vela-shell" aria-labelledby="vela-page-title">
            <header className="vela-nav">
              <div className="vela-brand" aria-label="Vela home">
                <span className="vela-brand-mark" aria-hidden="true"></span>
                <span>Vela</span>
              </div>
              <nav className="vela-nav-links" aria-label="Primary navigation">
                <span>Platform</span>
                <span aria-hidden="true">·</span>
                <span>Features</span>
              </nav>
            </header>

            <section className="vela-intro">
              <h1 id="vela-page-title">
                <span className="vela-headline-sans">Infrastructure that</span>
                <span className="vela-headline-serif">moves like light.</span>
              </h1>
              <p>
                The real-time data platform for teams that can’t wait — ingest, transform, and
                <br className="vela-desktop-break" /> act on live signals with latency you can feel.
              </p>
            </section>

            <section className="vela-cards" aria-label="Platform features">
              {/* CARD 1: Planetary-scale streaming */}
              <article className="vela-card vela-card-left" tabIndex={0} aria-label="Planetary-scale streaming">
                <div className="vela-left-surface" aria-hidden="true"></div>
                <svg className="vela-card-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.25" />
                  <path
                    d="M4 16h24M16 4c4 4.1 5.8 8.2 5.8 12S20 23.9 16 28c-4-4.1-5.8-8.2-5.8-12S12 8.1 16 4Z"
                    stroke="currentColor"
                    strokeWidth="2.05"
                  />
                </svg>
                <span className="vela-glass-pill vela-region-left">us-east-1</span>
                <span className="vela-glass-pill vela-region-right">eu-west-2</span>
                <span className="vela-glass-pill vela-live">
                  <i className="vela-dot"></i>
                  <span className="vela-live-copy">Streaming live</span>
                </span>
                <span className="vela-glass-pill vela-regions">+28 regions</span>
                <h2 className="vela-card-title">
                  The real-time engine for <strong>planetary-scale data.</strong>
                </h2>
              </article>

              {/* CARD 2: Real-time observability */}
              <article
                className="vela-card vela-card-middle"
                tabIndex={0}
                aria-label="Real-time observability"
                onPointerEnter={startTelemetry}
                onPointerLeave={stopTelemetry}
                onFocus={startTelemetry}
                onBlur={stopTelemetry}
              >
                <svg className="vela-card-icon" viewBox="0 0 34 26" fill="none" aria-hidden="true">
                  <path d="M2 13S7.8 4 17 4s15 9 15 9-5.8 9-15 9S2 13 2 13Z" stroke="currentColor" strokeWidth="2.1" />
                  <circle cx="17" cy="13" r="4.2" stroke="currentColor" strokeWidth="2.1" />
                </svg>
                <span className="vela-card-site">vela.io</span>
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
                <p className="vela-card-copy">Real-time observability across every service you run.</p>
              </article>

              {/* CARD 3: Adaptive model operations */}
              <article className="vela-card vela-card-right" tabIndex={0} aria-label="Adaptive model operations">
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
                    <span>Retraining model</span>
                    <em>working</em>
                  </div>
                  <div className="vela-status">
                    <i className="vela-dot"></i>
                    <span>Anomaly guard</span>
                    <em>done</em>
                  </div>
                </div>
                <h2 className="vela-card-title">Adaptive.</h2>
              </article>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
