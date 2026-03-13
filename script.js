// ==============================
//   NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==============================
//   BURGER MENU
// ==============================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});

// ==============================
//   TYPEFORM LOGIC
// ==============================
const totalSteps = 6;
let currentStep = 1;
let rating = 0;

function showStep(step) {
  document.querySelectorAll('.tf-step').forEach(el => el.classList.remove('active'));

  const target = document.querySelector(`.tf-step[data-step="${step}"]`);
  if (target) {
    target.classList.add('active');
    const input = target.querySelector('.tf-input');
    if (input) input.focus();
  }

  // Update progress
  if (step !== 'done') {
    currentStep = parseInt(step);
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('tf-progress-bar').style.setProperty('--progress', progress + '%');
    document.getElementById('tf-progress-text').textContent = currentStep + ' / ' + totalSteps;
  } else {
    document.getElementById('tf-progress-bar').style.setProperty('--progress', '100%');
    document.getElementById('tf-progress-text').textContent = 'Terminé';
  }
}

// Next buttons
document.querySelectorAll('.tf-next').forEach(btn => {
  btn.addEventListener('click', () => {
    const nextStep = btn.dataset.next;
    showStep(nextStep);
  });
});

// Previous buttons
document.querySelectorAll('.tf-prev').forEach(btn => {
  btn.addEventListener('click', () => {
    const prevStep = btn.dataset.prev;
    showStep(prevStep);
  });
});

// Enter key to go next
document.querySelectorAll('.tf-input:not(.tf-textarea)').forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const step = input.closest('.tf-step');
      const nextBtn = step.querySelector('.tf-next');
      if (nextBtn) nextBtn.click();
    }
  });
});

// Ctrl+Enter for textarea
document.querySelectorAll('.tf-textarea').forEach(textarea => {
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      const step = textarea.closest('.tf-step');
      const nextBtn = step.querySelector('.tf-next');
      if (nextBtn) nextBtn.click();
    }
  });
});

// Auto-advance on radio select
document.querySelectorAll('.tf-option input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // Small delay to show the selection
    setTimeout(() => {
      const step = radio.closest('.tf-step');
      const nextBtn = step.querySelector('.tf-next');
      if (nextBtn) nextBtn.click();
    }, 400);
  });
});

// Star rating
document.querySelectorAll('.tf-star').forEach(star => {
  star.addEventListener('click', () => {
    rating = parseInt(star.dataset.value);
    document.querySelectorAll('.tf-star').forEach((s, i) => {
      s.classList.toggle('active', i < rating);
    });
  });

  star.addEventListener('mouseenter', () => {
    const val = parseInt(star.dataset.value);
    document.querySelectorAll('.tf-star').forEach((s, i) => {
      s.style.color = i < val ? '#f9ca24' : '';
    });
  });
});

document.getElementById('tf-rating').addEventListener('mouseleave', () => {
  document.querySelectorAll('.tf-star').forEach((s, i) => {
    s.style.color = '';
  });
});

// Submit
document.getElementById('tf-submit').addEventListener('click', () => {
  // Collect data
  const data = {
    name: document.getElementById('tf-name').value,
    email: document.getElementById('tf-email').value,
    role: document.querySelector('input[name="role"]:checked')?.value || '',
    rating: rating,
    message: document.getElementById('tf-message').value,
    source: document.querySelector('input[name="source"]:checked')?.value || ''
  };

  console.log('Form data:', data);
  showStep('done');
});

// Restart
document.getElementById('tf-restart').addEventListener('click', () => {
  // Reset form
  document.getElementById('tf-name').value = '';
  document.getElementById('tf-email').value = '';
  document.getElementById('tf-message').value = '';
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  document.querySelectorAll('.tf-star').forEach(s => s.classList.remove('active'));
  rating = 0;

  showStep(1);
});

// ==============================
//   SCROLL ANIMATIONS
// ==============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
