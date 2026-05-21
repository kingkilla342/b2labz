/* B2 LABZ — Inner Pages + App root */
const DATA2 = window.BBZ_DATA;

/* ════════════════════════════════════════════════
   PRICING — six service classes
   ════════════════════════════════════════════════ */
function PricingPage({ nav }) {
  window.useScrollReveal([]);
  return (
    <window.PageShell nav={nav} page="pricing" title="Pricing" sub="six classes, fixed price">
      <p style={{ fontSize: '1rem', color: 'var(--color-secondary-light)', lineHeight: 1.7, maxWidth: '58ch', marginBottom: 36 }}>
        Pick a build path that fits your stage. Every package ships with mobile-ready code,
        GitHub repo handoff, and a Vercel deployment. No surprise invoices.
      </p>

      <div className="card-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {DATA2.services.map((s, i) => (
          <article key={s.cls} className="card glass-strong reveal" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 360, transitionDelay: (i * 0.06) + 's' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', color: 'var(--color-accent)' }}>
                {s.cls}
              </span>
              <span className="tag">{s.tag}</span>
            </div>
            <h3 style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{s.name}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.6, minHeight: 60 }}>{s.desc}</p>
            <div className="divider" style={{ margin: '4px 0' }} />
            <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
              {s.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.78rem', color: 'var(--fg-secondary)' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', marginTop: 8, flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <div className="divider" style={{ marginBottom: 14 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 4 }}>FROM</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-accent)' }}>{s.price}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 4 }}>TIMELINE</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)' }}>{s.timeline}</div>
                </div>
              </div>
              <button className="btn-pri" onClick={() => nav('contact')} style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}>
                Choose {s.name} →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Add-ons strip */}
      <div style={{ marginTop: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 18 }}>
          Add-Ons
        </div>
        <div className="card-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { name: 'Rush Delivery', price: '+$300' },
            { name: 'Extra Page',    price: '+$180' },
            { name: 'Copywriting',   price: '+$240' },
            { name: 'Logo Refresh',  price: '+$200' },
            { name: 'Booking Setup', price: '+$150' },
            { name: 'SEO Starter',   price: '+$220' },
            { name: 'Google Profile',price: '+$120' },
            { name: 'Social Hub',    price: '+$90'  },
          ].map((a) => (
            <div key={a.name} className="card" style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{a.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-accent)' }}>{a.price}</span>
            </div>
          ))}
        </div>
      </div>
    </window.PageShell>
  );
}

/* ════════════════════════════════════════════════
   TEMPLATES — work gallery
   ════════════════════════════════════════════════ */
function TemplatesPage({ nav }) {
  window.useScrollReveal([]);
  return (
    <window.PageShell nav={nav} page="templates" title="Templates" sub="selected client builds">
      <p style={{ fontSize: '1rem', color: 'var(--color-secondary-light)', lineHeight: 1.7, maxWidth: '58ch', marginBottom: 36 }}>
        Every B2 Labz project starts from a real business problem and ships as a custom build.
        Here's a sample of what shipped — and a few starter templates you can adapt.
      </p>

      <div className="card-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {DATA2.work.map((w, i) => (
          <a key={w.name} className="card glass-strong reveal" onClick={() => nav('contact')} style={{
            display: 'flex', flexDirection: 'column',
            height: 320, overflow: 'hidden', padding: 0,
            transitionDelay: (i * 0.07) + 's',
          }}>
            <div className="work-thumb" style={{
              flex: 1,
              background: w.bg,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {w.img && (
                <img
                  src={w.img}
                  alt={w.name + ' — site preview'}
                  loading="lazy"
                  decoding="async"
                  className="work-thumb-img"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div className="work-thumb-tint" style={{ background: w.bg }} />
              <div style={{
                position: 'absolute', top: 14, left: 16,
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.85)', zIndex: 2,
                textShadow: '0 1px 6px rgba(0,0,0,0.65)',
              }}>
                {w.num} / 06
              </div>
              <div style={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
              }}>
                <span className="tag">CASE STUDY</span>
              </div>
            </div>
            <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>{w.name}</h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{w.cat}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
        <div style={{ maxWidth: '50ch' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}>
            Don't see your industry?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)' }}>
            Every site is custom-built. Send us your brief — we'll mock a direction within 48 hours.
          </p>
        </div>
        <button className="btn-pri" onClick={() => nav('contact')}>Send a Brief →</button>
      </div>
    </window.PageShell>
  );
}

/* ════════════════════════════════════════════════
   INFO — about, why, process, faq
   ════════════════════════════════════════════════ */
function InfoPage({ nav }) {
  const [openFaq, setOpenFaq] = React.useState(0);
  window.useScrollReveal([]);

  return (
    <window.PageShell nav={nav} page="info" title="Info" sub="who we are, how we work">
      {/* Founder note */}
      <div className="info-split card-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 14 }}>
            About
          </div>
          <p style={{ fontSize: '1.4rem', fontWeight: 400, lineHeight: 1.4, color: 'var(--fg-secondary)', letterSpacing: '-0.01em', marginBottom: 22 }}>
            B2 Labz was started because too many real businesses have a
            <span style={{ color: 'var(--color-accent)' }}> great offer </span>
            and a weak online presence.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: 22 }}>
            We use AI to move fast — Claude for planning + copy, Antigravity for the build,
            GitHub + Vercel for deployment — but every decision still gets human taste.
            The result is a site that loads quick, looks premium, and isn't locked into a
            template platform.
          </p>
          <button className="btn-pri" onClick={() => nav('contact')}>Start a Project →</button>
        </div>

        {/* Why list */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 14 }}>
            Why B2 Labz
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {DATA2.whyItems.map((w) => (
              <div key={w.ix} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
                padding: '16px 0', borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', color: 'var(--color-accent)', paddingTop: 4 }}>{w.ix}</div>
                <div>
                  <h5 style={{ fontSize: '0.92rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 3 }}>{w.title}</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process strip */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 18 }}>
          Process · Six Steps
        </div>
        <div className="card-grid-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {DATA2.process.map((p, i) => (
            <div key={p.n} className="card reveal" style={{ padding: '18px 16px', transitionDelay: (i * 0.05) + 's' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--color-accent)', marginBottom: 10 }}>{p.n}</div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 6 }}>{p.title}</h5>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 18 }}>
          FAQ
        </div>
        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {DATA2.faq.map((f, i) => (
            <div key={f.q} className="faq-row" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '18px 16px', cursor: 'none', borderRadius: 4 }}
                 onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em', color: openFaq === i ? 'var(--color-accent)' : 'var(--fg-primary)', transition: 'color 0.2s' }}>{f.q}</h4>
                <div style={{
                  width: 26, height: 26, flexShrink: 0,
                  borderRadius: '50%', border: '1px solid var(--border-default)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-accent)', fontSize: '0.9rem',
                  transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s var(--ease-out)',
                }}>+</div>
              </div>
              <div style={{
                maxHeight: openFaq === i ? 260 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.45s var(--ease-out)',
              }}>
                <p style={{ paddingTop: 14, fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '72ch' }}>
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </window.PageShell>
  );
}

/* ════════════════════════════════════════════════
   CONTACT — intake form
   ════════════════════════════════════════════════ */
function ContactPage({ nav }) {
  const [sent, setSent] = React.useState(false);
  window.useScrollReveal([]);
  return (
    <window.PageShell nav={nav} page="contact" title="Contact" sub="send a brief, reply in 24h">
      <div className="info-split card-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56 }}>
        {/* Left: contact info */}
        <div>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-secondary-light)', lineHeight: 1.7, marginBottom: 30, maxWidth: '40ch' }}>
            Tell us what you do, who it's for, and the feel you're after. We'll reply
            with a recommended class and the next steps.
          </p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { lbl: 'EMAIL',    val: 'hello@b2labz.com' },
              { lbl: 'REPLY',    val: '< 24 hours' },
              { lbl: 'BASED',    val: 'Remote · Worldwide' },
              { lbl: 'HOURS',    val: 'Mon–Fri · 09–18' },
            ].map((b) => (
              <div key={b.lbl} style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'var(--color-muted-purple)', minWidth: 60 }}>
                  {b.lbl}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--fg-primary)' }}>{b.val}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'var(--color-muted-purple)', marginBottom: 12 }}>SOCIAL</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Instagram', 'Behance', 'LinkedIn', 'TikTok'].map((s) => (
                <button key={s} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass-strong" style={{ display: 'grid', gap: 14, padding: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="card-grid-2">
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>YOUR NAME</label>
              <input className="bbz-input" placeholder="Jane Atlantis" />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>EMAIL</label>
              <input className="bbz-input" type="email" placeholder="you@email.com" />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>BRAND / BUSINESS</label>
            <input className="bbz-input" placeholder="What's the name of the thing you're building?" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="card-grid-2">
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>CLASS</label>
              <select className="bbz-input" defaultValue="">
                <option value="" disabled>Pick a class…</option>
                {DATA2.services.map((s) => (
                  <option key={s.cls} value={s.cls}>{s.cls} · {s.name} · {s.price}</option>
                ))}
                <option value="unsure">Not sure — recommend one</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>TIMELINE</label>
              <select className="bbz-input" defaultValue="">
                <option value="" disabled>How fast?</option>
                <option>ASAP (rush)</option>
                <option>2–4 weeks</option>
                <option>1–2 months</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)', marginBottom: 6 }}>WHAT SHOULD YOUR SITE DO?</label>
            <textarea className="bbz-input" placeholder="Get bookings, sell products, build trust, show portfolio… what does success look like?" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, gap: 14, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--color-muted-purple)' }}>
              {sent ? '✓ MESSAGE QUEUED — REPLY WITHIN 24H' : 'DEPOSIT COLLECTED AFTER SCOPE AGREED'}
            </div>
            <button type="submit" className="btn-pri">{sent ? 'Sent' : 'Send Brief'} →</button>
          </div>
        </form>
      </div>
    </window.PageShell>
  );
}

/* ════════════════════════════════════════════════
   TWEAKS — palette schemes (Atlantis variants)
   ════════════════════════════════════════════════ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scheme": "Atlantis"
}/*EDITMODE-END*/;

const COLOR_SCHEMES = {
  'Atlantis':    { base:'#03101F', surface:'#06223A', elevated:'#0A3656', accent:'#2EE6D0', dim:'#14B8A6' },
  'Abyss':       { base:'#01070F', surface:'#031A2C', elevated:'#053148', accent:'#19D5F0', dim:'#0EA5B7' },
  'Reef':        { base:'#031211', surface:'#062B24', elevated:'#0A4838', accent:'#34F0AF', dim:'#16C387' },
  'Lagoon':      { base:'#021018', surface:'#06283C', elevated:'#0B4358', accent:'#5BE9F0', dim:'#22BDC5' },
  'Storm':       { base:'#080F1A', surface:'#0F1E33', elevated:'#172E4A', accent:'#7DD3FC', dim:'#38BDF8' },
};

function applyScheme(name) {
  const s = COLOR_SCHEMES[name];
  if (!s) return;
  const r = document.documentElement.style;
  r.setProperty('--site-base',       s.base);
  r.setProperty('--site-surface',    s.surface);
  r.setProperty('--site-elevated',   s.elevated);
  r.setProperty('--site-accent',     s.accent);
  r.setProperty('--site-accent-dim', s.dim);
}

function TweaksPanel({ visible, scheme, setScheme }) {
  if (!visible) return null;
  return (
    <div className="glass-strong" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
      padding: '18px 18px 14px',
      minWidth: 220,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-purple)', marginBottom: 12 }}>Tweaks · Palette</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Object.keys(COLOR_SCHEMES).map((name) => {
          const s = COLOR_SCHEMES[name];
          const active = scheme === name;
          return (
            <button key={name} onClick={() => {
              setScheme(name);
              applyScheme(name);
              window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { scheme: name } }, '*');
            }} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none',
              padding: '6px 0', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                {[s.base, s.surface, s.elevated, s.accent].map((c, i) => (
                  <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: active ? 'var(--fg-primary)' : 'var(--color-muted-purple)', fontWeight: active ? 500 : 400 }}>
                {name}
              </span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', marginLeft: 'auto' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT
   ════════════════════════════════════════════════ */
const STORAGE_KEY = 'bbz-page';
const VALID_PAGES = ['home', 'pricing', 'templates', 'info', 'contact'];

function readInitialPage() {
  const hash = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#/, '');
  if (VALID_PAGES.includes(hash)) return hash;
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  return VALID_PAGES.includes(stored) ? stored : 'home';
}

function App() {
  const [page, setPage] = React.useState(readInitialPage);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);
  const [scheme, setScheme] = React.useState(() => TWEAK_DEFAULTS.scheme || 'Atlantis');

  React.useEffect(() => {
    applyScheme(scheme);
  }, []);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '');
      if (VALID_PAGES.includes(h) && h !== page) setPage(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [page]);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const nav = React.useCallback((p) => {
    setPage(p);
    localStorage.setItem(STORAGE_KEY, p);
    const newHash = p === 'home' ? '' : '#' + p;
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash || window.location.pathname);
    }
  }, []);

  const pages = {
    home:      (props) => <window.Home {...props} />,
    pricing:   (props) => <PricingPage   {...props} />,
    templates: (props) => <TemplatesPage {...props} />,
    info:      (props) => <InfoPage      {...props} />,
    contact:   (props) => <ContactPage   {...props} />,
  };

  const Page = pages[page] || pages.home;

  return (
    <>
      <window.OceanBackground page={page} />
      <window.Cursor />
      <window.CursorStar />
      <div key={page} style={{ position: 'relative', zIndex: 1, animation: 'pageIn 0.55s var(--ease-out) forwards' }}>
        <Page nav={nav} />
      </div>
      <TweaksPanel visible={tweaksVisible} scheme={scheme} setScheme={setScheme} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
