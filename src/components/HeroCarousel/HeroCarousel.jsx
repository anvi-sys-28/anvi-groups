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
              <p className="hero-tags">#{activeSlide.subtitle.replace(/\s+/g, '')} #{activeSlide.tag.replace(/\s+/g, '')}</p>
              <p className="hero-description">{activeSlide.description}</p>
              <button className="hero-cta-outline-btn">
                <span>{activeSlide.cta}</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HORIZONTAL PREVIEW CARDS ROW (BOTTOM RIGHT) */}
        <div className="horizontal-preview-container">
          <div className="horizontal-preview-row">
            {inactiveSlides.map((slide) => (
              <motion.button
                key={slide.id}
                layoutId={`preview-card-${slide.id}`}
                onClick={() => handleSelectSlide(slide.id)}
                className="horizontal-preview-card"
                initial={{ opacity: 0.85, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, filter: 'brightness(1.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Switch to slide ${slide.title}`}
              >
                <img src={slide.image} alt={slide.title} className="portrait-card-img" />
                <div className="portrait-card-overlay">
                  <span className="portrait-card-tag">{slide.subtitle}</span>
                  <span className="portrait-card-title">{slide.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CONTROLS BELOW CARDS ON BOTTOM RIGHT */}
          <div className="bottom-right-controls">
            <div className="hero-progress-line-track">
              <motion.div
                className="hero-progress-line-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + 1) / heroSlides.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
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
