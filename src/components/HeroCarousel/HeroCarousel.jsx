import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data/slidesData';

export default function HeroCarousel() {
  // Store ordered list of slide IDs [active, next1, next2, next3]
  const [slideOrder, setSlideOrder] = useState(heroSlides.map((s) => s.id));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandingData, setExpandingData] = useState(null);
  const [timerKey, setTimerKey] = useState(0);

  const containerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const touchStartX = useRef(0);

  // Active slide is first in order array
  const activeId = slideOrder[0];
  const activeSlide = heroSlides.find((s) => s.id === activeId) || heroSlides[0];

  // Queue slides are remaining slides in order array
  const queueSlides = slideOrder.slice(1).map((id) => heroSlides.find((s) => s.id === id));

  // The slide whose text should be displayed (smoothly hand off when expanding)
  const displayTextSlide = expandingData ? expandingData.slide : activeSlide;

  // Set transition lock with ref synchronization
  const setTransitionLock = (val) => {
    isTransitioningRef.current = val;
    setIsTransitioning(val);
  };

  // Start expanding a card to occupy the entire screen slowly and smoothly
  const startExpansion = useCallback(
    (targetId, cardIndex = 0) => {
      if (isTransitioningRef.current) return;
      setTransitionLock(true);

      const targetSlide = heroSlides.find((s) => s.id === targetId);
      if (!targetSlide) {
        setTransitionLock(false);
        return;
      }

      // Find the card element to get its exact starting coordinates
      const cards = containerRef.current?.querySelectorAll('.horizontal-preview-card');
      const cardEl = cards && cards[cardIndex] ? cards[cardIndex] : null;

      let rect = {
        top: window.innerHeight - 290,
        left: window.innerWidth - 300,
        width: 160,
        height: 248,
      };

      if (cardEl && containerRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const elRect = cardEl.getBoundingClientRect();
        rect = {
          top: elRect.top - cRect.top,
          left: elRect.left - cRect.left,
          width: elRect.width,
          height: elRect.height,
        };
      }

      setExpandingData({
        slide: targetSlide,
        rect,
        targetId,
      });
    },
    [heroSlides]
  );

  // Trigger expansion for the front "NEXT" card
  const triggerNext = useCallback(() => {
    if (isTransitioningRef.current || queueSlides.length === 0) return;
    startExpansion(queueSlides[0].id, 0);
  }, [queueSlides, startExpansion]);

  // When card finishes expanding to 100vw x 100vh
  const handleExpansionComplete = () => {
    if (!expandingData) return;
    const targetId = expandingData.slide.id;
    const targetIdx = slideOrder.indexOf(targetId);

    if (targetIdx > 0) {
      setSlideOrder((prev) => [...prev.slice(targetIdx), ...prev.slice(0, targetIdx)]);
    }

    setExpandingData(null);
    setTransitionLock(false);
    setTimerKey((k) => k + 1);
  };

  // Move back to previous slide smoothly
  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    setTransitionLock(true);

    const prevId = slideOrder[slideOrder.length - 1];
    setSlideOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setTimerKey((k) => k + 1);

    setTimeout(() => {
      setTransitionLock(false);
    }, 800);
  }, [slideOrder]);

  // Select specific slide from queue
  const handleSelectSlide = (targetId, idx) => {
    if (isTransitioningRef.current) return;
    startExpansion(targetId, idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        triggerNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, triggerNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) triggerNext();
      else handlePrev();
    }
  };

  return (
    <div
      ref={containerRef}
      className="hero-carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ACTIVE FULL-SCREEN HERO VIEWPORT */}
      <div className="active-hero-viewport">
        {/* BASE BACKGROUND IMAGE */}
        <div className="active-hero-image-wrapper">
          <img
            src={activeSlide.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/${activeSlide.id}.webp`;
            }}
            alt={activeSlide.title}
            className="active-hero-image"
          />
          <div className="hero-dark-overlay" />
        </div>

        {/* EXPANDING CARD LAYER (EXPANDS SMOOTHLY AND SLOWLY TO OCCUPY THE ENTIRE SCREEN) */}
        {expandingData && (
          <motion.div
            key={`expanding-${expandingData.slide.id}`}
            className="expanding-card-layer"
            initial={{
              top: expandingData.rect.top,
              left: expandingData.rect.left,
              width: expandingData.rect.width,
              height: expandingData.rect.height,
              borderRadius: '4px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
            }}
            animate={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={handleExpansionComplete}
          >
            <img
              src={expandingData.slide.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/${expandingData.slide.id}.webp`;
              }}
              alt={expandingData.slide.title}
              className="active-hero-image"
            />
            <motion.div
              className="hero-dark-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}

        {/* HERO TEXT OVERLAY (BOTTOM LEFT) */}
        <div className="hero-text-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTextSlide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hero-text-inner"
            >
              <div className="hero-subtitle-badge">
                <span>{displayTextSlide.subtitle}</span>
              </div>
              <h1 className="hero-heading">{displayTextSlide.title}</h1>
              <p className="hero-description">{displayTextSlide.description}</p>
              {displayTextSlide.url ? (
                <a
                  href={displayTextSlide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-outline-btn"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>{displayTextSlide.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ) : (
                <button
                  className="hero-cta-outline-btn"
                  onClick={() => {
                    const nextSection =
                      document.querySelector('.intro-section') ||
                      document.querySelector('.vela-section-container');
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span>{displayTextSlide.cta}</span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HORIZONTAL CARDS QUEUE ROW (BOTTOM RIGHT) */}
        <div className="horizontal-preview-container">
          <div className="horizontal-preview-row">
            {queueSlides.map((slide, index) => {
              const isThisCardExpanding =
                expandingData && expandingData.targetId === slide.id;

              return (
                <motion.button
                  key={slide.id}
                  layout
                  onClick={() => handleSelectSlide(slide.id, index)}
                  className={`horizontal-preview-card ${index === 0 ? 'front-card' : ''}`}
                  style={{
                    opacity: isThisCardExpanding ? 0 : 1,
                    pointerEvents: isThisCardExpanding || isTransitioning ? 'none' : 'auto',
                  }}
                  initial={{ opacity: 0.85, y: 20 }}
                  animate={{ opacity: isThisCardExpanding ? 0 : 1, y: 0 }}
                  whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  aria-label={`Switch to ${slide.title}`}
                >
                  <img
                    src={slide.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/${slide.id}.webp`;
                    }}
                    alt={slide.title}
                    className="portrait-card-img"
                  />
                  <div className="portrait-card-overlay">
                    {slide.tag === 'Coming Soon' && (
                      <span className="coming-soon-badge">COMING SOON</span>
                    )}
                    {index === 0 && slide.tag !== 'Coming Soon' && (
                      <span className="front-card-badge">NEXT</span>
                    )}
                    <span className="portrait-card-tag">{slide.subtitle}</span>
                    <span className="portrait-card-title">{slide.title}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* CONTROLS & STRICTLY FORWARD-MOVING WHITE TIMER LINE */}
          <div className="bottom-right-controls">
            <div className="hero-progress-line-track">
              <div
                key={timerKey}
                className={`hero-progress-line-fill ${isTransitioning ? 'idle' : 'running'}`}
                onAnimationEnd={() => {
                  if (!isTransitioningRef.current) {
                    triggerNext();
                  }
                }}
              />
            </div>
            <div className="hero-arrow-btns">
              <button
                onClick={handlePrev}
                className="hero-circle-btn"
                aria-label="Previous slide"
                disabled={isTransitioning}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={triggerNext}
                className="hero-circle-btn"
                aria-label="Next slide"
                disabled={isTransitioning}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
