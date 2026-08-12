"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface MarqueeSliderProps {
  children: ReactNode;
  direction?: 1 | -1; // 1 for left, -1 for right
  speed?: number;
}

export default function MarqueeSlider({ children, direction = 1, speed = 1.5 }: MarqueeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let animationFrameId: number;

    const tick = () => {
      if (!isPaused) {
        const halfWidth = track.scrollWidth / 2;
        position += speed * direction;

        if (direction === 1) {
          // Moving left
          if (position >= halfWidth) {
            position -= halfWidth;
          }
        } else {
          // Moving right
          if (position <= 0) {
            position += halfWidth;
          }
        }
        track.scrollLeft = position;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    // Initial position setup for right-moving marquee
    if (direction === -1) {
      setTimeout(() => {
        position = track.scrollWidth / 2;
        track.scrollLeft = position;
      }, 100);
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, direction, speed]);

  return (
    <div 
      className="slider-container"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider-track" ref={trackRef}>
        {/* Render children twice for seamless looping */}
        {children}
        {children}
      </div>
    </div>
  );
}
