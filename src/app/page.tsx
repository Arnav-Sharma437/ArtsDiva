import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";
import dbConnect from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import Artwork from "@/models/Artwork";
import Event from "@/models/Event";
import Publication from "@/models/Publication";

export default async function Home() {
  await dbConnect();

  // Fetch data (using Mongoose lean() to serialize)
  const exhibitions = await Exhibition.find({}).sort({ startDate: 1 }).limit(8).lean();
  const artworks = await Artwork.find({ isFeatured: true }).populate('artistId', 'name').limit(8).lean();
  const events = await Event.find({}).sort({ eventDate: 1 }).limit(8).lean();
  const publications = await Publication.find({}).sort({ publishedAt: -1 }).limit(8).lean();

  const heroSlides = [
    {
      id: "1",
      imageSrc: "/assets/images/hero_bg.jpg",
      eyebrow: "Featured Collection - Contemporary Art - Worldwide",
      headline: "CURATED MASTERPIECES",
      subheading: "A Journey Through Timeless Expression",
      primaryButtonLabel: "Browse Catalogue",
      primaryButtonLink: "/catalogue",
      secondaryButtonLabel: "Enquire About Leasing",
      secondaryButtonLink: "/leasing",
    },
    {
      id: "2",
      imageSrc: "/assets/images/split_2.jpg",
      eyebrow: "Exclusive Collections - Classical Art - Worldwide",
      headline: "ELEVATE YOUR SPACE",
      subheading: "Museum Quality Artwork for Your Interior",
      primaryButtonLabel: "Browse Catalogue",
      primaryButtonLink: "/catalogue",
    },
    {
      id: "3",
      imageSrc: "/assets/images/split_3.jpg",
      eyebrow: "Modern Sculptures - Abstract Forms",
      headline: "DIMENSIONAL ART",
      subheading: "Explore Shape and Form",
      primaryButtonLabel: "Discover Sculptures",
      primaryButtonLink: "/catalogue?category=sculpture",
    }
  ];

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Forthcoming Exhibitions */}
      <section className="section-padding container mx-auto px-4 mt-16">
        <div className="section-header flex justify-between items-end mb-8">
          <div className="section-header-left">
            <h2 className="section-title uppercase font-light text-3xl mb-0">Forthcoming Exhibitions</h2>
            <div className="title-divider w-12 h-px bg-black my-4"></div>
            <Link href="/exhibitions" className="link-arrow uppercase flex items-center gap-2 text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="carousel-controls plain-arrows flex items-center gap-4">
            <button className="plain-btn" aria-label="Previous"><ChevronLeft size={18} /></button>
            <span className="uppercase font-medium">1 / {exhibitions.length || 8}</span>
            <button className="plain-btn" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
        
        <div className="slider-container overflow-hidden">
          <div className="slider-track flex gap-6">
            {exhibitions.length > 0 ? exhibitions.map((ex: any) => (
              <article key={ex._id.toString()} className="card flex-none w-[300px]">
                <div className="card-image aspect-[4/3] relative mb-4">
                  <Image src={ex.coverImageUrl || "/assets/images/exhibition_1.jpg"} alt={ex.title} fill className="object-cover" />
                </div>
                <h3 className="card-title font-regular uppercase text-lg mb-1">{ex.title}</h3>
                <p className="card-meta font-light text-muted uppercase text-xs mb-2">{ex.location}</p>
                <p className="card-desc uppercase font-light text-sm">{ex.city}, {ex.country}</p>
              </article>
            )) : (
              // Fallbacks if no data
              Array(4).fill(0).map((_, i) => (
                <article key={i} className="card flex-none w-[300px]">
                  <div className="card-image aspect-[4/3] relative mb-4 bg-gray-200">
                    <Image src={`/assets/images/exhibition_${(i % 4) + 1}.jpg`} alt="Exhibition" fill className="object-cover" />
                  </div>
                  <h3 className="card-title font-regular uppercase text-lg mb-1">Exhibition Title</h3>
                  <p className="card-meta font-light text-muted uppercase text-xs mb-2">Gallery Location</p>
                  <p className="card-desc uppercase font-light text-sm">City, Country</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Split Section 1 */}
      <section className="section-padding container mx-auto px-4 my-16">
        <div className="split-section flex flex-col md:flex-row gap-12 items-center">
          <div className="split-content md:w-1/2">
            <h2 className="uppercase text-3xl font-light leading-tight mb-6">EMPOWERING ARTISTS, INSPIRING COLLECTORS</h2>
            <p className="text-gray-600 mb-8">ArtsDiva is a premier global platform dedicated to bridging the gap between extraordinary artistic talent and discerning art lovers. We specialize in curating an exclusive collection of fine art...</p>
            <Link href="/about" className="link-arrow uppercase flex items-center gap-2 text-sm">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="split-image md:w-1/2 relative aspect-[4/3]">
            <Image src="/assets/images/split_1.jpg" alt="Artist at work" fill className="object-cover" />
          </div>
        </div>
      </section>
      
      {/* Feature Section with CTA */}
      <section className="container mx-auto px-4 my-16">
        <div className="cta-banner text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl uppercase tracking-wider mb-4">DISCOVER & COLLECT EXCEPTIONAL ART WITH ARTSDIVA</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">Explore a curated collection of exceptional artworks from renowned and emerging artists, available for acquisition and annual leasing worldwide.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="cta-card text-left bg-gray-50">
              <div className="relative aspect-[16/10]">
                <Image src="/assets/images/split_3.jpg" alt="For Clients" fill className="object-cover" />
              </div>
              <div className="p-8">
                <h3 className="text-lg uppercase mb-4">FOR CLIENTS</h3>
                <p className="text-sm text-gray-600 mb-6">Access a curated collection of exceptional artworks for acquisition or annual leasing, tailored to elevate residential, commercial, and hospitality spaces.</p>
                <Link href="/catalogue" className="flex items-center gap-2 text-sm font-medium">
                  Buy Art Online <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="cta-card text-left bg-gray-50">
              <div className="relative aspect-[16/10]">
                <Image src="/assets/images/split_1.jpg" alt="For Artists" fill className="object-cover" />
              </div>
              <div className="p-8">
                <h3 className="text-lg uppercase mb-4">FOR ARTISTS</h3>
                <p className="text-sm text-gray-600 mb-6">Showcase your artwork to collectors, businesses, and designers through a curated platform built to expand your reach and opportunities.</p>
                <Link href="/contact" className="flex items-center gap-2 text-sm font-medium">
                  Sell Your Art <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
