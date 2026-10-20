import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';

/* ========================================================================== */
/* EDITABLE PRELOADER CONFIGURATION CONSTANTS                                 */
/* Customize company name, tagline, durations, colors, and behavior below     */
/* ========================================================================== */
export const PRELOADER_CONFIG = {
  // Brand Typography
  companyNameBold: "ANVI",
  companyNameLight: "GROUPS",
  tagline: "FROM FARM TO THE WORLD · GLOBAL MERCANTILE & TRADE",

  // Timing (in milliseconds)
  minDuration: 4200,      // Minimum display time before curtain exit (~4.2s)
  failsafeDuration: 7000, // Maximum timeout before forced exit failsafe (7s)
  exitAnimDuration: 1150, // Shutter curtain split animation duration (1.15s)

  // Colors
  primaryGold: "#D4AF37",
  lightGold: "#F5D77A",
  deepEmerald: "#04130d",

  // 3D Globe & Particle Settings
  baseGlobeRadius: 135,
  particleCountDesktop: 48,
  particleCountMobile: 24,

  // Session Storage & Testing
  storageKey: "anvi_groups_preloader_seen_v1",
  allowBypassQuery: "intro" // Append ?intro=1 or ?intro to URL to re-trigger anytime
};

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const startTimeRef = useRef(null);
  const isExitedRef = useRef(false);

  // 1. SESSION CHECK & INITIAL MOUNT
  useEffect(() => {
    // Check if bypass parameter exists in URL (e.g. ?intro=1 or ?intro)
    const urlParams = new URLSearchParams(window.location.search);
    const hasBypassParam = urlParams.has(PRELOADER_CONFIG.allowBypassQuery) || urlParams.has('preloader');

    // Check if user already saw the preloader in this session
    const hasSeen = sessionStorage.getItem(PRELOADER_CONFIG.storageKey);

    if (hasSeen && !hasBypassParam) {
      // Skip preloader on repeat visits in the same session
      return;
    }

    // Lock body scroll immediately
    document.body.style.overflow = 'hidden';
    setIsVisible(true);
    startTimeRef.current = performance.now();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track window load status
    let pageLoaded = document.readyState === 'complete';
    const handleLoad = () => { pageLoaded = true; };

    if (!pageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    // Function to trigger exit
    const triggerExit = () => {
      if (isExitedRef.current) return;
      isExitedRef.current = true;

      setProgress(100);
      setIsExiting(true);

      // Save to sessionStorage so it doesn't replay on route changes
      sessionStorage.setItem(PRELOADER_CONFIG.storageKey, 'true');

      // After curtain split animation finishes, restore scroll and unmount
      setTimeout(() => {
        document.body.style.overflow = '';
        setIsVisible(false);
      }, PRELOADER_CONFIG.exitAnimDuration);
    };

    if (prefersReducedMotion) {
      // Reduced motion: quick 1.2s fade and exit
      const timer = setTimeout(triggerExit, 1200);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    // Progress counter and completion checker
    const progressInterval = setInterval(() => {
      if (!startTimeRef.current || isExitedRef.current) return;

      const elapsed = performance.now() - startTimeRef.current;
      const targetPercent = Math.min(100, Math.floor((elapsed / PRELOADER_CONFIG.minDuration) * 100));

      setProgress((prev) => {
        if (targetPercent > prev) {
          return targetPercent;
        }
        return prev;
      });

      // Exit condition: minDuration passed AND page is loaded
      if (elapsed >= PRELOADER_CONFIG.minDuration && pageLoaded) {
        clearInterval(progressInterval);
        triggerExit();
      }
    }, 40);

    // 7s Failsafe timeout: force exit if anything gets stuck
    const failsafeTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      triggerExit();
    }, PRELOADER_CONFIG.failsafeDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(failsafeTimeout);
      window.removeEventListener('load', handleLoad);
      document.body.style.overflow = '';
    };
  }, []);

  // 2. 3D DOTTED GLOBE, TRADE ARCS & FLOATING PARTICLES CANVAS
  useEffect(() => {
    if (!isVisible || isExiting) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isSmallDevice = width < 640 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic globe radius based on viewport
    const globeRadius = Math.min(width * 0.22, height * 0.22, PRELOADER_CONFIG.baseGlobeRadius);
    const globeCenter = { x: width / 2, y: height / 2 - 10 };

    // Generate dotted sphere coordinates
    const sphereDots = [];
    const latCount = isSmallDevice ? 18 : 26;

    for (let i = 0; i <= latCount; i++) {
      const lat = (i / latCount) * Math.PI - Math.PI / 2;
      const ringRadius = Math.cos(lat);
      const ringY = -Math.sin(lat);
      const dotsInRing = Math.max(1, Math.floor(Math.abs(ringRadius) * (isSmallDevice ? 28 : 42)));

      for (let j = 0; j < dotsInRing; j++) {
        const lon = (j / dotsInRing) * 2 * Math.PI;
        const x = ringRadius * Math.sin(lon);
        const y = ringY;
        const z = ringRadius * Math.cos(lon);
        sphereDots.push({ x, y, z });
      }
    }

    // Global Trade Gateways (Lat/Lon converted to unit vectors)
    const toUnitVec = (latDeg, lonDeg) => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180;
      return {
        x: Math.cos(lat) * Math.sin(lon),
        y: -Math.sin(lat),
        z: Math.cos(lat) * Math.cos(lon)
      };
    };

    const hubs = {
      india: toUnitVec(19.0, 73.0),      // Mumbai / Hyderabad Gateway
      europe: toUnitVec(51.5, 4.5),      // Rotterdam / Antwerp
      spain: toUnitVec(39.5, 0.0),       // Valencia / Mediterranean
      uae: toUnitVec(25.2, 55.3),        // Dubai / Jebel Ali
      singapore: toUnitVec(1.3, 103.8),  // Singapore Strait
      eastAsia: toUnitVec(31.2, 121.5),  // Shanghai
      usEast: toUnitVec(40.7, -74.0),    // New York / New Jersey
      usWest: toUnitVec(33.7, -118.2)    // Los Angeles / Long Beach
    };

    const tradeRoutes = [
      { from: hubs.india, to: hubs.uae, speed: 0.32, offset: 0.1 },
      { from: hubs.india, to: hubs.europe, speed: 0.22, offset: 0.35 },
      { from: hubs.india, to: hubs.spain, speed: 0.25, offset: 0.6 },
      { from: hubs.india, to: hubs.singapore, speed: 0.28, offset: 0.2 },
      { from: hubs.uae, to: hubs.europe, speed: 0.26, offset: 0.75 },
      { from: hubs.europe, to: hubs.usEast, speed: 0.18, offset: 0.45 },
      { from: hubs.singapore, to: hubs.eastAsia, speed: 0.3, offset: 0.15 },
      { from: hubs.eastAsia, to: hubs.usWest, speed: 0.16, offset: 0.85 }
    ];

    // Floating Golden Grains / Spices / Embers
    const particleCount = isSmallDevice ? PRELOADER_CONFIG.particleCountMobile : PRELOADER_CONFIG.particleCountDesktop;
    const particles = [];
    for (let p = 0; p < particleCount; p++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.6 + 0.3,
        swayAmp: Math.random() * 25 + 10,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.25,
        type: p % 4 // grain, spice ember, gold fleck
      });
    }

    // Animation Loop Variables
    let rotY = 0;
    const tiltX = 0.28; // ~16 deg orbital tilt
    let startTimestamp = performance.now();

    const render = (now) => {
      const elapsed = (now - startTimestamp) * 0.001;
      rotY = elapsed * 0.35; // smooth rotation

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Floating Golden Grains & Spices
      particles.forEach((pt) => {
        pt.y -= pt.speedY;
        if (pt.y < -10) {
          pt.y = height + 10;
          pt.x = Math.random() * width;
        }

        const swayX = pt.x + Math.sin(elapsed * pt.swaySpeed * 10 + pt.swayOffset) * pt.swayAmp;
        ctx.save();
        ctx.fillStyle = pt.type === 0 ? '#F5D77A' : pt.type === 1 ? '#D4AF37' : pt.type === 2 ? '#E6B800' : '#85D49B';
        ctx.globalAlpha = pt.alpha * (0.6 + 0.4 * Math.sin(elapsed * 2 + pt.swayOffset));

        if (pt.type === 0) {
          // Elongated golden grain
          ctx.beginPath();
          ctx.ellipse(swayX, pt.y, pt.radius * 1.8, pt.radius * 0.8, 0.4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Soft glowing spice fleck
          ctx.beginPath();
          ctx.arc(swayX, pt.y, pt.radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.restore();
      });

      // 2. 3D Projector Helper Function
      const project3D = (vec, radius = globeRadius) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = vec.x * cosY + vec.z * sinY;
        const z1 = -vec.x * sinY + vec.z * cosY;

        // Tilt around X axis
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const y2 = vec.y * cosX - z1 * sinX;
        const z2 = vec.y * sinX + z1 * cosX;

        // Perspective projection
        const focal = 450;
        const scale = focal / (focal + z2 * radius);
        return {
          px: globeCenter.x + x1 * radius * scale,
          py: globeCenter.y + y2 * radius * scale,
          zDepth: z2,
          scale
        };
      };

      // 3. Draw Dotted Globe Cloud (Sorted by depth for proper back-to-front layering)
      sphereDots.forEach((dot) => {
        const p = project3D(dot);
        const isFront = p.zDepth > 0;

        ctx.beginPath();
        ctx.arc(p.px, p.py, isFront ? 1.5 * p.scale : 0.9 * p.scale, 0, 2 * Math.PI);

        if (isFront) {
          // Glowing front dots (gold and emerald luminescence)
          const brightness = Math.min(1, 0.35 + p.zDepth * 0.65);
          ctx.fillStyle = `rgba(245, 215, 122, ${brightness * 0.85})`;
        } else {
          // Dim rear dots (dark emerald depth)
          const dim = Math.max(0.08, 0.18 * (1 + p.zDepth));
          ctx.fillStyle = `rgba(16, 75, 48, ${dim})`;
        }
        ctx.fill();
      });

      // 4. Draw Golden Orbit Ring Encircling the Globe
      ctx.save();
      ctx.beginPath();
      const ringSteps = 60;
      for (let r = 0; r <= ringSteps; r++) {
        const angle = (r / ringSteps) * Math.PI * 2;
        const ringRad = globeRadius * 1.35;
        const rx = Math.cos(angle);
        const ry = 0;
        const rz = Math.sin(angle);
        const rp = project3D({ x: rx, y: ry, z: rz }, ringRad);

        if (r === 0) ctx.moveTo(rp.px, rp.py);
        else ctx.lineTo(rp.px, rp.py);
      }
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Traveling orbital light pulse
      const orbitPulseAngle = (elapsed * 0.8) % (Math.PI * 2);
      const orbitPt = project3D(
        { x: Math.cos(orbitPulseAngle), y: 0, z: Math.sin(orbitPulseAngle) },
        globeRadius * 1.35
      );
      if (orbitPt.zDepth > -0.2) {
        ctx.beginPath();
        ctx.arc(orbitPt.px, orbitPt.py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF6D6';
        ctx.shadowColor = '#F5D77A';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 5. Draw Arched Golden Trade Corridors (India to Continents)
      tradeRoutes.forEach((route) => {
        const arcSteps = 24;
        const arcPoints = [];

        for (let s = 0; s <= arcSteps; s++) {
          const t = s / arcSteps;
          // Spherical SLERP interpolation
          const vx = (1 - t) * route.from.x + t * route.to.x;
          const vy = (1 - t) * route.from.y + t * route.to.y;
          const vz = (1 - t) * route.from.z + t * route.to.z;
          const len = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;

          // Parabolic lift above surface (max height at mid-route)
          const liftHeight = Math.sin(t * Math.PI) * (globeRadius * 0.32);
          const arcVec = { x: vx / len, y: vy / len, z: vz / len };
          const pt = project3D(arcVec, globeRadius + liftHeight);
          arcPoints.push(pt);
        }

        // Check if any part of the arc is visible facing the viewer
        const midPoint = arcPoints[Math.floor(arcSteps / 2)];
        if (midPoint && midPoint.zDepth > -0.3) {
          ctx.save();
          ctx.beginPath();
          arcPoints.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          });

          const routeAlpha = Math.max(0.12, Math.min(0.65, 0.2 + (midPoint.zDepth + 0.3) * 0.5));
          ctx.strokeStyle = `rgba(212, 175, 55, ${routeAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Traveling Glowing Cargo / Trade Pulse
          const pulseT = (elapsed * route.speed + route.offset) % 1;
          const pulseIdx = Math.min(arcPoints.length - 1, Math.floor(pulseT * (arcPoints.length - 1)));
          const pulsePt = arcPoints[pulseIdx];

          if (pulsePt && pulsePt.zDepth > -0.15) {
            ctx.beginPath();
            ctx.arc(pulsePt.px, pulsePt.py, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#F5D77A';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          ctx.restore();
        }
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, isExiting]);

  if (!isVisible) return null;

  // Split letters for staggered animation
  const anviLetters = PRELOADER_CONFIG.companyNameBold.split("");
  const groupsLetters = PRELOADER_CONFIG.companyNameLight.split("");

  return (
    <div
      id="anvi-preloader"
      className={`anvi-preloader-root ${isExiting ? 'is-exiting' : ''}`}
      aria-hidden={isExiting}
      role="dialog"
      aria-label="Loading ANVI GROUPS"
    >
      {/* 1. CINEMATIC SHUTTER SPLIT CURTAINS */}
      <div className="preloader-curtain preloader-curtain-top" />
      <div className="preloader-curtain preloader-curtain-bottom" />

      {/* 2. ATMOSPHERIC GLOW & NOISE GRAIN */}
      <div className="preloader-ambient-glow" />
      <div className="preloader-grain-overlay" />

      {/* 3. 3D GLOBE, TRADE ARCS & PARTICLES CANVAS */}
      <canvas ref={canvasRef} className="preloader-canvas-layer" />

      {/* 4. CENTRAL LUXURY BRAND STACK */}
      <div className="preloader-center-content">
        {/* Emblem Monogram */}
        <div className="preloader-monogram-wrap">
          <div className="preloader-monogram" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Company Title (Letter by Letter Masked Slide Up) */}
        <h1 className="preloader-title-wrap" aria-label={`${PRELOADER_CONFIG.companyNameBold} ${PRELOADER_CONFIG.companyNameLight}`}>
          {/* "ANVI" - Bold Gold Shimmer */}
          <span className="preloader-word preloader-word-anvi">
            {anviLetters.map((char, index) => (
              <span key={`anvi-${index}`} className="preloader-char-mask">
                <span
                  className="preloader-char"
                  style={{ animationDelay: `${1.7 + index * 0.08}s` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>

          {/* "GROUPS" - Lighter Refined Display */}
          <span className="preloader-word preloader-word-groups">
            {groupsLetters.map((char, index) => (
              <span key={`groups-${index}`} className="preloader-char-mask">
                <span
                  className="preloader-char"
                  style={{ animationDelay: `${2.05 + index * 0.07}s` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Expanding Golden Divider */}
        <div className="preloader-divider" aria-hidden="true" />

        {/* Tagline */}
        <p className="preloader-tagline">
          {PRELOADER_CONFIG.tagline}
        </p>
      </div>

      {/* 5. FOOTER STATUS BAR & LIVE PERCENTAGE COUNTER */}
      <div className="preloader-footer-bar">
        <div className="preloader-status-label">
          <span className="preloader-live-beacon" />
          <span>Global Trade Infrastructure Active</span>
        </div>

        <div className="preloader-counter-box">
          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="preloader-counter-number">
            {progress.toString().padStart(2, '0')}%
          </span>
        </div>
      </div>

      {/* 6. SUBTLE CONTAINER SHIP HORIZON SILHOUETTE */}
      <div className="preloader-horizon-silhouette" aria-hidden="true">
        <div className="preloader-water-line" />
        <svg
          className="preloader-ship-svg"
          width="82"
          height="18"
          viewBox="0 0 82 18"
          fill="currentColor"
        >
          {/* Minimal cargo ship silhouette */}
          <path d="M4 14h74l-5 4H9z" />
          <path d="M16 8h10v6H16zM28 6h12v8H28zM42 4h14v10H42zM58 7h8v7h-8z" />
          <path d="M68 9h5v5h-5zM70 5h1v4h-1z" />
        </svg>
      </div>
    </div>
  );
}
