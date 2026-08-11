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
    
    const goToSlide = (n) => {
      slides[currentSlide].style.display = 'none';
      dots[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].style.display = 'block';
      dots[currentSlide].classList.add('active');
      
      // Update pagination number if it exists
      const paginationNum = document.querySelector('.hero-pagination .uppercase');
      if (paginationNum) {
        paginationNum.textContent = `0${currentSlide + 1}`;
      }
    };
    
    // Initialize slides
    slides.forEach((slide, index) => {
      if (index !== 0) slide.style.display = 'none';
    });
    
    const nextSlide = () => goToSlide(currentSlide + 1);
    
    // Auto slide
    const startSlide = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };
    
    const pauseSlide = () => {
      clearInterval(slideInterval);
    };
    
    // Event listeners
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

  // Carousel Next/Prev Logic
  // We will assume the .grid-4 has horizontal scroll for mobile/tablets, 
  // and we'll implement a simple scroll for the buttons.
  const carousels = document.querySelectorAll('.grid-4');
  
  carousels.forEach((carousel, index) => {
    // Find the closest section header controls
    const section = carousel.closest('.container').parentElement;
    const prevBtn = section.querySelector('.carousel-controls .circle-btn:first-child');
    const nextBtn = section.querySelector('.carousel-controls .circle-btn:last-child');
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        // Scroll left by card width roughly
        const cardWidth = carousel.querySelector('.card').offsetWidth;
        carousel.scrollBy({ left: -cardWidth - 32, behavior: 'smooth' });
      });
      
      nextBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('.card').offsetWidth;
        carousel.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
      });
    }
  });
});
