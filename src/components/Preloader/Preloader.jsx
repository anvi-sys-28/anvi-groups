import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';

/* ========================================================================== */
/* EDITABLE PRELOADER CONFIGURATION CONSTANTS                                 */
/* ========================================================================== */
export const PRELOADER_CONFIG = {
  // Brand Content (Matching the Real Brand Logo)
  companyName: "ANVI GROUPS",
  subsidiary1: "ANVI TECH INDIA PVT. LTD.",
  subsidiary2: "ANVI MERCANTILE PVT. LTD.",
  tagline: "", // Optional tagline (omit if empty string)

  // Timing (milliseconds)
  minDuration: 3600,      // Total sequence duration before panel split (~3.6s)
  failsafeDuration: 6000, // Maximum safety failsafe timeout (6.0s)
  exitAnimDuration: 1000, // Vertical panel exit slide duration (1.0s)

  // Brand Orange Palette (Variables also exposed in Preloader.css)
  bgDark: "#7A2406",
  bgRich: "#D9480F",
  bgBright: "#FF7A1A",
  amberHighlight: "#FFB36B",
  pureWhite: "#FFFFFF",

  // Session Storage Key
  storageKey: "anvi_groups_preloader_seen_v4",
  allowBypassQuery: "intro" // Append ?intro=1 or ?intro to URL to re-trigger anytime
};

// Traced vector path of the authentic ANVI "AN" monogram
const AN_MONOGRAM_PATH = "M 3.0 679.0 L 8.0 695.0 L 24.0 722.0 L 40.0 739.0 L 63.0 755.0 L 102.0 769.0 L 117.0 771.0 L 154.0 769.0 L 191.0 756.0 L 217.0 739.0 L 232.0 725.0 L 370.0 540.0 L 384.0 526.0 L 667.0 526.0 L 672.0 521.0 L 630.0 448.0 L 622.0 442.0 L 237.0 442.0 L 191.0 449.0 L 156.0 460.0 L 115.0 481.0 L 86.0 503.0 L 59.0 531.0 L 27.0 574.0 L 8.0 610.0 L 0.0 648.0 Z M 275.0 528.0 L 268.0 536.0 L 263.0 544.0 L 259.0 548.0 L 257.0 552.0 L 253.0 556.0 L 246.0 567.0 L 240.0 573.0 L 235.0 582.0 L 231.0 586.0 L 217.0 605.0 L 210.0 616.0 L 206.0 620.0 L 201.0 628.0 L 191.0 640.0 L 187.0 647.0 L 180.0 655.0 L 173.0 666.0 L 165.0 676.0 L 152.0 689.0 L 142.0 696.0 L 136.0 699.0 L 127.0 702.0 L 115.0 702.0 L 107.0 699.0 L 101.0 695.0 L 94.0 688.0 L 86.0 674.0 L 83.0 663.0 L 83.0 649.0 L 85.0 640.0 L 88.0 632.0 L 95.0 619.0 L 105.0 608.0 L 107.0 604.0 L 133.0 574.0 L 153.0 554.0 L 162.0 547.0 L 180.0 537.0 L 205.0 529.0 L 224.0 526.0 Z M 195.0 411.0 L 296.0 405.0 L 507.0 117.0 L 543.0 91.0 L 583.0 88.0 L 621.0 106.0 L 878.0 507.0 L 927.0 537.0 L 991.0 533.0 L 1033.0 500.0 L 1049.0 466.0 L 1053.0 113.0 L 1070.0 87.0 L 1100.0 86.0 L 1119.0 112.0 L 1119.0 618.0 L 1101.0 663.0 L 1061.0 695.0 L 1020.0 707.0 L 968.0 706.0 L 930.0 691.0 L 892.0 659.0 L 627.0 227.0 L 595.0 200.0 L 562.0 194.0 L 522.0 209.0 L 378.0 410.0 L 475.0 407.0 L 562.0 295.0 L 790.0 676.0 L 833.0 728.0 L 877.0 759.0 L 951.0 784.0 L 1018.0 787.0 L 1085.0 773.0 L 1162.0 719.0 L 1200.0 633.0 L 1195.0 75.0 L 1162.0 27.0 L 1099.0 3.0 L 1033.0 16.0 L 986.0 60.0 L 968.0 108.0 L 968.0 436.0 L 956.0 460.0 L 706.0 61.0 L 665.0 24.0 L 590.0 0.0 L 512.0 10.0 L 447.0 54.0 Z";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef(null);
  const isExitedRef = useRef(false);

  useEffect(() => {
    // 1. Session Storage & Bypass Query Check
    const urlParams = new URLSearchParams(window.location.search);
    const hasBypassParam = urlParams.has(PRELOADER_CONFIG.allowBypassQuery) || urlParams.has('preloader');
    const hasSeen = sessionStorage.getItem(PRELOADER_CONFIG.storageKey);

    if (hasSeen && !hasBypassParam) {
      return;
    }

    // 2. Lock scroll on both html and body to guarantee zero scrollbar/flicker
    document.documentElement.classList.add('anvi-preloader-active');
    document.body.classList.add('anvi-preloader-active');

    setIsVisible(true);
    startTimeRef.current = performance.now();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track page load
    let pageLoaded = document.readyState === 'complete';
    const handleLoad = () => { pageLoaded = true; };
    if (!pageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    // Trigger exit transition
    const triggerExit = () => {
      if (isExitedRef.current) return;
      isExitedRef.current = true;

      setProgress(100);
      setIsExiting(true);

      sessionStorage.setItem(PRELOADER_CONFIG.storageKey, 'true');

      // After vertical strips slide away, restore scroll and unmount
      setTimeout(() => {
        document.documentElement.classList.remove('anvi-preloader-active');
        document.body.classList.remove('anvi-preloader-active');
        setIsVisible(false);
      }, PRELOADER_CONFIG.exitAnimDuration);
    };

    if (prefersReducedMotion) {
      const timer = setTimeout(triggerExit, 1000);
      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove('anvi-preloader-active');
        document.body.classList.remove('anvi-preloader-active');
      };
    }

    // Smooth Progress Counter
    const progressInterval = setInterval(() => {
      if (!startTimeRef.current || isExitedRef.current) return;

      const elapsed = performance.now() - startTimeRef.current;
      const targetPercent = Math.min(100, Math.floor((elapsed / (PRELOADER_CONFIG.minDuration - 500)) * 100));

      setProgress((prev) => (targetPercent > prev ? targetPercent : prev));

      // Trigger exit when duration has elapsed AND page is loaded
      if (elapsed >= PRELOADER_CONFIG.minDuration && pageLoaded) {
        clearInterval(progressInterval);
        triggerExit();
      }
    }, 35);

    // 6.0s Safety Failsafe
    const failsafeTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      triggerExit();
    }, PRELOADER_CONFIG.failsafeDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(failsafeTimeout);
      window.removeEventListener('load', handleLoad);
      document.documentElement.classList.remove('anvi-preloader-active');
      document.body.classList.remove('anvi-preloader-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="anvi-preloader"
      className={`anvi-preloader-root ${isExiting ? 'is-exiting' : ''}`}
      aria-hidden={isExiting}
      role="dialog"
      aria-label="Loading ANVI GROUPS"
    >
      {/* 7 VERTICAL PANELS (RECREATING THE GLOSSY METAL/GLASS PANELS OF THE LOGO) */}
      <div className="anvi-panels-container" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`anvi-panel-strip anvi-panel-${i} ${i % 2 === 0 ? 'slide-up' : 'slide-down'}`}
            style={{
              ['--panel-delay']: `${i * 0.045}s`
            }}
          >
            {/* Soft vertical light streak inside each panel */}
            <div className={`anvi-panel-streak streak-${i}`} />
          </div>
        ))}
      </div>

      {/* EDGE VIGNETTE & MICRO GRAIN */}
      <div className="anvi-edge-vignette" />
      <div className="anvi-micro-grain" />

      {/* CENTER BRAND CONTENT STACK */}
      <div className="anvi-center-stack">
        {/* 1. AN Monogram Mark (Traced Real Logo SVG with Stroke Draw & Fill Animation) */}
        <svg
          className="anvi-brand-monogram"
          viewBox="0 0 1203 788"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ANVI Monogram Mark"
        >
          <path
            d={AN_MONOGRAM_PATH}
            pathLength="100"
            className="anvi-monogram-path"
          />
        </svg>

        {/* 2. ANVI GROUPS (Classic High-Contrast Bold Serif) */}
        <h1 className="anvi-brand-title">
          {PRELOADER_CONFIG.companyName}
        </h1>

        {/* 3. Top Thin Horizontal Line */}
        <div className="anvi-divider-line anvi-line-top" aria-hidden="true" />

        {/* 4. Subsidiary Names */}
        <div className="anvi-subsidiaries-wrap">
          <p className="anvi-subsidiary-name anvi-sub-1">
            {PRELOADER_CONFIG.subsidiary1}
          </p>
          <p className="anvi-subsidiary-name anvi-sub-2">
            {PRELOADER_CONFIG.subsidiary2}
          </p>
        </div>

        {/* 5. Bottom Thin Horizontal Line */}
        <div className="anvi-divider-line anvi-line-bottom" aria-hidden="true" />

        {/* 6. Optional Tagline (if provided) */}
        {PRELOADER_CONFIG.tagline ? (
          <p className="anvi-optional-tagline">
            {PRELOADER_CONFIG.tagline}
          </p>
        ) : null}
      </div>

      {/* 7. BOTTOM PROGRESS LINE & PERCENTAGE COUNTER */}
      <div className="anvi-bottom-progress">
        <div className="anvi-progress-line-track">
          <div
            className="anvi-progress-line-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="anvi-progress-counter">
          {progress.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
