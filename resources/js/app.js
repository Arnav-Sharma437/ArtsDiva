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
