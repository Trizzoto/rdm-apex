// Interactive RDM-7 emulator.
// Flow: tap dash -> menu button appears (auto-hides 4s) -> tap btn -> menu drawer
// (layout list + Device Settings button) -> settings opens full-screen over dash.
//
// All UI uses cqw units so it scales with the container, same as ScreenRDM7.

function DashEmulator({ t, accent = '#ef1f2a', onTutorialStep }) {
  const [mode, setMode] = React.useState('idle'); // idle | menuBtn | menu | settings
  const [activeLayout, setActiveLayout] = React.useState('daily');
  const [settingsSection, setSettingsSection] = React.useState('display');
  const [brightness, setBrightness] = React.useState(85);
  const [autoDim, setAutoDim] = React.useState(true);
  const [theme, setTheme] = React.useState('night');
  const [units, setUnits] = React.useState('metric');
  const [ecu, setEcu] = React.useState('MaxxECU');
  const [canBitrate, setCanBitrate] = React.useState(1000);
  const [wifiOn, setWifiOn] = React.useState(true);
  const [logging, setLogging] = React.useState(false);
  const [sampleHz, setSampleHz] = React.useState(100);
  const hideTimer = React.useRef(null);

  const showMenuBtn = () => {
    setMode('menuBtn');
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setMode(m => (m === 'menuBtn' ? 'idle' : m));
    }, 4000);
  };

  const onDashTap = (e) => {
    if (mode !== 'idle') return;
    showMenuBtn();
    onTutorialStep && onTutorialStep('dashTapped');
  };

  // Simulate brightness on the whole screen area
  const brightnessFilter = { filter: `brightness(${0.35 + (brightness / 100) * 0.75})` };

  return (
    <div style={{ width: '100%', height: '100%', containerType: 'size', position: 'relative', overflow: 'hidden', background: '#000' }}>
      {/* Dash layer */}
      <div
        onClick={onDashTap}
        style={{
          width: '100%', height: '100%', cursor: mode === 'idle' ? 'pointer' : 'default',
          ...brightnessFilter,
          transition: 'filter 0.2s ease',
        }}
      >
        {activeLayout === 'daily' && <ScreenRDM7 t={t} accent={accent} />}
        {activeLayout === 'shift' && <ScreenDigital t={t} accent={accent} />}
        {activeLayout === 'track' && (
          <div style={{ filter: 'blur(2px) grayscale(0.5)', opacity: 0.5, width: '100%', height: '100%' }}>
            <ScreenTrack t={t} accent={accent} />
          </div>
        )}
      </div>

      {/* Track-coming veil (only on track layout) */}
      {activeLayout === 'track' && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1cqw',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)',
          color: '#fff', pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.2cqw', letterSpacing: '0.3cqw', color: accent, textTransform: 'uppercase' }}>○ Coming soon</div>
          <div style={{ fontSize: '3cqw', fontWeight: 500, fontStyle: 'italic' }}>Track mode</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1cqw', letterSpacing: '0.2cqw', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Firmware + GPS adaptor</div>
        </div>
      )}

      {/* MENU BUTTON — top-right, appears after dash tap */}
      <button
        data-menu-btn
        onClick={(e) => {
          e.stopPropagation();
          clearTimeout(hideTimer.current);
          setMode('menu');
          onTutorialStep && onTutorialStep('menuOpened');
        }}
        style={{
          position: 'absolute', top: '2cqw', right: '2cqw',
          width: '5.5cqw', height: '5.5cqw',
          background: 'rgba(15,15,15,0.85)',
          border: `1.5px solid ${mode === 'menuBtn' ? accent : 'rgba(255,255,255,0.25)'}`,
          borderRadius: '0.8cqw',
          color: '#fff', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: mode === 'menuBtn' ? 1 : 0,
          pointerEvents: mode === 'menuBtn' ? 'auto' : 'none',
          transform: mode === 'menuBtn' ? 'translateY(0)' : 'translateY(-0.8cqw)',
          transition: 'opacity 0.22s ease, transform 0.22s ease, border-color 0.2s ease',
          boxShadow: mode === 'menuBtn' ? `0 0 2cqw ${accent}55, 0 0.5cqw 1cqw rgba(0,0,0,0.6)` : 'none',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        }}
        aria-label="Open menu"
      >
        <BurgerIcon />
      </button>

      {/* MAIN MENU DRAWER — right side */}
      <div
        data-menu-panel
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '46%',
          background: 'rgba(10,10,10,0.96)',
          borderLeft: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '-2cqw 0 4cqw rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          transform: mode === 'menu' ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex', flexDirection: 'column',
          color: '#fff',
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '2cqw 2.5cqw', borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.2cqw', letterSpacing: '0.3cqw', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>MENU</div>
          <button onClick={() => setMode('idle')} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '2.2cqw', cursor: 'pointer', lineHeight: 1, padding: '0.3cqw 0.8cqw' }} aria-label="Close">×</button>
        </div>

        <div style={{ padding: '1.5cqw 2.5cqw 0.5cqw', fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
          Layouts
        </div>
        <div style={{ padding: '0.5cqw 1.5cqw', display: 'flex', flexDirection: 'column', gap: '0.4cqw' }}>
          {[
            { id: 'daily', label: 'Daily', sub: 'Full telemetry' },
            { id: 'shift', label: 'Shift focus', sub: 'Huge gear + RPM' },
            { id: 'track', label: 'Track mode', sub: 'Needs GPS adaptor', soon: true },
          ].map(L => (
            <button
              key={L.id}
              data-layout={L.id}
              onClick={() => { setActiveLayout(L.id); onTutorialStep && onTutorialStep('layoutChanged:' + L.id); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: activeLayout === L.id ? 'rgba(239,31,42,0.12)' : 'transparent',
                border: activeLayout === L.id ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.06)',
                color: '#fff', padding: '1cqw 1.25cqw', cursor: 'pointer',
                textAlign: 'left', borderRadius: '0.4cqw',
                fontFamily: 'inherit',
              }}
            >
              <div>
                <div style={{ fontSize: '1.5cqw', fontWeight: 600, fontStyle: 'italic' }}>{L.label}</div>
                <div style={{ fontSize: '1.05cqw', color: 'rgba(255,255,255,0.5)', marginTop: '0.15cqw', fontStyle: 'italic' }}>{L.sub}</div>
              </div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1cqw', letterSpacing: '0.2cqw', color: activeLayout === L.id ? accent : (L.soon ? '#999' : 'rgba(255,255,255,0.4)'), textTransform: 'uppercase' }}>
                {activeLayout === L.id ? '● ACTIVE' : (L.soon ? 'SOON' : 'TAP')}
              </div>
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ padding: '1.5cqw', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            data-settings-btn
            onClick={() => { setMode('settings'); onTutorialStep && onTutorialStep('settingsOpened'); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', padding: '1.2cqw 1.4cqw', cursor: 'pointer', borderRadius: '0.4cqw',
              fontFamily: 'inherit',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '1cqw' }}>
              <GearIcon size="1.8cqw" />
              <span style={{ fontSize: '1.5cqw', fontStyle: 'italic', fontWeight: 500 }}>Device Settings</span>
            </span>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.4cqw', color: 'rgba(255,255,255,0.5)' }}>→</span>
          </button>
        </div>
      </div>

      {/* SETTINGS OVERLAY — full screen */}
      <div
        data-settings-panel
        style={{
          position: 'absolute', inset: 0,
          background: '#0a0a0a',
          transform: mode === 'settings' ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex', flexDirection: 'column',
          color: '#fff', fontFamily: '"IBM Plex Sans", sans-serif',
        }}
      >
        {/* Settings header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5cqw',
          padding: '1.5cqw 2.5cqw',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <button onClick={() => setMode('menu')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '0.5cqw 1cqw', borderRadius: '0.3cqw', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1cqw', letterSpacing: '0.2cqw' }}>
            ← BACK
          </button>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.2cqw', letterSpacing: '0.3cqw', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Device Settings</div>
          <div style={{ marginLeft: 'auto', fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05cqw', letterSpacing: '0.2cqw', color: 'rgba(255,255,255,0.4)' }}>
            RDM-7 · FW 1.4.2
          </div>
        </div>

        {/* Settings body: category list + detail */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '28% 1fr', minHeight: 0 }}>
          {/* Category list */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto', padding: '1cqw 0' }}>
            {SETTINGS_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                data-settings-cat={cat.id}
                onClick={() => { setSettingsSection(cat.id); onTutorialStep && onTutorialStep('catSelected:' + cat.id); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '1cqw',
                  padding: '1.1cqw 2cqw',
                  background: settingsSection === cat.id ? 'rgba(239,31,42,0.1)' : 'transparent',
                  borderLeft: settingsSection === cat.id ? `3px solid ${accent}` : '3px solid transparent',
                  border: 'none', borderRight: 'none', borderTop: 'none', borderBottom: 'none',
                  color: settingsSection === cat.id ? '#fff' : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '1.5cqw' }}>{cat.icon}</span>
                <span style={{ fontSize: '1.4cqw', fontWeight: 500, fontStyle: 'italic' }}>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ padding: '2cqw 2.5cqw', overflowY: 'auto' }}>
            <SettingsDetail
              section={settingsSection}
              accent={accent}
              state={{ brightness, autoDim, theme, units, ecu, canBitrate, wifiOn, logging, sampleHz, activeLayout }}
              setters={{ setBrightness, setAutoDim, setTheme, setUnits, setEcu, setCanBitrate, setWifiOn, setLogging, setSampleHz }}
            />
          </div>
        </div>
      </div>

      {/* Tap-outside area to dismiss menu */}
      {mode === 'menu' && (
        <div
          onClick={() => setMode('idle')}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '54%', cursor: 'pointer' }}
        />
      )}
    </div>
  );
}

const SETTINGS_CATEGORIES = [
  { id: 'display',  label: 'Display',    icon: '◐' },
  { id: 'layouts',  label: 'Layouts',    icon: '▤' },
  { id: 'channels', label: 'Channels',   icon: '≡' },
  { id: 'ecu',      label: 'ECU',        icon: '⚙' },
  { id: 'can',      label: 'CAN Bus',    icon: '◉' },
  { id: 'wifi',     label: 'Wi-Fi',      icon: '≈' },
  { id: 'gps',      label: 'GPS',        icon: '◎' },
  { id: 'logging',  label: 'Data Log',   icon: '●' },
  { id: 'system',   label: 'System',     icon: 'ⓘ' },
];

function SettingsDetail({ section, accent, state, setters }) {
  const label = (text) => (
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1cqw', letterSpacing: '0.25cqw', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '0.6cqw' }}>
      {text}
    </div>
  );
  const row = (title, control) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2cqw 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
      gap: '2cqw',
    }}>
      <div style={{ fontSize: '1.35cqw', fontWeight: 500, fontStyle: 'italic' }}>{title}</div>
      <div>{control}</div>
    </div>
  );
  const pill = (active, onClick, text, disabled) => (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        background: active ? accent : 'transparent',
        color: active ? '#fff' : (disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)'),
        border: `1px solid ${active ? accent : 'rgba(255,255,255,0.15)'}`,
        padding: '0.55cqw 1.1cqw', borderRadius: '0.3cqw',
        fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05cqw', letterSpacing: '0.15cqw',
        cursor: disabled ? 'not-allowed' : 'pointer', marginLeft: '0.4cqw',
        textTransform: 'uppercase',
      }}
    >{text}</button>
  );
  const toggle = (on, onChange) => (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: '4.8cqw', height: '2.4cqw', borderRadius: '1.2cqw',
        background: on ? accent : 'rgba(255,255,255,0.15)',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.18s',
      }}
    >
      <span style={{
        position: 'absolute', top: '0.3cqw', left: on ? '2.7cqw' : '0.3cqw',
        width: '1.8cqw', height: '1.8cqw', borderRadius: '50%', background: '#fff',
        transition: 'left 0.18s',
      }} />
    </button>
  );

  if (section === 'display') {
    return (
      <div>
        {label('Display')}
        {row('Brightness',
          <div style={{ display: 'flex', alignItems: 'center', gap: '1cqw' }}>
            <input type="range" min="10" max="100" value={state.brightness} onChange={e => setters.setBrightness(Number(e.target.value))}
              style={{ width: '14cqw', accentColor: accent }}/>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.2cqw', minWidth: '3cqw', textAlign: 'right' }}>{state.brightness}%</span>
          </div>
        )}
        {row('Auto-dim at night', toggle(state.autoDim, setters.setAutoDim))}
        {row('Theme',
          <div>
            {pill(state.theme === 'day', () => setters.setTheme('day'), 'Day')}
            {pill(state.theme === 'night', () => setters.setTheme('night'), 'Night')}
            {pill(state.theme === 'auto', () => setters.setTheme('auto'), 'Auto')}
          </div>
        )}
        {row('Units',
          <div>
            {pill(state.units === 'metric', () => setters.setUnits('metric'), 'Metric')}
            {pill(state.units === 'imperial', () => setters.setUnits('imperial'), 'Imperial')}
          </div>
        )}
      </div>
    );
  }
  if (section === 'layouts') {
    return (
      <div>
        {label('Layouts')}
        <p style={{ fontSize: '1.25cqw', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, maxWidth: '40cqw' }}>
          Active layout: <span style={{ color: accent, fontStyle: 'italic', fontWeight: 600 }}>{state.activeLayout}</span>.
          Build new layouts in RDM Studio and push over Wi-Fi.
        </p>
        <div style={{ marginTop: '1.5cqw' }}>
          {row('Switch animation',
            <div>
              {pill(true, () => {}, 'Instant')}
              {pill(false, () => {}, 'Fade')}
            </div>
          )}
          {row('Default on boot',
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: accent }}>
              Daily
            </div>
          )}
        </div>
      </div>
    );
  }
  if (section === 'channels') {
    return (
      <div>
        {label('Channels & alerts')}
        {[
          ['Coolant temp', '60–105 °C', '115 °C'],
          ['Oil pressure', '40–95 psi', '< 20 psi'],
          ['Battery volts', '12.0–14.8 V', '< 11.5 V'],
          ['Knock count', '0', '> 4'],
          ['Lambda (AFR)', '11.0–14.7', '> 15.5'],
        ].map(([name, range, alert]) => row(
          name,
          <div style={{ display: 'flex', gap: '1.5cqw', alignItems: 'center' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1cqw', color: 'rgba(255,255,255,0.7)' }}>{range}</span>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1cqw', color: accent, letterSpacing: '0.15cqw' }}>ALERT {alert}</span>
          </div>
        ))}
      </div>
    );
  }
  if (section === 'ecu') {
    const ecus = ['MaxxECU', 'Link', 'Haltech', 'ECUMaster', 'MegaSquirt', 'Open CAN'];
    return (
      <div>
        {label('ECU protocol')}
        <p style={{ fontSize: '1.25cqw', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, maxWidth: '40cqw' }}>
          Auto-detected. Override below if you're running custom CAN IDs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8cqw', marginTop: '1.5cqw' }}>
          {ecus.map(e => (
            <button key={e} onClick={() => setters.setEcu(e)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: state.ecu === e ? 'rgba(239,31,42,0.12)' : 'rgba(255,255,255,0.03)',
                border: state.ecu === e ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
                color: '#fff', padding: '1cqw 1.2cqw', cursor: 'pointer', borderRadius: '0.3cqw',
                fontFamily: 'inherit',
              }}>
              <span style={{ fontSize: '1.35cqw', fontWeight: 500, fontStyle: 'italic' }}>{e}</span>
              {state.ecu === e && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1cqw', color: accent, letterSpacing: '0.2cqw' }}>● ACTIVE</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (section === 'can') {
    return (
      <div>
        {label('CAN Bus')}
        {row('Status',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: '#22dd44', letterSpacing: '0.2cqw' }}>● LINKED</span>
        )}
        {row('Bitrate',
          <div>
            {[125, 250, 500, 1000].map(b => pill(state.canBitrate === b, () => setters.setCanBitrate(b), b + 'k'))}
          </div>
        )}
        {row('Termination', toggle(true, () => {}))}
        {row('Error counter',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: 'rgba(255,255,255,0.7)' }}>0 / 0</span>
        )}
      </div>
    );
  }
  if (section === 'wifi') {
    return (
      <div>
        {label('Wi-Fi')}
        {row('Wi-Fi', toggle(state.wifiOn, setters.setWifiOn))}
        <div style={{ opacity: state.wifiOn ? 1 : 0.35, transition: 'opacity 0.2s', marginTop: '1cqw' }}>
          {label('Networks')}
          {['RDM-Studio-Pit', 'Workshop-5G', 'iPhone_Tom'].map((ssid, i) => row(
            ssid,
            <div style={{ display: 'flex', alignItems: 'center', gap: '1cqw' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05cqw', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15cqw' }}>{['STRONG','OK','WEAK'][i]}</span>
              {pill(i === 0, () => {}, i === 0 ? 'CONNECTED' : 'CONNECT')}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (section === 'gps') {
    return (
      <div>
        {label('GPS')}
        <div style={{
          background: 'rgba(239,31,42,0.08)', border: `1px solid ${accent}`,
          padding: '1.2cqw 1.4cqw', borderRadius: '0.4cqw', marginBottom: '1.5cqw',
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05cqw', color: accent, letterSpacing: '0.25cqw', marginBottom: '0.4cqw' }}>○ ADAPTOR REQUIRED</div>
          <div style={{ fontSize: '1.25cqw', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>GPS + Track mode ship with the optional RDM GPS adaptor (firmware update free, hardware sold separately).</div>
        </div>
        {row('Satellite lock',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2cqw' }}>— NO HARDWARE</span>
        )}
        {row('Position update', pill(false, () => {}, '1 Hz', true))}
        {row('Calibrate', pill(false, () => {}, 'Start', true))}
      </div>
    );
  }
  if (section === 'logging') {
    return (
      <div>
        {label('Data logging')}
        {row('Enabled', toggle(state.logging, setters.setLogging))}
        {row('Sample rate',
          <div>
            {[20, 50, 100, 200].map(hz => pill(state.sampleHz === hz, () => setters.setSampleHz(hz), hz + ' Hz'))}
          </div>
        )}
        {row('Storage',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1cqw', color: 'rgba(255,255,255,0.7)' }}>2.8 / 32 GB</span>
        )}
        {row('Auto-upload to Studio', toggle(true, () => {}))}
      </div>
    );
  }
  if (section === 'system') {
    return (
      <div>
        {label('System')}
        {row('Firmware',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: '#22dd44', letterSpacing: '0.2cqw' }}>1.4.2 · UP TO DATE</span>
        )}
        {row('Serial number',
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.15cqw', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15cqw' }}>RDM-7-24A-00184</span>
        )}
        {row('Check for updates', pill(false, () => {}, 'Check now'))}
        {row('Reboot', pill(false, () => {}, 'Restart'))}
        {row('Factory reset', pill(false, () => {}, 'Reset', false))}
      </div>
    );
  }
  return null;
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: '60%', height: '60%' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function GearIcon({ size = '1.8cqw' }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

Object.assign(window, { DashEmulator });
