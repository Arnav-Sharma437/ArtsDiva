import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f8f8f8" }}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ paddingRight: "40px" }}>
            <div className="logo uppercase" style={{ fontWeight: 800, fontSize: "26px", letterSpacing: "0.5px", marginBottom: "25px" }}>
              ARTSDIVA
            </div>
            <p className="uppercase" style={{ fontSize: "13px", marginBottom: "15px", color: "#333" }}>NEWSLETTER SIGN UP</p>
            <div className="newsletter" style={{ marginBottom: "30px" }}>
              <form className="newsletter-form" style={{ display: "flex", alignItems: "center", background: "#fff", padding: "12px 15px", border: "1px solid #eaeaea", marginTop: 0, borderBottom: "1px solid #eaeaea" }}>
                <input type="email" placeholder="Enter your email.." required aria-label="Email address" style={{ border: "none", padding: 0, background: "transparent", fontSize: "14px", width: "100%", color: "#333" }} />
                <button type="submit" style={{ fontSize: "14px", color: "#111", border: "none", background: "transparent", cursor: "pointer", whiteSpace: "nowrap" }}>Sign Up &rarr;</button>
              </form>
            </div>
            <p className="uppercase" style={{ fontSize: "13px", marginBottom: "15px", color: "#333" }}>SOCIAL</p>
            <div className="social-icons" style={{ display: "flex", gap: "10px" }}>
              <a href="catalogue.html" className="circle-btn" aria-label="Facebook" style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="catalogue.html" className="circle-btn" aria-label="X (Twitter)" style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="catalogue.html" className="circle-btn" aria-label="LinkedIn" style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="catalogue.html" className="circle-btn" aria-label="Instagram" style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="uppercase" style={{ fontWeight: 400, fontSize: "13px", marginBottom: "25px", color: "#111" }}>QUICK LINKS</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
              <li><Link href="/catalogue" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Catalogue</Link></li>
              <li><Link href="/leasing" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Leasing</Link></li>
              <li><Link href="/about" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>About</Link></li>
              <li><Link href="/contact" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Enquire</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="uppercase" style={{ fontWeight: 400, fontSize: "13px", marginBottom: "25px", color: "#111" }}>INFORMATION</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
              <li><Link href="/faq" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>FAQ</Link></li>
              <li><Link href="/shipping" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Shipping & Delivery</Link></li>
              <li><Link href="/returns" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Returns</Link></li>
              <li><Link href="/terms" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Terms & Conditions</Link></li>
              <li><Link href="/privacy" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="uppercase" style={{ fontWeight: 400, fontSize: "13px", marginBottom: "25px", color: "#111" }}>FOR BUSINESSES</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
              <li><Link href="/designers" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Interior Designers</Link></li>
              <li><Link href="/hospitality" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Hotels & Hospitality</Link></li>
              <li><Link href="/corporate" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Corporate Spaces</Link></li>
              <li><Link href="/bulk-leasing" style={{ color: "#666", fontSize: "14px", textDecoration: "none" }}>Bulk Leasing</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="uppercase" style={{ fontWeight: 400, fontSize: "13px", marginBottom: "25px", color: "#111" }}>CONTACT</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
              <li>
                <a href="tel:+12125550187" className="icon-row" style={{ color: "#666", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Phone size={15} /> +1 (212) 555-0187
                </a>
              </li>
              <li>
                <a href="mailto:info@artsdiva.com" className="icon-row" style={{ color: "#666", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={15} /> info@artsdiva.com
                </a>
              </li>
              <li>
                <a href="mailto:leasing@artsdiva.com" className="icon-row" style={{ color: "#666", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                  <MapPin size={15} /> leasing@artsdiva.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: "center", borderTop: "1px solid #eaeaea", paddingTop: "20px", fontSize: "13px", color: "#666" }}>
          © {new Date().getFullYear()} ArtsDiva. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
