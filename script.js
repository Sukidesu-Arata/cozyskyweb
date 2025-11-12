// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typed.js hero text
if (typeof Typed !== 'undefined') {
  new Typed('.typing-text', {
    strings: [
      'Skyblock Việt Nam',
      'IP: cozysky.mcviet.top:25774',
      'Java 1.20.x',
      'Discord: dsc.gg/cozysky'
    ],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1800,
    loop: true
  });
}

// Particles.js background (gold theme)
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 65, density: { enable: true, value_area: 900 } },
      color: { value: '#EDA700' },
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 140, color: '#EDA700', opacity: 0.25, width: 1 },
      move: { enable: true, speed: 2.2, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

// Simple mobile nav close on click
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    const cb = document.getElementById('nav-toggle');
    if (cb && cb.checked) cb.checked = false;
  });
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
