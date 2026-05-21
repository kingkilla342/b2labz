/* B2 LABZ — Atlantis Edition · Multi-page SPA */
const { useState, useEffect, useRef, useCallback } = React;
const DATA = window.BBZ_DATA;

/* ════════════════════════════════════════════════
   CURSOR — atom-star sparkle + ring, lightweight
   No spinning/orbit animations. Just translate.
   ════════════════════════════════════════════════ */
function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let rx = -50,ry = -50,mx = -50,my = -50,raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX;my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };

    /* Event delegation — no MutationObserver, no per-element bind */
    const hoverable = 'button, a, [data-hover], input, textarea, select, .glass-strong, .card';
    const onOver = (e) => {
      if (e.target.closest && e.target.closest(hoverable)) {
        dot.classList.add('expanded');ring.classList.add('expanded');
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(hoverable)) {
        if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(hoverable)) {
          dot.classList.remove('expanded');ring.classList.remove('expanded');
        }
      }
    };

    const loop = () => {
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/* ════════════════════════════════════════════════
   VIEWPORT — recompute size on resize
   ════════════════════════════════════════════════ */
function useViewport() {
  const [v, setV] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    return { w, mobile: w <= 800, tablet: w > 800 && w <= 1024 };
  });
  useEffect(() => {
    let t;
    const onR = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const w = window.innerWidth;
        setV({ w, mobile: w <= 800, tablet: w > 800 && w <= 1024 });
      }, 80);
    };
    window.addEventListener('resize', onR);
    return () => {window.removeEventListener('resize', onR);clearTimeout(t);};
  }, []);
  return v;
}

/* ── ATOM-STAR markup (3 orbital rings + glowing nucleus) ── */
function CursorStar() {
  return ReactDOM.createPortal(
    <svg viewBox="-30 -30 60 60">
      {/* Three orbital ellipses crossing through the nucleus */}
      <ellipse className="orbit" cx="0" cy="0" rx="24" ry="9" transform="rotate(0)" />
      <ellipse className="orbit orbit-2" cx="0" cy="0" rx="24" ry="9" transform="rotate(60)" />
      <ellipse className="orbit orbit-3" cx="0" cy="0" rx="24" ry="9" transform="rotate(-60)" />
      {/* Sparkle highlights on the orbits */}
      <circle className="spark" cx="22" cy="0" r="1.4" />
      <circle className="spark" cx="-12" cy="-19" r="1.2" />
      <circle className="spark" cx="-12" cy="19" r="1.2" />
      {/* Bright nucleus */}
      <circle className="nucleus" cx="0" cy="0" r="2.6" />
    </svg>,
    document.getElementById('cursor-dot')
  );
}

/* ════════════════════════════════════════════════
   CLOCK
   ════════════════════════════════════════════════ */
function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-US',
    { hour: '2-digit', minute: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 30000); // 2 ticks/min is plenty
    return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

/* ════════════════════════════════════════════════
   OCEAN BACKGROUND — site-wide animated Atlantis scene
   Layers: depth vignette · god rays · caustics · plankton ·
   distant deep shark · bubbles · foreground swimming shark.
   Mounted once at the App root; CSS does the heavy lifting.
   ════════════════════════════════════════════════ */
function SharkSVG({ flip = false }) {
  const id = flip ? 'shark-deep-grad' : 'shark-grad';
  return (
    <svg viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1c4a6a" />
          <stop offset="38%"  stopColor="#0c2c4a" />
          <stop offset="70%"  stopColor="#061a30" />
          <stop offset="100%" stopColor="#020a17" />
        </linearGradient>
        <radialGradient id={id + '-glow'} cx="40%" cy="35%" r="70%">
          <stop offset="0%"   stopColor="rgba(124,245,220,0.55)" />
          <stop offset="55%"  stopColor="rgba(46,230,208,0.10)" />
          <stop offset="100%" stopColor="rgba(46,230,208,0)" />
        </radialGradient>
        <linearGradient id={id + '-belly'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(199,239,234,0)" />
          <stop offset="100%" stopColor="rgba(199,239,234,0.22)" />
        </linearGradient>
      </defs>

      <path d="M 12 60 C 30 38, 70 28, 120 38 L 168 32 C 178 30, 184 40, 178 50 L 178 64 C 184 74, 178 84, 168 82 L 120 76 C 70 86, 30 76, 12 60 Z"
            fill={`url(#${id})`} />

      <path d="M 12 60 C 30 38, 70 28, 120 38 L 168 32 C 178 30, 184 40, 178 50 L 178 64 C 184 74, 178 84, 168 82 L 120 76 C 70 86, 30 76, 12 60 Z"
            fill={`url(#${id}-glow)`} className="body-glow" />

      <path d="M 30 64 C 70 78, 130 74, 170 60 C 130 80, 70 84, 30 64 Z"
            fill={`url(#${id}-belly)`} opacity="0.6" />

      <path d="M 90 32 L 108 6 L 122 34 Z" fill="#0a2a44" />
      <path d="M 70 72 L 92 100 L 108 76 Z" fill="#06192b" />

      <g stroke="#02060e" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 38 56 Q 36 60 38 64" />
        <path d="M 44 56 Q 42 60 44 64" />
        <path d="M 50 56 Q 48 60 50 64" />
      </g>
      <path d="M 14 64 Q 22 66 32 62" stroke="#02060e" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />

      <circle cx="28"   cy="52"   r="2.1" fill="#02060e" />
      <circle cx="28.6" cy="51.4" r="0.7" fill="#2EE6D0" />

      <g className="tail-group">
        <path d="M 178 50 L 215 18 L 208 60 L 215 100 L 178 64 Z" fill={`url(#${id})`} />
        <path d="M 178 50 L 215 18 L 208 60 Z" fill="rgba(124,245,220,0.08)" />
      </g>
    </svg>
  );
}

function AtlantisRuins({ depth = 'front' }) {
  /* Static SVG silhouette of a sunken city — temple, columns, dome,
     scattered ruins. Two depths layered for parallax: 'mid' (further,
     fainter, slightly blurred) and 'front' (closer, darker, sharper). */
  const id = 'ruins-' + depth;
  const topStop = depth === 'front' ? '#0a2942' : '#0e3a5c';
  const botStop = depth === 'front' ? '#01060e' : '#031526';

  return (
    <svg className={'ruins ruins-' + depth}
         viewBox="0 0 1920 540"
         preserveAspectRatio="xMidYEnd slice"
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">
      <defs>
        <linearGradient id={id + '-grad'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={topStop} />
          <stop offset="60%" stopColor={botStop} />
          <stop offset="100%" stopColor="#000308" />
        </linearGradient>
        <linearGradient id={id + '-rim'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(124,245,220,0.35)" />
          <stop offset="100%" stopColor="rgba(124,245,220,0)" />
        </linearGradient>
      </defs>

      <g fill={'url(#' + id + '-grad)'}>
        {/* Sea-floor base */}
        <path d="M 0 440 Q 480 420 960 442 T 1920 438 L 1920 540 L 0 540 Z" />

        {/* — LEFT FIELD — scattered short pillars + low wall */}
        <rect x="40"  y="400" width="36" height="40"  rx="2" />
        <rect x="32"  y="396" width="52" height="10" />
        <path d="M 110 405 L 140 372 L 168 392 L 196 360 L 224 388 L 252 370 L 280 400 L 110 400 Z" /> {/* broken wall ridge */}
        <rect x="120" y="400" width="160" height="42" />

        {/* Standing column with capital */}
        <rect x="306" y="296" width="46" height="146" />
        <rect x="296" y="286" width="66" height="14" />
        <rect x="296" y="280" width="66" height="6" />
        <rect x="312" y="296" width="6" height="146" fill="#000308" opacity="0.5" /> {/* flute shadow */}

        {/* Big arched gateway (broken pediment) */}
        <path d="M 396 442 L 396 232
                 Q 396 196 432 196
                 L 504 196
                 Q 540 196 540 232
                 L 540 442
                 L 510 442
                 L 510 280
                 Q 468 254 426 280
                 L 426 442 Z" />
        <rect x="386" y="220" width="160" height="14" />

        {/* — CENTRAL TEMPLE — wide stepped base + colonnade + pediment */}
        {/* Stepped platform */}
        <rect x="556" y="404" width="780" height="38" />
        <rect x="572" y="386" width="748" height="20" />
        <rect x="588" y="368" width="716" height="20" />

        {/* 8 fluted columns */}
        {[612, 700, 788, 876, 964, 1052, 1140, 1228].map((x) => (
          <g key={x}>
            <rect x={x} y="208" width="50" height="160" />
            <rect x={x - 6} y="194" width="62" height="14" />
            <rect x={x - 6} y="188" width="62" height="6" />
            <rect x={x + 4} y="208" width="6" height="160" fill="#000308" opacity="0.45" />
            <rect x={x + 22} y="208" width="6" height="160" fill="#000308" opacity="0.35" />
            <rect x={x + 40} y="208" width="6" height="160" fill="#000308" opacity="0.45" />
          </g>
        ))}

        {/* Architrave + frieze */}
        <rect x="596" y="172" width="694" height="18" />
        <rect x="596" y="158" width="694" height="14" />

        {/* Triangular pediment — broken at the apex */}
        <path d="M 596 158 L 880 64 L 920 78 L 944 60 L 980 80 L 1290 158 Z" />

        {/* — RIGHT SIDE — domed temple */}
        <rect x="1376" y="324" width="248" height="120" />
        <path d="M 1376 324
                 Q 1500 194 1624 324 Z" />
        <rect x="1488" y="252" width="24" height="74" />
        <path d="M 1488 252 L 1500 220 L 1512 252 Z" />
        <rect x="1376" y="324" width="248" height="6" />

        {/* Two flanking columns next to dome */}
        <rect x="1340" y="284" width="34" height="160" />
        <rect x="1334" y="276" width="46" height="10" />
        <rect x="1626" y="284" width="34" height="160" />
        <rect x="1622" y="276" width="46" height="10" />

        {/* — FAR RIGHT — broken pillars + scattered blocks */}
        <rect x="1696" y="358" width="42" height="86" />
        <path d="M 1696 358 L 1708 346 L 1720 360 L 1738 348 L 1738 358 Z" />

        <rect x="1772" y="396" width="34" height="46" />
        <rect x="1768" y="392" width="42" height="8" />

        <rect x="1830" y="316" width="46" height="128" />
        <rect x="1822" y="306" width="62" height="12" />

        {/* Scattered floor blocks (gives the seafloor "rubble" texture) */}
        <rect x="170" y="430" width="76" height="14" />
        <rect x="264" y="432" width="48" height="12" />
        <rect x="492" y="430" width="62" height="14" />
        <rect x="1316" y="430" width="74" height="14" />
        <rect x="1416" y="434" width="38" height="10" />
        <rect x="1710" y="432" width="58" height="12" />
      </g>

      {/* Top-edge rim light: subtle teal cast on column tops mimicking god rays */}
      <g fill={'url(#' + id + '-rim)'} opacity="0.55">
        {[612, 700, 788, 876, 964, 1052, 1140, 1228].map((x) => (
          <rect key={x} x={x - 6} y="188" width="62" height="6" />
        ))}
        <rect x="306" y="280" width="56" height="6" />
        <rect x="1334" y="276" width="46" height="6" />
        <rect x="1622" y="276" width="46" height="6" />
      </g>
    </svg>
  );
}

function OceanBackground() {
  const bubbles = [
    { cls: 'b1', left: '6%',  size: 18, dur: 16, delay: 0  },
    { cls: 'b2', left: '14%', size: 10, dur: 22, delay: 4  },
    { cls: 'b3', left: '28%', size: 6,  dur: 14, delay: 2  },
    { cls: 'b4', left: '38%', size: 22, dur: 26, delay: 6  },
    { cls: 'b5', left: '52%', size: 8,  dur: 18, delay: 1  },
    { cls: 'b6', left: '64%', size: 14, dur: 24, delay: 8  },
    { cls: 'b7', left: '78%', size: 9,  dur: 20, delay: 3  },
    { cls: 'b8', left: '90%', size: 16, dur: 28, delay: 10 },
  ];

  return (
    <div id="ocean-bg" aria-hidden="true">
      {/* Back → front:
         depth vignette → mid ruins (parallax) → god rays → deep shark
         → foreground shark → front ruins → bubbles + plankton */}
      <div className="ocean-depth" />

      <AtlantisRuins depth="mid" />

      <div className="ocean-rays" />

      <div className="shark shark-deep">
        <SharkSVG flip />
      </div>

      <div className="shark-track">
        <div className="shark">
          <SharkSVG />
        </div>
      </div>

      <AtlantisRuins depth="front" />

      <div className="ocean-particles" />

      <div className="ocean-bubbles">
        {bubbles.map((b) => (
          <div key={b.cls} className={'bubble ' + b.cls} style={{
            left: b.left,
            width: b.size, height: b.size,
            animationDuration: b.dur + 's',
            animationDelay: '-' + b.delay + 's',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   AMBIENT GLOW (one blob, no animation)
   ════════════════════════════════════════════════ */
function GlowAmbient() {
  return (
    <div className="glow" style={{
      width: '55vw', height: '55vw',
      background: 'radial-gradient(ellipse, rgba(46,230,208,0.18) 0%, transparent 70%)',
      top: '-12vw', right: '-8vw'
    }} />);

}

/* ════════════════════════════════════════════════
   HOME — bottom-left headline, bottom-right nav
   ════════════════════════════════════════════════ */
function Home({ nav }) {
  const [in_, setIn] = useState(false);
  useEffect(() => {requestAnimationFrame(() => setIn(true));}, []);

  const navItems = [
  { label: 'Pricing', page: 'pricing' },
  { label: 'Templates', page: 'templates' },
  { label: 'Info', page: 'info' },
  { label: 'Contact', page: 'contact' }];


  const show = (delay) => ({
    opacity: in_ ? 1 : 0,
    transform: in_ ? 'none' : 'translateY(16px)',
    transition: `opacity 0.7s ${delay}s var(--ease-out), transform 0.7s ${delay}s var(--ease-out)`
  });

  const { mobile: isMobile, tablet: isTablet } = useViewport();

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0 24px' }}>
        <GlowAmbient />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, flexShrink: 0 }}>
          <div className="glass-faint" style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.16em', color: 'var(--fg-primary)' }}>B2 · LABZ</div>
          <div className="glass-faint" style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.10em', color: 'var(--fg-primary)' }}><Clock /></div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.25rem', color: 'var(--color-accent)', marginBottom: 6, ...show(0.15) }}>
            atlantis edition,
          </div>
          <div className="home-headline" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.9, fontSize: 'clamp(2.2rem, 10vw, 4rem)', color: 'var(--fg-primary)', ...show(0.25) }}>
            Premium <span className="script" style={{ fontSize: '1.05em' }}>websites</span><br />built faster<br />with AI.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 34, flexShrink: 0 }}>
          {navItems.map((item, i) =>
          <button key={item.page} onClick={() => nav(item.page)} style={{
            background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 0', borderBottom: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700,
            letterSpacing: '-0.02em', color: 'var(--fg-primary)',
            opacity: in_ ? 1 : 0, transition: `opacity 0.6s ${0.4 + i * 0.07}s var(--ease-out)`
          }}>
              {item.label}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent)' }}>→</span>
            </button>
          )}
        </div>
      </div>);

  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <GlowAmbient />

      {/* secondary subtle glow bottom-left for depth behind glass */}
      <div className="glow" style={{
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse, rgba(88,214,255,0.10) 0%, transparent 70%)',
        bottom: '-10vw', left: '-8vw', opacity: 0.55
      }} />

      {/* Top-left logo (in a glass chip) */}
      <div style={{ position: 'absolute', top: 38, left: isTablet ? 32 : 48, ...show(0.05) }}>
        <div className="glass-faint" style={{
          padding: '10px 18px',
          fontFamily: 'var(--font-mono)', fontWeight: 500,
          letterSpacing: '0.20em', color: 'var(--fg-primary)', fontSize: "10px"
        }}>B2 · LABZ</div>
      </div>

      {/* Top-right clock (bigger digits) */}
      <div style={{ position: 'absolute', top: 38, right: isTablet ? 32 : 48, ...show(0.05) }}>
        <div className="glass-faint" style={{
          padding: '10px 18px',
          fontWeight: 500,
          letterSpacing: '0.10em',
          color: 'var(--fg-primary)', fontSize: "18px", fontFamily: "Karla"
        }}>
          <Clock />
        </div>
      </div>

      {/* Bottom-left headline (smaller, with script flourish) */}
      <div style={{ position: 'absolute', bottom: isTablet ? 32 : 52, left: isTablet ? 32 : 48, display: 'flex', flexDirection: 'column', maxWidth: isTablet ? '50vw' : '46vw' }}>
        <div style={{ fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 4, lineHeight: 1, ...show(0.2), fontSize: "26px" }}>
          atlantis edition,
        </div>
        <div className="home-headline" style={{ fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.9, color: 'var(--fg-primary)', ...show(0.3), fontFamily: "Manrope", fontSize: "44px" }}>
          Premium <span className="script" style={{ fontSize: '1.1em', color: 'var(--color-accent)' }}>websites</span><br />
          built faster<br />
          with AI.
        </div>
        <div style={{ marginTop: 22, fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'var(--color-secondary-light)', maxWidth: 380, lineHeight: 1.55, ...show(0.42) }}>
          B2 Labz builds clean, modern websites for businesses, creators and brands — without the tech stress.
        </div>
      </div>

      {/* Bottom-right large nav (no numbers, bigger labels) */}
      <div style={{ position: 'absolute', bottom: isTablet ? 32 : 52, right: isTablet ? 32 : 56, display: 'flex', flexDirection: 'column', gap: isTablet ? 8 : 14, alignItems: 'flex-end', color: "rgb(4, 55, 55)", fontFamily: "Merriweather", fontSize: "6px" }}>
        {navItems.map((item, i) =>
        <button key={item.page} className="nav-btn" onClick={() => nav(item.page)} style={{
          fontSize: isTablet ? '1.35rem' : '2rem', fontWeight: 700, letterSpacing: '-0.03em', gap: 18,
          opacity: in_ ? 1 : 0, transform: in_ ? 'none' : 'translateX(14px)',
          transition: `opacity 0.7s ${0.4 + i * 0.08}s var(--ease-out), transform 0.7s ${0.4 + i * 0.08}s var(--ease-out)`, fontFamily: "\"Crimson Text\""
        }}>
            {item.label}
            <div className="arrow" style={{ width: isTablet ? 26 : 36 }} />
          </button>
        )}
      </div>
    </div>);

}

/* ════════════════════════════════════════════════
   PAGE SHELL — top bar + title + scroll content
   ════════════════════════════════════════════════ */
function PageShell({ nav, page, title, sub, children }) {
  const [in_, setIn] = useState(false);
  useEffect(() => {requestAnimationFrame(() => setIn(true));}, []);

  const links = [
  { label: 'Pricing', page: 'pricing' },
  { label: 'Templates', page: 'templates' },
  { label: 'Info', page: 'info' },
  { label: 'Contact', page: 'contact' }];


  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <GlowAmbient />

      {/* Top bar */}
      <header className="shell-topbar glass-strong" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
        position: 'relative', zIndex: 5
      }}>
        <button onClick={() => nav('home')} style={{
          background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'var(--color-secondary-light)',
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.18em',
          transition: 'color var(--duration-fast)'
        }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="13" y1="5" x2="1" y2="5" /><polyline points="5 1 1 5 5 9" />
          </svg>
          B2 · LABZ
        </button>

        <nav className="shell-nav" style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => {
            const active = l.page === page;
            return (
              <button key={l.page} onClick={() => nav(l.page)} style={{
                background: 'none', border: 'none',
                fontFamily: 'var(--font-sans)', fontSize: '0.85rem',
                fontWeight: active ? 500 : 400,
                letterSpacing: '0.04em',
                color: active ? 'var(--fg-primary)' : 'var(--color-secondary-light)',
                transition: 'color var(--duration-fast)'
              }}>
                {l.label}
              </button>);

          })}
        </nav>

        <div className="shell-clock" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', letterSpacing: '0.10em', color: 'var(--fg-primary)', fontWeight: 500 }}>
          <Clock />
        </div>
      </header>

      {/* Title */}
      <div className="shell-title-wrap" style={{
        flexShrink: 0,
        opacity: in_ ? 1 : 0, transform: in_ ? 'none' : 'translateY(14px)',
        transition: 'opacity 0.6s 0.05s var(--ease-out), transform 0.6s 0.05s var(--ease-out)'
      }}>
        {sub &&
        <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-accent)', marginBottom: 4, lineHeight: 1 }}>
            {sub}
          </div>
        }
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.95 }}>
          {title}
        </h1>
      </div>

      {/* Scrollable content */}
      <main className="shell-content" style={{
        flex: 1, overflowY: 'auto',
        opacity: in_ ? 1 : 0, transform: in_ ? 'none' : 'translateY(18px)',
        transition: 'opacity 0.65s 0.12s var(--ease-out), transform 0.65s 0.12s var(--ease-out)'
      }}>
        {children}
      </main>
    </div>);

}

Object.assign(window, { Cursor, CursorStar, Clock, GlowAmbient, OceanBackground, Home, PageShell });