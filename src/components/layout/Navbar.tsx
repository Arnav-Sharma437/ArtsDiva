import Link from "next/link";
import { Search, User, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header>
      <div className="header-top">
        <Link href="/" className="logo">
          <span className="logo-arts">ARTS</span>
          <span className="logo-diva">DIVA</span>
        </Link>
      </div>
      <div className="container">
        <div className="header-nav">
          <nav className="nav-links uppercase">
            <Link href="/" className="active">Home</Link>
            <Link href="/catalogue">Catalogue</Link>
            <Link href="/leasing">Leasing</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Enquire</Link>
            <Link href="/news">News</Link>
            <Link href="/events">Events</Link>
            <Link href="/artists">Artists</Link>
          </nav>
          <div className="header-actions uppercase">
            <button className="mobile-nav-toggle" aria-label="Toggle navigation">
              <Menu size={24} />
            </button>
            <Link href="/search" className="search-btn" aria-label="Search">
              <Search size={20} />
            </Link>
            <Link href="/admin" className="user-btn" aria-label="User Account">
              <User size={20} />
            </Link>
            <div className="currency-dropdown">USD ($)</div>
          </div>
        </div>
      </div>
    </header>
  );
}
