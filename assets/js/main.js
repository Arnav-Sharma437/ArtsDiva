document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const sliderContainer = document.querySelector('.hero');
  const paginationContainer = document.querySelector('.hero-pagination');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;
    
    // Initialize first slide fully
    
    const renderPagination = () => {
      if (!paginationContainer) return;
      paginationContainer.innerHTML = '';
      
      for (let i = 0; i < slides.length; i++) {
        if (i === currentSlide) {
          const circle = document.createElement('div');
          circle.className = 'pagination-circle font-medium';
          circle.textContent = (i + 1 < 10) ? `0${i + 1}` : i + 1;
          paginationContainer.appendChild(circle);
        } else {
          const dot = document.createElement('div');
          dot.className = 'dot';
          dot.addEventListener('click', () => {
            pauseSlide();
            goToSlide(i);
            startSlide();
          });
          paginationContainer.appendChild(dot);
        }
      }
    };
    
    const goToSlide = (n) => {
      slides[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      renderPagination();
    };
    
    const nextSlide = () => goToSlide(currentSlide + 1);
    
    const startSlide = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };
    
    const pauseSlide = () => {
      clearInterval(slideInterval);
    };
    
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', pauseSlide);
      sliderContainer.addEventListener('mouseleave', startSlide);
    }
    
    goToSlide(0);
    startSlide();
  }

  // Continuous Looping Marquee Carousel
  const carousels = document.querySelectorAll('.slider-track');
  
  carousels.forEach((carousel, index) => {
    const section = carousel.closest('.container');
    const prevBtn = section.querySelector('.carousel-controls button:first-of-type, .arrow-btn:first-of-type');
    const nextBtn = section.querySelector('.carousel-controls button:last-of-type, .arrow-btn:last-of-type');
    const counterSpan = section.querySelector('.carousel-controls span');
    
    // Clone all items for infinite scrolling
    const items = Array.from(carousel.children);
    items.forEach(item => {
      carousel.appendChild(item.cloneNode(true));
    });

    // Auto Scroll Logic
    // Index 0: Exhibitions -> slides right (content moves left -> direction 1)
    // Index 1: Events -> slides left (content moves right -> direction -1)
    // Index 2: Publications -> slides right (content moves left -> direction 1)
    let defaultDirection = (index === 1) ? -1 : 1;
    let direction = defaultDirection;
    let speed = 1.5; // pixels per frame
    let isPaused = false;
    let position = 0;

    // Reset scroll positions initially
    setTimeout(() => {
      const halfWidth = carousel.scrollWidth / 2;
      if (direction === -1) {
        position = halfWidth;
        carousel.scrollLeft = position;
      }
    }, 100);

    const tick = () => {
      if (!isPaused) {
        const halfWidth = carousel.scrollWidth / 2;
        position += speed * direction;

        if (direction === 1) { // Moving left
          if (position >= halfWidth) {
            position -= halfWidth;
          }
        } else { // Moving right
          if (position <= 0) {
            position += halfWidth;
          }
        }
        carousel.scrollLeft = position;

        // Update counter based on scroll position
        if (counterSpan) {
          const totalOriginalItems = items.length;
          const itemWidth = halfWidth / totalOriginalItems;
          // Math.floor(position / itemWidth) gives 0 to totalOriginalItems - 1
          const currentIndex = Math.floor(position / itemWidth) % totalOriginalItems + 1;
          const newText = `${currentIndex} / ${totalOriginalItems}`;
          if (counterSpan.textContent !== newText) {
            counterSpan.textContent = newText;
          }
        }
      }
      requestAnimationFrame(tick);
    };

    // Pause on hover
    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);

    // Arrow controls - fast forward/rewind temporarily
    if (prevBtn && nextBtn) {
      let arrowTimeout;
      prevBtn.addEventListener('click', () => {
        direction = -1;
        speed = 10; // Speed up temporarily
        clearTimeout(arrowTimeout);
        arrowTimeout = setTimeout(() => {
          direction = defaultDirection;
          speed = 1.5;
        }, 500);
      });
      nextBtn.addEventListener('click', () => {
        direction = 1;
        speed = 10; // Speed up temporarily
        clearTimeout(arrowTimeout);
        arrowTimeout = setTimeout(() => {
          direction = defaultDirection;
          speed = 1.5;
        }, 500);
      });
    }

    requestAnimationFrame(tick);
  });
});



// Accordion Logic for Catalogue Sidebar
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion-btn');
  accordions.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'none' || !panel.classList.contains('active')) {
        panel.style.display = 'block';
        panel.classList.add('active');
        this.querySelector('svg').style.transform = 'rotate(180deg)';
      } else {
        panel.style.display = 'none';
        panel.classList.remove('active');
        this.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });
  });
});


// Detail Page Logic
document.addEventListener('DOMContentLoaded', () => {
  // Image Gallery
  const mainImg = document.getElementById('main-product-img');
  const thumbs = document.querySelectorAll('.gallery-thumbnails img');
  if (mainImg && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        mainImg.src = this.src;
        thumbs.forEach(t => {
          t.classList.remove('active-thumb');
          t.classList.add('thumb');
        });
        this.classList.remove('thumb');
        this.classList.add('active-thumb');
      });
    });
  }

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'transparent';
          b.style.color = '#999';
        });
        this.classList.add('active');
        this.style.borderColor = '#111';
        this.style.color = '#111';
        
        tabContents.forEach(content => {
          if (content.id === target) {
            content.style.display = content.id === 'tab-details' ? 'flex' : 'block';
          } else {
            content.style.display = 'none';
          }
        });
      });
    });
  }
});


// Dynamic Rendering Logic
document.addEventListener('DOMContentLoaded', () => {
  const createCardHTML = (art) => {
    const favFill = art.isFavorite ? '#e53935' : 'none';
    const favStroke = art.isFavorite ? '#e53935' : '#111';
    return \<article class=\"card catalogue-card\" style=\"position: relative;\">
      <button class=\"favorite-btn \\" style=\"position: absolute; top: 15px; right: 15px; width: 36px; height: 36px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 10;\">
          <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"\\" stroke=\"\\" stroke-width=\"1.5\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path></svg>
      </button>
      <a href=\"detail.html?id=\\" style=\"text-decoration: none; color: inherit; display: block;\">
          <div class=\"card-image square\" style=\"margin-bottom: 25px;\"><img src=\"\\" alt=\"\\" style=\"object-fit: cover; width: 100%; height: 100%;\"></div>
          <p class=\"card-meta uppercase\" style=\"margin-bottom: 15px !important; font-size: 13px; font-weight: 400; color: #555; border-bottom: 1px solid #eaeaea; padding-bottom: 15px;\">\</p>
          <h3 class=\"card-title\" style=\"font-weight: 400; font-size: 20px; margin-bottom: 8px !important; color: #111;\">\</h3>
          <p style=\"font-size: 13px; color: #666; margin-bottom: 4px;\">\</p>
          <p style=\"font-size: 13px; color: #666; margin-bottom: 15px;\">\</p>
          <p style=\"font-size: 16px; font-weight: 500; color: #111;\">$\</p>
      </a>
    </article>\;
  };

  // 1. Render Catalogue Grid
  const catalogueGrid = document.getElementById('catalogue-grid-container');
  if (catalogueGrid && typeof artworksData !== 'undefined') {
    const renderGrid = (data) => {
      catalogueGrid.innerHTML = data.map(createCardHTML).join('');
    };
    renderGrid(artworksData);

    // Simple Filter Logic for Artist checkboxes (Demo)
    const artistCheckboxes = document.querySelectorAll('.filter-group:nth-child(3) input[type="checkbox"]');
    artistCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedArtists = Array.from(artistCheckboxes).filter(c => c.checked).map(c => c.nextElementSibling.nextElementSibling.textContent.trim());
        if (checkedArtists.length === 0) {
          renderGrid(artworksData);
        } else {
          renderGrid(artworksData.filter(a => checkedArtists.includes(a.artist)));
        }
      });
    });
  }

  // 2. Render Detail Page
  const urlParams = new URLSearchParams(window.location.search);
  const artId = urlParams.get('id');
  if (window.location.pathname.includes('detail.html') && artId && typeof artworksData !== 'undefined') {
    const art = artworksData.find(a => a.id === artId);
    if (art) {
      document.querySelector('.breadcrumbs span').textContent = art.title.toUpperCase();
      document.querySelector('.info-header h1').textContent = art.title.toUpperCase();
      document.querySelector('.info-header .uppercase').textContent = art.category.toUpperCase();
      document.querySelector('.info-header h1 + p').textContent = art.artist;
      document.querySelector('.info-header h1 + p + p').textContent = \\ | \\;
      document.querySelector('.price-section span').textContent = \$\\;
      document.querySelector('.lease-box span').textContent = \$\\;
      document.querySelector('.lease-box p:last-child').innerHTML = \Based on artwork price of $\.<br>Leasing rate is calculated as per our standard terms. Applicable taxes extra.\;
      document.querySelector('.description p').textContent = art.description;
      
      // Metadata table
      const tds = document.querySelectorAll('.metadata-table td:nth-child(2)');
      if(tds.length >= 6) {
         tds[0].textContent = art.medium;
         tds[1].textContent = \\ | \\;
         tds[2].textContent = art.weight;
         tds[3].textContent = \\ » \\;
         tds[4].textContent = art.tags.join(', ');
      }
      
      // Gallery
      const mainImg = document.getElementById('main-product-img');
      const thumbContainer = document.querySelector('.gallery-thumbnails');
      if (mainImg && thumbContainer && art.images.length > 0) {
        mainImg.src = art.images[0];
        thumbContainer.innerHTML = art.images.map((img, idx) => \<img src=\"\\" class=\"\\" alt=\"Thumb \\" style=\"width: 100%; height: 100px; object-fit: cover; cursor: pointer; \\">\).join('');
        
        // Re-bind thumb clicks
        const newThumbs = thumbContainer.querySelectorAll('img');
        newThumbs.forEach(thumb => {
          thumb.addEventListener('click', function() {
            mainImg.src = this.src;
            newThumbs.forEach(t => { t.classList.remove('active-thumb'); t.classList.add('thumb'); t.style.opacity = '0.6'; t.style.border = 'none'; });
            this.classList.remove('thumb');
            this.classList.add('active-thumb');
            this.style.opacity = '1';
            this.style.border = '1px solid #111';
          });
        });
      }
      
      // Tabs details
      const tabTds = document.querySelectorAll('#tab-details td:nth-child(2)');
      if(tabTds.length >= 8) {
         tabTds[1].textContent = art.year;
         tabTds[2].textContent = art.medium;
         tabTds[6].textContent = art.dimensionWithFrame;
         tabTds[7].textContent = art.weightWithFrame;
      }
    }
  }

  // 3. Update all static slider links on the page (like Related Artworks or Homepage sliders)
  const allSliderCards = document.querySelectorAll('.slider-track .card');
  if (allSliderCards.length > 0 && typeof artworksData !== 'undefined') {
    allSliderCards.forEach((card, index) => {
      const a = card.querySelector('a');
      if(a) {
        // just cycle through data for demo purposes
        const art = artworksData[index % artworksData.length];
        a.href = \detail.html?id=\\;
        const img = a.querySelector('img');
        if(img) img.src = art.images[0];
        const title = a.querySelector('.card-title');
        if(title) title.textContent = art.title;
      }
    });
  }
});

