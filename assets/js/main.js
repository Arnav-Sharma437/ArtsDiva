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

