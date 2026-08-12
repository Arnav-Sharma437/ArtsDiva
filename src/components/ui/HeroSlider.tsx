"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string;
  imageSrc: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  primaryButtonLabel?: string;
  primaryButtonLink?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.headline}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            <div className="hero-overlay">
              <div className="container">
                <div className="hero-eyebrow">{slide.eyebrow}</div>
                <h1 className="hero-headline uppercase">{slide.headline}</h1>
                <p className="hero-subheading font-light">{slide.subheading}</p>
                <div className="hero-buttons">
                  {slide.primaryButtonLabel && slide.primaryButtonLink && (
                    <Link href={slide.primaryButtonLink} className="btn btn-outline-white">
                      {slide.primaryButtonLabel}
                    </Link>
                  )}
                  {slide.secondaryButtonLabel && slide.secondaryButtonLink && (
                    <Link href={slide.secondaryButtonLink} className="btn btn-outline-white">
                      {slide.secondaryButtonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-pagination">
        {slides.map((_, index) => (
          index === currentSlide ? (
            <div key={index} className="pagination-circle font-medium">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
          ) : (
            <div 
              key={index} 
              className="dot" 
              onClick={() => setCurrentSlide(index)}
              style={{ cursor: "pointer" }}
            ></div>
          )
        ))}
      </div>
    </section>
  );
}
