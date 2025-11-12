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
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 3 } }
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

// ---- Minecraft Status (mcapi.us) ----
const IP = 'cozysky.mcviet.top';
const PORT = 25774;
const ENDPOINT = `https://mcapi.us/server/status?ip=${encodeURIComponent(IP)}&port=${PORT}`;

function setStatusUI({ online, playersNow, playersMax, motd, version }) {
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-text');
  const p = document.getElementById('status-players');
  const v = document.getElementById('status-version');
  const m = document.getElementById('status-motd');

  if (!dot || !txt || !p || !v || !m) return;

  dot.classList.toggle('is-online', !!online);
  txt.textContent = online ? 'Online' : 'Offline';
  p.textContent = online ? `${playersNow}/${playersMax || '?'}` : '—';
  v.textContent = version || '—';
  m.textContent = motd || '—';
}

async function fetchStatus() {
  try {
    const resp = await fetch(ENDPOINT, { cache: 'no-store' });
    const data = await resp.json();

    const online = !!data.online;
    const playersNow = data.players?.now ?? 0;
    const playersMax = data.players?.max ?? null;

    // motd có thể ở data.motd hoặc data.motd?.clean (tùy API)
    const motd = (data.motd && (data.motd.clean || data.motd)) || '';
    const version = data.server?.name || data.server?.protocol || '';

    setStatusUI({
      online,
      playersNow,
      playersMax,
      motd: (Array.isArray(motd) ? motd.join(' ') : String(motd)).slice(0, 140),
      version: String(version)
    });
  } catch (e) {
    setStatusUI({ online: false, playersNow: 0, playersMax: 0, motd: 'Không thể lấy dữ liệu', version: '' });
  }
}

// gọi lần đầu + tự làm mới mỗi 30s
fetchStatus();
setInterval(fetchStatus, 30000);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
