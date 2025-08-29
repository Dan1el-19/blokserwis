// BLOKSERWIS - Modern JavaScript Bundle
// Zachowuje 100% funkcjonalności, modernizuje technologie

console.log('🔧 Loading modern BLOKSERWIS bundle...');

// Import modern libraries
import $ from 'jquery';
import { Fancybox } from '@fancyapps/ui';
import { Swiper } from 'swiper/bundle';

// Import CSS
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'swiper/css/bundle';
// Custom CSS will be handled separately

// Make jQuery global for compatibility
window.$ = window.jQuery = $;

console.log('📚 Libraries loaded:', {
  jQuery: $.fn.jquery,
  Fancybox: '@fancyapps/ui',
  Swiper: 'latest'
});

// Modern Slider Configuration (replaces bxSlider)
function initSliders() {
  console.log('🎠 Initializing sliders...');
  
  const sliderElements = document.querySelectorAll('.bxtop');
  console.log(`Found ${sliderElements.length} slider elements`);
  
  sliderElements.forEach((element, index) => {
    console.log(`Initializing slider ${index + 1}`);
    
    // Check if it already has swiper structure
    if (element.classList.contains('swiper-initialized')) {
      console.log('Slider already initialized, skipping...');
      return;
    }
    
    // Add swiper class if not present
    if (!element.classList.contains('swiper')) {
      element.classList.add('swiper');
    }
    
    // Check if wrapper exists
    let wrapper = element.querySelector('.swiper-wrapper');
    if (!wrapper) {
      // Create wrapper
      wrapper = document.createElement('div');
      wrapper.className = 'swiper-wrapper';
      
      // Move all children to wrapper as slides
      const children = Array.from(element.children);
      children.forEach(child => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        // Move the child content
        while (child.firstChild) {
          slide.appendChild(child.firstChild);
        }
        
        wrapper.appendChild(slide);
        child.remove();
      });
      
      element.appendChild(wrapper);
    }
    
    const slideCount = wrapper.children.length;
    console.log(`Creating Swiper with ${slideCount} slides`);
    
    // Initialize Swiper
    const swiper = new Swiper(element, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: slideCount > 1,
      speed: 600,
      initialSlide: Math.floor(Math.random() * slideCount),
      
      // Pause on hover (equivalent of autoHover: true)
      on: {
        init: function() {
          const swiperEl = this.el;
          swiperEl.addEventListener('mouseenter', () => {
            this.autoplay.stop();
          });
          swiperEl.addEventListener('mouseleave', () => {
            this.autoplay.start();
          });
        }
      }
    });
    
    console.log(`✅ Slider ${index + 1} initialized with Swiper`);
  });
}

// Modern Fancybox Configuration
function initGallery() {
  console.log('🖼️ Initializing gallery...');
  
  // Convert old class-based to data-attribute based
  const oldFancyboxElements = document.querySelectorAll('.fancybox');
  oldFancyboxElements.forEach(element => {
    element.setAttribute('data-fancybox', element.getAttribute('data-fancybox-group') || 'gallery');
  });
  
  Fancybox.bind('[data-fancybox]', {
    // Zachowuje identyczne zachowanie Fancybox 2.x
    animated: true,
    dragToClose: false,
    Carousel: {
      infinite: true
    },
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [],
        right: ['close']
      }
    },
    Images: {
      zoom: true
    }
  });
  
  console.log(`🖼️ Gallery initialized for ${oldFancyboxElements.length} elements`);
}

// Initialize when DOM is ready
function initModernBlokserwis() {
  console.log('🚀 Initializing modern BLOKSERWIS...');
  
  try {
    initSliders();
    initGallery();
    console.log('✅ Modern BLOKSERWIS loaded successfully!');
  } catch (error) {
    console.error('❌ Error loading modern bundle:', error);
  }
}

// Modern DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModernBlokserwis);
} else {
  initModernBlokserwis();
}
