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

  // Smooth Looping Carousel
  const carousels = document.querySelectorAll('.slider-track');
  
  carousels.forEach((carousel, index) => {
    const section = carousel.closest('.container');
    // For publications it uses arrow-only-controls with .arrow-btn
    const prevBtn = section.querySelector('.carousel-controls button:first-of-type, .arrow-btn:first-of-type');
    const nextBtn = section.querySelector('.carousel-controls button:last-of-type, .arrow-btn:last-of-type');
    const counterSpan = section.querySelector('.carousel-controls span');
    let isAnimating = false;
    let currentIndex = 1;
    const totalItems = carousel.children.length; // usually 8
    
    const updateCounter = () => {
      if (counterSpan) {
        counterSpan.textContent = `${currentIndex} / ${totalItems}`;
      }
    };

    const handlePrev = () => {
      if (isAnimating) return;
      isAnimating = true;
      
      const lastCard = carousel.lastElementChild;
      const cardWidth = lastCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
      const moveDistance = cardWidth + gap;
      
      carousel.prepend(lastCard);
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${moveDistance}px)`;
      
      carousel.offsetHeight; // Force reflow
      
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = 'translateX(0)';
      
      setTimeout(() => {
        carousel.style.transition = 'none';
        isAnimating = false;
        currentIndex = currentIndex === 1 ? totalItems : currentIndex - 1;
        updateCounter();
      }, 500);
    };

    const handleNext = () => {
      if (isAnimating) return;
      isAnimating = true;
      
      const firstCard = carousel.firstElementChild;
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
      const moveDistance = cardWidth + gap;
      
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(-${moveDistance}px)`;
      
      setTimeout(() => {
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        carousel.appendChild(firstCard);
        isAnimating = false;
        currentIndex = currentIndex === totalItems ? 1 : currentIndex + 1;
        updateCounter();
      }, 500);
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => { stopAutoScroll(); handlePrev(); startAutoScroll(); });
      nextBtn.addEventListener('click', () => { stopAutoScroll(); handleNext(); startAutoScroll(); });
    }

    // Auto Scroll Logic
    // Index 0: Exhibitions -> slides right (handleNext)
    // Index 1: Events -> slides left (handlePrev)
    // Index 2: Publications -> slides right (handleNext)
    const direction = (index === 1) ? 'prev' : 'next';
    let autoScrollInterval;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (direction === 'next') {
          handleNext();
        } else {
          handlePrev();
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
  });
});

