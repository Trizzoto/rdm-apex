// Authentic RDM-7 dashboard — faithful to hardware screenshot.
// cqw units so it scales with any container.

function ScreenRDM7({ t, accent = '#ef1f2a' }) {
  const rpmPct = Math.max(0, Math.min(1, t.rpm / 7000));
  const redlineAt = 6 / 7;
  return (
    <div style={{
      width: '100%', height: '100%',
      containerType: 'size',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#000',
        display: 'flex', flexDirection: 'column',
        padding: '0', gap: 0,
        fontFamily: '"IBM Plex Sans", sans-serif', color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* RPM Bar — solid fill, black ticks overlay, numbers on top */}
        <RpmBar pct={rpmPct} redlineAt={redlineAt} />

        {/* Indicator row + center RPM readout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'flex-start', padding: '1cqw 3cqw 0.5cqw', position: 'relative' }}>
          {/* Left 4 indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: '0.3cqw' }}>
            <Indicator on={false} color="#666" label=""/>
            <Indicator on={false} color="#666" label=""/>
            <Indicator on={true} color="#ef1f2a" label="ABS OFF"/>
            <Indicator on={false} color="#666" label=""/>
          </div>
          {/* Center RPM readout w/ tab + arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '24cqw' }}>
            {/* RPM tab at top */}
            <div style={{
              background: '#1a1a1a', border: '1px solid #333', borderBottom: 'none',
              padding: '0.15cqw 2.5cqw',
              fontSize: '1.3cqw', letterSpacing: '0.2cqw', fontWeight: 700, color: '#e8e8e8',
              borderTopLeftRadius: '0.6cqw', borderTopRightRadius: '0.6cqw',
            }}>RPM</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.8cqw', marginTop: '0.1cqw' }}>
              <ArrowChevron dir="left" />
              <div style={{ fontSize: '4.2cqw', fontWeight: 700, fontStyle: 'italic', fontVariantNumeric: 'tabular-nums', lineHeight: 1, minWidth: '11cqw', textAlign: 'center' }}>
                {Math.round(t.rpm)}
              </div>
              <ArrowChevron dir="right" />
            </div>
          </div>
          {/* Right indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: '0.3cqw' }}>
            <Indicator on={true} color="#f5a623" label="TC OFF"/>
            <Indicator on={false} color="#666" label=""/>
            <Indicator on={true} color="#3b82f6" label={["HEAD","LIGHTS","ON"]}/>
          </div>
        </div>

        {/* Main body: 5-column grid (2 left boxes, center column, 2 right boxes) */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr 1fr 1fr', gap: '1.5cqw', padding: '0.5cqw 3cqw', minHeight: 0, alignItems: 'stretch' }}>
          {/* Left 2×2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5cqw' }}>
            <ReadoutBox label="MAP" value={(100 + t.throttle * 0.8 + Math.sin(t.rpm/800)*5).toFixed(2)} />
            <ReadoutBox label="KNOCK THRESHOLD" value="36" border="#c03030" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5cqw' }}>
            <ReadoutBox label="LAMBDA" value={t.afr.toFixed(3)} />
            <ReadoutBox label="COOLANT" value={t.waterTemp.toFixed(1)} border="#2a6bff" />
          </div>

          {/* Center column: RDM logo + speed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.6cqw' }}>
            <img src="assets/rdm-logo.png" alt="RDM" style={{ width: '9cqw', height: 'auto', display: 'block' }} />
            <div style={{ fontSize: '8cqw', fontWeight: 700, fontStyle: 'italic', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.1cqw', marginTop: '0.3cqw' }}>
              {Math.round(t.speed)}
            </div>
            <div style={{ fontSize: '1.3cqw', color: '#bbb', fontWeight: 500, marginTop: '0.1cqw' }}>k/mh</div>
          </div>

          {/* Right 2×2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5cqw' }}>
            <ReadoutBox label="OIL PRESSURE" value={Math.round(t.oilPress)} />
            <ReadoutBox label="KNOCK COUNT" value="6" border="#c03030" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5cqw' }}>
            <ReadoutBox label="IAT" value="21" />
            <ReadoutBox label="OIL TEMPERATURE" value={t.oilTemp.toFixed(1)} />
          </div>
        </div>

        {/* Bottom strip: Coolant bar | Gear box | Throttle bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5cqw', padding: '1.25cqw 2cqw 1.5cqw', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.3cqw', fontWeight: 700, textAlign: 'center', marginBottom: '0.5cqw', fontStyle: 'italic', letterSpacing: '0.1cqw' }}>COOLANT TEMP</div>
            <div style={{ height: '2.4cqw', background: '#0f0f0f', border: '1px solid #2a2a2a', position: 'relative' }}>
              <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, (t.waterTemp - 60) * 2))}%`, background: '#2a6bff', transition: 'width 0.2s linear' }} />
            </div>
          </div>
          {/* Gear box — prominent */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3cqw' }}>
            <div style={{ fontSize: '1.3cqw', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.15cqw' }}>GEAR</div>
            <div style={{
              border: '1.5px solid #666', background: '#0a0a0a',
              padding: '0.2cqw 2.2cqw',
              fontSize: '5.5cqw', fontWeight: 700, fontStyle: 'italic',
              lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              minWidth: '7.5cqw', textAlign: 'center',
            }}>{t.gear}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.3cqw', fontWeight: 700, textAlign: 'center', marginBottom: '0.5cqw', fontStyle: 'italic', letterSpacing: '0.1cqw' }}>THROTTLE %</div>
            <div style={{ height: '2.4cqw', background: '#0f0f0f', border: '1px solid #2a2a2a', position: 'relative' }}>
              <div style={{ height: '100%', width: `${t.throttle}%`, background: '#22dd44', transition: 'width 0.08s linear' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Solid RPM bar with number labels overlaid in italic bold
function RpmBar({ pct, redlineAt }) {
  const filled = Math.max(0, Math.min(1, pct));
  return (
    <div style={{ width: '100%', height: '6cqw', position: 'relative', background: '#000' }}>
      {/* Unfilled track is black; filled portion renders green up to redline, red after */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        {/* Green segment */}
        <div style={{
          width: `${Math.min(filled, redlineAt) * 100}%`,
          background: '#22dd44',
          transition: 'width 0.05s linear',
        }} />
        {/* Red segment (only if past redline) */}
        {filled > redlineAt && (
          <div style={{
            width: `${(filled - redlineAt) * 100}%`,
            background: '#c03030',
            transition: 'width 0.05s linear',
          }} />
        )}
      </div>
      {/* Redline tick marker (vertical line at 6/7) */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${redlineAt * 100}%`,
        width: '0.15cqw', background: '#000', opacity: 0.6,
      }} />
      {/* Tick numbers 0..7 on top, in italic bold */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 0.5cqw',
        fontFamily: '"IBM Plex Sans", sans-serif',
        fontSize: '2.2cqw', fontWeight: 700, fontStyle: 'italic',
        color: '#000', pointerEvents: 'none', fontVariantNumeric: 'tabular-nums',
      }}>
        {['0','1','2','3','4','5','6','7'].map(n => <span key={n}>{n}</span>)}
      </div>
    </div>
  );
}

function Indicator({ on, color, label }) {
  const labels = Array.isArray(label) ? label : (label ? [label] : []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35cqw', minHeight: '3.5cqw' }}>
      <div style={{
        width: '1.3cqw', height: '1.3cqw', borderRadius: '50%',
        background: on ? color : '#2a2a2a',
        border: on ? 'none' : '1px solid #333',
      }} />
      {labels.map((l, i) => (
        <div key={i} style={{
          fontSize: '0.95cqw', fontWeight: 700, letterSpacing: '0.04cqw',
          color: on ? '#e8e8e8' : '#4a4a4a', textTransform: 'uppercase', lineHeight: 1.05,
        }}>{l}</div>
      ))}
    </div>
  );
}

function LedDot({ on, color }) {
  return (
    <div style={{
      width: '1.4cqw', height: '1.4cqw', borderRadius: '50%',
      background: on ? color : '#222',
      boxShadow: on ? `0 0 1cqw ${color}, inset 0 0 0.2cqw rgba(255,255,255,0.4)` : 'none',
    }} />
  );
}

function ArrowChevron({ dir }) {
  return (
    <svg viewBox="0 0 20 20" style={{ width: '2.5cqw', height: '2.5cqw', display: 'block' }}>
      {dir === 'left' ? (
        <path d="M 14 3 L 6 10 L 14 17" fill="none" stroke="#0e9e3a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      ) : (
        <path d="M 6 3 L 14 10 L 6 17" fill="none" stroke="#0e9e3a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      )}
    </svg>
  );
}

function ReadoutBox({ label, value, border = '#2a2a2a' }) {
  return (
    <div style={{
      flex: 1,
      border: `1.5px solid ${border}`,
      background: '#0a0a0a',
      padding: '0.75cqw 0.75cqw 0.6cqw',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      gap: '0.3cqw',
    }}>
      <div style={{ fontSize: '1.15cqw', fontWeight: 700, color: '#e8e8e8', letterSpacing: '0.1cqw', textAlign: 'center', fontStyle: 'italic' }}>{label}</div>
      <div style={{ fontSize: '3.6cqw', fontWeight: 700, color: '#fff', fontStyle: 'italic', textAlign: 'center', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function RDMMark({ color = '#ef1f2a' }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        background: color,
        transform: 'skewX(-14deg)',
        padding: '0.25cqw 1cqw',
        lineHeight: 1,
      }}>
        <div style={{
          transform: 'skewX(14deg)',
          fontFamily: '"Arial Black", "Helvetica", sans-serif',
          fontWeight: 900,
          fontSize: '2.6cqw', color: '#fff',
          lineHeight: 1, letterSpacing: '-0.05cqw',
        }}>RDM</div>
      </div>
      <div style={{
        fontSize: '0.55cqw', fontWeight: 700, color: '#fff',
        letterSpacing: '0.05cqw', marginTop: '0.2cqw',
      }}>REALTIME DATA MONITORING</div>
    </div>
  );
}

Object.assign(window, { ScreenRDM7, ReadoutBox, RDMMark });
