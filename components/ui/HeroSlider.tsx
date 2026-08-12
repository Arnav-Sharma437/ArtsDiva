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
    <section className="hero relative h-[90vh] overflow-hidden">
      <div className="hero-slider h-full w-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.imageSrc}
                alt={slide.headline}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
            <div className="hero-overlay absolute inset-0 bg-black/40 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <div className="hero-eyebrow text-sm uppercase tracking-widest mb-2 opacity-90">{slide.eyebrow}</div>
                <h1 className="hero-headline uppercase text-5xl md:text-7xl font-bold mb-4 tracking-widest">{slide.headline}</h1>
                <p className="hero-subheading font-light text-xl mb-8 opacity-90">{slide.subheading}</p>
                <div className="hero-buttons flex gap-4">
                  {slide.primaryButtonLabel && slide.primaryButtonLink && (
                    <Link href={slide.primaryButtonLink} className="border border-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors">
                      {slide.primaryButtonLabel}
                    </Link>
                  )}
                  {slide.secondaryButtonLabel && slide.secondaryButtonLink && (
                    <Link href={slide.secondaryButtonLink} className="border border-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors">
                      {slide.secondaryButtonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer transition-all ${
              index === currentSlide
                ? "text-white font-medium text-lg"
                : "w-2 h-2 rounded-full bg-white/50 hover:bg-white/80"
            }`}
          >
            {index === currentSlide ? (index + 1 < 10 ? `0${index + 1}` : index + 1) : ""}
          </div>
        ))}
      </div>
    </section>
  );
}
