<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'ArtsDiva - Fine Art Gallery & Marketplace')</title>
    <meta name="description" content="@yield('meta_description', 'Curated fine art acquisition and annual leasing. Explore our masterpieces.')">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('styles')
</head>
<body>
    <!-- 1. HEADER -->
    <header>
        <div class="header-top">
            <a href="{{ route('home') }}" class="logo"><span class="logo-arts">ARTS</span><span class="logo-diva">DIVA</span></a>
        </div>
        <div class="container">
            <div class="header-nav">
                <nav class="nav-links uppercase">
                    <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">Home</a>
                    <a href="{{ route('catalogue') }}" class="{{ request()->routeIs('catalogue') ? 'active' : '' }}">Catalogue</a>
                    <a href="#">Leasing</a>
                    <a href="#">About</a>
                    <a href="#">Enquire</a>
                    <a href="#">News</a>
                    <a href="#">Events</a>
                    <a href="#">Artists</a>
                </nav>
                <div class="header-actions uppercase">
                    <button class="mobile-nav-toggle" aria-label="Toggle navigation">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <a href="#" class="search-btn" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </a>
                    <a href="/admin" class="user-btn" aria-label="User Account">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </a>
                    <div class="currency-dropdown">USD ($)</div>
                </div>
            </div>
        </div>
    </header>

    <main>
        {{ $slot ?? '' }}
        @yield('content')
    </main>

    <!-- 10. FOOTER -->
    <footer style="background-color: #f8f8f8;">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col" style="padding-right: 40px;">
                    <div class="logo uppercase" style="font-weight: 800; font-size: 26px; letter-spacing: 0.5px; margin-bottom: 25px;">ARTSDIVA</div>
                    <p class="uppercase" style="font-size: 13px; margin-bottom: 15px; color: #333;">NEWSLETTER SIGN UP</p>
                    <div class="newsletter" style="margin-bottom: 30px;">
                        <form class="newsletter-form" style="display: flex; align-items: center; background: #fff; padding: 12px 15px; border: 1px solid #eaeaea; margin-top: 0; border-bottom: 1px solid #eaeaea;">
                            <input type="email" placeholder="Enter your email.." required aria-label="Email address" style="border: none; padding: 0; background: transparent; font-size: 14px; width: 100%; color: #333;">
                            <button type="submit" style="font-size: 14px; color: #111; border: none; background: transparent; cursor: pointer; white-space: nowrap;">Sign Up &rarr;</button>
                        </form>
                    </div>
                    <p class="uppercase" style="font-size: 13px; margin-bottom: 15px; color: #333;">SOCIAL</p>
                    <div class="social-icons" style="display: flex; gap: 10px;">
                        <a href="#" class="circle-btn" aria-label="Facebook" style="width: 34px; height: 34px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" class="circle-btn" aria-label="X (Twitter)" style="width: 34px; height: 34px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        <a href="#" class="circle-btn" aria-label="LinkedIn" style="width: 34px; height: 34px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                        <a href="#" class="circle-btn" aria-label="Pinterest" style="width: 34px; height: 34px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s5 11 9 11c0-2.5-.2-6.5.6-9s3.5-6 6.5-6 6 3.5 6 8.5-3 10.5-7.5 10.5c-2.5 0-4.5-1.5-4.5-3.5 0-2.5 1.5-5 3-5s3 1.5 3 4c0 3-4 3-4-1.5 0-3 3.5-5.5 7-5.5s5 3.5 5 7.5-3.5 9-8 9C5 21 2 16.5 2 12S6.5 2 12 2z"></path></svg></a>
                        <a href="#" class="circle-btn" aria-label="Instagram" style="width: 34px; height: 34px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 class="uppercase" style="font-weight: 400; font-size: 13px; margin-bottom: 25px; color: #111;">QUICK LINKS</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="{{ route('catalogue') }}" style="color: #666; font-size: 14px; text-decoration: none;">Catalogue</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Leasing</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">About</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Enquire</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="uppercase" style="font-weight: 400; font-size: 13px; margin-bottom: 25px; color: #111;">INFORMATION</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">FAQ</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Shipping & Delivery</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Returns</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Terms & Conditions</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="uppercase" style="font-weight: 400; font-size: 13px; margin-bottom: 25px; color: #111;">FOR BUSINESSES</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Interior Designers</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Hotels & Hospitality</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Corporate Spaces</a></li>
                        <li><a href="#" style="color: #666; font-size: 14px; text-decoration: none;">Bulk Leasing</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="uppercase" style="font-weight: 400; font-size: 13px; margin-bottom: 25px; color: #111;">CONTACT</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="tel:+12125550187" class="icon-row" style="color:#666; font-size: 14px; text-decoration: none; display: flex; align-items: center; gap: 10px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +1 (212) 555-0187</a></li>
                        <li><a href="mailto:info@artsdiva.com" class="icon-row" style="color:#666; font-size: 14px; text-decoration: none; display: flex; align-items: center; gap: 10px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6" stroke="#fff" stroke-width="2" fill="none"></polyline></svg> info@artsdiva.com</a></li>
                        <li><a href="mailto:leasing@artsdiva.com" class="icon-row" style="color:#666; font-size: 14px; text-decoration: none; display: flex; align-items: center; gap: 10px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="#fff"></circle></svg> leasing@artsdiva.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom" style="text-align: center; border-top: 1px solid #eaeaea; padding-top: 20px; font-size: 13px; color: #666;">
                2026 ArtsDiva. All Rights Reserved.
            </div>
        </div>
    </footer>

    @livewireScripts
    @stack('scripts')
</body>
</html>
