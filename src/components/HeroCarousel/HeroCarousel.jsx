import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data/slidesData';

const SLIDE_DURATION = 7; // 7 seconds per slide

export default function HeroCarousel() {
  // Store ordered list of slide IDs [active, next1, next2, next3, next4]
  const [slideOrder, setSlideOrder] = useState(heroSlides.map((s) => s.id));
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Active slide is first in order array
  const activeId = slideOrder[0];
  const activeSlide = heroSlides.find((s) => s.id === activeId);

  // Queue slides are remaining 4 slides in order array
  const queueSlides = slideOrder.slice(1).map((id) => heroSlides.find((s) => s.id === id));

  // Advance to next slide in queue loop
  const handleNext = () => {
    setSlideOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  // Move back to previous slide in queue loop
  const handlePrev = () => {
    setSlideOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
  };

  // Select specific slide from queue
  const handleSelectSlide = (targetId) => {
    const targetIdx = slideOrder.indexOf(targetId);
    if (targetIdx > 0) {
      setSlideOrder((prev) => [...prev.slice(targetIdx), ...prev.slice(0, targetIdx)]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div
      className="hero-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ACTIVE FULL-SCREEN HERO VIEWPORT */}
      <div className="active-hero-viewport">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.id}
            layoutId={`slide-media-${activeSlide.id}`}
            initial={{ opacity: 0.6, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="active-hero-image-wrapper"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="active-hero-image"
            />
            <div className="hero-dark-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* HERO TEXT OVERLAY (BOTTOM LEFT) */}
        <div className="hero-text-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hero-text-inner"
            >
              <h1 className="hero-heading">{activeSlide.title}</h1>
              <p className="hero-tags">
                #{activeSlide.subtitle.replace(/\s+/g, '')} #{activeSlide.tag.replace(/\s+/g, '')}
              </p>
              <p className="hero-description">{activeSlide.description}</p>
              <button className="hero-cta-outline-btn">
                <span>{activeSlide.cta}</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HORIZONTAL CARDS QUEUE ROW (BOTTOM RIGHT) */}
        <div className="horizontal-preview-container">
          <div className="horizontal-preview-row">
            {queueSlides.map((slide, index) => (
              <motion.button
                key={slide.id}
                layout
                layoutId={`slide-media-${slide.id}`}
                onClick={() => handleSelectSlide(slide.id)}
                className={`horizontal-preview-card ${index === 0 ? 'front-card' : ''}`}
                initial={{ opacity: 0.8, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06, filter: 'brightness(1.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Switch to ${slide.title}`}
              >
                <img src={slide.image} alt={slide.title} className="portrait-card-img" />
                <div className="portrait-card-overlay">
                  {index === 0 && <span className="front-card-badge">NEXT</span>}
                  <span className="portrait-card-tag">{slide.subtitle}</span>
                  <span className="portrait-card-title">{slide.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CONTROLS & CONTINUOUS FILLING PROGRESS LINE */}
          <div className="bottom-right-controls">
            <div className="hero-progress-line-track">
              <motion.div
                key={activeId}
                className="hero-progress-line-fill"
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '0%' : '100%' }}
                transition={{
                  duration: SLIDE_DURATION,
                  ease: 'linear'
                }}
                onAnimationComplete={() => {
                  if (!isPaused) {
                    handleNext();
                  }
                }}
              />
            </div>
            <div className="hero-arrow-btns">
              <button
                onClick={handlePrev}
                className="hero-circle-btn"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="hero-circle-btn"
                aria-label="Next slide"
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
