// Apex page — final, focused. Polished type + spacing, four new sections.

function ApexPage({ accent, theme, typePreset }) {
  const t = useTelemetry();
  const isDark = theme === 'dark';
  // Design tokens
  const C = {
    bg: isDark ? '#0a0a0c' : '#f4f3ef',
    surface: isDark ? '#111114' : '#ffffff',
    fg: isDark ? '#fafafa' : '#0a0a0a',
    dim: isDark ? 'rgba(250,250,250,0.55)' : 'rgba(10,10,10,0.55)',
    faint: isDark ? 'rgba(250,250,250,0.35)' : 'rgba(10,10,10,0.35)',
    hair: isDark ? 'rgba(250,250,250,0.08)' : 'rgba(10,10,10,0.08)',
    hairStrong: isDark ? 'rgba(250,250,250,0.14)' : 'rgba(10,10,10,0.14)',
    accent,
    invBg: isDark ? '#f4f3ef' : '#0a0a0c',
    invFg: isDark ? '#0a0a0a' : '#fafafa',
  };
  const mono = '"JetBrains Mono", monospace';
  const display = typePreset === 'editorial' ? '"Fraunces", serif'
    : typePreset === 'performance' ? '"Barlow Condensed", sans-serif'
    : '"IBM Plex Sans", sans-serif';
  const italicize = { fontStyle: display.includes('Fraunces') ? 'italic' : 'normal', fontWeight: 700 };

  const PAD = '0 clamp(32px, 5vw, 80px)';
  const MAX = 1440;

  return (
    <div style={{ background: C.bg, color: C.fg, fontFamily: display, minHeight: '100vh' }}>
      <Nav C={C} mono={mono} />
      <Hero C={C} mono={mono} display={display} italicize={italicize} t={t} PAD={PAD} MAX={MAX} />
      <PriceCompare C={C} mono={mono} display={display} italicize={italicize} PAD={PAD} MAX={MAX} />
      <Presets C={C} mono={mono} display={display} italicize={italicize} t={t} PAD={PAD} MAX={MAX} />
      <TryIt C={C} mono={mono} display={display} italicize={italicize} t={t} PAD={PAD} MAX={MAX} />
      <Studio C={C} mono={mono} display={display} italicize={italicize} t={t} PAD={PAD} MAX={MAX} />
      <Install C={C} mono={mono} display={display} italicize={italicize} PAD={PAD} MAX={MAX} />
      <Vehicles C={C} mono={mono} display={display} italicize={italicize} PAD={PAD} MAX={MAX} />
      <Reviews C={C} mono={mono} display={display} italicize={italicize} PAD={PAD} MAX={MAX} />
      <FinalCTA C={C} mono={mono} display={display} italicize={italicize} PAD={PAD} MAX={MAX} />
      <Footer C={C} mono={mono} display={display} PAD={PAD} MAX={MAX} />
    </div>
  );
}

// ───── Nav ─────
function Nav({ C, mono }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '24px clamp(32px, 5vw, 80px)',
    }}>
      <RDMLogo height={30} />
      <div style={{ display: 'flex', gap: 36, fontFamily: mono, fontSize: 11, letterSpacing: 3, color: '#fafafa', textTransform: 'uppercase' }}>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>Products</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>RDM Studio</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>Support</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>Downloads</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
      </div>
      <button style={{
        fontFamily: mono, fontSize: 11, letterSpacing: 3, color: '#fafafa',
        background: 'transparent', border: '1px solid rgba(250,250,250,0.35)',
        padding: '10px 18px', textTransform: 'uppercase', fontWeight: 600,
      }}>Shop RDM-7 →</button>
    </div>
  );
}

// ───── Hero ─────
function Hero({ C, mono, display, italicize, t, PAD, MAX }) {
  return (
    <section style={{
      position: 'relative', minHeight: '100dvh',
      background: 'radial-gradient(ellipse 90% 70% at 50% 35%, #1c1c20 0%, #0a0a0c 55%, #000 100%)',
      color: '#fafafa', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        <defs>
          <pattern id="gridApex" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridApex)" />
      </svg>
      {/* Ghost RPM */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: mono, fontSize: 'clamp(240px, 36vw, 560px)', fontWeight: 700,
        color: 'rgba(255,255,255,0.03)', fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>{String(Math.round(t.rpm)).padStart(4, '0')}</div>

      <div style={{
        position: 'relative', maxWidth: MAX, width: '100%', margin: '0 auto',
        padding: 'clamp(96px, 12vh, 120px) clamp(20px, 5vw, 80px) clamp(32px, 6vh, 64px)',
        flex: 1, display: 'flex', flexDirection: 'column',
      }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(24px, 4vh, 48px)',
          flex: 1, alignItems: 'center',
        }}>
          {/* Copy */}
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 20, textTransform: 'uppercase' }}>
              ◦ Introducing the RDM-7
            </div>
            <h1 style={{
              fontSize: 'clamp(48px, 8vw, 128px)', lineHeight: 0.88, margin: 0,
              fontWeight: 500, letterSpacing: '-0.04em',
            }}>
              Race-grade dash.<br/>
              <span style={{ color: C.accent, ...italicize }}>Half the price.</span>
            </h1>
            <p style={{
              maxWidth: 520, marginTop: 'clamp(16px, 3vh, 28px)', fontSize: 'clamp(14px, 1.6vw, 17px)', lineHeight: 1.55,
              color: 'rgba(250,250,250,0.7)', fontWeight: 400,
            }}>
              Seven inches of anti-glare glass. 2&nbsp;ms refresh. Five layouts, infinitely customisable. The professional digital dash — without the professional invoice.
            </p>
          </div>

          {/* Device — centered, responsive */}
          <div className="hero-device" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DeviceFrame width={640} theme="dark">
              <ScreenRDM7 t={t} accent={C.accent} />
            </DeviceFrame>
          </div>
        </div>

        {/* Headline stats — compact strip, always above fold */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 3vw, 40px)', marginTop: 'clamp(24px, 4vh, 40px)',
        }}>
          {[['100%', 'Fully customisable'], ['2ms', 'Refresh rate'], ['7″', 'Touch screen'], ['∞', 'Preset displays']].map(([big, small]) => (
            <div key={big}>
              <div style={{
                fontFamily: display, fontWeight: 700, ...italicize,
                fontSize: 'clamp(28px, 4.2vw, 64px)', color: C.accent,
                lineHeight: 1, letterSpacing: '-0.03em',
              }}>{big}</div>
              <div style={{ fontFamily: mono, fontSize: 'clamp(9px, 0.75vw, 10px)', letterSpacing: 2, color: 'rgba(250,250,250,0.55)', marginTop: 8, textTransform: 'uppercase' }}>{small}</div>
            </div>
          ))}
        </div>

        {/* Bottom meta strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 'clamp(20px, 3vh, 32px)', paddingTop: 20, borderTop: '1px solid rgba(250,250,250,0.1)',
          fontFamily: mono, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: 2.5, color: 'rgba(250,250,250,0.55)', textTransform: 'uppercase', flexWrap: 'wrap', gap: 12,
        }}>
          <div>● Live CAN · 2 ms · GPS 12 sat</div>
          <div style={{ color: '#fafafa' }}>AUD $599 · Shipping now</div>
          <div>RDM-7 · Rev C</div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; gap: clamp(32px, 5vw, 80px) !important; }
        }
        @media (max-width: 980px) {
          .hero-device { max-width: min(560px, 80vw); margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ───── Price comparison ─────
function PriceCompare({ C, mono, display, italicize, PAD, MAX }) {
  const rows = [
    { name: 'RDM-7', price: 599, featured: true, notes: 'Everything below, for a fraction of the cost.' },
    { name: 'Competitor A · Pro Dash', price: 3200, notes: '7″ display, fixed layouts' },
    { name: 'Competitor B · Race Display', price: 4100, notes: '7″ display, per-layout licence' },
    { name: 'Competitor C · Motorsport Dash', price: 5800, notes: 'Motorsport-only, paid software' },
  ];
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '120px 0', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ Price, not compromise</div>
        <h2 style={{ fontSize: 'clamp(48px, 6.2vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em', maxWidth: 1100 }}>
          Why pay <span style={{ color: C.dim }}>5×</span> more for<br/>the same <span style={{ color: C.accent, ...italicize }}>seven inches?</span>
        </h2>

        <div style={{ marginTop: 64, display: 'grid', gap: 0 }}>
          {rows.map((r, i) => (
            <div key={r.name} style={{
              display: 'grid', gridTemplateColumns: '2fr 3fr 1fr', gap: 32, alignItems: 'baseline',
              padding: '28px 0', borderTop: `1px solid ${C.hairStrong}`,
              ...(i === rows.length - 1 ? { borderBottom: `1px solid ${C.hairStrong}` } : {}),
            }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.faint, textTransform: 'uppercase' }}>
                  {r.featured ? 'Our dash' : 'Compared to'}
                </div>
                <div style={{ fontSize: 32, fontWeight: 500, marginTop: 6, ...(r.featured ? { color: C.accent, ...italicize } : {}) }}>{r.name}</div>
              </div>
              <div style={{ fontSize: 15, color: C.dim, lineHeight: 1.5 }}>{r.notes}</div>
              <div style={{
                fontFamily: mono, fontWeight: 600, fontSize: 32, textAlign: 'right',
                fontVariantNumeric: 'tabular-nums', color: r.featured ? C.accent : C.fg,
              }}>
                <span style={{ fontSize: 14, color: C.faint, marginRight: 4 }}>AUD</span>${r.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: C.faint, fontFamily: mono, letterSpacing: 1, marginTop: 20 }}>
          Competitor pricing indicative, recommended retail. RDM-7 includes every feature, every preset, and RDM Studio — at no extra cost.
        </p>
      </div>
    </section>
  );
}

// ───── Presets — 3-up side-by-side ─────
function Presets({ C, mono, display, italicize, t, PAD, MAX }) {
  const presets = [
    { n: '01', title: 'Daily', desc: 'Legible vitals for the commute. Coolant, oil, boost — typography you can read at a glance.', render: 'rdm7', status: 'shipping' },
    { n: '02', title: 'Shift focus', desc: 'Huge gear indicator, enormous digits, minimum clutter. Built for when every tenth matters.', render: 'digital', status: 'shipping' },
    { n: '03', title: 'Track mode', desc: 'Live maps, sectors and delta land in a firmware update — paired with the RDM GPS adaptor (sold separately).', render: 'track', status: 'coming' },
  ];
  return (
    <section style={{ background: C.invBg, color: C.invFg, padding: '120px 0' }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ Unlimited layouts · one button</div>
        <h2 style={{ fontSize: 'clamp(48px, 6.2vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em', maxWidth: 1100 }}>
          Build any layout. <span style={{ color: C.accent, ...italicize }}>Switch instantly.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 24, maxWidth: 620, color: C.invFg, opacity: 0.65 }}>
          No fixed “modes.” Design your own layouts in RDM Studio — as many as you like — then switch between them from the wheel. Below are three examples: two that ship today, and one coming via firmware update.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 72 }}>
          {presets.map(p => (
            <div key={p.n}>
              <div style={{
                background: '#0a0a0c', padding: 18,
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35)',
                position: 'relative',
              }}>
                <div style={{ aspectRatio: '800/480', background: '#000', overflow: 'hidden', position: 'relative' }}>
                  {p.render === 'rdm7' && <ScreenRDM7 t={t} accent={C.accent} />}
                  {p.render === 'digital' && <ScreenDigital t={t} accent={C.accent} />}
                  {p.render === 'track' && (
                    <React.Fragment>
                      <div style={{ filter: 'blur(2px) grayscale(0.5)', opacity: 0.45, width: '100%', height: '100%' }}>
                        <ScreenTrack t={t} accent={C.accent} />
                      </div>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 12, padding: 24, textAlign: 'center',
                      }}>
                        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 3, color: C.accent, textTransform: 'uppercase' }}>○ In development</div>
                        <div style={{ fontSize: 'clamp(24px, 2.4vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', ...italicize }}>
                          Track mode
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                          Firmware + GPS adaptor
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 20, paddingBottom: 12, borderBottom: `1px solid ${C.hairStrong}` }}>
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.accent }}>{p.n}</span>
                <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', ...italicize }}>{p.title}</span>
                {p.status === 'coming' && (
                  <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.accent, border: `1px solid ${C.accent}`, padding: '3px 8px', textTransform: 'uppercase' }}>Soon</span>
                )}
              </div>
              <p style={{ fontSize: 14.5, color: C.invFg, opacity: 0.65, lineHeight: 1.6, marginTop: 14, maxWidth: 360 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───── Try It · interactive emulator ─────
function TryIt({ C, mono, display, italicize, t, PAD, MAX }) {
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '120px 0', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end', marginBottom: 56 }} className="tryit-head">
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ Hands-on · live device emulator</div>
            <h2 style={{ fontSize: 'clamp(44px, 5.6vw, 80px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em' }}>
              Tap to <span style={{ color: C.accent, ...italicize }}>try it.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.dim, margin: 0, maxWidth: 520, justifySelf: 'end' }}>
            This is the real RDM-7 firmware UI, running in your browser. Tap the screen — a menu button appears in the corner. From there you can switch layouts and dive into every device setting. No install, no hardware required.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DeviceFrame width={1100} theme="dark">
            <DashEmulator t={t} accent={C.accent} />
          </DeviceFrame>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }} className="tryit-hints">
          {[
            ['1', 'Tap the dash', 'A menu button appears top-right. Auto-hides after a few seconds.'],
            ['2', 'Switch layouts', 'Daily, Shift focus or the upcoming Track mode — instant swap.'],
            ['3', 'Open settings', 'Brightness, ECU, CAN bus, Wi-Fi — every option exposed and live.'],
          ].map(([n, h, d]) => (
            <div key={n} style={{ borderTop: `1px solid ${C.hairStrong}`, paddingTop: 16 }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.accent }}>{n}</div>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 6 }}>{h}</div>
              <p style={{ fontSize: 14, color: C.dim, lineHeight: 1.55, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .tryit-head { grid-template-columns: 1fr !important; gap: 24px !important; align-items: flex-start !important; }
            .tryit-head p { justify-self: start !important; }
            .tryit-hints { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ───── Studio deep-dive ─────
function Studio({ C, mono, display, italicize, t, PAD, MAX }) {
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '120px 0', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ RDM Studio · included free</div>
            <h2 style={{ fontSize: 'clamp(44px, 5.6vw, 80px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em' }}>
              Your display,<br/>
              <span style={{ color: C.accent, ...italicize }}>your way.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.dim, margin: 0, maxWidth: 520, justifySelf: 'end' }}>
            RDM Studio is our free desktop app. Drag widgets where you want them. Set alert thresholds per channel. Push layouts over USB or Wi-Fi. No code, no subscription, no compromise.
          </p>
        </div>

        <StudioWindow C={C} mono={mono} accent={C.accent} t={t} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 72 }}>
          {[
            ['Drag & drop', 'Arrange any widget, anywhere. Snap to grid. Mirror across presets.'],
            ['Full colour control', 'Match your car, team livery, or your mood. Per-widget theming.'],
            ['Custom alerts', 'Set thresholds for any channel. Flash, colour shift, or audible cue.'],
            ['Multiple profiles', 'Road, track, race. Switch setups instantly between sessions.'],
          ].map(([h, d]) => (
            <div key={h} style={{ borderTop: `1px solid ${C.hairStrong}`, paddingTop: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{h}</div>
              <p style={{ fontSize: 14, color: C.dim, lineHeight: 1.55, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioWindow({ C, mono, accent, t }) {
  return (
    <div style={{
      background: '#141417', color: '#fff', fontFamily: mono,
      border: '1px solid #222', borderRadius: 6, overflow: 'hidden',
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#1c1c20', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{ marginLeft: 14, fontSize: 11, color: '#888', letterSpacing: 2 }}>RDM STUDIO — track-day.rdm · saved</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: accent, letterSpacing: 2 }}>● CONNECTED · RDM-7</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 220px', minHeight: 480 }}>
        {/* Widget palette */}
        <div style={{ padding: 14, borderRight: '1px solid #222' }}>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, marginBottom: 10 }}>WIDGETS</div>
          {['RPM Bar', 'Gauge', 'Text Readout', 'Bar Gauge', 'Gear Indicator', 'Lap Timer', 'Knock Monitor', 'Warning Light', 'Track Map', 'Sparkline', 'Image', 'Group'].map((w, i) => (
            <div key={w} style={{
              fontSize: 11, padding: '7px 10px', marginBottom: 3,
              background: i === 0 ? accent : 'transparent',
              color: i === 0 ? '#fff' : '#ccc',
              border: '1px solid #222', letterSpacing: 1,
            }}>{w}</div>
          ))}
        </div>
        {/* Canvas */}
        <div style={{ background: '#222', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: '100%', maxWidth: 620, aspectRatio: '800/480', background: '#000', border: `1px dashed ${accent}`, position: 'relative' }}>
            <ScreenRDM7 t={t} accent={accent} />
            <div style={{ position: 'absolute', top: -20, left: 0, fontSize: 9, color: accent, letterSpacing: 2 }}>CANVAS · 800×480</div>
          </div>
        </div>
        {/* Properties */}
        <div style={{ padding: 14, borderLeft: '1px solid #222', fontSize: 11, color: '#ccc' }}>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, marginBottom: 10 }}>PROPERTIES · RPM BAR</div>
          {[
            ['channel', 'rpm'],
            ['min', '0'],
            ['max', '8000'],
            ['redline', '6800'],
            ['warn colour', 'red'],
            ['bg colour', '#000'],
            ['corner radius', '0'],
            ['font', 'IBM Plex'],
            ['weight', '700'],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '7px 0', borderBottom: '1px solid #222',
              letterSpacing: 1,
            }}>
              <span style={{ color: '#888' }}>{k}</span>
              <span style={{ color: k === 'channel' || k === 'warn colour' ? accent : '#fff' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───── Install ─────
function Install({ C, mono, display, italicize, PAD, MAX }) {
  const steps = [
    { n: '01', title: 'Plug in', desc: 'Three cables: power, CAN bus, GPS antenna. All plug-and-play, all labelled. No soldering, no splicing.', visual: 'plug' },
    { n: '02', title: 'Mount', desc: 'Flush-mount, RAM-mount, or factory-cluster adapter. Ships with hardware for every popular dash cut-out.', visual: 'mount' },
    { n: '03', title: 'Drive', desc: 'Auto-detects your ECU protocol. Choose a preset, hit the road. Tune it later from the couch with Studio.', visual: 'drive' },
  ];
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '120px 0', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ Installation · 20 minutes, typical</div>
        <h2 style={{ fontSize: 'clamp(48px, 6.2vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em', maxWidth: 1100 }}>
          From box to <span style={{ color: C.accent, ...italicize }}>boost</span><br/>in three steps.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 72 }}>
          {steps.map((s, i) => (
            <div key={s.n}>
              <div style={{
                aspectRatio: '4/3', background: C.surface, border: `1px solid ${C.hairStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <InstallVisual kind={s.visual} C={C} accent={C.accent} mono={mono} />
                <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.accent }}>STEP {s.n}</div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em' }}>{s.title}</div>
                <p style={{ fontSize: 14.5, color: C.dim, lineHeight: 1.6, marginTop: 8, maxWidth: 360 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 48, fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.dim, textTransform: 'uppercase', borderTop: `1px solid ${C.hair}`, paddingTop: 24 }}>
          <span>● In the box:</span>
          <span>RDM-7 unit</span><span>·</span>
          <span>Loom harness</span><span>·</span>
          <span>GPS antenna</span><span>·</span>
          <span>OBD-II cable</span><span>·</span>
          <span>RAM mount</span><span>·</span>
          <span>microSD 32GB</span>
        </div>
      </div>
    </section>
  );
}

function InstallVisual({ kind, C, accent, mono }) {
  if (kind === 'plug') {
    return (
      <svg viewBox="0 0 400 300" style={{ width: '80%', height: '80%' }}>
        <rect x="100" y="100" width="200" height="120" fill="none" stroke={C.fg} strokeWidth="1.5" />
        <text x="200" y="170" textAnchor="middle" fill={C.dim} fontFamily={mono} fontSize="11" letterSpacing="2">RDM-7</text>
        {/* Cables */}
        {[[80, 130, accent, 'PWR'], [80, 170, C.fg, 'CAN'], [80, 210, C.fg, 'GPS']].map(([x, y, c, l], i) => (
          <g key={i}>
            <path d={`M 30 ${y} Q 60 ${y} ${x} ${y} L 100 ${y}`} fill="none" stroke={c} strokeWidth="2" />
            <circle cx="30" cy={y} r="6" fill={c} />
            <text x="20" y={y - 12} fill={C.dim} fontFamily={mono} fontSize="9" letterSpacing="1">{l}</text>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === 'mount') {
    return (
      <svg viewBox="0 0 400 300" style={{ width: '80%', height: '80%' }}>
        {/* Dashboard cutout */}
        <path d="M 40 80 Q 40 60 60 60 L 340 60 Q 360 60 360 80 L 360 240 Q 360 260 340 260 L 60 260 Q 40 260 40 240 Z" fill="none" stroke={C.dim} strokeWidth="1" strokeDasharray="4 4" />
        <rect x="100" y="100" width="200" height="120" fill={C.surface} stroke={accent} strokeWidth="2" />
        <text x="200" y="170" textAnchor="middle" fill={accent} fontFamily={mono} fontSize="11" letterSpacing="2">RDM-7</text>
        <text x="200" y="280" textAnchor="middle" fill={C.dim} fontFamily={mono} fontSize="9" letterSpacing="2">FACTORY DASH CUTOUT</text>
      </svg>
    );
  }
  // drive
  return (
    <svg viewBox="0 0 400 300" style={{ width: '80%', height: '80%' }}>
      <path d="M 20 240 Q 100 140 200 180 T 380 80" fill="none" stroke={C.fg} strokeWidth="1.5" />
      <path d="M 20 240 Q 100 140 200 180 T 380 80" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="400" strokeDashoffset="0">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill={accent}>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 20 240 Q 100 140 200 180 T 380 80" />
      </circle>
      <text x="200" y="280" textAnchor="middle" fill={C.dim} fontFamily={mono} fontSize="9" letterSpacing="2">AUTO-DETECTED · LINKED · LIVE</text>
    </svg>
  );
}

// ───── Vehicles ─────
function Vehicles({ C, mono, display, italicize, PAD, MAX }) {
  const ecus = [
    { name: 'MaxxECU', models: ['Race', 'Sport', 'Street', 'Mini'] },
    { name: 'Link', models: ['G4X (all variants)', 'G4+ (all variants)', 'Thunder, Fury, Storm'] },
    { name: 'Haltech', models: ['Elite 550 / 750', 'Elite 1000 / 1500 / 2000', 'Nexus R3 / R5'] },
    { name: 'ECUMaster', models: ['EMU Black', 'EMU Pro', 'EMU Classic'] },
    { name: 'MegaSquirt', models: ['MS2 / MS3', 'MSPNP', 'MicroSquirt'] },
    { name: 'Open CAN', models: ['Fully custom CAN IDs', 'Bring your own protocol', 'On request: tailored mapping'] },
  ];
  return (
    <section style={{ background: C.invBg, color: C.invFg, padding: '120px 0' }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ Tested ECU integrations</div>
        <h2 style={{ fontSize: 'clamp(48px, 6.2vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em', maxWidth: 1100 }}>
          If it speaks CAN,<br/>
          <span style={{ color: C.accent, ...italicize }}>we speak it back.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 24, maxWidth: 640, color: C.invFg, opacity: 0.65 }}>
          Verified on the bench and in the car with five of the most common aftermarket ECUs. For anything else, Open CAN lets you map custom IDs yourself — or we’ll build the mapping with you.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 72 }} className="ecu-grid">
          {ecus.map(g => (
            <div key={g.name}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.accent, textTransform: 'uppercase', paddingBottom: 10, borderBottom: `1px solid ${C.accent}`, marginBottom: 14 }}>{g.name}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, lineHeight: 1.8, color: C.invFg, opacity: 0.75 }}>
                {g.models.map(m => <li key={m}>{m}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.invFg, opacity: 0.6 }}>
          Running something else? <span style={{ color: C.accent, textDecoration: 'underline', cursor: 'pointer' }}>→ Ask about Open CAN</span>
        </div>

        {/* Marquee */}
        <div style={{ marginTop: 48, padding: '24px 0', borderTop: `1px solid ${C.hairStrong}`, borderBottom: `1px solid ${C.hairStrong}`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 56, fontFamily: mono, fontSize: 13, letterSpacing: 3, color: C.invFg, opacity: 0.4, whiteSpace: 'nowrap', animation: 'rdm-marquee 50s linear infinite' }}>
            {Array.from({ length: 2 }).map((_, rep) => (
              <React.Fragment key={rep}>
                {['MAXXECU RACE', 'LINK G4X', 'HALTECH ELITE', 'ECUMASTER EMU', 'MEGASQUIRT MS3', 'OPEN CAN', 'HALTECH NEXUS', 'MAXXECU SPORT', 'LINK THUNDER', 'EMU PRO', 'MICROSQUIRT', 'CUSTOM PROTOCOL'].map((v, i) => (
                  <span key={`${rep}-${i}`}>◇ {v}</span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .ecu-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .ecu-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

// ───── Reviews ─────
function Reviews({ C, mono, display, italicize, PAD, MAX }) {
  const quotes = [
    { q: 'Swapped out my Racepak for this. Half the money, same data — honestly more readable on the main screen.', a: 'Dylan R.', meta: 'WRX STI · Time attack' },
    { q: 'Studio is the killer app. Built my track layout in 20 minutes, pushed it over Wi-Fi before my first session.', a: 'Priya K.', meta: 'GT-R R35 · Winton' },
    { q: "It looks factory. My wife thought the car came with it. I didn't correct her.", a: 'Marcus T.', meta: 'Focus RS · Daily' },
    { q: 'Data logging at 100Hz, on a $599 dash? I spent more on my coilovers.', a: 'Jess N.', meta: '86 GR · Drift' },
  ];
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '120px 0', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 12, textTransform: 'uppercase' }}>/ From the track, the street, the garage</div>
        <h2 style={{ fontSize: 'clamp(48px, 6.2vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 500, letterSpacing: '-0.03em', maxWidth: 1100 }}>
          What <span style={{ color: C.accent, ...italicize }}>drivers</span><br/>are saying.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, marginTop: 72 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{
              padding: '40px 40px 40px 0',
              borderTop: `1px solid ${C.hairStrong}`,
              ...(i % 2 === 0 ? { paddingRight: 40, borderRight: `1px solid ${C.hairStrong}` } : { paddingLeft: 40 }),
              ...(i >= quotes.length - 2 ? { borderBottom: `1px solid ${C.hairStrong}` } : {}),
            }}>
              <div style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 500, letterSpacing: '-0.01em', maxWidth: 520 }}>
                <span style={{ color: C.accent, ...italicize, fontSize: 32, lineHeight: 0, position: 'relative', top: 6, marginRight: 4 }}>“</span>
                {q.q}
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 16, alignItems: 'baseline', fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.dim, textTransform: 'uppercase' }}>
                <span style={{ color: C.fg, fontWeight: 600 }}>{q.a}</span>
                <span>·</span>
                <span>{q.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───── Final CTA ─────
function FinalCTA({ C, mono, display, italicize, PAD, MAX }) {
  return (
    <section style={{ background: C.bg, color: C.fg, padding: '140px 0 160px', textAlign: 'center', borderTop: `1px solid ${C.hair}` }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 4, color: C.accent, marginBottom: 24, textTransform: 'uppercase' }}>/ The RDM-7</div>
        <h2 style={{ fontSize: 'clamp(72px, 10vw, 156px)', lineHeight: 0.88, margin: 0, fontWeight: 500, letterSpacing: '-0.04em' }}>
          Built to be <span style={{ ...italicize, color: C.accent }}>driven.</span>
        </h2>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.dim, marginTop: 28, textTransform: 'uppercase' }}>
          AUD $599 · Free shipping AU-wide · 2-year warranty
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
          <button style={{
            padding: '18px 40px', background: C.accent, color: '#fff', border: 'none',
            fontFamily: mono, fontSize: 12, letterSpacing: 3, fontWeight: 700,
            textTransform: 'uppercase',
          }}>Shop the RDM-7 →</button>
          <button style={{
            padding: '18px 40px', background: 'transparent', color: C.fg,
            border: `1px solid ${C.hairStrong}`, fontFamily: mono, fontSize: 12, letterSpacing: 3,
            fontWeight: 700, textTransform: 'uppercase',
          }}>Find a dealer</button>
        </div>
      </div>
    </section>
  );
}

// ───── Footer ─────
function Footer({ C, mono, display, PAD, MAX }) {
  return (
    <footer style={{ background: '#0a0a0c', color: '#fafafa', padding: '72px 0 48px' }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: PAD }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <RDMLogo height={36} />
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 3, color: 'rgba(250,250,250,0.45)', marginTop: 12 }}>REALTIME DATA MONITORING</div>
            <div style={{ fontSize: 22, marginTop: 24, fontWeight: 500, letterSpacing: '-0.01em', maxWidth: 300 }}>
              Race-grade dashes, made in Australia.
            </div>
          </div>
          {[
            ['PRODUCT', ['RDM-7', 'RDM Studio', 'Accessories', 'Compare']],
            ['SUPPORT', ['Install guides', 'Downloads', 'Firmware', 'Contact']],
            ['COMPANY', ['About', 'Dealers', 'Journal', 'Press']],
            ['FOLLOW', ['Instagram', 'YouTube', 'Facebook', 'Marketplace ↗']],
          ].map(([h, items]) => (
            <div key={h} style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2 }}>
              <div style={{ color: 'rgba(250,250,250,0.45)' }}>{h}</div>
              <div style={{ marginTop: 12, lineHeight: 2.2, color: 'rgba(250,250,250,0.85)' }}>{items.map(x => <div key={x}>{x}</div>)}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 64, paddingTop: 24, borderTop: '1px solid rgba(250,250,250,0.08)', fontFamily: mono, fontSize: 10, letterSpacing: 2, color: 'rgba(250,250,250,0.4)', textTransform: 'uppercase' }}>
          <span>© 2026 RDM Pty Ltd · ABN 00 000 000 000</span>
          <span>Made for drivers, by drivers.</span>
          <span>realtimedatamonitoring.com.au</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { ApexPage });
