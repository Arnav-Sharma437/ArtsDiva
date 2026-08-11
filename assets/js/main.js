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
  const dots = document.querySelectorAll('.dot');
  const sliderContainer = document.querySelector('.hero');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;
    
    // Initialize first slide
    slides[0].classList.add('active');
    
    const goToSlide = (n) => {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      
      const paginationNum = document.querySelector('.hero-pagination .uppercase');
      if (paginationNum) {
        paginationNum.textContent = `0${currentSlide + 1}`;
      }
    };
    
    const nextSlide = () => goToSlide(currentSlide + 1);
    
    const startSlide = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };
    
    const pauseSlide = () => {
      clearInterval(slideInterval);
    };
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        pauseSlide();
        goToSlide(index);
        startSlide();
      });
    });
    
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', pauseSlide);
      sliderContainer.addEventListener('mouseleave', startSlide);
    }
    
    startSlide();
  }

  // Smooth Looping Carousel
  const carousels = document.querySelectorAll('.grid-4');
  
  carousels.forEach((carousel) => {
    const section = carousel.closest('.container').parentElement;
    const prevBtn = section.querySelector('.carousel-controls button:first-of-type');
    const nextBtn = section.querySelector('.carousel-controls button:last-of-type');
    const counterSpan = section.querySelector('.carousel-controls span');
    let isAnimating = false;
    let currentIndex = 1;
    const totalItems = carousel.children.length; // usually 8
    
    const updateCounter = () => {
      if (counterSpan) {
        counterSpan.textContent = `${currentIndex} / ${totalItems}`;
      }
    };
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        const lastCard = carousel.lastElementChild;
        const cardWidth = lastCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
        const moveDistance = cardWidth + gap;
        
        // Move element physically before animation, then offset with transform to appear in same place
        carousel.prepend(lastCard);
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${moveDistance}px)`;
        
        // Force reflow
        carousel.offsetHeight; 
        
        // Animate to 0
        carousel.style.transition = 'transform 0.5s ease';
        carousel.style.transform = 'translateX(0)';
        
        setTimeout(() => {
          isAnimating = false;
          currentIndex = currentIndex === 1 ? totalItems : currentIndex - 1;
          updateCounter();
        }, 500);
      });
      
      nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        const firstCard = carousel.firstElementChild;
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
        const moveDistance = cardWidth + gap;
        
        // Animate out
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
      });
    }
  });
});
