// Three dashboard layouts shown inside the DeviceFrame.
// All units are cqw (container-query-width) so screens scale perfectly with any container size.
// Reference design is 800px wide; 1cqw = 1% of container width.

function ScreenShell({ children, padding = '2.2cqw 2.75cqw', gap = '1.25cqw', background = '#000' }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      containerType: 'size',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background,
        display: 'flex', flexDirection: 'column',
        padding, gap, color: '#fff',
        fontFamily: '"JTraceable, JetBrains Mono", "JetBrains Mono", monospace',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

// Screen A — Classic twin-gauge
function ScreenClassic({ t, accent = '#ff3b30' }) {
  return (
    <ScreenShell background="radial-gradient(ellipse at center top, #0f0f10 0%, #000 70%)">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
        <span>● LIVE  CAN 500KBS  GPS 12SAT</span>
        <span>14:32:08  RDM v2.4</span>
      </div>
      <div style={{ display: 'flex', gap: '2cqw', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Gauge value={t.rpm} max={8000} label="RPM ×1000" unit="" size="22cqw" redlineFrom={6800} accent={accent} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5cqw' }}>
          <div style={{ fontSize: '9cqw', fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(t.speed)}</div>
          <div style={{ fontSize: '1.2cqw', letterSpacing: '0.4cqw', color: 'rgba(255,255,255,0.5)' }}>KM/H</div>
          <div style={{ fontSize: '4.5cqw', fontWeight: 700, color: accent, marginTop: '0.75cqw', fontVariantNumeric: 'tabular-nums' }}>{t.gear}</div>
          <div style={{ fontSize: '1cqw', letterSpacing: '0.4cqw', color: 'rgba(255,255,255,0.4)' }}>GEAR</div>
        </div>
        <Gauge value={t.boost} max={22} label="BOOST" unit="PSI" size="22cqw" redlineFrom={18} accent={accent} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.75cqw', padding: '1.25cqw 0.5cqw 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <BarGauge value={t.oilTemp} max={130} min={60} label="OIL" unit="°C" warn={115} accent={accent} />
        <BarGauge value={t.waterTemp} max={110} min={60} label="WATER" unit="°C" warn={100} accent={accent} />
        <BarGauge value={t.oilPress} max={100} label="OIL PSI" unit="" warn={90} accent={accent} />
        <BarGauge value={t.voltage} max={15} min={10} label="BATT" unit="V" accent={accent} />
      </div>
    </ScreenShell>
  );
}

// Screen B — Tachbar + huge gear
function ScreenDigital({ t, accent = '#ff3b30' }) {
  return (
    <ScreenShell>
      <TachBar rpm={t.rpm} accent={accent} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.5)' }}>
        <span>0</span><span>2K</span><span>4K</span><span style={{ color: accent }}>6.8K ▲</span><span>8K</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: '2.25cqw', flex: 1, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.2cqw', letterSpacing: '0.4cqw', color: 'rgba(255,255,255,0.5)' }}>SPEED</div>
          <div style={{ fontSize: '8cqw', fontWeight: 700, lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>{Math.round(t.speed)}</div>
          <div style={{ fontSize: '1.25cqw', color: 'rgba(255,255,255,0.5)' }}>KM/H</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '17.5cqw', fontWeight: 800, lineHeight: 1, color: accent,
            textShadow: `0 0 5cqw ${accent}`, fontVariantNumeric: 'tabular-nums',
          }}>{t.gear}</div>
          <div style={{ fontSize: '1.25cqw', letterSpacing: '0.5cqw', color: 'rgba(255,255,255,0.5)', marginTop: '-1.25cqw' }}>GEAR {Math.round(t.rpm).toLocaleString()} RPM</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2cqw', letterSpacing: '0.4cqw', color: 'rgba(255,255,255,0.5)' }}>BOOST</div>
          <div style={{ fontSize: '8cqw', fontWeight: 700, lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>{t.boost.toFixed(1)}</div>
          <div style={{ fontSize: '1.25cqw', color: 'rgba(255,255,255,0.5)' }}>PSI</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.25cqw', fontSize: '1.25cqw', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25cqw' }}>
        {[
          ['OIL', Math.round(t.oilTemp), '°C'],
          ['WTR', Math.round(t.waterTemp), '°C'],
          ['OP', Math.round(t.oilPress), 'PSI'],
          ['AFR', t.afr.toFixed(1), 'λ'],
          ['IAT', Math.round(t.iat), '°C'],
          ['V', t.voltage.toFixed(1), 'V'],
        ].map(([l, v, u]) => (
          <div key={l}>
            <div style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1cqw' }}>{l}</div>
            <div style={{ fontSize: '2.5cqw', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{v}<span style={{ fontSize: '1.1cqw', color: 'rgba(255,255,255,0.4)', marginLeft: '0.25cqw' }}>{u}</span></div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

// Screen C — Track map + lap timer
function ScreenTrack({ t, accent = '#ff3b30' }) {
  const lapTime = t.lapTime % 92;
  const m = Math.floor(lapTime / 60);
  const s = (lapTime % 60).toFixed(2).padStart(5, '0');
  const trackPct = (lapTime / 92);
  const trackPath = "M 40 180 C 40 80, 120 40, 200 60 S 320 140, 380 120 S 460 40, 540 80 C 620 120, 660 200, 620 260 S 480 320, 420 280 S 300 240, 240 280 S 100 300, 40 260 Z";
  return (
    <ScreenShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.5)' }}>
        <span>● SESSION 03  LAP {Math.floor(t.lapTime / 92) + 1}/∞</span>
        <span>BEST 1:31.42  Δ −0.23</span>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.75cqw', minHeight: 0 }}>
        <div style={{ position: 'relative', background: '#060606', border: '1px solid rgba(255,255,255,0.06)', minHeight: 0 }}>
          <svg viewBox="0 0 660 340" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
            <path d={trackPath} fill="none" stroke={accent} strokeWidth="3"
              strokeDasharray="2000" strokeDashoffset={2000 - trackPct * 2000} />
            <circle r="6" fill={accent}>
              <animateMotion dur="4s" repeatCount="indefinite" path={trackPath} />
            </circle>
          </svg>
          <div style={{ position: 'absolute', bottom: '0.75cqw', left: '1.25cqw', fontSize: '1cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.4)' }}>BATHURST · MOUNT PANORAMA</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25cqw', minHeight: 0 }}>
          <div>
            <div style={{ fontSize: '1.2cqw', letterSpacing: '0.4cqw', color: 'rgba(255,255,255,0.5)' }}>CURRENT LAP</div>
            <div style={{ fontSize: '5.5cqw', fontWeight: 700, color: accent, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{m}:{s}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1cqw', fontSize: '1.25cqw' }}>
            <div><div style={{ color: 'rgba(255,255,255,0.4)' }}>S1</div><div style={{ fontSize: '2cqw', fontVariantNumeric: 'tabular-nums' }}>28.14</div></div>
            <div><div style={{ color: 'rgba(255,255,255,0.4)' }}>S2</div><div style={{ fontSize: '2cqw', fontVariantNumeric: 'tabular-nums', color: '#6fe87d' }}>31.08</div></div>
            <div><div style={{ color: 'rgba(255,255,255,0.4)' }}>S3</div><div style={{ fontSize: '2cqw', fontVariantNumeric: 'tabular-nums' }}>32.22</div></div>
            <div><div style={{ color: 'rgba(255,255,255,0.4)' }}>G-MAX</div><div style={{ fontSize: '2cqw', fontVariantNumeric: 'tabular-nums' }}>1.34g</div></div>
          </div>
          <div style={{ marginTop: 'auto', fontSize: '1.25cqw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5cqw 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}><span style={{ color: 'rgba(255,255,255,0.5)' }}>SPEED</span><span>{Math.round(t.speed)} km/h</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5cqw 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}><span style={{ color: 'rgba(255,255,255,0.5)' }}>RPM</span><span>{Math.round(t.rpm).toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5cqw 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}><span style={{ color: 'rgba(255,255,255,0.5)' }}>GEAR</span><span>{t.gear}</span></div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, { ScreenClassic, ScreenDigital, ScreenTrack, ScreenShell });
