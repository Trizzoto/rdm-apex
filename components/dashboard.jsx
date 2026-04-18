// Animated dashboard widgets for RDM hero sections
// All drive off a single useTelemetry() hook — smooth, randomized but realistic

function useTelemetry(opts = {}) {
  const { maxRpm = 8000, maxSpeed = 260, maxBoost = 22 } = opts;
  const [state, setState] = React.useState({
    rpm: 1200, speed: 48, boost: 0.2, throttle: 12, gear: 2,
    oilTemp: 92, waterTemp: 88, oilPress: 52, voltage: 14.1,
    afr: 14.7, iat: 32, ect: 88, lat: 0.12, lng: 1.05,
    lapTime: 0, lapNum: 1, sector: 1,
  });

  React.useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.06;
      setState(s => {
        // Drive a synthetic lap: sinuous throttle curve
        const throttleCurve = (Math.sin(t * 0.7) + Math.sin(t * 1.3) * 0.5 + 1.1) / 2.6;
        const throttle = Math.max(0, Math.min(100, throttleCurve * 105));
        const targetRpm = 1200 + throttle * (maxRpm - 1200) / 100 + (Math.random() - 0.5) * 80;
        const rpm = s.rpm + (targetRpm - s.rpm) * 0.18;
        const targetSpeed = throttle * maxSpeed / 100;
        const speed = s.speed + (targetSpeed - s.speed) * 0.06;
        const boost = Math.max(-2, (throttle / 100) * maxBoost * (0.7 + Math.sin(t * 2) * 0.15) + (Math.random() - 0.5) * 0.3);
        const gear = Math.min(6, Math.max(1, Math.round(1 + speed / 45)));
        const oilTemp = 90 + Math.sin(t * 0.1) * 6 + throttle * 0.05;
        const waterTemp = 86 + Math.sin(t * 0.08) * 4 + throttle * 0.04;
        const oilPress = 40 + (rpm / maxRpm) * 45 + (Math.random() - 0.5) * 2;
        const afr = 14.7 - (throttle / 100) * 3.2 + (Math.random() - 0.5) * 0.3;
        const voltage = 14.0 + Math.sin(t * 0.3) * 0.2;
        const iat = 30 + (boost > 0 ? boost * 1.2 : 0) + Math.sin(t * 0.05) * 3;
        return {
          ...s, rpm, speed, boost, throttle, gear,
          oilTemp, waterTemp, oilPress, voltage, afr, iat,
          ect: waterTemp, lapTime: s.lapTime + 0.06,
        };
      });
    }, 60);
    return () => clearInterval(id);
  }, [maxRpm, maxSpeed, maxBoost]);

  return state;
}

// Circular gauge — needle sweeps from -135deg to +135deg
// If size is a string (e.g. '22cqw'), it is applied as CSS size and internal coords use a fixed viewBox.
function Gauge({ value, max, label, unit, size = 180, redlineFrom, accent = '#ff3b30', theme = 'dark' }) {
  if (typeof size === 'string') {
    return <GaugeResponsive value={value} max={max} label={label} unit={unit} cssSize={size} redlineFrom={redlineFrom} accent={accent} theme={theme} />;
  }
  const pct = Math.max(0, Math.min(1, value / max));
  const angle = -135 + pct * 270;
  const ticks = [];
  const majorCount = 8;
  for (let i = 0; i <= majorCount; i++) {
    const a = -135 + (i / majorCount) * 270;
    const v = (i / majorCount) * max;
    const isRed = redlineFrom != null && v >= redlineFrom;
    ticks.push({ a, major: true, v, isRed });
    if (i < majorCount) for (let j = 1; j < 5; j++) {
      const a2 = -135 + ((i + j / 5) / majorCount) * 270;
      const v2 = ((i + j / 5) / majorCount) * max;
      ticks.push({ a: a2, major: false, v: v2, isRed: redlineFrom != null && v2 >= redlineFrom });
    }
  }
  const fg = theme === 'dark' ? '#f5f5f5' : '#0a0a0a';
  const dim = theme === 'dark' ? 'rgba(245,245,245,0.35)' : 'rgba(10,10,10,0.35)';
  const bg = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const ring = theme === 'dark' ? 'rgba(245,245,245,0.08)' : 'rgba(10,10,10,0.08)';
  const r = size / 2 - 4;
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%', display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill={bg} stroke={ring} strokeWidth="1" />
        <circle cx={size/2} cy={size/2} r={r - 8} fill="none" stroke={ring} strokeWidth="1" />
        {ticks.map((tk, i) => {
          const rad = (tk.a * Math.PI) / 180;
          const inner = tk.major ? r - 14 : r - 9;
          const outer = r - 6;
          const x1 = size/2 + Math.cos(rad) * inner;
          const y1 = size/2 + Math.sin(rad) * inner;
          const x2 = size/2 + Math.cos(rad) * outer;
          const y2 = size/2 + Math.sin(rad) * outer;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={tk.isRed ? accent : (tk.major ? fg : dim)}
            strokeWidth={tk.major ? 1.5 : 1} strokeLinecap="round" />;
        })}
        {/* Needle */}
        <g transform={`rotate(${angle} ${size/2} ${size/2})`} style={{ transition: 'transform 0.08s linear' }}>
          <line x1={size/2} y1={size/2} x2={size/2 + r - 20} y2={size/2}
            stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={size/2} cy={size/2} r="5" fill={accent} />
          <circle cx={size/2} cy={size/2} r="2" fill={bg} />
        </g>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: size * 0.18, pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: size * 0.18,
          fontWeight: 600, color: fg, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
        }}>{Math.round(value).toLocaleString()}</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: size * 0.065,
          color: dim, marginTop: 4, textTransform: 'uppercase', letterSpacing: 2,
        }}>{unit}</div>
        {label && <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: size * 0.055,
          color: dim, marginTop: size * 0.02, textTransform: 'uppercase', letterSpacing: 3,
          position: 'absolute', top: size * 0.15,
        }}>{label}</div>}
      </div>
    </div>
  );
}

// Horizontal bar gauge
function BarGauge({ value, max, min = 0, label, unit, accent = '#ff3b30', theme = 'dark', warn }) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const fg = theme === 'dark' ? '#f5f5f5' : '#0a0a0a';
  const dim = theme === 'dark' ? 'rgba(245,245,245,0.4)' : 'rgba(10,10,10,0.4)';
  const track = theme === 'dark' ? 'rgba(245,245,245,0.08)' : 'rgba(10,10,10,0.08)';
  const warning = warn != null && value >= warn;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: dim, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: warning ? accent : fg, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
          {value.toFixed(unit === 'V' || unit === 'λ' ? 1 : 0)}<span style={{ fontSize: 10, color: dim, marginLeft: 3 }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: 4, background: track, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', width: `${pct * 100}%`,
          background: warning ? accent : fg,
          transition: 'width 0.1s linear',
        }} />
      </div>
    </div>
  );
}

// Bar-graph tach — bars light up left to right
function TachBar({ rpm, maxRpm = 8000, redline = 6800, accent = '#ff3b30', theme = 'dark' }) {
  const segments = 24;
  const pct = Math.max(0, Math.min(1, rpm / maxRpm));
  const active = Math.round(pct * segments);
  const dim = theme === 'dark' ? 'rgba(245,245,245,0.06)' : 'rgba(10,10,10,0.08)';
  const fg = theme === 'dark' ? '#f5f5f5' : '#0a0a0a';
  return (
    <div style={{ display: 'flex', gap: 3, height: 28 }}>
      {Array.from({ length: segments }).map((_, i) => {
        const segRpm = (i / segments) * maxRpm;
        const isOn = i < active;
        const isRed = segRpm >= redline;
        return (
          <div key={i} style={{
            flex: 1,
            background: isOn ? (isRed ? accent : fg) : dim,
            transition: 'background 0.08s linear',
          }} />
        );
      })}
    </div>
  );
}

// Small sparkline for data-log
function Sparkline({ values, color, height = 40, theme = 'dark' }) {
  if (!values || values.length < 2) return <div style={{ height }} />;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 0.001);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function useHistory(value, length = 60) {
  const [hist, setHist] = React.useState([]);
  React.useEffect(() => {
    setHist(h => {
      const next = [...h, value];
      return next.length > length ? next.slice(next.length - length) : next;
    });
  }, [value, length]);
  return hist;
}

// Device frame — the 7" RDM unit. Responsive: width caps via maxWidth, height follows aspect ratio.
function DeviceFrame({ children, width = 720, theme = 'dark' }) {
  return (
    <div style={{
      width: '100%', maxWidth: width,
      aspectRatio: '800 / 500',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #0f0f0f 100%)',
      borderRadius: 22,
      padding: 'clamp(16px, 4.5%, 34px)',
      position: 'relative',
      boxShadow: theme === 'dark'
        ? '0 50px 100px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)'
        : '0 50px 100px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#000',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 24px rgba(0,0,0,0.8)',
      }}>
        {children}
      </div>
    </div>
  );
}

// Gauge variant that fills a CSS-sized box (supports cqw/%/etc.)
function GaugeResponsive({ value, max, label, unit, cssSize, redlineFrom, accent, theme }) {
  const size = 180; // internal coord space
  const pct = Math.max(0, Math.min(1, value / max));
  const angle = -135 + pct * 270;
  const ticks = [];
  const majorCount = 8;
  for (let i = 0; i <= majorCount; i++) {
    const a = -135 + (i / majorCount) * 270;
    const v = (i / majorCount) * max;
    const isRed = redlineFrom != null && v >= redlineFrom;
    ticks.push({ a, major: true, v, isRed });
    if (i < majorCount) for (let j = 1; j < 5; j++) {
      const a2 = -135 + ((i + j / 5) / majorCount) * 270;
      const v2 = ((i + j / 5) / majorCount) * max;
      ticks.push({ a: a2, major: false, v: v2, isRed: redlineFrom != null && v2 >= redlineFrom });
    }
  }
  const fg = theme === 'dark' ? '#f5f5f5' : '#0a0a0a';
  const dim = theme === 'dark' ? 'rgba(245,245,245,0.35)' : 'rgba(10,10,10,0.35)';
  const bg = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const ring = theme === 'dark' ? 'rgba(245,245,245,0.08)' : 'rgba(10,10,10,0.08)';
  const r = size / 2 - 4;
  return (
    <div style={{ width: cssSize, aspectRatio: '1', position: 'relative', flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%', display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill={bg} stroke={ring} strokeWidth="1" />
        <circle cx={size/2} cy={size/2} r={r - 8} fill="none" stroke={ring} strokeWidth="1" />
        {ticks.map((tk, i) => {
          const rad = (tk.a * Math.PI) / 180;
          const inner = tk.major ? r - 14 : r - 9;
          const outer = r - 6;
          const x1 = size/2 + Math.cos(rad) * inner;
          const y1 = size/2 + Math.sin(rad) * inner;
          const x2 = size/2 + Math.cos(rad) * outer;
          const y2 = size/2 + Math.sin(rad) * outer;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={tk.isRed ? accent : (tk.major ? fg : dim)}
            strokeWidth={tk.major ? 1.5 : 1} strokeLinecap="round" />;
        })}
        <g transform={`rotate(${angle} ${size/2} ${size/2})`} style={{ transition: 'transform 0.08s linear' }}>
          <line x1={size/2} y1={size/2} x2={size/2 + r - 20} y2={size/2}
            stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={size/2} cy={size/2} r="5" fill={accent} />
          <circle cx={size/2} cy={size/2} r="2" fill={bg} />
        </g>
        <text x={size/2} y={size*0.72} textAnchor="middle"
          fontFamily='"JetBrains Mono", monospace' fontSize={size * 0.18}
          fontWeight="600" fill={fg} style={{ fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(value).toLocaleString()}
        </text>
        {unit && <text x={size/2} y={size*0.82} textAnchor="middle"
          fontFamily='"JetBrains Mono", monospace' fontSize={size * 0.07}
          fill={dim} letterSpacing="2">{unit}</text>}
        {label && <text x={size/2} y={size*0.32} textAnchor="middle"
          fontFamily='"JetBrains Mono", monospace' fontSize={size * 0.06}
          fill={dim} letterSpacing="3">{label}</text>}
      </svg>
    </div>
  );
}

Object.assign(window, { useTelemetry, Gauge, GaugeResponsive, BarGauge, TachBar, Sparkline, useHistory, DeviceFrame });
