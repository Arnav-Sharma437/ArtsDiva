import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/ui/HeroSlider";
import MarqueeSlider from "@/components/ui/MarqueeSlider";
import dbConnect from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import Event from "@/models/Event";
import Publication from "@/models/Publication";

export default async function Home() {
  await dbConnect();

  // Fetch data (using Mongoose lean() to serialize)
  let exhibitions = await Exhibition.find({}).sort({ startDate: 1 }).limit(8).lean();
  let events = await Event.find({}).sort({ eventDate: 1 }).limit(8).lean();
  let publications = await Publication.find({}).sort({ publishedAt: -1 }).limit(8).lean();

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
    },
    {
      id: "4",
      imageSrc: "/assets/images/exhibition_1.jpg",
      eyebrow: "Photography - Black and White",
      headline: "CAPTURED MOMENTS",
      subheading: "The World Through a Lens",
      primaryButtonLabel: "View Photography",
      primaryButtonLink: "/catalogue",
    },
    {
      id: "5",
      imageSrc: "/assets/images/exhibition_2.jpg",
      eyebrow: "Mixed Media - Textured Canvas",
      headline: "TACTILE EXPRESSIONS",
      subheading: "Art You Can Feel",
      primaryButtonLabel: "Browse Collection",
      primaryButtonLink: "/catalogue",
    },
    {
      id: "6",
      imageSrc: "/assets/images/split_1.jpg",
      eyebrow: "Emerging Artists - Global Talent",
      headline: "NEW VOICES",
      subheading: "Discover the Next Generation",
      primaryButtonLabel: "Meet the Artists",
      primaryButtonLink: "/catalogue",
    },
    {
      id: "7",
      imageSrc: "/assets/images/hero_bg.jpg",
      eyebrow: "Digital Art - Immersive Experience",
      headline: "VIRTUAL REALMS",
      subheading: "The Future of Digital Creation",
      primaryButtonLabel: "Enter the Gallery",
      primaryButtonLink: "/catalogue",
    },
    {
      id: "8",
      imageSrc: "/assets/images/split_2.jpg",
      eyebrow: "Private Viewing - VIP Access",
      headline: "EXCLUSIVE SHOWCASES",
      subheading: "Reserve Your Private Tour",
      primaryButtonLabel: "Book Appointment",
      primaryButtonLink: "/catalogue",
    }
  ];

  // Dummy Fallbacks if DB is empty (so sections aren't blank)
  if (exhibitions.length === 0) {
    exhibitions = [
      { _id: "e1", title: "Abstract Horizons", location: "Contemporary Abstract Painting", coverImage: "/assets/images/exhibition_1.jpg", city: "New Delhi", country: "India", startDate: "2026-09-15", endDate: "2026-12-20" },
      { _id: "e2", title: "Echoes of Light", location: "Oil on Canvas Collection", coverImage: "/assets/images/exhibition_2.jpg", city: "Milan", country: "Italy", startDate: "2026-10-01", endDate: "2027-01-15" },
      { _id: "e3", title: "Urban Expressions", location: "Contemporary Mixed Media", coverImage: "/assets/images/exhibition_3.jpg", city: "New York", country: "USA", startDate: "2026-09-20", endDate: "2026-12-10" },
      { _id: "e4", title: "Nature In Motion", location: "Landscape Fine Art Collection", coverImage: "/assets/images/exhibition_4.jpg", city: "Paris", country: "France", startDate: "2026-10-05", endDate: "2027-01-18" },
    ];
  }

  if (events.length === 0) {
    events = [
      { _id: "ev1", title: "Exclusive Art Acquisition Evening", coverImage: "/assets/images/split_1.jpg", eventDate: "2026-10-10", startTime: "7:00 PM", endTime: "9:30 PM", location: "Singapore" },
      { _id: "ev2", title: "The Future of Contemporary Art", coverImage: "/assets/images/split_2.jpg", eventDate: "2026-10-17", startTime: "3:00 PM", endTime: "5:00 PM", location: "New York, USA" },
      { _id: "ev3", title: "Artist Walkthrough: Jeffrey Gibson Flags", coverImage: "/assets/images/exhibition_1.jpg", eventDate: "2026-10-10", startTime: "7:00 PM", endTime: "9:30 PM", location: "Singapore" },
      { _id: "ev4", title: "Artist Walkthrough: Jeffrey Gibson Flags", coverImage: "/assets/images/exhibition_2.jpg", eventDate: "2026-10-10", startTime: "7:00 PM", endTime: "9:30 PM", location: "Singapore" },
    ];
  }

  if (publications.length === 0) {
    publications = [
      { _id: "p1", title: "The Two Fridas", artistId: { name: "FRIDA KAHLO" }, coverImage: "/assets/images/frida_kahlo_two.jpg", excerpt: "Two seated figures, joined by a single visible artery and shared heart, form Frida Kahlo's iconic double self-portrait." },
      { _id: "p2", title: "Self-Portrait with Monkey", artistId: { name: "FRIDA KAHLO" }, coverImage: "/assets/images/exhibition_2.jpg", excerpt: "A woman in a red headwrap and golden top gazes directly at the viewer, a small monkey resting near her shoulder..." },
      { _id: "p3", title: "Galloping Horse in Red", artistId: { name: "M.F. HUSAIN" }, coverImage: "/assets/images/exhibition_1.jpg", excerpt: "A single white horse, rendered in bold, fractured brushstrokes, gallops across a deep red background." },
      { _id: "p4", title: "Herd of Horses", artistId: { name: "M.F. HUSAIN" }, coverImage: "/assets/images/husain_herd.jpg", excerpt: "Six horses in white, yellow, blue, orange, and cream surge forward in a tightly interlocked composition." },
    ];
  }

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Forthcoming Exhibitions */}
      <section className="section-padding container">
        <div className="section-header">
          <div className="section-header-left">
            <h2 className="section-title uppercase font-light" style={{ marginBottom: 0 }}>Forthcoming Exhibitions</h2>
            <div className="title-divider"></div>
            <Link href="/exhibitions" className="link-arrow uppercase">
              View All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          <div className="carousel-controls plain-arrows">
            <button className="plain-btn" aria-label="Previous"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <span className="uppercase font-medium" style={{ margin: "0 10px" }}>1 / {exhibitions.length}</span>
            <button className="plain-btn" aria-label="Next"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
        
        <MarqueeSlider direction={1} speed={1.5}>
          {exhibitions.map((ex: any) => (
            <article key={ex._id.toString()} className="card">
              <div className="card-image">
                <Image src={ex.coverImage || "/assets/images/exhibition_1.jpg"} alt={ex.title} fill style={{objectFit: "cover"}} />
              </div>
              <h3 className="card-title font-regular uppercase">{ex.title}</h3>
              <p className="card-meta font-light text-muted uppercase">{ex.location}</p>
              <p className="card-desc uppercase font-light">
                {new Date(ex.startDate).toLocaleDateString()} — {new Date(ex.endDate).toLocaleDateString()}<br/>
                {ex.city}, {ex.country}
              </p>
            </article>
          ))}
        </MarqueeSlider>
      </section>

      {/* Split Section 1 */}
      <section className="section-padding container">
        <div className="split-section split-left-flush" style={{ alignItems: "center" }}>
          <div className="split-image relative" style={{ minHeight: "400px" }}>
            <Image src="/assets/images/split_1.jpg" alt="Artist mixing paint" fill style={{objectFit: "cover"}} />
          </div>
          <div className="split-content">
            <h2 style={{ fontWeight: 400, fontSize: "28px", lineHeight: "1.3" }} className="uppercase">CURATED ART FOR EVERY<br/>SPACE</h2>
            <p className="p2" style={{ color: "#666", marginBottom: "30px !important" }}>
              Bring timeless creativity into homes, hotels, offices, and luxury interiors with our exclusive collection of fine art. Every artwork is thoughtfully selected to inspire, elevate, and create lasting impressions.
            </p>
            <Link href="/catalogue" className="link-arrow" style={{ fontWeight: 400, fontSize: "14px", textTransform: "none" }}>
              Explore Collection <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Forthcoming Events */}
      <section className="section-padding container">
        <div className="section-header">
          <div className="section-header-left">
            <h2 className="section-title uppercase font-light" style={{ marginBottom: 0 }}>Forthcoming Events</h2>
            <div className="title-divider"></div>
            <Link href="/events" className="link-arrow uppercase">
              View All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          <div className="carousel-controls plain-arrows">
            <button className="plain-btn" aria-label="Previous"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <span className="uppercase font-medium" style={{ margin: "0 10px" }}>1 / {events.length}</span>
            <button className="plain-btn" aria-label="Next"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
        
        <MarqueeSlider direction={-1} speed={1.5}>
          {events.map((ev: any) => (
            <article key={ev._id.toString()} className="card event-card">
              <div className="card-image relative" style={{ height: "200px" }}>
                <Image src={ev.coverImage || "/assets/images/split_1.jpg"} alt={ev.title} fill style={{objectFit: "cover"}} />
              </div>
              <div className="event-card-content">
                <h3 className="card-title font-light">{ev.title}</h3>
                <div className="icon-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>{new Date(ev.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="icon-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>{ev.startTime} – {ev.endTime}</span>
                </div>
                <div className="icon-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>{ev.location}</span>
                </div>
              </div>
            </article>
          ))}
        </MarqueeSlider>
      </section>

      {/* Split Section 2 */}
      <section className="section-padding bg-secondary container">
        <div className="split-section split-right-flush reversed" style={{ alignItems: "center" }}>
          <div className="split-image relative" style={{ minHeight: "400px" }}>
            <Image src="/assets/images/split_2.jpg" alt="Museum gallery" fill style={{objectFit: "cover"}} />
          </div>
          <div className="split-content">
            <h2 style={{ fontWeight: 400, fontSize: "28px", lineHeight: "1.3" }} className="uppercase">FINE ART ACQUISITION &<br/>ANNUAL LEASING</h2>
            <p className="p2" style={{ color: "#666", marginBottom: "30px !important" }}>
              ArtsDiva connects collectors, designers, and businesses with exceptional artworks through flexible acquisition and leasing solutions. Discover museum-quality collections curated to complement every environment.
            </p>
            <Link href="/catalogue" className="link-arrow" style={{ fontWeight: 400, fontSize: "14px", textTransform: "none" }}>
              Browse Catalogue <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left" style={{ alignItems: "center", gap: "20px" }}>
              <h2 className="section-title uppercase" style={{ marginBottom: "0 !important", fontWeight: 400, fontSize: "30px" }}>PUBLICATIONS</h2>
              <div className="title-divider" style={{ height: "20px", width: "1px", backgroundColor: "#ddd" }}></div>
              <Link href="/publications" className="link-arrow" style={{ fontWeight: 400, fontSize: "13px", textTransform: "none", color: "var(--text-main)" }}>
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
            <div className="carousel-controls arrow-only-controls" style={{ display: "flex", alignItems: "center", gap: "15px", fontSize: "13px", color: "var(--text-muted)" }}>
              <button className="arrow-btn" aria-label="Previous" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-main)", padding: "5px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <span style={{ minWidth: "35px", textAlign: "center" }}>1 / {publications.length}</span>
              <button className="arrow-btn" aria-label="Next" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-main)", padding: "5px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
          </div>
          
          <MarqueeSlider direction={1} speed={1.5}>
            {publications.map((pub: any) => (
              <article key={pub._id.toString()} className="card publication-card">
                <div className="card-image square relative" style={{ marginBottom: "25px" }}>
                  <Image src={pub.coverImage || "/assets/images/frida_kahlo_two.jpg"} alt={pub.title} fill style={{ objectFit: "cover", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }} />
                </div>
                {pub.artistId && <p className="card-meta uppercase" style={{ marginBottom: "15px !important", fontSize: "13px", fontWeight: 400, color: "#555", borderBottom: "1px solid #eaeaea", paddingBottom: "15px" }}>{pub.artistId.name}</p>}
                <h3 className="card-title" style={{ fontWeight: 400, fontSize: "20px", marginBottom: "12px !important", color: "#111" }}>{pub.title}</h3>
                <p className="card-desc" style={{ fontSize: "13px", color: "#666", marginBottom: "20px !important", lineHeight: "1.5" }}>{pub.excerpt}</p>
                <Link href={`/publications/${pub.slug}`} className="link-arrow" style={{ fontSize: "13px", fontWeight: 400, textTransform: "none" }}>
                  Read More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </article>
            ))}
          </MarqueeSlider>
        </div>
      </section>

      {/* Split Section 3 */}
      <section className="section-padding container">
        <div className="split-section split-left-flush" style={{ alignItems: "center" }}>
          <div className="split-image relative" style={{ minHeight: "400px" }}>
            <Image src="/assets/images/split_3.jpg" alt="Gallery wall" fill style={{objectFit: "cover"}} />
          </div>
          <div className="split-content">
            <h2 className="uppercase" style={{ fontWeight: 400, fontSize: "28px", lineHeight: "1.3" }}>CURATED COLLECTIONS FOR MODERN INTERIORS</h2>
            <p className="p2" style={{ color: "#666", marginBottom: "30px !important" }}>
              From statement pieces to cohesive gallery walls, our expert advisors work closely with interior designers and collectors to source the perfect artworks for luxury residential and commercial projects worldwide.
            </p>
            <Link href="/catalogue" className="link-arrow uppercase" style={{ fontWeight: 400, fontSize: "14px" }}>
              View Collection <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container" style={{ paddingBottom: "var(--space-md)", marginTop: "30px" }}>
        <div className="cta-banner" style={{ border: "none", paddingTop: "40px" }}>
          <h2 style={{ fontWeight: 400, fontSize: "24px", letterSpacing: "0.5px", color: "#111", marginBottom: "15px" }} className="uppercase">DISCOVER & COLLECT EXCEPTIONAL ART WITH ARTSDIVA</h2>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.6", maxWidth: "650px", margin: "0 auto 50px auto" }}>
            Explore a curated collection of exceptional artworks from renowned and emerging artists, available for acquisition and annual leasing worldwide.
          </p>
          
          <div className="cta-grid">
            <div className="cta-card" style={{ border: "none" }}>
              <div className="cta-card-image relative" style={{ aspectRatio: "16/10" }}>
                <Image src="/assets/images/split_3.jpg" alt="For Clients" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="cta-card-content" style={{ backgroundColor: "#f8f8f8", padding: "40px", textAlign: "left" }}>
                <h3 className="uppercase" style={{ fontWeight: 400, fontSize: "18px", color: "#111", marginBottom: "15px" }}>FOR CLIENTS</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>Access a curated collection of exceptional artworks for acquisition or annual leasing, tailored to elevate residential, commercial, and hospitality spaces.</p>
                <Link href="/catalogue" className="link-arrow" style={{ fontWeight: 400, fontSize: "14px", color: "#111", textTransform: "none" }}>
                  Buy Art Online <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
            <div className="cta-card" style={{ border: "none" }}>
              <div className="cta-card-image relative" style={{ aspectRatio: "16/10" }}>
                <Image src="/assets/images/split_1.jpg" alt="For Artists" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="cta-card-content" style={{ backgroundColor: "#f8f8f8", padding: "40px", textAlign: "left" }}>
                <h3 className="uppercase" style={{ fontWeight: 400, fontSize: "18px", color: "#111", marginBottom: "15px" }}>FOR ARTISTS</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>Showcase your artwork to collectors, businesses, and designers through a curated platform built to expand your reach and opportunities.</p>
                <Link href="/contact" className="link-arrow" style={{ fontWeight: 400, fontSize: "14px", color: "#111", textTransform: "none" }}>
                  Sell Your Art <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
