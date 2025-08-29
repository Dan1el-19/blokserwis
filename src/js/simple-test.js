// BLOKSERWIS - Simple Test Bundle
console.log('🔧 Loading simple test...');

// Import modern libraries
import $ from 'jquery';
import { Swiper } from 'swiper/bundle';
import 'swiper/css/bundle';

// Make jQuery global
window.$ = window.jQuery = $;

console.log('Libraries loaded:', {
  jQuery: $.fn.jquery,
  Swiper: 'bundle'
});

// Simple Swiper init
function initSimpleSlider() {
  const sliders = document.querySelectorAll('.bxtop');
  console.log(`Found ${sliders.length} sliders to convert`);
  
  sliders.forEach((slider, index) => {
    console.log(`Processing slider ${index + 1}`);
    
    // Add Swiper container class
    slider.classList.add('swiper');
    
    // Wrap content in swiper-wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';
    
    // Convert LI elements to swiper-slide
    const listItems = Array.from(slider.children);
    listItems.forEach(li => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      
      // Move inner div to slide
      while (li.firstChild) {
        slide.appendChild(li.firstChild);
      }
      
      wrapper.appendChild(slide);
      li.remove();
    });
    
    slider.appendChild(wrapper);
    
    // Initialize Swiper
    new Swiper(slider, {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      speed: 600
    });
    
    console.log(`✅ Slider ${index + 1} converted to Swiper`);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready, initializing...');
  initSimpleSlider();
});
