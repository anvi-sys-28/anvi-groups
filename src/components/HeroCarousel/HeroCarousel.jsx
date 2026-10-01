import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../../data/slidesData';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const activeSlide = heroSlides[activeIndex];
  const inactiveSlides = heroSlides.filter((_, idx) => idx !== activeIndex);

  // Autoplay functionality (7 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSelectSlide = (id) => {
    const targetIdx = heroSlides.findIndex((s) => s.id === id);
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
    }
  };

  // Touch handlers for mobile swipe
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
      {/* ACTIVE FULL-SCREEN HERO SLIDE */}
      <div className="active-hero-viewport">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0.4, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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

        {/* HERO TEXT OVERLAY */}
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
              <div className="hero-tag-badge">
                <span>{activeSlide.subtitle}</span>
                <span className="dot">•</span>
                <span>{activeSlide.tag}</span>
              </div>
              <h1 className="hero-heading">{activeSlide.title}</h1>
              <p className="hero-description">{activeSlide.description}</p>
              <button className="hero-cta-btn">
                <span>{activeSlide.cta}</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PREVIEW CARDS - DESKTOP SIDE STACK */}
        <div className="desktop-preview-stack">
          {inactiveSlides.map((slide, idx) => (
            <motion.button
              key={slide.id}
              layoutId={`preview-card-${slide.id}`}
              onClick={() => handleSelectSlide(slide.id)}
              className="preview-card-item"
              initial={{ opacity: 0.8, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.04, filter: 'brightness(1.15)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`Switch to slide ${slide.title}`}
            >
              <img src={slide.image} alt={slide.title} className="preview-card-img" />
              <div className="preview-card-overlay">
                <span className="preview-card-subtitle">{slide.subtitle}</span>
                <span className="preview-card-title">{slide.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* BOTTOM CONTROLS & PROGRESS INDICATOR */}
        <div className="hero-controls-bar">
          <div className="hero-progress-group">
            <span className="slide-counter-current">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="slide-progress-track">
              <motion.div
                className="slide-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + 1) / heroSlides.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <span className="slide-counter-total">
              {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="hero-arrow-btns">
            <button
              onClick={handlePrev}
              className="hero-arrow-btn"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="hero-arrow-btn"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE HORIZONTAL SCROLLABLE PREVIEW CARDS */}
      <div className="mobile-preview-row">
        {inactiveSlides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => handleSelectSlide(slide.id)}
            className="mobile-preview-card"
          >
            <img src={slide.image} alt={slide.title} />
            <div className="mobile-preview-info">
              <span className="m-sub">{slide.subtitle}</span>
              <span className="m-title">{slide.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
