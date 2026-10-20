import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';

/* ========================================================================== */
/* EDITABLE PRELOADER CONFIGURATION CONSTANTS                                 */
/* ========================================================================== */
export const PRELOADER_CONFIG = {
  // Brand Content
  companyName: "ANVI GROUPS",
  tagline: "STEWARDSHIP · INTEGRITY · GLOBAL COMMERCE",

  // Timing (in milliseconds)
  minDuration: 3500,      // Total sequence duration (~3.5s)
  failsafeDuration: 6000, // Maximum timeout before forced exit (6.0s)
  exitAnimDuration: 950,  // Two-panel split slide duration (0.95s)

  // Colors
  primaryGold: "#C9A24B",
  warmIvory: "#F4EEDC",
  deepEmerald: "#04140e",

  // Session Storage & Testing
  storageKey: "anvi_groups_preloader_seen_v2",
  allowBypassQuery: "intro" // Append ?intro=1 or ?intro to URL to re-trigger anytime
};

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

    // 2. Lock scroll on html and body to prevent scrollbar flicker
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

      // After panels slide away, restore scroll and unmount from DOM
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
      const targetPercent = Math.min(100, Math.floor((elapsed / (PRELOADER_CONFIG.minDuration - 600)) * 100));

      setProgress((prev) => (targetPercent > prev ? targetPercent : prev));

      // Trigger exit when duration has elapsed AND page is loaded
      if (elapsed >= PRELOADER_CONFIG.minDuration && pageLoaded) {
        clearInterval(progressInterval);
        triggerExit();
      }
    }, 35);

    // 6s Safety Failsafe
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
      {/* TWO SPLIT PANELS FOR CALM SHUTTER REVEAL */}
      <div className="preloader-shutter-panel preloader-shutter-top" />
      <div className="preloader-shutter-panel preloader-shutter-bottom" />

      {/* STATIC SOFT VIGNETTE & MICRO NOISE OVERLAY */}
      <div className="preloader-vignette" />
      <div className="preloader-noise-grain" />

      {/* CENTER BRAND CARD */}
      <div className="preloader-stage">
        {/* Growing vertical line that expands horizontally */}
        <div className="preloader-reveal-line-v" aria-hidden="true" />
        <div className="preloader-reveal-line-h" aria-hidden="true" />

        {/* Company Name in Classic High-Contrast Serif */}
        <h1 className="preloader-brand-title">
          {PRELOADER_CONFIG.companyName}
        </h1>

        {/* Subtle Diamond Accent Divider */}
        <div className="preloader-diamond-wrap" aria-hidden="true">
          <div className="preloader-diamond" />
        </div>

        {/* Minimal Wide-Spaced Tagline */}
        <p className="preloader-brand-tagline">
          {PRELOADER_CONFIG.tagline}
        </p>
      </div>

      {/* BOTTOM CENTER THIN PROGRESS LINE & PERCENTAGE */}
      <div className="preloader-bottom-bar">
        <div className="preloader-progress-track">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="preloader-percentage-text">
          {progress.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
