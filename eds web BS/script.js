// === Portfolio Initialization ===
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
});

function initializePortfolio() {
  setupMobileMenu();
  setupSmoothScrolling();
  setupContactForm();
  setupScrollAnimations();
  initializeSkills();
  observeSkillsSection();
  initializeTypewriter();
}

// === Mobile Menu Functions ===
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Close mobile menu when clicking nav links
  const mobileNavLinks = mobileMenu.querySelectorAll('a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// === Smooth Scrolling ===
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// === Contact Form Handler ===
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-alert");

  if (!contactForm || !alertBox) return;

  contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    showFormAlert('loading', 'Sending message...');

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show under construction message
      showFormAlert('error', 'This site is under construction. Please check back later.');
      this.reset();

    } catch (error) {
      showFormAlert('error', 'Failed to send message. Please try again.');
    }
  });
}

function showFormAlert(type, message) {
  const alertBox = document.getElementById("form-alert");
  if (!alertBox) return;

  let alertHTML = '';
  
  switch(type) {
    case 'loading':
      alertHTML = `
        <div class="flex items-center justify-center py-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span class="ml-3">${message}</span>
        </div>
      `;
      break;
    case 'success':
      alertHTML = `
        <div class="bg-green-600 text-white p-4 rounded-lg mb-4">
          ✅ ${message}
        </div>
      `;
      break;
    case 'error':
      alertHTML = `
        <div class="bg-red-600 text-white p-4 rounded-lg mb-4">
          ❌ ${message}
        </div>
      `;
      break;
  }

  alertBox.innerHTML = alertHTML;

  // Clear alert after 5 seconds (except for loading)
  if (type !== 'loading') {
    setTimeout(() => {
      alertBox.innerHTML = "";
    }, 5000);
  }
}

// === Scroll Animations ===
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.skill-category, .project-card').forEach(el => {
    observer.observe(el);
  });
}

// === Skills Animation Functions ===
function initializeSkills() {
  const progressBars = document.querySelectorAll('.skill-progress');
  
  if (progressBars.length === 0) return;

  // Animate progress bars after a short delay
  setTimeout(() => {
    progressBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      if (percent) {
        bar.style.width = percent + '%';
      }
    });
  }, 500);
}

function observeSkillsSection() {
  const skillsSection = document.querySelector('#about');
  
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Re-animate all progress bars when section comes into view
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const percent = bar.getAttribute('data-percent');
          if (percent) {
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = percent + '%';
            }, 200);
          }
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
}

function updateAllSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress');
  
  progressBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    if (percent) {
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = percent + '%';
      }, 100);
    }
  });
}

// === Typewriter Effect ===
function initializeTypewriter() {
  const typewriterElement = document.getElementById("typewriter-text");
  if (!typewriterElement) return;

  const text = "Eldy Soriano II";
  let index = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!isDeleting && index < text.length) {
      // Typing phase
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 120); // Typing speed
    } else if (!isDeleting && index === text.length) {
      // Pause at the end before deleting
      setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, 2000); // Pause duration before deleting
    } else if (isDeleting && index > 0) {
      // Deleting phase
      typewriterElement.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(typeWriter, 80); // Deleting speed (faster than typing)
    } else if (isDeleting && index === 0) {
      // Reset for next loop
      isDeleting = false;
      setTimeout(typeWriter, 500); // Pause before starting again
    }
  }

  // Start typewriter effect after a delay to sync with animations
  setTimeout(typeWriter, 1000);
}

// === Utility Functions ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === Error Handling ===
window.addEventListener('error', function(e) {
  console.error('Portfolio Error:', e.error);
});

// === Performance Optimization ===
// Preload critical images
function preloadImages() {
  const criticalImages = [
    'img/logo.png',
    'img/eds.jpeg',
    'img/edspo.png'
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);