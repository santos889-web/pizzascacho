/* ============================================================
   PIZZAS CACHO — CAMPAÑA MUNDIAL 2026 ⚽🏆
   worldcup.js — EDICIÓN ÉPICA
   ============================================================ */

/* ── 1. Confeti premium con 3 fases ─────────────────────────── */
function createWorldCupConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'wc-confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#F7C948','#e6a800','#fff','#D72638','#0B3D91','#2E8B57','#74acdc','#ffffff'];
  const SHAPES = ['rect','circle','star'];
  const COUNT  = 120;
  const particles = [];

  function makeStar(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const b = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
      if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
      else         ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      ctx.lineTo(x + r * 0.4 * Math.cos(b), y + r * 0.4 * Math.sin(b));
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height * -0.8 - 10,
      w:     Math.random() * 9 + 4,
      h:     Math.random() * 5 + 2,
      r:     Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      speed: Math.random() * 3 + 1,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.22,
      drift: (Math.random() - 0.5) * 1.8,
      alpha: 1
    });
  }

  const START = performance.now();
  const DURATION = 4500;

  function draw(now) {
    const elapsed  = now - START;
    const progress = Math.min(elapsed / DURATION, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allDone = true;

    particles.forEach(p => {
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;
      p.alpha  = progress > 0.6 ? 1 - (progress - 0.6) / 0.4 : 1;
      if (p.y < canvas.height + 20) allDone = false;

      if (p.shape === 'rect') {
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      } else if (p.shape === 'circle') {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        makeStar(ctx, p.x, p.y, p.r + 2, p.color, Math.max(0, p.alpha));
      }
    });

    if (progress < 1) requestAnimationFrame(draw);
    else canvas.remove();
  }
  requestAnimationFrame(draw);
}

/* ── 2. Contador regresivo ───────────────────────────────────── */
const WC_START = new Date('2026-06-11T18:00:00-05:00');

function updateCountdown() {
  const el = document.getElementById('worldcup-countdown');
  if (!el) return;
  const now  = new Date();
  const diff = WC_START - now;

  if (diff <= 0) {
    el.innerHTML = `
      <div class="wc-countdown-label">🏆 ¡El Mundial ya comenzó!</div>
      <div style="font-family:'Bebas Neue',cursive;font-size:1.6rem;color:#F7C948;letter-spacing:3px;">¡Pedí tu pizza y disfrutá cada partido!</div>
    `;
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const pad = n => String(n).padStart(2, '0');

  const setNum = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prev = el.textContent;
    el.textContent = pad(val);
    if (prev !== pad(val)) {
      el.classList.remove('pulse');
      void el.offsetWidth;
      el.classList.add('pulse');
      setTimeout(() => el.classList.remove('pulse'), 600);
    }
  };

  setNum('wc-days', days);
  setNum('wc-hours', hours);
  setNum('wc-minutes', minutes);
  setNum('wc-seconds', seconds);
}

/* ── 3. Ticker de países ─────────────────────────────────────── */
function buildTicker() {
  const countries = [
    {flag:'🇦🇷', name:'Argentina'}, {flag:'🇧🇷', name:'Brasil'},
    {flag:'🇫🇷', name:'Francia'},   {flag:'🇬🇧', name:'Inglaterra'},
    {flag:'🇪🇸', name:'España'},    {flag:'🇩🇪', name:'Alemania'},
    {flag:'🇵🇹', name:'Portugal'},  {flag:'🇳🇱', name:'Países Bajos'},
    {flag:'🇺🇾', name:'Uruguay'},   {flag:'🇨🇴', name:'Colombia'},
    {flag:'🇲🇽', name:'México'},    {flag:'🇺🇸', name:'USA'},
    {flag:'🇨🇦', name:'Canadá'},    {flag:'🇯🇵', name:'Japón'},
    {flag:'🇸🇦', name:'Arabia Saudita'},{flag:'🇲🇦', name:'Marruecos'},
    {flag:'🇸🇳', name:'Senegal'},   {flag:'🇰🇷', name:'Corea del Sur'},
    {flag:'🇦🇺', name:'Australia'}, {flag:'🇨🇭', name:'Suiza'},
    {flag:'🇧🇪', name:'Bélgica'},   {flag:'🇭🇷', name:'Croacia'},
    {flag:'🇸🇷', name:'Surinam'},   {flag:'🇪🇨', name:'Ecuador'},
    {flag:'🇵🇦', name:'Panamá'},    {flag:'🇵🇪', name:'Perú'},
    {flag:'🇨🇱', name:'Chile'},     {flag:'🇳🇬', name:'Nigeria'},
    {flag:'🇨🇮', name:'Costa de Marfil'},{flag:'🇬🇭', name:'Ghana'},
    {flag:'🇹🇷', name:'Turquía'},   {flag:'🇦🇹', name:'Austria'},
  ];
  const el = document.getElementById('wc-ticker-track');
  if (!el) return;
  const doubled = [...countries, ...countries];
  el.innerHTML = doubled.map((c, i) =>
    `<span class="wc-ticker-item"><span class="flag">${c.flag}</span>${c.name}</span>${i < doubled.length - 1 ? '<span class="wc-ticker-sep">⚽</span>' : ''}`
  ).join('');
}

/* ── 4. Estrellas animadas en el hero ────────────────────────── */
function buildStars() {
  const container = document.getElementById('wc-stars');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.classList.add('wc-star');
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur:   ${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 5).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
}

/* ── 5. Logo SVG Mundial 2026 ───────────────────────────────── */
function buildWCLogo() {
  const el = document.getElementById('wc-logo-container');
  if (!el) return;
  el.innerHTML = `
    <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:360px;filter:drop-shadow(0 0 20px rgba(247,201,72,0.4))">
      <defs>
        <linearGradient id="wc-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#F7C948"/>
          <stop offset="50%"  stop-color="#e6a800"/>
          <stop offset="100%" stop-color="#F7C948"/>
        </linearGradient>
        <linearGradient id="wc-g2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#0B3D91"/>
          <stop offset="100%" stop-color="#1565c0"/>
        </linearGradient>
        <linearGradient id="wc-g3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#D72638"/>
          <stop offset="100%" stop-color="#b5001e"/>
        </linearGradient>
      </defs>

      <!-- Trofeo estilizado -->
      <g transform="translate(18, 8)">
        <!-- Copa -->
        <path d="M20 8 Q20 2 26 2 L42 2 Q48 2 48 8 L46 32 Q44 44 34 48 Q24 44 22 32 Z" fill="url(#wc-g1)" opacity="0.95"/>
        <!-- Brazos copa -->
        <path d="M20 12 Q10 12 10 22 Q10 34 20 36" stroke="url(#wc-g1)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M48 12 Q58 12 58 22 Q58 34 48 36" stroke="url(#wc-g1)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <!-- Pie copa -->
        <rect x="28" y="48" width="12" height="6" rx="1" fill="url(#wc-g1)"/>
        <rect x="22" y="54" width="24" height="4" rx="2" fill="url(#wc-g1)"/>
        <!-- 5 estrellas debajo -->
        <g fill="url(#wc-g1)" opacity="0.9">
          <text x="34" y="70" font-size="8" text-anchor="middle" fill="url(#wc-g1)">★ ★ ★ ★ ★</text>
        </g>
      </g>

      <!-- Texto FIFA WORLD CUP -->
      <text x="90" y="32" font-family="'Bebas Neue', cursive" font-size="12" fill="#F7C948" letter-spacing="3">FIFA WORLD CUP™</text>
      <!-- Año enorme -->
      <text x="86" y="78" font-family="'Bebas Neue', cursive" font-size="52" fill="url(#wc-g1)" letter-spacing="4">2026</text>
      <!-- USA · CANADA · MEXICO -->
      <text x="90" y="96" font-family="'Oswald', sans-serif" font-size="9.5" fill="rgba(255,255,255,0.7)" letter-spacing="2.5">🇺🇸 USA · 🇨🇦 CANADÁ · 🇲🇽 MÉXICO</text>
      <!-- Línea decorativa -->
      <line x1="86" y1="100" x2="310" y2="100" stroke="url(#wc-g1)" stroke-width="1.5" opacity="0.4"/>

      <!-- Balón de fútbol decorativo -->
      <g transform="translate(282, 28)">
        <circle cx="16" cy="16" r="15" fill="#fff" stroke="rgba(247,201,72,0.3)" stroke-width="1"/>
        <!-- Hexágonos del balón -->
        <polygon points="16,4 20,8 20,14 16,16 12,14 12,8" fill="#111" opacity="0.85"/>
        <polygon points="16,16 20,14 26,16 28,22 24,26 18,24" fill="#111" opacity="0.85"/>
        <polygon points="16,16 12,14 6,16 4,22 8,26 14,24" fill="#111" opacity="0.85"/>
        <polygon points="28,10 26,16 20,14 20,8 24,5" fill="#111" opacity="0.6"/>
        <polygon points="4,10 6,16 12,14 12,8 8,5" fill="#111" opacity="0.6"/>
        <!-- Brillo -->
        <ellipse cx="12" cy="10" rx="3" ry="2" fill="rgba(255,255,255,0.5)" transform="rotate(-30,12,10)"/>
      </g>
    </svg>
  `;
}

/* ── 6. Sección SEDES ────────────────────────────────────────── */
function buildSedes() {
  const el = document.getElementById('wc-sedes-grid');
  if (!el) return;
  const sedes = [
    { flag:'🇺🇸', city:'Nueva York',   country:'Estados Unidos', stadium:'MetLife Stadium', highlight:false },
    { flag:'🇺🇸', city:'Los Ángeles',  country:'Estados Unidos', stadium:'SoFi Stadium', highlight:false },
    { flag:'🇺🇸', city:'Dallas',       country:'Estados Unidos', stadium:'AT&T Stadium', highlight:false },
    { flag:'🇺🇸', city:'San Francisco',country:'Estados Unidos', stadium:'Levi\'s Stadium', highlight:false },
    { flag:'🇺🇸', city:'Miami',        country:'Estados Unidos', stadium:'Hard Rock Stadium', highlight:false },
    { flag:'🇺🇸', city:'Seattle',      country:'Estados Unidos', stadium:'Lumen Field', highlight:false },
    { flag:'🇺🇸', city:'Boston',       country:'Estados Unidos', stadium:'Gillette Stadium', highlight:false },
    { flag:'🇺🇸', city:'Atlanta',      country:'Estados Unidos', stadium:'Mercedes-Benz Stadium', highlight:false },
    { flag:'🇺🇸', city:'Kansas City',  country:'Estados Unidos', stadium:'Arrowhead Stadium', highlight:false },
    { flag:'🇨🇦', city:'Toronto',      country:'Canadá',        stadium:'BMO Field', highlight:false },
    { flag:'🇨🇦', city:'Vancouver',    country:'Canadá',        stadium:'BC Place', highlight:false },
    { flag:'🇲🇽', city:'Ciudad de México', country:'México',   stadium:'Estadio Azteca', highlight:false },
    { flag:'🇲🇽', city:'Guadalajara',  country:'México',        stadium:'Estadio Akron', highlight:false },
    { flag:'🇲🇽', city:'Monterrey',    country:'México',        stadium:'Estadio BBVA', highlight:false },
  ];
  el.innerHTML = sedes.map(s => `
    <div class="wc-sede-card${s.highlight ? ' wc-arg-highlight' : ''}">
      <span class="wc-sede-flag">${s.flag}</span>
      <div class="wc-sede-city">${s.city}</div>
      <div class="wc-sede-country">${s.country}</div>
      <div class="wc-sede-stadium">${s.stadium}</div>
    </div>
  `).join('');
}

/* ── 7. Inyectar segundos en el contador ─────────────────────── */
function patchCountdownHTML() {
  const c = document.getElementById('worldcup-countdown');
  if (!c) return;
  c.innerHTML = `
    <div class="wc-countdown-label">⚽ El MUNDIAL 2026 comienza en</div>
    <div class="wc-countdown-units">
      <div class="wc-unit">
        <div class="wc-unit-num" id="wc-days">00</div>
        <div class="wc-unit-text">Días</div>
      </div>
      <div class="wc-countdown-sep">:</div>
      <div class="wc-unit">
        <div class="wc-unit-num" id="wc-hours">00</div>
        <div class="wc-unit-text">Horas</div>
      </div>
      <div class="wc-countdown-sep">:</div>
      <div class="wc-unit">
        <div class="wc-unit-num" id="wc-minutes">00</div>
        <div class="wc-unit-text">Min</div>
      </div>
      <div class="wc-countdown-sep">:</div>
      <div class="wc-unit">
        <div class="wc-unit-num" id="wc-seconds">00</div>
        <div class="wc-unit-text">Seg</div>
      </div>
    </div>
  `;
}

/* ── 8. Añadir footer texto mundial ──────────────────────────── */
function patchFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const line = document.createElement('div');
  line.className = 'wc-footer-line';
  const text = document.createElement('p');
  text.className = 'wc-footer-text';
  text.innerHTML = `<span class="wc-footer-ball">⚽</span> EDICIÓN ESPECIAL MUNDIAL 2026 <span class="wc-footer-ball">🏆</span> PIZZAS CACHO <span class="wc-footer-ball">⚽</span>`;
  footer.prepend(text);
  footer.prepend(line);
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  createWorldCupConfetti();
  buildStars();
  buildWCLogo();
  buildTicker();
  buildSedes();
  patchCountdownHTML();
  patchFooter();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});