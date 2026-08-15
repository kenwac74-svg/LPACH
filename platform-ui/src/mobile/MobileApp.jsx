import * as React from 'react';
import './mobileData.js';
import './mobileChart.js';
import goldRank from './assets/rank-gold.png';
import blueRank from './assets/rank-blue.png';
import purpleRank from './assets/rank-purple.png';
import redRank from './assets/rank-red.png';
import blackRank from './assets/rank-black.png';

window.__resources = {
  iconGold: goldRank,
  iconBlue: blueRank,
  iconPurple: purpleRank,
  iconRed: redRank,
  iconBlack: blackRank,
};

// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


/* LONGRISE Mobile — shared UI primitives */
const { useState, useEffect, useRef, useContext, createContext } = React;

const AppCtx = createContext(null);

/* ---------- Icons (minimal stroke set) ---------- */
const LR_ICON_PATHS = {
  home: "M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5",
  invest: "M3 21h18M6 17l4-6 4 3 5-8M16 6h3v3",
  team: "M16 19v-1a4 4 0 00-8 0v1M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 19v-.8a3.5 3.5 0 00-2.5-3.3M16.8 4.3a3.5 3.5 0 010 6.5M4 19v-.8a3.5 3.5 0 012.5-3.3M7.2 4.3a3.5 3.5 0 000 6.5",
  market: "M7 3v4M7 13v8M5 7h4v6H5zM17 3v6M17 17v4M15 9h4v8h-4z",
  wallet: "M3 7a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 9h17M16 14h2",
  bell: "M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10.5 20a1.8 1.8 0 003 0",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM20 17v3h-3",
  shield: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
  chevR: "M9 5l7 7-7 7",
  chevL: "M15 5l-7 7 7 7",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  swap: "M7 4v13M3.5 7.5L7 4l3.5 3.5M17 20V7M13.5 16.5L17 20l3.5-3.5",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  plus: "M12 5v14M5 12h14",
  x: "M6 6l12 12M18 6L6 18",
  check: "M4.5 12.5l5 5 10-11",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 00-2-1.2L14.2 3h-4l-.4 2.7a7 7 0 00-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 005.4 12a7 7 0 00.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 002 1.2l.4 2.7h4l.4-2.7a7 7 0 002-1.2l2.3 1 2-3.4-2-1.5a7 7 0 00.1-1.2z",
  support: "M12 21a9 9 0 10-9-9M12 17v.01M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2",
  news: "M4 5h13v14H6a2 2 0 01-2-2zM17 8h3v9a2 2 0 01-2 2M7 9h7M7 13h7",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6z",
  crown: "M3 17l1.5-9 4.5 4 3-6 3 6 4.5-4L21 17zM4 21h16",
  scan: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 7.5v.01",
  alert: "M12 3l9.5 16.5H2.5L12 3zM12 10v4M12 17.5v.01",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"
};

function Icon(props) {
  const size = props.size || 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={props.weight || 1.7}
      strokeLinecap="round" strokeLinejoin="round"
      style={props.style} aria-hidden="true">
      <path d={LR_ICON_PATHS[props.name] || ""}></path>
    </svg>
  );
}

/* ---------- Primitives ---------- */
function Eyebrow(props) {
  return <div className="eyebrow" style={props.style}>{props.children}</div>;
}

function Card(props) {
  return (
    <div className={"card" + (props.hero ? " hero" : "") + (props.void ? " void" : "")}
      style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

function Btn(props) {
  return (
    <button
      className={"btn " + (props.variant || "gold") + (props.block ? " block" : "") + (props.sm ? " sm" : "")}
      style={props.style} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

function Pill(props) {
  return (
    <span className={"pill" + (props.live ? " live" : "")} style={props.style}>
      {(props.dot || props.live) && <span className="dot" style={props.dotColor ? { background: props.dotColor } : null}></span>}
      {props.children}
    </span>
  );
}

function SegTabs(props) {
  return (
    <div className="seg">
      {props.options.map(function (o) {
        return (
          <button key={o} className={props.value === o ? "active" : ""}
            onClick={function () { props.onChange(o); }}>{o}</button>
        );
      })}
    </div>
  );
}

function SectionHead(props) {
  return (
    <div className="sec-head">
      <Eyebrow>{props.title}</Eyebrow>
      {props.action && <button className="more" onClick={props.onAction}>{props.action}</button>}
    </div>
  );
}

function Bar(props) {
  const pct = Math.max(0, Math.min(1, props.value)) * 100;
  return <div className="bar"><span style={{ width: pct + "%" }}></span></div>;
}

function Sparkline(props) {
  const w = props.width || 300, h = props.height || 54;
  const pts = props.points;
  const min = Math.min.apply(null, pts), max = Math.max.apply(null, pts);
  const span = (max - min) || 1;
  const step = w / (pts.length - 1);
  const coords = pts.map(function (p, i) {
    return [i * step, h - 6 - ((p - min) / span) * (h - 12)];
  });
  const line = coords.map(function (c) { return c[0].toFixed(1) + "," + c[1].toFixed(1); }).join(" ");
  const area = "0," + h + " " + line + " " + w + "," + h;
  return (
    <svg width="100%" height={h} viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={area} fill="url(#lr-spark-fill)" opacity="0.5"></polygon>
      <polyline points={line} fill="none" stroke="var(--gold-glow)" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"></polyline>
      <defs>
        <linearGradient id="lr-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(56,189,248,0.28)"></stop>
          <stop offset="100%" stopColor="rgba(56,189,248,0)"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

function StatTile(props) {
  return (
    <div className="stat-tile">
      <div className="v num">{props.value}{props.unit && <span style={{ fontSize: 12, color: "var(--color-muted)", marginLeft: 3 }}>{props.unit}</span>}</div>
      <div className="k">{props.label}</div>
    </div>
  );
}

function RowItem(props) {
  return (
    <div className="rowitem" onClick={props.onClick} style={props.onClick ? { cursor: "pointer" } : null}>
      {props.lead}
      <div className="grow">
        <div className="ttl">{props.title}</div>
        {props.sub && <div className="sub">{props.sub}</div>}
      </div>
      {props.trail}
      {props.chev && <Icon name="chevR" size={16} style={{ color: "var(--color-muted)" }} />}
    </div>
  );
}

function LeadDisc(props) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%", flex: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid var(--line-white-soft)",
      background: "var(--surface-void)",
      color: props.color || "var(--gold-highlight)"
    }}>
      {props.children}
    </div>
  );
}

/* ---------- Bottom sheet ---------- */
function Sheet(props) {
  if (!props.open) return null;
  return (
    <div
      className="sheet-backdrop"
      onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="sheet" onClick={function (e) { e.stopPropagation(); }}>
        {/* grab handle — tap or swipe down to close */}
        <button className="sheet-grab-wrap" onClick={props.onClose} aria-label="Close">
          <div className="sheet-grab"></div>
        </button>
        <div className="sheet-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 3 }}>Action</div>
            <div className="sheet-title">{props.title}</div>
          </div>
          <button className="iconbtn sheet-close-btn" onClick={props.onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="sheet-body">{props.children}</div>
      </div>
    </div>
  );
}

/* ---------- Field ---------- */
function Field(props) {
  const [showValue, setShowValue] = React.useState(false);
  const isPassword = props.type === "password";
  return (
    <div className="field">
      <label>{props.label}</label>
      <div className="input-wrap">
        <input className={"input" + (props.mono ? " mono" : "")}
          style={props.mono ? { fontFamily: "var(--font-mono)", fontSize: 13 } : null}
          type={isPassword && showValue ? "text" : (props.type || "text")} inputMode={props.inputMode}
          placeholder={props.placeholder} value={props.value}
          onChange={function (e) { props.onChange(e.target.value); }} />
        {(props.suffix || props.onMax || isPassword) && (
          <div className="input-suffix">
            {props.suffix && <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{props.suffix}</span>}
            {props.onMax && <button className="maxbtn" onClick={props.onMax}>MAX</button>}
            {isPassword && (
              <button className="maxbtn" type="button" onClick={function () { setShowValue(function (v) { return !v; }); }}>
                {showValue ? "HIDE" : "SHOW"}
              </button>
            )}
          </div>
        )}
      </div>
      {props.hint && <div className="muted" style={{ fontSize: 11.5 }}>{props.hint}</div>}
    </div>
  );
}

/* ---------- OTP input ---------- */
function OtpInput(props) {
  const refs = useRef([]);
  const vals = props.value;
  function setAt(i, ch) {
    const next = vals.slice();
    next[i] = ch;
    props.onChange(next);
    if (ch && i < 5 && refs.current[i + 1]) refs.current[i + 1].focus();
  }
  return (
    <div className="otp-row">
      {[0, 1, 2, 3, 4, 5].map(function (i) {
        return (
          <input key={i} className="otp-box" maxLength={1} inputMode="numeric"
            ref={function (el) { refs.current[i] = el; }}
            value={vals[i] || ""}
            onChange={function (e) { setAt(i, e.target.value.replace(/\D/g, "").slice(-1)); }}
            onKeyDown={function (e) {
              if (e.key === "Backspace" && !vals[i] && i > 0 && refs.current[i - 1]) refs.current[i - 1].focus();
            }} />
        );
      })}
    </div>
  );
}

/* ---------- Success state ---------- */
function SuccessBlock(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", padding: "8px 0 4px" }}>
      <div className="success-orb"><Icon name="check" size={30} weight={2} /></div>
      <div className="display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{props.title}</div>
      <div className="muted" style={{ fontSize: 13, maxWidth: 280 }}>{props.children}</div>
    </div>
  );
}

/* ---------- KV row ---------- */
function KV(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "7px 0" }}>
      <span className="muted" style={{ fontSize: 12.5 }}>{props.k}</span>
      <span className={"num " + (props.cls || "")} style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>{props.v}</span>
    </div>
  );
}

Object.assign(window, {
  AppCtx, Icon, Eyebrow, Card, Btn, Pill, SegTabs, SectionHead, Bar, Sparkline,
  StatTile, RowItem, LeadDisc, Sheet, Field, OtpInput, SuccessBlock, KV
});


/* LONGRISE Mobile — HOME screen */

/* Animated futures candlestick chart (compact) — wraps the vanilla LRChart
   engine. Respects the Live-feed / motion toggle; reports live price + the
   engine signal/latency stats back up via callbacks. */
function FuturesChart(props) {
  const ctx = React.useContext(AppCtx);
  const ref = React.useRef(null);
  const lastTs = React.useRef(0);
  const [px, setPx] = React.useState({ last: 67200, open: 67200 });

  React.useEffect(function () {
    if (!ref.current || !window.LRChart) return;
    const chart = window.LRChart(ref.current, {
      compact: true, start: 67213.5, decimals: 1, ai: true,
      onPrice: function (last, firstOpen) {
        const now = Date.now();
        if (now - lastTs.current < 550) return;
        lastTs.current = now;
        setPx({ last: last, open: firstOpen });
      },
      onStats: props.onStats
    });
    /* Paint one frame synchronously so the chart shows immediately even where
       requestAnimationFrame is paused (PDF export, backgrounded tab). */
    if (chart && chart.render) chart.render();
    if (!ctx.motionOn) { chart.stop(); chart.render(); }
    // separate from liveOn: AI signals stay active even when motion is off (chart only pauses)
    return function () { chart.stop(); };
  }, [ctx.motionOn]);

  const chg = px.open ? ((px.last - px.open) / px.open) * 100 : 0;
  const up = chg >= 0;
  return (
    <div className="fchart">
      <div className="fchart-head">
        <div className="fchart-pair">
          <span className="fchart-sym">BTC/USDT</span>
          <span className="fchart-perp">PERP</span>
          {ctx.motionOn && <Pill live style={{ marginLeft: 2 }}>AI</Pill>}
        </div>
        <div className="fchart-px num">
          {window.LR_FMT(px.last, 1)}
          <span className={"num " + (up ? "green" : "red")} style={{ fontSize: 11, marginLeft: 6, fontWeight: 700 }}>
            {up ? "+" : ""}{chg.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="fchart-canvas"><canvas ref={ref}></canvas></div>
    </div>
  );
}

function HomeScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [trades, setTrades] = React.useState(D.trades);
  const [eng, setEng] = React.useState({ signals: D.engine.signals, latency: D.engine.latency });

  React.useEffect(function () {
    if (!ctx.liveOn) return;
    const t = setInterval(function () {
      setTrades(function (prev) { return [D.genTrade()].concat(prev).slice(0, 6); });
    }, 3200);
    return function () { clearInterval(t); };
  }, [ctx.liveOn]);

  const cnytVal = ctx.bal.cnyt * D.market.cnytPrice;
  const total = ctx.bal.available + ctx.bal.earned + ctx.bal.invested + cnytVal;
  const roiPct = ctx.bal.invested > 0 ? (ctx.bal.earned / ctx.bal.invested * 100) : 0;
  const weekMax = Math.max.apply(null, D.weekEarnings);
  const weekTotal = D.weekEarnings.reduce(function (a, b) { return a + b; }, 0);

  return (
    <div className="lr-screen" data-screen-label="Home">
      {/* TOP BANNER — Start Here (신규) / MARKET (White Dragon 이상) */}
      {D.user.rank === "WHITE"
        ? (
          <button className="sh-banner" onClick={ctx.openStartHere}>
            <span className="sh-ic"><Icon name="bolt" size={18} weight={2} /></span>
            <span className="sh-copy">
              <span className="sh-title">Start Here · New here?</span>
              <span className="sh-sub">Master LongRise in 3 minutes →</span>
            </span>
            <Icon name="chevR" size={16} style={{ color: "var(--gold-base)" }} />
          </button>
        ) : (
          <button className="sh-banner" onClick={function () { ctx.notify("Market opens in a future update"); }}>
            <span className="sh-ic" style={{ background: "linear-gradient(140deg,#60a5fa,#3b82f6)" }}>
              <Icon name="market" size={18} weight={2} />
            </span>
            <span className="sh-copy">
              <span className="sh-title">MARKET — P2P Trading Floor</span>
              <span className="sh-sub" style={{ color: "#60a5fa" }}>Buy · Sell · Swap USDT &amp; CNYT →</span>
            </span>
            <Icon name="chevR" size={16} style={{ color: "var(--gold-base)" }} />
          </button>
        )
      }

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <Eyebrow>{total === 0 ? "Welcome" : "Welcome back"}</Eyebrow>
          <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
            {D.user.name}
          </div>
        </div>
        <Pill dot dotColor="var(--gold-glow)"><Icon name="crown" size={12} /> {D.user.rank + " DRAGON"}</Pill>
      </div>

      {/* Total assets hero — Coinone style */}
      <Card hero>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: "var(--gold-base)" }}>TOTAL VALUE</div>
          <Pill live>Live</Pill>
        </div>

        {/* Big total number */}
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1, marginBottom: 10 }}>
          ${fmt(total)}
        </div>

        {/* Today P&L + ROI */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "4px 10px" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>+${fmt(D.todayPnl)}</span>
            <span style={{ fontSize: 11, color: "#10b981", opacity: 0.8 }}>today</span>
          </div>
          {ctx.bal.invested > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.20)", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#10b981" }}>↑ {roiPct.toFixed(1)}%</span>
              <span style={{ fontSize: 10.5, color: "#9e8070" }}>ROI</span>
            </div>
          )}
        </div>

        {/* 2×2 breakdown grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(201,146,42,0.18)", marginBottom: 18 }}>
          {/* INVESTED */}
          <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(201,146,42,0.12)", borderBottom: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>ACTIVE EXPOSURE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>${fmt(ctx.bal.invested)}</div>
          </div>
          {/* EARNED */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>EARNED</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#10b981", fontVariantNumeric: "tabular-nums" }}>${fmt(ctx.bal.earned)}</div>
          </div>
          {/* CNYT */}
          <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 6 }}>CNYT VALUE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--gold-base)", fontVariantNumeric: "tabular-nums" }}>${fmt(cnytVal)}</div>
            <div style={{ fontSize: 10.5, color: "var(--gold-base)", opacity: 0.7, marginTop: 3 }}>{fmt(ctx.bal.cnyt, 0)} CNYT</div>
          </div>
          {/* AVAILABLE */}
          <div style={{ padding: "14px 16px", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>AVAILABLE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>${fmt(ctx.bal.available)}</div>
          </div>
        </div>

        {total === 0
          ? (
            <button className="btn gold block" onClick={function () { ctx.goTab("WALLET", { open: "deposit" }); }}>
              <Icon name="arrowDown" size={16} weight={2} /> Deposit USDT to get started
            </button>
          ) : (
            <button className="btn gold block" onClick={function () { ctx.goTab("PLANS"); }}>
              <Icon name="invest" size={16} weight={2} /> Get more Profit
            </button>
          )
        }
      </Card>

      {/* My packages — held positions with profit & rate (Wallet handles deposit/withdraw/send/swap) */}
      <Card>
        <SectionHead title="My packages" action="View plans" onAction={function () { ctx.goTab("PLANS"); }} />
        {ctx.portfolio.length === 0
          ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "28px 0 12px", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(185,154,107,0.10)", border: "1px solid rgba(185,154,107,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="invest" size={26} style={{ color: "var(--gold-base)" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 5 }}>No active packages yet</div>
                <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>Select a plan and start earning daily dividends from the AI engine.</div>
              </div>
              <button className="btn gold block" style={{ width: "100%" }} onClick={function () { ctx.goTab("PLANS"); }}>
                <Icon name="invest" size={15} weight={2} /> Browse Plans
              </button>
            </div>
          ) : (
            <div style={{ marginTop: 6 }}>
              {ctx.portfolio.map(function (p) {
                return (
                  <div key={p.id} className="pkg-row">
                    <div className="pkg-top">
                      <span className="pkg-name display">{p.pkg}</span>
                      <span className="num green" style={{ fontSize: 14, fontWeight: 700 }}>+${fmt(p.earned)}</span>
                    </div>
                    <div className="pkg-meta">
                      <span className="num">${fmt(p.amount, 0)} principal</span>
                      <span className="" style={{ fontWeight: 700, color: "#ffffff" }}>{p.dailyRoi}%/day</span>
                    </div>
                    <Bar value={p.progress} />
                    <div className="pkg-foot muted">
                      <span>{p.start}</span><span>{Math.round(p.progress * 100)}% · ends {p.end}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        }
      </Card>

      {/* AI engine */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <img src={window.LR_IMG("iconGold")} alt="" style={{ width: 26, height: "auto" }} />
            <div>
              <div className="display" style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.1em" }}>{D.engine.name}</div>
              <div className="muted" style={{ fontSize: 10.5 }}>AI execution engine</div>
            </div>
          </div>
          <Pill live>Active</Pill>
        </div>
        <FuturesChart onStats={function (stats) { setEng({ signals: stats.sps, latency: stats.latency }); }} />
        <div className="stat-grid" style={{ marginTop: 12 }}>
          <StatTile value={D.engine.winRate} unit="%" label="Win rate" />
          <StatTile value={D.engine.dailyRoi} unit="%" label="Daily ROI" />
          <StatTile value={fmt(eng.signals, 0)} unit="/s" label="Signals" />
          <StatTile value={eng.latency} unit="ms" label="Latency" />
        </div>
        <div className="terminal" style={{ marginTop: 12 }}>
          <div><span className="g">▸</span> neural.core.v6 — session synced · 3 exchanges</div>
          <div><span className="a">▸</span> pattern.match BTC/USDT conf 0.94 → <span className="g">executed</span></div>
          <div><span className="g">▸</span> pnl.stream +{fmt(D.todayPnl)} USDT realized today</div>
        </div>
      </Card>

      {/* Live trades */}
      <Card void>
        <SectionHead title="Live trades" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {trades.map(function (t, i) {
            const win = t.pnl >= 0;
            return (
              <RowItem key={t.time + t.pair + i}
                lead={
                  <LeadDisc color={win ? "var(--green-success)" : "var(--red-alert)"}>
                    <Icon name={win ? "arrowUp" : "arrowDown"} size={16} />
                  </LeadDisc>
                }
                title={t.pair}
                sub={t.side + " · " + t.time}
                trail={
                  <span className={"num " + (win ? "green" : "red")} style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {win ? "+" : "−"}${fmt(Math.abs(t.pnl))}
                  </span>
                } />
            );
          })}
        </div>
      </Card>

      {/* 7-day earnings */}
      <Card>
        <SectionHead title="Last 7 days" />
        {weekTotal === 0
          ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 0 8px", textAlign: "center" }}>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>Dividend history will appear here once your first package is active.</div>
              <button className="btn ghost block" style={{ width: "100%", marginTop: 4 }} onClick={function () { ctx.goTab("PLANS"); }}>
                Browse Plans <Icon name="chevR" size={14} />
              </button>
            </div>
          ) : (
            <React.Fragment>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 12px" }}>
                <span className="" style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>+${fmt(weekTotal)}</span>
                <span className="muted" style={{ fontSize: 11.5 }}>dividends credited</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 7, alignItems: "end", height: 64 }}>
                {D.weekEarnings.map(function (v, i) {
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end" }}>
                      <div style={{
                        width: "100%", borderRadius: 4,
                        height: Math.round((v / weekMax) * 48) + "px",
                        background: i === 6
                          ? "linear-gradient(180deg, var(--gold-glow), var(--gold-base))"
                          : "rgba(37,99,235,0.28)"
                      }}></div>
                      <span className="muted" style={{ fontSize: 8.5, letterSpacing: "0.1em" }}>{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][i]}</span>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          )
        }
      </Card>

      {/* News */}
      <Card void>
        <SectionHead title="News & updates" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {D.news.map(function (n, i) {
            return (
              <RowItem key={i}
                lead={<LeadDisc><Icon name="news" size={16} /></LeadDisc>}
                title={n.title} sub={n.tag + " · " + n.date} chev
                onClick={function () { ctx.openSheet("news", n); }} />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

window.HomeScreen = HomeScreen;


/* LONGRISE Mobile — INVEST screen (packages + purchase flow) */
function InvestScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [sel, setSel] = React.useState(null);
  const [step, setStep] = React.useState("detail"); // detail | summary | policy | done
  const [amount, setAmount] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);

  function getCnytRate(p) {
    if (!p || p.term === "No lock") return null;
    var rates = { "BASIC": 2, "STANDARD": 4, "PREMIUM": 6, "VIP": 10 };
    var upper = (p.name || "").toUpperCase();
    for (var k in rates) { if (upper.indexOf(k) >= 0) return rates[k]; }
    return null;
  }

  var isFlexible = sel && sel.term === "No lock";

  function openPkg(p) {
    setSel(p);
    setAmount(String(p.min));
    setStep("detail");
    setAgreed(false);
  }
  function close() { setSel(null); setAgreed(false); }

  const amt = parseFloat(amount) || 0;
  const mid = sel ? (sel.mid || parseFloat(sel.roi) || 1) : 1;
  const dailyEst = amt * mid / 100;
  const monthlyEst = dailyEst * 30;
  const cnytRate = getCnytRate(sel);
  const valid = sel && amt >= sel.min && amt <= ctx.bal.available;

  function confirmPurchase() {
    var cnytBonus = cnytRate ? Math.round(amt * cnytRate / 100 / D.market.cnytPrice) : 0;
    ctx.setBal(function (b) {
      return Object.assign({}, b, {
        available: b.available - amt,
        invested: b.invested + amt,
        cnyt: b.cnyt + cnytBonus
      });
    });
    ctx.setPortfolio(function (p) {
      return [{
        id: "p" + Date.now(), pkg: sel.name, amount: amt, dailyRoi: mid,
        start: "Jun 13, 2026", end: sel.term === "No lock" ? "Open-ended" : "+" + sel.term,
        progress: 0, earned: 0
      }].concat(p);
    });
    ctx.addHistory({ type: "INVEST", label: sel.name + " package activated", amount: amt, dir: -1 });
    if (cnytBonus > 0) {
      ctx.addHistory({ type: "CNYT_BONUS", label: sel.name + " CNYT bonus credited", amount: cnytBonus * D.market.cnytPrice, dir: 1 });
    }
    setStep("done");
  }

  var penalties = [
    { period: "Within 3 Months",        rate: "30% Penalty",   danger: true  },
    { period: "Within 6 Months",        rate: "20% Penalty",   danger: true  },
    { period: "Within 9 Months",        rate: "15% Penalty",   danger: true  },
    { period: "Within 12 Months",       rate: "10% Penalty",   danger: true  },
    { period: "At Maturity (12 Months)", rate: "Safe (0% Fee)", danger: false }
  ];

  return (
    <div className="lr-screen" data-screen-label="Invest">
      <div>
        <Eyebrow>Stake plans</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Put capital to work
        </div>
      </div>

      {/* My portfolio */}
      {ctx.portfolio.length > 0 && (
        <Card void>
          <SectionHead title="My portfolio" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            {ctx.portfolio.map(function (p) {
              return (
                <div key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="display" style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.08em" }}>{p.pkg}</span>
                    <span className="num" style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>${fmt(p.amount)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0 8px" }}>
                    <span className="muted" style={{ fontSize: 11 }}>{p.start} → {p.end}</span>
                    <span className="green num" style={{ fontSize: 11.5, fontWeight: 600 }}>+${fmt(p.earned)} earned</span>
                  </div>
                  <Bar value={p.progress} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Package cards — compact layout */}
      {D.packages.map(function (p) {
        var pkgCnyt = getCnytRate(p);
        return (
          <div key={p.id} style={{
            background: p.featured ? "linear-gradient(145deg, rgba(185,154,107,0.18) 0%, rgba(255,255,255,0.04) 100%)" : "var(--surface-card)",
            border: "1px solid " + (p.featured ? "var(--line-gold-mid)" : "var(--border-card)"),
            borderRadius: 12,
            padding: "18px 18px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}>
            {/* Row 1: Name + badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="display" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.06em", color: p.featured ? "var(--gold-highlight)" : "var(--text-primary)" }}>{p.name}</span>
              {p.featured && (
                <span style={{ background: "var(--accent)", color: "#041020", fontSize: 9.5, fontWeight: 800, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.08em", flexShrink: 0 }}>POPULAR</span>
              )}
            </div>

            {/* Row 2: Min amount hero */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="num" style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>${fmt(p.min, 0)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>USDT min.</span>
            </div>

            {/* Row 3: ROI · Term · CNYT | Select button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid var(--line-white-soft)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }} className="num">{p.roi} annual</span>
                <span className="muted" style={{ fontSize: 10.5 }}>
                  {p.note} · {p.term}
                  {pkgCnyt && <span style={{ color: "var(--accent)", fontWeight: 700, marginLeft: 6 }}>+{pkgCnyt}% CNYT</span>}
                </span>
              </div>
              <button onClick={function () { openPkg(p); }} style={{
                appearance: "none", border: "1.5px solid " + (p.featured ? "var(--gold-base)" : "rgba(185,154,107,0.5)"),
                borderRadius: 10, background: p.featured ? "linear-gradient(135deg,var(--gold-base),var(--gold-deep))" : "transparent",
                color: p.featured ? "#041020" : "var(--gold-base)",
                fontSize: 13, fontWeight: 800, letterSpacing: "0.06em",
                padding: "9px 22px", cursor: "pointer", flexShrink: 0
              }}>Select</button>
            </div>
          </div>
        );
      })}

      {/* Purchase sheet */}
      <Sheet open={!!sel} onClose={close} title={sel ? sel.name : ""}>

        {/* STEP 1: Amount input + projections */}
        {sel && step === "detail" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Pill>{sel.roi} annual</Pill>
              <Pill>{sel.term}</Pill>
            </div>
            {ctx.bal.available === 0 && (
              <div style={{ background: "rgba(185,154,107,0.08)", border: "1px solid rgba(185,154,107,0.30)", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon name="alert" size={16} style={{ color: "var(--gold-highlight)", flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--gold-highlight)", marginBottom: 3 }}>No available balance</div>
                    <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.6 }}>You need to deposit USDT before activating a package.</div>
                  </div>
                </div>
                <button className="btn gold block" onClick={function () { close(); ctx.goTab("WALLET", { open: "deposit" }); }}>
                  <Icon name="arrowDown" size={15} weight={2} /> Deposit USDT now
                </button>
              </div>
            )}
            <Field label="Stake amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.available))); }}
              hint={"Min $" + fmt(sel.min, 0) + " · Available $" + fmt(ctx.bal.available)} />
            <Card void style={{ padding: 14 }}>
              <KV k="Projected daily dividend" v={"+$" + fmt(dailyEst) + " USDT"} cls="green" />
              <KV k="Projected 30-day yield" v={"+$" + fmt(dailyEst * 30) + " USDT"} />
              <KV k="Capital release" v={sel.term} />
            </Card>
            {amt > ctx.bal.available && amt > 0 && (
              <div className="red" style={{ fontSize: 12 }}>Insufficient available balance — deposit first.</div>
            )}
            <Btn block disabled={!valid} onClick={function () { setStep("summary"); }}>Continue</Btn>
          </div>
        )}

        {/* STEP 2: Investment Summary */}
        {sel && step === "summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Header */}
            <div style={{ textAlign: "center", paddingBottom: 16, marginBottom: 4, borderBottom: "1px solid var(--line-white-soft)" }}>
              <div className="muted" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>Order Summary</div>
              <div className="display" style={{ fontSize: 19, fontWeight: 700 }}>{sel.name} Package</div>
            </div>

            {/* Summary rows */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                <span className="muted" style={{ fontSize: 14 }}>Initial Deposit</span>
                <span className="num" style={{ fontSize: 20, fontWeight: 800, color: "#ffffff" }}>${fmt(amt)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                <span className="muted" style={{ fontSize: 14 }}>Available USDT</span>
                <span className="num" style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{fmt(ctx.bal.available)} USDT</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                <span className="muted" style={{ fontSize: 14 }}>Monthly USDT</span>
                <span className="num" style={{ fontSize: 16, fontWeight: 700, color: "var(--green-success)" }}>+${fmt(monthlyEst)}</span>
              </div>
              {cnytRate && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                  <span className="muted" style={{ fontSize: 14 }}>Monthly CNYT Bonus</span>
                  <span className="num" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>+{cnytRate}% of returns</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
                <span className="muted" style={{ fontSize: 14 }}>Contract Period</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{sel.term === "No lock" ? "Immediate" : sel.term}</span>
              </div>
            </div>

            {/* FLEXIBLE: 0% notice instead of policy popup */}
            {isFlexible && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                <Icon name="check" size={16} style={{ color: "var(--green-success)", flex: "none", marginTop: 1 }} />
                <span className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                  <span style={{ color: "var(--green-success)", fontWeight: 700 }}>No lock-in · 0% cancellation fee.</span>
                  {" "}Capital can be withdrawn within 24 hours at any time.
                </span>
              </div>
            )}

            <Btn block onClick={isFlexible ? function () { setStep("confirm"); } : function () { setStep("policy"); }}>
              Continue
            </Btn>
          </div>
        )}

        {/* STEP 3a: Final confirmation (FLEXIBLE / No lock only) */}
        {sel && step === "confirm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign: "center" }}>
              <Eyebrow>Confirm Activation</Eyebrow>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Please review before your capital is deployed.</div>
            </div>
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-card)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Package</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>{sel.name}</span>
              </div>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Amount</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>${fmt(amt)} USDT</span>
              </div>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Lock period</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green-success)" }}>No lock-in</span>
              </div>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Cancellation fee</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green-success)" }}>0% (Free)</span>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Balance after purchase</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>${fmt(Math.max(0, ctx.bal.available - amt))} USDT</span>
              </div>
            </div>
            <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "13px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red-alert)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.65 }}>Once activated, ${fmt(amt)} USDT will move from Available Balance to Active Exposure. Purchase cannot be canceled after confirmation.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" onClick={function () { setStep("summary"); }}>Back</Btn>
              <Btn onClick={confirmPurchase}>Confirm &amp; Activate</Btn>
            </div>
          </div>
        )}

        {/* STEP 3b: Cancellation Policy (non-FLEXIBLE only) */}
        {sel && step === "policy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Warning icon + title */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingBottom: 4 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(220,38,38,0.15)", border: "2px solid var(--red-alert)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: "var(--red-alert)", lineHeight: 1 }}>!</span>
              </div>
              <div className="display" style={{ fontSize: 19, fontWeight: 700, textAlign: "center" }}>Cancellation Policy</div>
            </div>

            {/* Penalty table */}
            <div style={{ background: "var(--surface-void)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border-card)" }}>
              <div style={{ padding: "10px 16px", background: "rgba(220,38,38,0.10)", borderBottom: "1px solid var(--border-card)" }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "var(--red-alert)" }}>EARLY WITHDRAWAL PENALTY</span>
              </div>
              {penalties.map(function (row, i) {
                return (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 16px",
                    borderBottom: i < penalties.length - 1 ? "1px solid var(--line-white-soft)" : "none"
                  }}>
                    <span className="muted" style={{ fontSize: 13 }}>{row.period}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: row.danger ? "var(--red-alert)" : "var(--green-success)" }}>{row.rate}</span>
                  </div>
                );
              })}
            </div>

            {/* Checkbox agreement */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
              onClick={function () { setAgreed(!agreed); }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6, flex: "none", marginTop: 1,
                border: "2px solid " + (agreed ? "var(--accent)" : "var(--line-gold-mid)"),
                background: agreed ? "var(--accent)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all .15s"
              }}>
                {agreed && <Icon name="check" size={14} style={{ color: "#041020" }} />}
              </div>
              <span className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                I understand this purchase cannot be canceled after confirmation.
              </span>
            </div>

            {/* Purchase note */}
            <div className="muted" style={{ fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
              Purchase cannot be canceled after confirmation.
            </div>

            {/* Back + Confirm */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" onClick={function () { setStep("summary"); }}>Back</Btn>
              <Btn disabled={!agreed} onClick={confirmPurchase}>Confirm</Btn>
            </div>
          </div>
        )}

        {/* STEP 4: Done */}
        {sel && step === "done" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Package activated">
              {sel.name} is live. First dividend credits at 00:00 UTC and appears in your wallet as earned balance.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Portfolio updated"); }}>Done</Btn>
          </div>
        )}

      </Sheet>
    </div>
  );
}

window.InvestScreen = InvestScreen;


/* LONGRISE Mobile — TEAM screen (referral, network, org tree, rank ladder) */

/* ── Rank colour map (White / Blue / Purple / Red / Black) ── */
var RANK_COLOR = {
  WHITE:  "#d4d4d4",
  BLUE:   "#60a5fa",
  PURPLE: "#c084fc",
  RED:    "#f87171",
  BLACK:  "#7dd3fc"
};
var RANK_LABEL = {
  WHITE:  "WHITE DRAGON",
  BLUE:   "BLUE DRAGON",
  PURPLE: "PURPLE DRAGON",
  RED:    "RED DRAGON",
  BLACK:  "BLACK DRAGON"
};
var RANK_IMG = {
  WHITE:  "iconWhite",
  BLUE:   "iconBlue",
  PURPLE: "iconPurple",
  RED:    "iconRed",
  BLACK:  "iconBlack"
};
var RANK_BENEFIT = {
  WHITE:  { type: "BASIC BENEFIT",  text: "10% Direct Referral" },
  BLUE:   { type: "ACTIVE BENEFIT", text: "3-Tier Rollup" },
  PURPLE: { type: "ELITE BENEFIT",  text: "7-Tier Rollup" },
  RED:    { type: "ELITE BENEFIT",  text: "15-Tier + 1% Pool" },
  BLACK:  { type: "ELITE BENEFIT",  text: "25-Tier + 1% Pool" }
};

function getTopHonorMembers(tree) {
  var members = [];
  function countMembers(node) {
    return (node.children || []).reduce(function (sum, child) {
      return sum + 1 + countMembers(child);
    }, 0);
  }
  function sumTeamVolume(node) {
    return Number(node.volume || 0) + (node.children || []).reduce(function (sum, child) {
      return sum + sumTeamVolume(child);
    }, 0);
  }
  function walk(node, depth) {
    if (!node) return;
    if (!node.isMe) {
      members.push({
        name: node.name,
        initials: node.initials,
        rank: node.rank,
        volume: Number(node.volume || 0),
        memberCount: countMembers(node),
        teamVolume: sumTeamVolume(node),
        depth: depth
      });
    }
    (node.children || []).forEach(function (child) { walk(child, depth + 1); });
  }
  walk(tree, 0);
  return members.sort(function (a, b) { return b.teamVolume - a.teamVolume; }).slice(0, 10);
}


/* ── QR code mock (21×21 deterministic grid) ── */
function QRMock(props) {
  const code = props.code || "LONGRISE";
  const S = 21;
  const cells = [];
  for (var r = 0; r < S; r++) {
    for (var c = 0; c < S; c++) {
      var dark = false;
      if (r <= 6 && c <= 6) {
        dark = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
      } else if (r <= 6 && c >= 14) {
        const lc = c - 14;
        dark = r === 0 || r === 6 || lc === 0 || lc === 6 || (r >= 2 && r <= 4 && lc >= 2 && lc <= 4);
      } else if (r >= 14 && c <= 6) {
        const lr = r - 14;
        dark = lr === 0 || lr === 6 || c === 0 || c === 6 || (lr >= 2 && lr <= 4 && c >= 2 && c <= 4);
      } else if (r === 6 || c === 6) {
        dark = (r + c) % 2 === 0;
      } else {
        const seed = r * 31 + c * 17;
        const ch = code.charCodeAt((r * 3 + c) % code.length);
        dark = ((seed ^ ch) & 1) === 0;
      }
      cells.push(dark);
    }
  }
  return (
    <div className="qr-mock">
      {cells.map(function (dark, i) {
        return <div key={i} className={"qr-cell" + (dark ? " qr-dark" : "")}></div>;
      })}
    </div>
  );
}

/* ── QR full-screen overlay ── */
function QROverlay(props) {
  var D = window.LR_DATA;
  function doCopy() {
    if (navigator.clipboard) navigator.clipboard.writeText("https://" + D.user.refLink).catch(function () {});
    props.onCopied();
  }
  function doShare() {
    if (navigator.share) {
      navigator.share({ title: "Join LONGRISE", text: "Use my referral code: " + D.user.refCode, url: "https://" + D.user.refLink }).catch(function () {});
    } else { doCopy(); }
  }
  return (
    <div className="qr-overlay" role="dialog" aria-modal="true" aria-label="My QR Code">
      <div className="qr-ov-head">
        <button className="iconbtn" onClick={props.onClose} aria-label="Close">
          <Icon name="chevL" size={20} />
        </button>
        <span className="eyebrow" style={{ color: "var(--color-cream)", letterSpacing: "0.18em" }}>My QR Code</span>
        <span style={{ width: 44 }}></span>
      </div>

      <div className="qr-ov-body">
        <div className="qr-ov-brand">
          <img src={window.LR_IMG("iconGold")} alt="" style={{ height: 26, width: "auto" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: "0.26em", color: "var(--color-cream)" }}>
            LONG<em style={{ fontStyle: "normal", color: "var(--gold-base)" }}>RISE</em>
          </span>
        </div>

        <div className="qr-ov-hint">QR 코드를 친구에게 보여주거나 캡처해서 공유하세요.<br />추천 코드가 자동으로 적용됩니다.</div>

        <div className="qr-ov-card">
          <QRMock code={D.user.refCode} />
          <div className="qr-ov-sep"></div>
          <div className="qr-ov-codeline">
            <span className="qr-ov-code-label">REFERRAL CODE</span>
            <span className="qr-ov-code-val">{D.user.refCode}</span>
          </div>
        </div>

        <div className="qr-ov-reflink">
          <span className="mono" style={{ fontSize: 11.5, color: "var(--text-secondary)", wordBreak: "break-all" }}>
            https://{D.user.refLink}
          </span>
        </div>

        <div className="qr-ov-actions">
          <Btn block onClick={doCopy}><Icon name="copy" size={15} /> Copy Link</Btn>
          <Btn variant="ghost" block onClick={doShare}><Icon name="send" size={15} /> Share</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Single tree node (collapsible) ── */
function TreeNode(props) {
  var node = props.node, depth = props.depth || 0, q = props.q || "";
  var fmt = window.LR_FMT;
  var hasKids = node.children && node.children.length > 0;
  var [open, setOpen] = React.useState(depth < 1);
  var showKids = q ? true : open;

  function nodeMatches(n, term) {
    var t = term.toLowerCase();
    if (n.name.toLowerCase().indexOf(t) > -1 || n.id.toLowerCase().indexOf(t) > -1) return true;
    return (n.children || []).some(function (c) { return nodeMatches(c, term); });
  }
  if (q && !nodeMatches(node, q)) return null;

  var rankColor = RANK_COLOR[node.rank] || "var(--text-secondary)";
  var indentPx = depth * 22;

  return (
    <div className="tnode">
      <button
        className={"tnode-row" + (node.isMe ? " tnode-me" : "")}
        style={{ paddingLeft: 12 + indentPx }}
        onClick={function () { if (hasKids) setOpen(!open); }}
      >
        {depth > 0 && <div className="tnode-depthline" style={{ left: indentPx - 2 }} />}
        <div className={"tnode-av" + (node.isMe ? " gold" : "")}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", fontFamily: "var(--font-display)" }}>
            {node.initials}
          </span>
        </div>
        <div className="tnode-body">
          <div className="tnode-name">
            {node.name}
            {node.isMe && <span className="tnode-badge">ME</span>}
          </div>
          <div className="tnode-meta">
            <span style={{ color: rankColor, fontWeight: 700 }}>{RANK_LABEL[node.rank] || node.rank}</span>
            <span className="tnode-dot"> · </span>
            <span className="num">Vol. <span style={{ color: "var(--gold-highlight)" }}>${fmt(node.volume, 0)}</span></span>
          </div>
        </div>
        <div className="tnode-trail">
          {hasKids && (
            <React.Fragment>
              <span className="tnode-kcount">{node.children.length}</span>
              <span className={"tnode-arr" + (showKids ? " open" : "")}>
                <Icon name="chevR" size={13} />
              </span>
            </React.Fragment>
          )}
          {!hasKids && <span className="tnode-leaf" />}
        </div>
      </button>
      {showKids && hasKids && (
        <div className="tnode-kids">
          {node.children.map(function (c) {
            return <TreeNode key={c.id} node={c} depth={depth + 1} q={q} />;
          })}
        </div>
      )}
    </div>
  );
}

/* ── Graphical org chart (pan/zoom interactive tree) ── */
function OrgChartView(props) {
  var data = props.data, orgStats = props.orgStats;
  var fmt = window.LR_FMT;
  var NW = 120, NH = 110, HG = 14, VG = 52;

  var [scale, setScale] = React.useState(0.58);
  var [offset, setOffset] = React.useState({ x: 16, y: 20 });
  var [showAll, setShowAll] = React.useState(false);
  var [srch, setSrch] = React.useState("");
  var drag = React.useRef(null);
  var wrap = React.useRef(null);

  function buildLayout(node, depth) {
    var maxD = showAll ? 99 : 2;
    var kids = depth < maxD ? (node.children || []) : [];
    var cl = kids.map(function (c) { return buildLayout(c, depth + 1); });
    var tw = cl.length === 0
      ? NW
      : Math.max(NW, cl.reduce(function (s, c) { return s + c.tw; }, 0) + Math.max(0, cl.length - 1) * HG);
    return { node: node, depth: depth, tw: tw, cl: cl, x: 0, y: 0 };
  }

  function placeNodes(ln, sx) {
    var cTW = ln.cl.reduce(function (s, c) { return s + c.tw; }, 0) + Math.max(0, ln.cl.length - 1) * HG;
    ln.x = sx + (ln.tw - NW) / 2;
    ln.y = ln.depth * (NH + VG);
    var cx = sx + (ln.tw - cTW) / 2;
    ln.cl.forEach(function (c) { placeNodes(c, cx); cx += c.tw + HG; });
    return ln;
  }

  function flattenTree(ln) {
    var r = [ln];
    ln.cl.forEach(function (c) { flattenTree(c).forEach(function (n) { r.push(n); }); });
    return r;
  }

  var root = placeNodes(buildLayout(data, 0), 0);
  var allNodes = flattenTree(root);
  var maxDepth = allNodes.reduce(function (m, n) { return Math.max(m, n.depth); }, 0);
  var tW = root.tw, tH = (maxDepth + 1) * (NH + VG);

  function fitAll() {
    if (!wrap.current) return;
    var cw = wrap.current.offsetWidth, ch = wrap.current.offsetHeight;
    var s = Math.max(0.15, Math.min((cw - 32) / tW, (ch - 32) / tH, 1.2));
    setScale(s);
    setOffset({ x: (cw - tW * s) / 2, y: 20 });
  }

  function toTop() {
    if (!wrap.current) return;
    var cw = wrap.current.offsetWidth;
    setOffset({ x: cw / 2 - (root.x + NW / 2) * scale, y: 40 });
  }

  function onPD(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "SPAN") return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: offset.x, oy: offset.y };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch(err) {}
  }
  function onPM(e) {
    if (!drag.current) return;
    setOffset({ x: drag.current.ox + e.clientX - drag.current.sx, y: drag.current.oy + e.clientY - drag.current.sy });
  }
  function onPU() { drag.current = null; }

  function renderLines(ln) {
    var paths = [];
    ln.cl.forEach(function (ch) {
      var px = ln.x + NW / 2, py = ln.y + NH;
      var cx = ch.x + NW / 2, cy = ch.y;
      var my = (py + cy) / 2;
      paths.push(
        <path key={ln.node.id + "-" + ch.node.id}
          d={"M" + px + "," + py + " C" + px + "," + my + " " + cx + "," + my + " " + cx + "," + cy}
          stroke="var(--gold-base)" strokeWidth={1.5} fill="none" opacity={0.5} />
      );
      renderLines(ch).forEach(function (p) { paths.push(p); });
    });
    return paths;
  }

  var sq = srch.toLowerCase();

  return (
    <React.Fragment>
      <div ref={wrap}
        style={{ height: "calc(100dvh - 220px)", minHeight: 420, overflow: "hidden", position: "relative", background: "var(--surface-void)", borderRadius: 12, margin: "0 0 8px 0", cursor: "grab", userSelect: "none", touchAction: "none" }}
        onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}>
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 10, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 4, pointerEvents: "auto" }}>
            <button onClick={fitAll} style={{ fontSize: 9, fontWeight: 700, padding: "5px 8px", background: "rgba(10,7,5,0.88)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 6, cursor: "pointer" }}>FIT ALL</button>
            <button onClick={toTop} style={{ fontSize: 9, fontWeight: 700, padding: "5px 8px", background: "rgba(10,7,5,0.88)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 6, cursor: "pointer" }}>TO TOP</button>
            <button onClick={function () { setShowAll(function (v) { return !v; }); }} style={{ fontSize: 9, fontWeight: 700, padding: "5px 8px", background: showAll ? "var(--gold-base)" : "rgba(10,7,5,0.88)", color: showAll ? "#1a1200" : "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 6, cursor: "pointer" }}>{showAll ? "ALL ON" : "ALL OFF"}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(10,7,5,0.88)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 6, padding: "2px 4px", pointerEvents: "auto" }}>
            <button onClick={function () { setScale(function (s) { return Math.max(0.15, parseFloat((s - 0.1).toFixed(1))); }); }} style={{ background: "none", border: "none", color: "var(--text-primary)", fontSize: 14, cursor: "pointer", width: 22, lineHeight: 1, padding: 0 }}>−</button>
            <span style={{ fontSize: 10, fontWeight: 700, minWidth: 30, textAlign: "center" }}>{Math.round(scale * 100)}%</span>
            <button onClick={function () { setScale(function (s) { return Math.min(1.5, parseFloat((s + 0.1).toFixed(1))); }); }} style={{ background: "none", border: "none", color: "var(--text-primary)", fontSize: 14, cursor: "pointer", width: 22, lineHeight: 1, padding: 0 }}>+</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, zIndex: 10, display: "flex", gap: 6, pointerEvents: "none" }}>
          <div style={{ background: "rgba(10,7,5,0.78)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "4px 9px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--gold-base)", lineHeight: 1 }}>{orgStats.totalOrg}</div>
            <div style={{ fontSize: 7.5, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>TOTAL ORG</div>
          </div>
          <div style={{ background: "rgba(10,7,5,0.78)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "4px 9px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--gold-base)", lineHeight: 1 }}>{allNodes.length}</div>
            <div style={{ fontSize: 7.5, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>VISIBLE</div>
          </div>
        </div>
        <div style={{ position: "absolute", transformOrigin: "0 0", transform: "translate(" + offset.x + "px," + offset.y + "px) scale(" + scale + ")", willChange: "transform" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, overflow: "visible", pointerEvents: "none", width: tW + 40, height: tH + 40 }}>
            {renderLines(root)}
          </svg>
          {allNodes.map(function (ln) {
            var n = ln.node;
            var rc = RANK_COLOR[n.rank] || "var(--text-secondary)";
            var rl = RANK_LABEL[n.rank] || n.rank;
            var isHit = sq && (n.name.toLowerCase().indexOf(sq) > -1 || n.id.toLowerCase().indexOf(sq) > -1);
            return (
              <div key={n.id} style={{
                position: "absolute", left: ln.x, top: ln.y,
                width: NW, height: NH, boxSizing: "border-box",
                background: n.isMe ? "linear-gradient(160deg,#2d1c00,#1a1000)" : "var(--surface-card)",
                border: "1.5px solid " + (isHit ? "#facc15" : n.isMe ? "var(--gold-base)" : "rgba(255,255,255,0.08)"),
                borderRadius: 10, padding: "7px 9px",
                display: "flex", flexDirection: "column", gap: 2
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.1em", color: rc, textTransform: "uppercase", lineHeight: 1 }}>{rl}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: n.isMe ? "var(--gold-base)" : "rgba(255,255,255,0.06)", border: "1.5px solid " + rc, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: n.isMe ? "#1a1200" : "var(--text-primary)" }}>{n.initials}</span>
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 70 }}>{n.name}</div>
                    {n.isMe && <div style={{ fontSize: 7.5, color: "var(--gold-base)", fontWeight: 700 }}>(me)</div>}
                  </div>
                </div>
                <div style={{ fontSize: 7, color: "var(--text-secondary)", letterSpacing: "0.06em", marginTop: 2 }}>ACTIVE STAKE</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: n.isMe ? "var(--gold-highlight)" : "var(--text-primary)", fontFamily: "var(--font-body)" }}>${fmt(n.volume, 0)}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                  <div>
                    <div style={{ fontSize: 7, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>TEAM</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--gold-base)" }}>{(n.children || []).length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 7, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>DEPTH</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-primary)" }}>{ln.depth}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

function TeamScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [tab, setTab] = React.useState("OVERVIEW");
  const [treeQ, setTreeQ] = React.useState("");
  const [chartView, setChartView] = React.useState(false);
  const [qrOpen, setQrOpen] = React.useState(false);

  const rankIdx = D.ranks.findIndex(function (r) { return r.name === D.user.rank; });
  const next = D.ranks[Math.min(rankIdx + 1, D.ranks.length - 1)];
  const teamProgress = next.team > 0 ? Math.min(1, D.orgStats.teamVolume / next.team) : 1;
  const totalComm = D.commissions.direct + D.commissions.matching + D.commissions.pool;

  function copyRef() {
    if (navigator.clipboard) navigator.clipboard.writeText("https://" + D.user.refLink).catch(function () {});
    ctx.notify("Referral link copied");
  }

  return (
    <div className="lr-screen" data-screen-label="Team">

      {/* QR full-screen overlay */}
      {qrOpen && (
        <QROverlay
          onClose={function () { setQrOpen(false); }}
          onCopied={function () { ctx.notify("Link copied"); }}
        />
      )}

      <div>
        <Eyebrow>Referral network</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Build your organization
        </div>
      </div>

      <SegTabs options={["OVERVIEW", "TEAM", "TREE", "RANKS", "HONOR"]} value={tab} onChange={setTab} />

      {/* ═══════════════════════════════ OVERVIEW ═══════════════════════════════ */}
      {tab === "OVERVIEW" && (
        <React.Fragment>

          {/* My Referral */}
          <Card hero>
            <SectionHead title="My referral code" />
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
              border: "1px dashed var(--line-gold-mid)", borderRadius: "var(--radius-md)",
              padding: "12px 14px", margin: "10px 0 12px", background: "rgba(37,99,235,0.04)"
            }}>
              <span className="mono" style={{ fontSize: 15, color: "var(--gold-highlight)", letterSpacing: "0.12em", fontWeight: 700 }}>
                {D.user.refCode}
              </span>
              <button className="iconbtn" style={{ width: 36, height: 36 }} onClick={copyRef} aria-label="Copy referral code">
                <Icon name="copy" size={17} />
              </button>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div className="muted" style={{ fontSize: 11.5, wordBreak: "break-all" }}>
                https://{D.user.refLink}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" sm onClick={copyRef}><Icon name="copy" size={14} /> Copy link</Btn>
              <Btn sm onClick={function () { setQrOpen(true); }}><Icon name="qr" size={14} /> Show QR</Btn>
            </div>
          </Card>

          {/* Rank progress */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LeadDisc color={RANK_COLOR[D.user.rank]}><Icon name="crown" size={18} /></LeadDisc>
                <div>
                  <div className="display" style={{ fontSize: 19, fontWeight: 800, letterSpacing: "0.1em", color: RANK_COLOR[D.user.rank] || "var(--gold-highlight)" }}>{RANK_LABEL[D.user.rank] || D.user.rank}</div>
                  <div className="muted" style={{ fontSize: 10.5 }}>Current rank</div>
                </div>
              </div>
              <Pill>Rank {rankIdx + 1} / {D.ranks.length}</Pill>
            </div>
            <div style={{ margin: "16px 0 6px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="muted" style={{ fontSize: 11.5 }}>Progress to {next.name}</span>
              <span className="num" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--gold-highlight)" }}>
                ${fmt(D.orgStats.teamVolume, 0)} / ${fmt(next.team, 0)}
              </span>
            </div>
            <Bar value={teamProgress} />
            <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>
              {next.refs} direct refs needed · you have {D.orgStats.directSubs}
              {next.downline ? <span> · {next.downline}</span> : null}
            </div>
          </Card>

          {/* Commissions */}
          <Card>
            <SectionHead title="Commissions — this month" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 12px" }}>
              <span className="num" style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>${fmt(totalComm)}</span>
              <span className="muted" style={{ fontSize: 11.5 }}>USDT credited</span>
            </div>
            <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <StatTile value={"$" + fmt(D.commissions.direct, 0)} label="Direct" />
              <StatTile value={"$" + fmt(D.commissions.matching, 0)} label="Matching" />
              <StatTile value={"$" + fmt(D.commissions.pool, 0)} label="Pool" />
            </div>
          </Card>

        </React.Fragment>
      )}

      {/* ═══════════════════════════════ TEAM ═══════════════════════════════ */}
      {tab === "TEAM" && (
        <React.Fragment>

          {/* Organization Volume panel */}
          <Card hero>
            <div style={{ marginBottom: 14 }}>
              <div className="display" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.1em" }}>ORGANIZATION VOLUME</div>
              <div className="muted" style={{ fontSize: 10.5, marginTop: 2, letterSpacing: "0.08em" }}>DIRECT REFERRAL NETWORK</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {/* Direct Referrals L1 */}
              <div style={{ background: "var(--surface-void)", borderRadius: 12, padding: "14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Icon name="team" size={16} style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.1em" }}>L1</span>
                </div>
                <div className="num" style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{D.orgStats.directSubs}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.06em" }}>DIRECT REFERRALS</div>
              </div>
              {/* Active Members */}
              <div style={{ background: "var(--surface-void)", borderRadius: 12, padding: "14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Icon name="bolt" size={16} style={{ color: "var(--green-success)" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.1em" }}>ACTIVE</span>
                </div>
                <div className="num" style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{D.orgStats.active}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.06em" }}>ACTIVE MEMBERS</div>
              </div>
              {/* Direct Volume */}
              <div style={{ background: "var(--surface-void)", borderRadius: 12, padding: "14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Icon name="scan" size={16} style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.1em" }}>USDT</span>
                </div>
                <div className="num" style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{fmt(D.commissions.direct * 10, 0)}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.06em" }}>DIRECT VOLUME</div>
              </div>
              {/* Team Total Volume */}
              <div style={{ background: "var(--surface-void)", borderRadius: 12, padding: "14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Icon name="bolt" size={16} style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.1em" }}>USDT</span>
                </div>
                <div className="num" style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{fmt(D.orgStats.teamVolume, 0)}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.06em" }}>TEAM TOTAL VOLUME</div>
              </div>
            </div>
          </Card>

          {/* Member list */}
          <Card void>
            <SectionHead title="Direct referrals" />
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 0 }}>
              {D.referrals.map(function (r, i) {
                var isActive = r.volume > 0;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 0",
                    borderBottom: i < D.referrals.length - 1 ? "1px solid var(--line-white-soft)" : "none"
                  }}>
                    {/* Row number */}
                    <span className="muted" style={{ fontSize: 11, fontWeight: 700, minWidth: 22, textAlign: "right" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Avatar */}
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: "var(--surface-card)", border: "1.5px solid var(--border-card)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <span className="display" style={{ fontSize: 13, fontWeight: 800, color: "var(--text-secondary)" }}>
                        {r.name.charAt(0)}
                      </span>
                    </div>
                    {/* Name + date */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {r.name}
                      </div>
                      <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{r.date}</div>
                    </div>
                    {/* Stake amount */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="num" style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>
                        {fmt(r.volume, 0)} <span className="muted" style={{ fontSize: 10 }}>USDT</span>
                      </div>
                      {/* Status badge */}
                      <div style={{
                        marginTop: 4, display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", borderRadius: 20,
                        background: isActive ? "rgba(16,185,129,0.12)" : "rgba(148,163,184,0.10)",
                        border: "1px solid " + (isActive ? "rgba(16,185,129,0.35)" : "rgba(148,163,184,0.20)")
                      }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: isActive ? "var(--green-success)" : "var(--text-secondary)", flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: isActive ? "var(--green-success)" : "var(--text-secondary)" }}>
                          {isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </React.Fragment>
      )}

      {/* ═══════════════════════════════ TREE ═══════════════════════════════ */}
      {tab === "TREE" && (
        <React.Fragment>
          <Card void>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <Eyebrow>Organization structure</Eyebrow>
                <div className="display" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>3-Generation view</div>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ textAlign: "right" }}>
                  <div className="num" style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>{D.orgStats.totalOrg}</div>
                  <div className="muted" style={{ fontSize: 9.5, letterSpacing: "0.08em" }}>TOTAL ORG</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="num" style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>{D.orgStats.active}</div>
                  <div className="muted" style={{ fontSize: 9.5, letterSpacing: "0.08em" }}>ACTIVE</div>
                </div>
              </div>
            </div>
            <div className="tnode-search">
              <Icon name="scan" size={15} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
              <input type="text" placeholder="Search by name or ID…" value={treeQ}
                onChange={function (e) { setTreeQ(e.target.value); }}
                className="tnode-search-input" />
              {treeQ && (
                <button className="iconbtn" style={{ width: 28, height: 28, flexShrink: 0 }} onClick={function () { setTreeQ(""); }}>
                  <Icon name="x" size={13} />
                </button>
              )}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
              <button onClick={function () { setChartView(false); var el = document.querySelector('.lr-screen'); if (el) el.scrollTop = 0; }} style={{ fontSize: 10, fontWeight: 700, padding: "6px 14px", background: !chartView ? "var(--gold-base)" : "var(--surface-card)", color: !chartView ? "#1a1200" : "var(--text-secondary)", border: "1px solid var(--line-white-soft)", borderRadius: 7, cursor: "pointer" }}>LIST VIEW</button>
              <button onClick={function () { setChartView(true); var el = document.querySelector('.lr-screen'); if (el) el.scrollTop = 0; }} style={{ fontSize: 10, fontWeight: 700, padding: "6px 14px", background: chartView ? "var(--gold-base)" : "var(--surface-card)", color: chartView ? "#1a1200" : "var(--text-secondary)", border: "1px solid var(--line-white-soft)", borderRadius: 7, cursor: "pointer" }}>CHART VIEW</button>
            </div>
          </Card>
          {!chartView && (
            <Card void style={{ padding: "8px 0" }}>
              <TreeNode node={D.orgTree} depth={0} q={treeQ} />
            </Card>
          )}
          {chartView && <OrgChartView data={D.orgTree} orgStats={D.orgStats} />}
        </React.Fragment>
      )}

      {/* ═══════════════════════════════ RANKS ═══════════════════════════════ */}
      {tab === "RANKS" && (
        <React.Fragment>
          <Card hero>
            <Eyebrow>Current identity status</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, marginBottom: 14 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(0,0,0,0.25)", border: "2px solid " + RANK_COLOR[D.user.rank], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={window.LR_IMG(RANK_IMG[D.user.rank] || "iconGold")} alt="" style={{ width: 36, height: "auto", filter: "drop-shadow(0 0 10px " + (RANK_COLOR[D.user.rank] || "var(--accent)") + "66)" }} />
              </div>
              <div>
                <div className="display" style={{ fontSize: 21, fontWeight: 800, letterSpacing: "0.05em", color: RANK_COLOR[D.user.rank], lineHeight: 1 }}>{RANK_LABEL[D.user.rank]}</div>
                <div className="muted" style={{ fontSize: 10.5, marginTop: 4 }}>Current Account Rank</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 10, padding: "11px 13px" }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>BODY VALUE</div>
                <div className="num" style={{ fontSize: 21, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{fmt(D.balances.invested, 0)}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 3 }}>USDT</div>
              </div>
              <div style={{ background: "rgba(37,99,235,0.1)", border: "1px solid var(--gold-base)", borderRadius: 10, padding: "11px 13px" }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>TEAM SALES</div>
                <div className="num" style={{ fontSize: 21, fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>{fmt(D.orgStats.teamVolume, 0)}</div>
                <div className="muted" style={{ fontSize: 10, marginTop: 3 }}>USDT</div>
              </div>
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {D.ranks.map(function (r, i) {
              var current = r.name === D.user.rank;
              var reached = i <= rankIdx;
              var isLast = i === D.ranks.length - 1;
              var rc = RANK_COLOR[r.name] || "var(--text-secondary)";
              var benefit = RANK_BENEFIT[r.name] || { type: "BENEFIT", text: r.bonus };
              var rankImg = window.LR_IMG(RANK_IMG[r.name] || "iconGold");

              if (isLast) {
                return (
                  <div key={r.name} style={{
                    gridColumn: "1 / -1",
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    padding: "22px 20px 20px",
                    textAlign: "center",
                    background: "linear-gradient(160deg, #12100b 0%, #050403 48%, #171106 100%)",
                    border: "1.5px solid rgba(250,204,21,0.72)",
                    boxShadow: "0 0 30px rgba(250,204,21,0.16), 0 0 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)"
                  }}>
                    <img src={rankImg} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 220, height: "auto", opacity: current ? 0.18 : 0.13, filter: "sepia(1) saturate(1.15) brightness(0.78) drop-shadow(0 0 16px rgba(250,204,21,0.18))", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,204,21,0.11) 0%, transparent 65%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(250,204,21,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                    {reached && !current && (
                      <div style={{ position: "absolute", top: 10, right: 12, width: 20, height: 20, borderRadius: "50%", background: rc + "28", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="check" size={10} style={{ color: rc }} />
                      </div>
                    )}
                    {current && (
                      <div style={{ position: "absolute", top: 10, right: 12 }}>
                        <Pill style={{ fontSize: 7.5, padding: "2px 6px" }}>Current</Pill>
                      </div>
                    )}
                    {!reached && !current && (
                      <div style={{ position: "absolute", top: 10, right: 12 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(250,204,21,0.58)", padding: "3px 7px", border: "1px solid rgba(250,204,21,0.28)", borderRadius: 5 }}>LOCKED</div>
                      </div>
                    )}
                    <div style={{ position: "relative", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.22em", color: "rgba(250,204,21,0.72)", marginTop: 4, marginBottom: 6, textShadow: "0 2px 8px rgba(0,0,0,0.75)" }}>SUPREME TIER</div>
                    <div className="display" style={{ position: "relative", fontSize: 23, fontWeight: 800, letterSpacing: "0.13em", color: "rgba(255,244,214,0.96)", lineHeight: 1, marginBottom: 5, textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 0 14px rgba(250,204,21,0.22)" }}>BLACK DRAGON</div>
                    <div style={{ position: "relative", fontSize: 9.5, fontWeight: 500, color: "rgba(250,204,21,0.58)", letterSpacing: "0.08em", marginBottom: 18, textShadow: "0 2px 8px rgba(0,0,0,0.75)" }}>The Pinnacle of LONGRISE</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12, textAlign: "left" }}>
                      <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 10, padding: "12px 13px" }}>
                        <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(250,204,21,0.52)", marginBottom: 7 }}>QUALIFICATION</div>
                        <div style={{ fontSize: 10.5, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                          {r.pkg}<br />
                          Direct Refs × {r.refs}<br />
                          {r.downline}<br />
                          Team Vol. ${fmt(r.team, 0)}
                        </div>
                      </div>
                      <div style={{ background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.24)", borderRadius: 10, padding: "12px 13px" }}>
                        <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(250,204,21,0.52)", marginBottom: 7 }}>{benefit.type}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(255,222,92,0.98)", lineHeight: 1.4 }}>{benefit.text}</div>
                      </div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.24)", borderRadius: 8 }}>
                      <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(250,204,21,0.56)" }}>RANK BONUS</span>
                      <span className="num" style={{ fontSize: 14, fontWeight: 800, color: "var(--accent)" }}>{r.bonus}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={r.name} style={{
                  background: current ? "linear-gradient(155deg, rgba(37,99,235,0.14), rgba(37,99,235,0.04))" : "var(--surface-card)",
                  border: "1.5px solid " + (current ? "var(--gold-base)" : reached ? rc + "55" : "rgba(255,255,255,0.07)"),
                  borderRadius: 10, padding: "14px 13px",
                  opacity: (!reached && !current) ? 0.52 : 1,
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 236
                }}>
                  <img src={rankImg} alt="" style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 124, height: "auto", opacity: current ? 0.26 : reached ? 0.20 : 0.12, filter: (!reached && !current) ? "grayscale(0.8) opacity(0.85)" : "drop-shadow(0 0 12px " + rc + "44)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 44%, rgba(0,0,0,0.36) 100%)", pointerEvents: "none" }} />
                  {current && (
                    <div style={{ position: "absolute", top: 8, right: 8 }}>
                      <Pill style={{ fontSize: 7.5, padding: "2px 6px" }}>Current</Pill>
                    </div>
                  )}
                  {reached && !current && (
                    <div style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: rc + "28", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="check" size={9} style={{ color: rc }} />
                    </div>
                  )}
                  {!reached && !current && (
                    <div style={{ position: "absolute", top: 8, right: 8, fontSize: 7.5, fontWeight: 800, letterSpacing: "0.1em", color: "rgba(255,255,255,0.42)", padding: "3px 7px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, background: "rgba(0,0,0,0.24)" }}>LOCKED</div>
                  )}
                  <div className="display" style={{ position: "relative", fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em", color: rc, lineHeight: 1.2, marginTop: 52, marginBottom: 10, textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}>{RANK_LABEL[r.name]}</div>
                  <div style={{ position: "relative", paddingTop: 9, borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }}>
                    <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 5 }}>QUALIFICATION</div>
                    <div style={{ fontSize: 10.5, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {r.pkg}
                      {r.refs > 0 && <React.Fragment><br />Direct Refs × {r.refs}</React.Fragment>}
                      {r.downline && <React.Fragment><br />{r.downline}</React.Fragment>}
                      {r.team > 0 && <React.Fragment><br />Team Vol. ${fmt(r.team, 0)}</React.Fragment>}
                      {r.refs === 0 && !r.downline && r.team === 0 && <React.Fragment><br />No rollup required</React.Fragment>}
                    </div>
                  </div>
                  <div style={{ position: "relative", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 5 }}>{benefit.type}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: rc, lineHeight: 1.3 }}>{benefit.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}

      {/* ═══════════════════════════════ HONOR ═══════════════════════════════ */}
      {tab === "HONOR" && (
        <React.Fragment>
          {(() => {
            var honorMembers = getTopHonorMembers(D.orgTree);
            return (
              <React.Fragment>
                <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", color: "var(--accent)", marginBottom: 10 }}>TOP 10 MEMBERS</div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.04em", color: "#ffffff", lineHeight: 1.15 }}>Honor Hall</div>
                  <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 8 }}>Ranked by Team Volume from your team data.</div>
                </div>

                <Card style={{ padding: "10px 0", overflow: "hidden" }}>
                  {honorMembers.map(function (m, i) {
                    var rc = RANK_COLOR[m.rank] || "var(--accent)";
                    var topThree = i < 3;
                    var medal = [
                      { bg: "linear-gradient(145deg,#ffd76a,#b7791f)", border: "rgba(255,215,106,0.95)", text: "#160d02", label: "GOLD" },
                      { bg: "linear-gradient(145deg,#f4f4f5,#8b93a3)", border: "rgba(244,244,245,0.90)", text: "#101014", label: "SILVER" },
                      { bg: "linear-gradient(145deg,#d9914d,#7c3f1f)", border: "rgba(217,145,77,0.92)", text: "#1a0902", label: "BRONZE" }
                    ][i];
                    return (
                      <div key={m.name + i} style={{
                        display: "grid",
                        gridTemplateColumns: "38px 1fr",
                        gap: 12,
                        alignItems: "start",
                        padding: "13px 16px",
                        borderBottom: i < honorMembers.length - 1 ? "1px solid var(--line-white-soft)" : "none",
                        background: topThree ? "linear-gradient(90deg, rgba(201,146,42,0.10), transparent)" : "transparent"
                      }}>
                        <div className="num" style={{
                          width: 30,
                          height: 30,
                          borderRadius: topThree ? "50%" : 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: topThree ? 10 : 13,
                          fontWeight: 900,
                          color: medal ? medal.text : "var(--text-secondary)",
                          background: medal ? medal.bg : "rgba(255,255,255,0.04)",
                          border: "1px solid " + (medal ? medal.border : "var(--border-card)"),
                          boxShadow: medal ? "0 0 14px rgba(201,146,42,0.22)" : "none"
                        }}>{i + 1}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
                            {medal && <span style={{ fontSize: 7.5, fontWeight: 900, letterSpacing: "0.08em", color: medal.border, flexShrink: 0 }}>{medal.label}</span>}
                            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.08em", color: rc, border: "1px solid " + rc + "55", borderRadius: 6, padding: "2px 5px", flexShrink: 0 }}>{m.rank}</span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 0.78fr 1.1fr", gap: 8, marginTop: 10 }}>
                            <div>
                              <div className="num" style={{ fontSize: 13, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>${fmt(m.volume, 0)}</div>
                              <div className="muted" style={{ fontSize: 8.5, letterSpacing: "0.08em", marginTop: 4 }}>VOLUME</div>
                            </div>
                            <div>
                              <div className="num" style={{ fontSize: 13, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>{m.memberCount}</div>
                              <div className="muted" style={{ fontSize: 8.5, letterSpacing: "0.08em", marginTop: 4 }}>MEMBERS</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div className="num" style={{ fontSize: 13.5, fontWeight: 900, color: topThree ? "var(--gold-highlight)" : "var(--text-primary)", lineHeight: 1 }}>${fmt(m.teamVolume, 0)}</div>
                              <div className="muted" style={{ fontSize: 8.5, letterSpacing: "0.08em", marginTop: 4 }}>TEAM VOL.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {honorMembers.length === 0 && (
                    <div style={{ textAlign: "center", padding: "28px 18px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 8 }}>NO TEAM DATA YET</div>
                      <div className="muted" style={{ fontSize: 13, lineHeight: 1.7 }}>Top members will appear when team data is available.</div>
                    </div>
                  )}
                </Card>
              </React.Fragment>
            );
          })()}
        </React.Fragment>
      )}

    </div>
  );
}

window.TeamScreen = TeamScreen;


/* LONGRISE Mobile — MARKET screen (P2P USDT / CNYT trading floor) */
function MarketScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [tab, setTab] = React.useState("USDT");
  const [trade, setTrade] = React.useState(null); // {side}
  const [amount, setAmount] = React.useState("");
  const [done, setDone] = React.useState(false);

  const isUsdt = tab === "USDT";
  const price = isUsdt ? D.market.usdtPremium : D.market.cnytPrice;
  const orders = D.market.orders.filter(function (o) { return o.asset === tab; });

  const amt = parseFloat(amount) || 0;
  const totalCost = amt * price;
  const valid = amt > 0 && (trade && trade.side === "BUY" ? totalCost <= ctx.bal.available : true);

  function openTrade(side) {
    setTrade({ side: side });
    setAmount("");
    setDone(false);
  }
  function confirmTrade() {
    ctx.addHistory({
      type: "ORDER",
      label: trade.side + " " + fmt(amt, 0) + " " + tab + " @ " + price,
      amount: totalCost, dir: trade.side === "BUY" ? -1 : 1
    });
    setDone(true);
  }

  return (
    <div className="lr-screen" data-screen-label="Market">
      <div>
        <Eyebrow>P2P trading floor</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Market
        </div>
      </div>

      <SegTabs options={["USDT", "CNYT"]} value={tab} onChange={setTab} />

      {/* Price card */}
      <Card hero>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Eyebrow>{isUsdt ? "USDT / USD premium" : "CNYT / USDT"}</Eyebrow>
            <div className="" style={{  fontSize: 32, fontWeight: 800, margin: "6px 0 2px", color: "#ffffff" }}>
              {isUsdt ? fmt(price, 3) : fmt(price, 4)}
            </div>
            <span className={"num " + (D.market.cnytChange >= 0 ? "green" : "red")} style={{ fontSize: 12.5, fontWeight: 700 }}>
              {D.market.cnytChange >= 0 ? "+" : ""}{D.market.cnytChange}% · 24h
            </span>
          </div>
          <Pill live>Order stream</Pill>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          <Btn onClick={function () { openTrade("BUY"); }}>Buy {tab}</Btn>
          <Btn variant="red" onClick={function () { openTrade("SELL"); }}>Sell {tab}</Btn>
        </div>
      </Card>

      {/* Your stats */}
      <Card>
        <SectionHead title="Your statistics" />
        <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: 10 }}>
          <StatTile value={"$" + fmt(ctx.bal.available, 0)} label="Wallet" />
          <StatTile value="2" label="Open orders" />
          <StatTile value="+$96" label="Trading PnL" />
        </div>
      </Card>

      {/* Order stream */}
      <Card void>
        <SectionHead title="Live order stream" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {orders.map(function (o) {
            const buy = o.side === "BUY";
            return (
              <RowItem key={o.id}
                lead={
                  <LeadDisc color={buy ? "var(--green-success)" : "var(--red-alert)"}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.1em" }}>{o.side}</span>
                  </LeadDisc>
                }
                title={fmt(o.amount, 0) + " " + o.asset}
                sub={o.user + " · @ " + fmt(o.price, o.asset === "CNYT" ? 4 : 3)}
                trail={
                  <Pill style={o.status === "COMPLETE" ? { color: "var(--color-muted)", borderColor: "var(--line-white-soft)", background: "none" } : null}>
                    {o.status}
                  </Pill>
                } />
            );
          })}
        </div>
      </Card>

      <div className="muted" style={{ fontSize: 11, display: "flex", gap: 8, alignItems: "flex-start", padding: "0 4px" }}>
        <Icon name="shield" size={14} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} />
        <span>Escrowed settlement — funds release only after both sides confirm. Never settle off-platform.</span>
      </div>

      {/* Trade sheet */}
      <Sheet open={!!trade} onClose={function () { setTrade(null); }}
        title={trade ? trade.side + " " + tab : ""}>
        {trade && !done && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label={"Amount (" + tab + ")"} inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix={tab}
              hint={"Market price " + fmt(price, isUsdt ? 3 : 4) + " · fee 0.2%"} />
            <Card void style={{ padding: 14 }}>
              <KV k={"Price per " + tab} v={fmt(price, isUsdt ? 3 : 4) + " USDT"} />
              <KV k="Transaction fee" v={"$" + fmt(totalCost * 0.002)} />
              <KV k={trade.side === "BUY" ? "Total cost" : "You receive"} v={"$" + fmt(totalCost)} cls={trade.side === "BUY" ? "" : "green"} />
            </Card>
            {trade.side === "BUY" && totalCost > ctx.bal.available && (
              <div className="red" style={{ fontSize: 12 }}>Exceeds available wallet balance.</div>
            )}
            <Btn block variant={trade.side === "BUY" ? "gold" : "red"} disabled={!valid} onClick={confirmTrade}>
              Place {trade.side.toLowerCase()} order
            </Btn>
          </div>
        )}
        {trade && done && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Order placed">
              Your {trade.side.toLowerCase()} order for {fmt(amt, 0)} {tab} entered the live queue. You'll be notified on match.
            </SuccessBlock>
            <Btn block onClick={function () { setTrade(null); ctx.notify("Order added to ledger"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

window.MarketScreen = MarketScreen;


/* LONGRISE Mobile — WALLET screen (balances + deposit / withdraw / send / swap flows) */
function WalletScreen(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [flow, setFlow] = React.useState(props.initialFlow || null); // deposit|withdraw|send|swap
  const [step, setStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [network, setNetwork] = React.useState("TRC20");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [depositAgreed, setDepositAgreed] = React.useState(false);

  React.useEffect(function () {
    if (props.initialFlow) open(props.initialFlow);
  }, [props.initialFlow, props.flowNonce]);

  function open(f) {
    setFlow(f); setStep(0); setAmount(""); setAddress(""); setOtp(["", "", "", "", "", ""]); setDepositAgreed(false);
  }
  function close() { setFlow(null); }

  const amt = parseFloat(amount) || 0;
  const withdrawalBalance = ctx.bal.available + ctx.bal.earned;
  const fee = 1;
  const otpFull = otp.join("").length === 6;

  function copyAddr() {
    if (navigator.clipboard) navigator.clipboard.writeText(D.depositAddress).catch(function () {});
    ctx.notify("Deposit address copied");
  }

  /* ─── Deposit QR code (visual grid based on address) ─── */
  function DepositQR() {
    var addr = D.depositAddress || "LONGRISE";
    var S = 25, cells = [];
    for (var r = 0; r < S; r++) {
      for (var c = 0; c < S; c++) {
        var dark = false;
        /* top-left finder */ if (r<=6&&c<=6){dark=r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4);}
        /* top-right finder */ else if (r<=6&&c>=18){var lc=c-18;dark=r===0||r===6||lc===0||lc===6||(r>=2&&r<=4&&lc>=2&&lc<=4);}
        /* bottom-left finder */ else if (r>=18&&c<=6){var lr=r-18;dark=lr===0||lr===6||c===0||c===6||(lr>=2&&lr<=4&&c>=2&&c<=4);}
        /* timing strips */ else if (r===6||c===6){dark=(r+c)%2===0;}
        /* separator rows */ else if (r===7||r===17||c===7||c===17){dark=false;}
        /* data cells */ else {var idx=(r*7+c*13)%addr.length;dark=((addr.charCodeAt(idx)^(r*3+c))&1)===0;}
        cells.push(dark);
      }
    }
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(25,1fr)", width:200, height:200, background:"#ffffff", padding:12, borderRadius:12, boxShadow:"0 0 0 1px rgba(185,154,107,0.25)" }}>
          {cells.map(function(d,i){return <div key={i} style={{background:d?"#111":"#fff"}}/>;})}
        </div>
        <div style={{ fontSize:11, color:"var(--text-secondary)", letterSpacing:"0.05em" }}>Scan with your wallet app</div>
      </div>
    );
  }

  function finishDeposit() {
    ctx.addHistory({ type: "DEPOSIT", label: "USDT deposit (TRC20) — pending confirmation", amount: 0, dir: 1 });
    setStep(2);
  }
  function finishWithdraw() {
    ctx.setBal(function (b) {
      var fromDeposit = Math.min(b.available, amt);
      var fromEarned = Math.max(0, amt - fromDeposit);
      return Object.assign({}, b, {
        available: Math.max(0, b.available - fromDeposit),
        earned: Math.max(0, b.earned - fromEarned)
      });
    });
    ctx.addHistory({ type: "WITHDRAW", label: "USDT withdrawal (TRC20) — " + (amt >= 500 ? "pending admin approval" : "queued"), amount: amt, dir: -1 });
    setStep(3);
  }
  function finishSwap() {
    const got = amt * 7.08;
    ctx.setBal(function (b) {
      return Object.assign({}, b, { earned: Math.max(0, b.earned - amt), cnyt: b.cnyt + got });
    });
    ctx.addHistory({ type: "SWAP", label: "Rewards → CNYT swap", amount: amt, dir: -1 });
    setStep(2);
  }
  function finishSend() {
    ctx.setBal(function (b) {
      var fromDeposit = Math.min(b.available, amt);
      var fromEarned = Math.max(0, amt - fromDeposit);
      return Object.assign({}, b, {
        available: Math.max(0, b.available - fromDeposit),
        earned: Math.max(0, b.earned - fromEarned)
      });
    });
    ctx.addHistory({ type: "SEND", label: "USDT sent to " + (address.slice(0, 6) || "user") + "…", amount: amt, dir: -1 });
    setStep(2);
  }

  const cnytVal = ctx.bal.cnyt * D.market.cnytPrice;
  const total = ctx.bal.available + ctx.bal.earned + ctx.bal.invested + cnytVal;
  const roiPct = ctx.bal.invested > 0 ? (ctx.bal.earned / ctx.bal.invested * 100) : 0;
  const [histLimit, setHistLimit] = React.useState(7);

  return (
    <div className="lr-screen" data-screen-label="Wallet">
      <div>
        <Eyebrow>My wealth</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Wallet
        </div>
      </div>

      {/* Balance hero — Coinone style */}
      <Card hero>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: "var(--gold-base)" }}>TOTAL VALUE</div>
          <Pill live>Live</Pill>
        </div>

        {/* Big total */}
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1, marginBottom: 10 }}>
          ${fmt(total)}
        </div>

        {/* ROI badge */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {ctx.bal.invested > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#10b981" }}>↑ {roiPct.toFixed(1)}% ROI</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(201,146,42,0.10)", border: "1px solid rgba(201,146,42,0.22)", borderRadius: 8, padding: "4px 10px" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--gold-base)" }}>{fmt(ctx.bal.cnyt, 0)} CNYT · ${fmt(cnytVal)}</span>
          </div>
        </div>

        {/* 2×2 breakdown grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(201,146,42,0.18)", marginBottom: 18 }}>
          <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(201,146,42,0.12)", borderBottom: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>ACTIVE EXPOSURE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>${fmt(ctx.bal.invested)}</div>
          </div>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>EARNED</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#10b981", fontVariantNumeric: "tabular-nums" }}>${fmt(ctx.bal.earned)}</div>
          </div>
          <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(201,146,42,0.12)", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 6 }}>CNYT VALUE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--gold-base)", fontVariantNumeric: "tabular-nums" }}>${fmt(cnytVal)}</div>
            <div style={{ fontSize: 10.5, color: "var(--gold-base)", opacity: 0.7, marginTop: 3 }}>{fmt(ctx.bal.cnyt, 0)} CNYT</div>
          </div>
          <div style={{ padding: "14px 16px", background: "rgba(20,4,4,0.55)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#9e8070", letterSpacing: "0.14em", marginBottom: 8 }}>WITHDRAWAL BALANCE</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>${fmt(withdrawalBalance)}</div>
            <div style={{ fontSize: 10.5, color: "var(--text-secondary)", marginTop: 3 }}>Deposit ${fmt(ctx.bal.available)} · Earnings ${fmt(ctx.bal.earned)}</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="qa-row">
          <button className="qa" style={{ background: "rgba(16,185,129,0.10)", borderColor: "rgba(16,185,129,0.35)", color: "#10b981" }} onClick={function () { open("deposit"); }}>
            <Icon name="arrowDown" size={18} style={{ color: "#10b981" }} /> Deposit
          </button>
          <button className="qa" style={{ background: "rgba(239,68,68,0.10)", borderColor: "rgba(239,68,68,0.35)", color: "#ef4444" }} onClick={function () { open("withdraw"); }}>
            <Icon name="arrowUp" size={18} style={{ color: "#ef4444" }} /> Withdraw
          </button>
          <button className="qa" style={{ background: "rgba(96,165,250,0.10)", borderColor: "rgba(96,165,250,0.35)", color: "#60a5fa" }} onClick={function () { open("send"); }}>
            <Icon name="send" size={18} style={{ color: "#60a5fa" }} /> Send
          </button>
          <button className="qa" style={{ background: "rgba(201,146,42,0.12)", borderColor: "rgba(201,146,42,0.40)", color: "var(--gold-base)" }} onClick={function () { open("swap"); }}>
            <Icon name="swap" size={18} style={{ color: "var(--gold-base)" }} /> Swap
          </button>
        </div>
      </Card>

      {/* Recent activity */}
      <Card void>
        <SectionHead title="Recent activity" />
        {ctx.history.length === 0
          ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "28px 0 12px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="doc" size={22} style={{ color: "var(--text-secondary)" }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>No transactions yet</div>
                <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>Your deposits, withdrawals, and earnings will appear here.</div>
              </div>
              <button className="btn gold block" style={{ width: "100%" }} onClick={function () { open("deposit"); }}>
                <Icon name="arrowDown" size={15} weight={2} /> Make your first deposit
              </button>
            </div>
          ) : (
            <div className="rowlist" style={{ marginTop: 4 }}>
              {ctx.history.slice(0, histLimit).map(function (h) {
            const inFlow = h.dir > 0;
            return (
              <RowItem key={h.id}
                lead={
                  <LeadDisc color={inFlow ? "var(--green-success)" : "var(--color-cream)"}>
                    <Icon name={
                      h.type === "DEPOSIT" ? "arrowDown" :
                      h.type === "ROI" ? "arrowDown" :
                      h.type === "COMMISSION" ? "team" :
                      h.type === "WITHDRAW" ? "arrowUp" :
                      h.type === "SWAP" ? "swap" :
                      h.type === "SEND" ? "send" :
                      h.type === "INVEST" ? "invest" :
                      h.type === "ORDER" ? "market" :
                      h.type === "CNYT_BONUS" ? "bolt" : "bolt"} size={16} />
                  </LeadDisc>
                }
                title={h.label}
                sub={h.date}
                trail={
                  <span className={"num " + (inFlow ? "green" : "")} style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {inFlow ? "+" : "−"}${fmt(h.amount)}
                  </span>
                } />
            );
          })}
              {ctx.history.length > histLimit && (
                <button onClick={function () { setHistLimit(function (n) { return n + 20; }); }}
                  style={{ appearance: "none", background: "none", border: "1px solid var(--border-card)", borderRadius: 10, color: "var(--text-secondary)", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", padding: "11px 0", marginTop: 6 }}>
                  Show more ({ctx.history.length - histLimit} remaining)
                </button>
              )}
            </div>
          )
        }
      </Card>

      {/* ---------- DEPOSIT ---------- */}
      <Sheet open={flow === "deposit"} onClose={close} title="Deposit USDT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="field">
              <label>Network</label>
              <div className="seg">
                <button className="active" onClick={function () { setNetwork("TRC20"); }}>TRC20</button>
                <button disabled style={{ opacity: 0.48, cursor: "not-allowed" }}>BEP20 · Soon</button>
              </div>
            </div>
            <div className="muted" style={{ fontSize: 12.5, textAlign:"center" }}>
              Send USDT to this TRC20 address. Deposits of 1 USDT or more are credited based on the actual received amount.
            </div>
            <DepositQR />
            <div style={{
              border: "1px dashed var(--line-gold-mid)", borderRadius: "var(--radius-md)",
              padding: "14px", display: "flex", alignItems: "center", gap: 10
            }}>
              <span className="mono" style={{ flex: 1, wordBreak: "break-all", color: "var(--gold-highlight)", fontSize:12 }}>{D.depositAddress}</span>
              <button className="iconbtn" style={{ width: 38, height: 38, flex: "none" }} onClick={copyAddr} aria-label="Copy address">
                <Icon name="copy" size={17} />
              </button>
            </div>
            <div className="muted" style={{ fontSize: 11.5, display: "flex", gap: 8 }}>
              <Icon name="shield" size={14} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} />
              <span>Triple-check the address and network. Unsupported-network transfers cannot be recovered.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", background: depositAgreed ? "rgba(16,185,129,0.07)" : "rgba(255,255,255,0.03)", border: "1px solid " + (depositAgreed ? "rgba(16,185,129,0.35)" : "var(--border-card)"), borderRadius: 10, padding: "13px 14px", transition: "all .15s" }}
              onClick={function () { setDepositAgreed(!depositAgreed); }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, flex: "none", marginTop: 1, border: "2px solid " + (depositAgreed ? "var(--green-success)" : "var(--line-gold-mid)"), background: depositAgreed ? "var(--green-success)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}>
                {depositAgreed && <Icon name="check" size={13} style={{ color: "#041020" }} />}
              </div>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                I confirm I have sent USDT on TRC20 to the address shown above.
              </span>
            </div>
            <Btn block disabled={!depositAgreed} onClick={finishDeposit}>Confirm deposit submitted</Btn>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Deposit submitted">
              Your deposit is pending confirmation and security review. It will be credited after confirmation.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Deposit added to ledger"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- WITHDRAW ---------- */}
      <Sheet open={flow === "withdraw"} onClose={close} title="Request withdrawal">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(withdrawalBalance))); }}
              hint={"Withdrawal Balance $" + fmt(withdrawalBalance) + " · min $10"} />
            <Field label="Destination wallet (TRC20)" mono value={address}
              onChange={setAddress} placeholder="T..." />
            <Card void style={{ padding: 14 }}>
              <KV k="Withdrawal fee" v={"−$" + fmt(fee)} />
              <KV k="You receive" v={"$" + fmt(Math.max(0, amt - fee))} cls="green" />
              <KV k="Processing" v="UTC 09:00 daily batch" />
              {amt >= 500 && <KV k="Approval" v="Admin approval required" />}
            </Card>
            {amt > withdrawalBalance && <div className="red" style={{ fontSize: 12 }}>Exceeds Withdrawal Balance.</div>}
            <Btn block disabled={amt < 10 || amt > withdrawalBalance || address.length < 8} onClick={function () { setStep(1); }}>Next</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign:"center" }}>
              <Eyebrow>Withdrawal summary</Eyebrow>
              <div className="muted" style={{ fontSize:12.5, marginTop:6 }}>Please verify all details before proceeding.</div>
            </div>
            <div style={{ background:"var(--surface-card)", border:"1px solid var(--border-card)", borderRadius:12, overflow:"hidden" }}>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Amount</span>
                <span style={{ fontSize:15, fontWeight:800, color:"var(--text-primary)" }}>${fmt(amt)} USDT</span>
              </div>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Withdrawal fee</span>
                <span style={{ fontSize:14, fontWeight:700, color:"var(--red-alert)" }}>−${fmt(fee)}</span>
              </div>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>You will receive</span>
                <span style={{ fontSize:16, fontWeight:800, color:"var(--green-success)" }}>${fmt(Math.max(0, amt - fee))} USDT</span>
              </div>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)", flexShrink:0 }}>Destination</span>
                <span style={{ fontSize:12.5, fontWeight:700, color:"var(--text-primary)", fontFamily:"monospace", wordBreak:"break-all", textAlign:"right" }}>
                  {address.length > 12 ? address.slice(0,6) + "···" + address.slice(-6) : address}
                </span>
              </div>
              <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Network</span>
                <span style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>TRC20</span>
              </div>
              {amt >= 500 && (
                <div style={{ padding:"14px 16px", borderTop:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Approval</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"var(--gold-highlight)" }}>Pending Admin Approval</span>
                </div>
              )}
            </div>
            <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:10, padding:"13px 16px", display:"flex", gap:10, alignItems:"flex-start" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red-alert)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize:12.5, color:"var(--text-secondary)", lineHeight:1.65 }}>Withdrawals cannot be cancelled once submitted. Please verify the destination address carefully — funds sent to a wrong address cannot be recovered.</span>
            </div>
            <Btn block onClick={function(){ setStep(2); }}>Continue to Verification</Btn>
            <button onClick={function(){ setStep(0); }} style={{ appearance:"none", background:"none", border:"none", color:"var(--text-secondary)", fontSize:13, cursor:"pointer", textAlign:"center", padding:"4px 0" }}>← Go back &amp; edit</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign: "center" }}>
              <Eyebrow>Security requirement</Eyebrow>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Enter the 6-digit code from Google Authenticator</div>
            </div>
            <OtpInput value={otp} onChange={setOtp} />
            <Btn block disabled={!otpFull} onClick={finishWithdraw}>Confirm withdrawal</Btn>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Withdrawal submitted">
              ${fmt(Math.max(0, amt - fee))} USDT enters the UTC 09:00 daily batch. {amt >= 500 ? "Admin approval is required before payout." : "Track it under Recent Activity."}
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Withdrawal queued"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- SEND ---------- */}
      <Sheet open={flow === "send"} onClose={close} title="Send USDT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Recipient" mono value={address} onChange={setAddress} placeholder="Username or LR user ID" />
            <Field label="Amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(withdrawalBalance))); }}
              hint={"Withdrawal Balance $" + fmt(withdrawalBalance) + " · internal transfers are free"} />
            {amt > withdrawalBalance && <div className="red" style={{ fontSize: 12 }}>Insufficient Withdrawal Balance.</div>}
            <Btn block disabled={amt <= 0 || amt > withdrawalBalance || address.length < 4} onClick={function () { setStep(1); }}>Review transfer</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign:"center" }}>
              <Eyebrow>Transfer summary</Eyebrow>
              <div className="muted" style={{ fontSize:12.5, marginTop:6 }}>Please verify the details before confirming.</div>
            </div>
            <div style={{ background:"var(--surface-card)", border:"1px solid var(--border-card)", borderRadius:12, overflow:"hidden" }}>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Amount</span>
                <span style={{ fontSize:15, fontWeight:800, color:"var(--text-primary)" }}>${fmt(amt)} USDT</span>
              </div>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Transfer fee</span>
                <span style={{ fontSize:14, fontWeight:700, color:"var(--green-success)" }}>Free</span>
              </div>
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border-card)", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)", flexShrink:0 }}>Recipient</span>
                <span style={{ fontSize:12.5, fontWeight:700, color:"var(--text-primary)", fontFamily:"monospace", wordBreak:"break-all", textAlign:"right" }}>
                  {address.length > 12 ? address.slice(0,6) + "···" + address.slice(-6) : address}
                </span>
              </div>
              <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Settlement</span>
                <span style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>Instant</span>
              </div>
            </div>
            <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:10, padding:"13px 16px", display:"flex", gap:10, alignItems:"flex-start" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red-alert)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize:12.5, color:"var(--text-secondary)", lineHeight:1.65 }}>Transfers cannot be cancelled once confirmed. Please double-check the recipient username or LR user ID before sending.</span>
            </div>
            <Btn block onClick={finishSend}>Confirm &amp; Send</Btn>
            <button onClick={function(){ setStep(0); }} style={{ appearance:"none", background:"none", border:"none", color:"var(--text-secondary)", fontSize:13, cursor:"pointer", textAlign:"center", padding:"4px 0" }}>← Go back &amp; edit</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Transfer complete">
              ${fmt(amt)} USDT has been sent to {address}. Internal transfers settle instantly.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Transfer recorded"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- SWAP ---------- */}
      <Sheet open={flow === "swap"} onClose={close} title="Swap rewards → CNYT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Pay (earned USDT)" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.earned))); }}
              hint={"Earned balance $" + fmt(ctx.bal.earned)} />
            <div style={{ display: "flex", justifyContent: "center", color: "var(--gold-base)" }}>
              <Icon name="swap" size={20} />
            </div>
            <Card void style={{ padding: 14 }}>
              <KV k="Rate" v="1 USDT = 7.08 CNYT" />
              <KV k="You receive" v={fmt(amt * 7.08) + " CNYT"} cls="green" />
            </Card>
            <Btn block disabled={amt <= 0 || amt > ctx.bal.earned} onClick={function () { setStep(1); }}>Review conversion</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign: "center" }}>
              <Eyebrow>Conversion summary</Eyebrow>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Please verify before confirming.</div>
            </div>
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-card)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>You pay</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>${fmt(amt)} USDT</span>
              </div>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Exchange rate</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>1 USDT = 7.08 CNYT</span>
              </div>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Conversion fee</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green-success)" }}>Free</span>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>You receive</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "var(--accent)" }}>{fmt(amt * 7.08)} CNYT</span>
              </div>
            </div>
            <div style={{ background: "rgba(185,154,107,0.07)", border: "1px solid rgba(185,154,107,0.25)", borderRadius: 10, padding: "13px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="shield" size={16} style={{ color: "var(--gold-base)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.65 }}>CNYT is a reward token. Once converted, USDT earnings cannot be recovered. Swaps are irreversible.</span>
            </div>
            <Btn block onClick={finishSwap}>Confirm &amp; Swap</Btn>
            <button onClick={function () { setStep(0); }} style={{ appearance: "none", background: "none", border: "none", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", textAlign: "center", padding: "4px 0" }}>← Go back &amp; edit</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Swap complete">
              {fmt(amt * 7.08)} CNYT credited to your rewards balance.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("CNYT balance updated"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

window.WalletScreen = WalletScreen;


/* LONGRISE Mobile — MY page (profile, security, support) as overlay */
function MyPage(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA;
  const [twoFa, setTwoFa] = React.useState(true);
  const [gaDisableConfirm, setGaDisableConfirm] = React.useState(false);
  const [signOutConfirm, setSignOutConfirm] = React.useState(false);
  const [notif, setNotif] = React.useState(true);

  /* ══════════════════════════════════════════════════
     TRADING PASSWORD — 3 distinct modal states
     tpModal: null | "status" | "setup" | "change" | "done"
     tpStage (setup):  "new" | "confirm"
     tpStage (change): "cur" | "new" | "confirm"
  ══════════════════════════════════════════════════ */
  const [tpModal, setTpModal]       = React.useState(null);
  const [tpStage, setTpStage]       = React.useState("new");
  const [tpSetupNew, setTpSetupNew] = React.useState("");
  const [tpSetupCon, setTpSetupCon] = React.useState("");
  const [tpChgCur,  setTpChgCur]   = React.useState("");
  const [tpChgNew,  setTpChgNew]   = React.useState("");
  const [tpChgCon,  setTpChgCon]   = React.useState("");
  const [tpErr,     setTpErr]       = React.useState(false);
  const [tpShake,   setTpShake]     = React.useState(false);
  const [tpShowPin, setTpShowPin]   = React.useState(false);

  /* ── Google Authenticator states ── */
  const [gaOpen,  setGaOpen]  = React.useState(false);
  const [gaOtp,   setGaOtp]   = React.useState("");
  const [gaErr,   setGaErr]   = React.useState(false);
  const [gaDone,  setGaDone]  = React.useState(false);
  var GA_KEY = "A2FR7S46OL2UIZRIP2OESIMQBT7AVX06";
  var gaKeys  = ["1","2","3","4","5","6","7","8","9","","0","DEL"];

  /* ─── open trading password modal ─── */
  function openTp() {
    setTpErr(false); setTpShowPin(false);
    if (ctx.tradingPwd) {
      setTpModal("status");
    } else {
      setTpModal("setup"); setTpStage("new");
      setTpSetupNew(""); setTpSetupCon("");
    }
  }
  function closeTp() {
    setTpModal(null); setTpErr(false); setTpShowPin(false);
    setTpSetupNew(""); setTpSetupCon("");
    setTpChgCur(""); setTpChgNew(""); setTpChgCon("");
  }
  function startChange() {
    setTpModal("change"); setTpStage("cur");
    setTpChgCur(""); setTpChgNew(""); setTpChgCon("");
    setTpErr(false); setTpShowPin(false);
  }

  /* ─── current pin being typed (for dots display) ─── */
  function tpCurrent() {
    if (tpModal === "setup")  return tpStage === "new" ? tpSetupNew : tpSetupCon;
    if (tpModal === "change") {
      if (tpStage === "cur")     return tpChgCur;
      if (tpStage === "new")     return tpChgNew;
      if (tpStage === "confirm") return tpChgCon;
    }
    return "";
  }

  /* ─── numpad tap handler ─── */
  function tpTap(k) {
    var cur = tpCurrent();
    function setVal(v) {
      if (tpModal === "setup") {
        if (tpStage === "new")     setTpSetupNew(v);
        else                       setTpSetupCon(v);
      } else {
        if (tpStage === "cur")     setTpChgCur(v);
        else if (tpStage === "new")setTpChgNew(v);
        else                       setTpChgCon(v);
      }
    }
    if (k === "DEL") { setVal(cur.slice(0,-1)); setTpErr(false); return; }
    /* ── OK: confirm current step ── */
    if (k === "OK") {
      if (cur.length < 6) return;
      /* setup flow */
      if (tpModal === "setup" && tpStage === "new") {
        setTpStage("confirm"); setTpShowPin(false); return;
      }
      if (tpModal === "setup" && tpStage === "confirm") {
        if (cur === tpSetupNew) {
          ctx.setTradingPwd(tpSetupNew); setTpModal("done"); ctx.notify("Trading password set");
        } else {
          setTpShake(true); setTpErr(true);
          setTimeout(function() { setTpShake(false); setTpSetupCon(""); setTpErr(false); }, 700);
        }
        return;
      }
      /* change flow */
      if (tpModal === "change" && tpStage === "cur") {
        if (cur === ctx.tradingPwd) {
          setTpStage("new"); setTpShowPin(false);
        } else {
          setTpShake(true); setTpErr(true);
          setTimeout(function() { setTpShake(false); setTpChgCur(""); setTpErr(false); }, 700);
        }
        return;
      }
      if (tpModal === "change" && tpStage === "new") {
        setTpStage("confirm"); setTpShowPin(false); return;
      }
      if (tpModal === "change" && tpStage === "confirm") {
        if (cur === tpChgNew) {
          ctx.setTradingPwd(tpChgNew); setTpModal("done"); ctx.notify("Trading password changed");
        } else {
          setTpShake(true); setTpErr(true);
          setTimeout(function() { setTpShake(false); setTpChgCon(""); setTpErr(false); }, 700);
        }
        return;
      }
    }
    if (cur.length >= 6) return;
    setVal(cur + k);
  }

  /* ─── GA helpers ─── */
  function openGaSetup() {
    if (twoFa) { setGaDisableConfirm(true); }
    else { setGaOpen(true); setGaOtp(""); setGaErr(false); setGaDone(false); }
  }
  function confirmGaDisable() {
    setGaDisableConfirm(false);
    setTwoFa(false);
    ctx.notify("Google Authenticator disabled");
  }
  function closeGa() { setGaOpen(false); setGaOtp(""); setGaErr(false); setGaDone(false); }
  function gaTap(k) {
    if (k === "DEL") { setGaOtp(function(p) { return p.slice(0,-1); }); setGaErr(false); return; }
    if (gaOtp.length >= 6) return;
    setGaOtp(gaOtp + k); setGaErr(false);
  }
  function verifyGa() {
    if (gaOtp.length < 6) { setGaErr(true); return; }
    setGaDone(true);
    setTimeout(function() { setTwoFa(true); closeGa(); ctx.notify("Google Authenticator enabled"); }, 1400);
  }
  function copyGaKey() {
    if (navigator.clipboard) navigator.clipboard.writeText(GA_KEY).catch(function(){});
    ctx.notify("Authentication key copied");
  }

  /* ─── GA QR mock ─── */
  function GaQRCode() {
    var code = D.user.id || "LONGRISE2FA";
    var S = 21, cells = [];
    for (var r = 0; r < S; r++) {
      for (var c = 0; c < S; c++) {
        var dark = false;
        if (r<=6&&c<=6) { dark=r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4); }
        else if (r<=6&&c>=14) { var lc=c-14; dark=r===0||r===6||lc===0||lc===6||(r>=2&&r<=4&&lc>=2&&lc<=4); }
        else if (r>=14&&c<=6) { var lr=r-14; dark=lr===0||lr===6||c===0||c===6||(lr>=2&&lr<=4&&c>=2&&c<=4); }
        else if (r===6||c===6) { dark=(r+c)%2===0; }
        else { var seed=r*31+c*17; var ch=code.charCodeAt((r*3+c)%code.length); dark=((seed^ch)&1)===0; }
        cells.push(dark);
      }
    }
    return (
      <div style={{ display:"grid", gridTemplateColumns:"repeat(21,1fr)", width:176, height:176, background:"#ffffff", padding:10, borderRadius:12, margin:"0 auto" }}>
        {cells.map(function(d,i) { return <div key={i} style={{ background: d?"#111":"#fff" }} />; })}
      </div>
    );
  }

  /* ─── Toggle component ─── */
  function Toggle(p) {
    return (
      <button onClick={p.onChange} aria-label={p.label}
        style={{ appearance:"none", border:"1px solid "+(p.on?"var(--line-gold-mid)":"var(--line-white-soft)"), background: p.on ? "linear-gradient(125deg,var(--gold-highlight),var(--gold-base))" : "var(--surface-void)", width:46, height:27, borderRadius:999, position:"relative", cursor:"pointer", transition:"background .18s ease", flex:"none" }}>
        <span style={{ position:"absolute", top:2.5, left:p.on?21:3, width:19, height:19, borderRadius:"50%", background:p.on?"var(--color-ink)":"var(--color-muted)", transition:"left .18s ease" }}></span>
      </button>
    );
  }

  /* ─── Numpad helper (shared) ─── */
  /* Layout: 1 2 3 / 4 5 6 / 7 8 9 / ⌫ 0 OK */
  function PinNumpad(p) {
    var onTap = p.onTap, shake = p.shake, err = p.err, pin = p.pin;
    var keys = ["1","2","3","4","5","6","7","8","9","DEL","0","OK"];
    var okReady = pin && pin.length === 6;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 80px)", gap:12 }}>
        {keys.map(function(k, i) {
          var isOk = k === "OK";
          var isDel = k === "DEL";
          var disabled = isOk && !okReady;
          return (
            <button key={i} onClick={function() { if (!disabled) onTap(k); }}
              style={{
                height:76, borderRadius:18,
                background: isOk
                  ? (okReady ? "linear-gradient(135deg,var(--accent),#2563eb)" : "rgba(255,255,255,0.04)")
                  : (shake&&err ? "rgba(239,68,68,0.10)" : "var(--surface-card)"),
                border: isOk
                  ? "1.5px solid "+(okReady ? "var(--accent)" : "rgba(255,255,255,0.10)")
                  : "1.5px solid "+(shake&&err ? "var(--red-alert)" : "var(--border-card)"),
                color: isOk
                  ? (okReady ? "#ffffff" : "rgba(255,255,255,0.20)")
                  : "var(--text-primary)",
                fontSize: isDel ? 20 : isOk ? 15 : 26,
                fontWeight: isOk ? 800 : 600,
                letterSpacing: isOk ? "0.08em" : 0,
                cursor: disabled ? "not-allowed" : "pointer",
                transition:"background .15s, border-color .15s, color .15s",
                opacity: disabled ? 0.4 : 1
              }}>
              {isDel ? "⌫" : k}
            </button>
          );
        })}
      </div>
    );
  }

  /* ─── PIN box row with eye toggle ─── */
  function PinDots(p) {
    var pin = p.pin, showPin = p.showPin, err = p.err, onEye = p.onEye;
    var borderClr = err ? "var(--red-alert)" : "var(--border-card)";
    return (
      <div style={{ width:"100%", maxWidth:320, background:"var(--surface-void)", border:"1.5px solid "+borderClr, borderRadius:16, padding:"16px 16px", display:"flex", alignItems:"center", gap:8, marginBottom:12, transition:"border-color .15s" }}>
        <div style={{ display:"flex", gap:8, flex:1, justifyContent:"center" }}>
          {[0,1,2,3,4,5].map(function(i) {
            var filled = pin.length > i;
            var boxBorder = "1.5px solid "+(err?"var(--red-alert)":filled?"var(--accent)":"rgba(255,255,255,0.15)");
            var boxBg = filled ? (err?"rgba(239,68,68,0.08)":"rgba(56,189,248,0.08)") : "rgba(255,255,255,0.03)";
            return (
              <div key={i} style={{ width:38, height:52, borderRadius:10, background:boxBg, border:boxBorder, display:"flex", alignItems:"center", justifyContent:"center", transition:"background .15s, border-color .15s" }}>
                {showPin && filled
                  ? <span style={{ fontSize:26, fontWeight:800, color:err?"var(--red-alert)":"var(--text-primary)", fontFamily:"monospace", lineHeight:1 }}>{pin[i]}</span>
                  : filled
                    ? <div style={{ width:14, height:14, borderRadius:"50%", background:err?"var(--red-alert)":"var(--accent)", transition:"background .15s" }} />
                    : null
                }
              </div>
            );
          })}
        </div>
        <button onClick={onEye} style={{ background:"none", border:"none", color:showPin?"var(--accent)":"var(--text-secondary)", cursor:"pointer", padding:"4px 2px 4px 8px", flexShrink:0, transition:"color .15s" }}>
          {showPin
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          }
        </button>
      </div>
    );
  }

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <div className="page-over" data-screen-label="My Profile">
      <div className="lr-header">
        <button className="iconbtn" onClick={props.onClose} aria-label="Back">
          <Icon name="chevL" size={20} />
        </button>
        <span className="eyebrow" style={{ color:"var(--color-cream)" }}>My Profile</span>
        <span style={{ width:44 }}></span>
      </div>

      <div className="lr-screen">
        {/* Profile card */}
        <Card hero style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div className="avatar" style={{ width:54, height:54, fontSize:18, cursor:"default" }}>{D.user.initials}</div>
          <div style={{ flex:1 }}>
            <div className="display" style={{ fontSize:18, fontWeight:700 }}>{D.user.name}</div>
            <div className="muted mono" style={{ fontSize:11, marginTop:2 }}>{D.user.id} · since {D.user.memberSince}</div>
          </div>
          <Pill><Icon name="crown" size={11} /> {D.user.rank}</Pill>
        </Card>

        {/* Security */}
        <Card void>
          <SectionHead title="Security center" />
          <div className="rowlist" style={{ marginTop:4 }}>
            {/* Google Authenticator */}
            <div className="rowitem" style={{ alignItems:"center" }}>
              <LeadDisc><Icon name="shield" size={16} /></LeadDisc>
              <div className="grow" style={{ flex:1 }}>
                <div className="ttl">Google Authenticator</div>
                <div className="sub">{twoFa ? "2FA enabled · required at login" : "2FA disabled · at risk"}</div>
              </div>
              {twoFa
                ? <Toggle on={twoFa} label="Toggle 2FA" onChange={openGaSetup} />
                : <button onClick={openGaSetup} style={{ background:"linear-gradient(135deg,var(--gold-base),var(--gold-deep))", color:"#ffffff", border:"none", borderRadius:10, padding:"8px 16px", fontSize:12, fontWeight:800, letterSpacing:"0.06em", cursor:"pointer" }}>SETUP</button>
              }
            </div>
            {/* Trading Password */}
            <RowItem lead={<LeadDisc><Icon name="lock" size={16} /></LeadDisc>}
              title="Trading password"
              sub={ctx.tradingPwd ? "Active · required to access Network" : "Not set · tap to configure"}
              chev onClick={openTp} />
            {/* Withdrawal PIN */}
            <RowItem lead={<LeadDisc><Icon name="scan" size={16} /></LeadDisc>}
              title="Withdrawal PIN" sub="4-digit settlement PIN" chev
              onClick={function () { ctx.openSheet("credential", { title:"Withdrawal PIN", kind:"pin" }); }} />
          </div>
        </Card>

        {/* Platform */}
        <Card void>
          <SectionHead title="Platform" />
          <div className="rowlist" style={{ marginTop:4 }}>
            <RowItem lead={<LeadDisc><Icon name="bell" size={16} /></LeadDisc>}
              title="Notifications" sub="Dividends, settlements, announcements"
              trail={<Toggle on={notif} label="Toggle notifications" onChange={function () { setNotif(!notif); }} />} />
            <RowItem lead={<LeadDisc><Icon name="support" size={16} /></LeadDisc>}
              title="Support tickets" sub="Live operational queue" chev
              onClick={function () { ctx.openSheet("support"); }} />
            <RowItem lead={<LeadDisc><Icon name="doc" size={16} /></LeadDisc>}
              title="Documentation" sub="Guides · whitepaper · roadmap" chev
              onClick={ctx.openStartHere} />
            <RowItem lead={<LeadDisc><Icon name="gear" size={16} /></LeadDisc>}
              title="Platform settings" sub="Language · currency display" chev
              onClick={function () { ctx.openSheet("settings"); }} />
          </div>
        </Card>

<Btn variant="ghost" block onClick={function () { setSignOutConfirm(true); }}>Sign out</Btn>
      </div>

      {/* ════════════════════════════════════════════
          TRADING PASSWORD MODALS  (zIndex 300)
          STATE 1: status  — password is set
          STATE 2: setup   — first-time setup
          STATE 3: change  — change existing password
          STATE 4: done    — success
      ════════════════════════════════════════════ */}
      {(tpModal === "status" || tpModal === "setup" || tpModal === "change" || tpModal === "done") && (
        <div style={{ position:"fixed", inset:0, background:"var(--bg-page)", zIndex:300, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 32px" }}>
          {/* Close */}
          <button onClick={closeTp} style={{ position:"absolute", top:20, right:16, background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", padding:8 }}>
            <Icon name="x" size={20} />
          </button>

          {/* ── STATUS: password already set ── */}
          {tpModal === "status" && (
            <React.Fragment>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(16,185,129,0.12)", border:"2px solid var(--green-success)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                <Icon name="lock" size={28} style={{ color:"var(--green-success)" }} />
              </div>
              <div className="display" style={{ fontSize:20, fontWeight:800, letterSpacing:"0.06em", color:"var(--text-primary)", marginBottom:6, textAlign:"center" }}>
                TRADING <span style={{ color:"var(--accent)" }}>PASSWORD</span>
              </div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.10)", border:"1px solid rgba(16,185,129,0.30)", borderRadius:20, padding:"5px 14px", marginBottom:28 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green-success)" }} />
                <span style={{ fontSize:12, fontWeight:700, color:"var(--green-success)", letterSpacing:"0.06em" }}>ACTIVE</span>
              </div>
              <Card void style={{ width:"100%", maxWidth:320, padding:"16px 18px", marginBottom:28 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <Icon name="shield" size={18} style={{ color:"var(--accent)", flexShrink:0, marginTop:2 }} />
                  <div className="muted" style={{ fontSize:13, lineHeight:1.7 }}>
                    Your trading password is set and active.<br />
                    Required each time you access the Network tab.
                  </div>
                </div>
              </Card>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:320 }}>
                <Btn variant="ghost" onClick={closeTp}>Close</Btn>
                <Btn onClick={startChange}>Change Password</Btn>
              </div>
            </React.Fragment>
          )}

          {/* ── SETUP: first-time setup ── */}
          {tpModal === "setup" && (
            <React.Fragment>
              <div style={{ width:56, height:56, borderRadius:16, background:"var(--surface-card)", border:"1px solid var(--border-card)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                <Icon name="lock" size={26} style={{ color:"var(--accent)" }} />
              </div>
              <div className="display" style={{ fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"var(--text-primary)", marginBottom:24, textAlign:"center" }}>
                TRADING <span style={{ color:"var(--accent)" }}>PASSWORD</span>
              </div>
              {/* Section label */}
              <div style={{ width:"100%", maxWidth:320, marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <div style={{ width:3, height:16, borderRadius:2, background: tpStage==="new"?"var(--accent)":"var(--green-success)" }} />
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", color: tpStage==="new"?"var(--accent)":"var(--green-success)" }}>
                    {tpStage === "new" ? "NEW TRADING PASSWORD" : "CONFIRM NEW PASSWORD"}
                  </span>
                </div>
                <div className="muted" style={{ fontSize:12, paddingLeft:11, lineHeight:1.5 }}>
                  {tpStage === "new" ? "Enter a 6-digit password" : "Re-enter to confirm"}
                </div>
              </div>
              <PinDots pin={tpCurrent()} showPin={tpShowPin} err={tpErr} onEye={function() { setTpShowPin(!tpShowPin); }} />
              <div style={{ height:20, marginBottom:14, fontSize:12, color:"var(--red-alert)", textAlign:"center", width:"100%", maxWidth:320 }}>
                {tpErr ? "Passwords do not match — try again" : " "}
              </div>
              <PinNumpad onTap={tpTap} shake={tpShake} err={tpErr} pin={tpCurrent()} />
            </React.Fragment>
          )}

          {/* ── CHANGE: change existing password ── */}
          {tpModal === "change" && (
            <React.Fragment>
              <div style={{ width:56, height:56, borderRadius:16, background:"var(--surface-card)", border:"1px solid var(--border-card)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                <Icon name="lock" size={26} style={{ color:"var(--accent)" }} />
              </div>
              <div className="display" style={{ fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"var(--text-primary)", marginBottom:18, textAlign:"center" }}>
                TRADING <span style={{ color:"var(--accent)" }}>PASSWORD</span>
              </div>
              {/* Step progress — 3 steps with labels */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:4, marginBottom:22, width:"100%", maxWidth:320 }}>
                {[{s:"cur",label:"CURRENT"},{s:"new",label:"NEW"},{s:"confirm",label:"CONFIRM"}].map(function(item,i) {
                  var stages = ["cur","new","confirm"];
                  var curIdx = stages.indexOf(tpStage);
                  var done = curIdx > i;
                  var active = tpStage === item.s;
                  return (
                    <React.Fragment key={i}>
                      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                        <div style={{ width:"100%", height:4, borderRadius:4, background: done?"var(--green-success)":active?"var(--accent)":"rgba(255,255,255,0.12)", transition:"background .3s" }} />
                        <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color: done?"var(--green-success)":active?"var(--accent)":"var(--text-secondary)", transition:"color .3s" }}>{item.label}</span>
                      </div>
                      {i < 2 && <div style={{ width:10, height:4, flexShrink:0 }} />}
                    </React.Fragment>
                  );
                })}
              </div>
              {/* Section label */}
              <div style={{ width:"100%", maxWidth:320, marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <div style={{ width:3, height:16, borderRadius:2, background: tpStage==="cur"?"var(--gold-base)":"var(--accent)" }} />
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", color: tpStage==="cur"?"var(--gold-base)":"var(--accent)" }}>
                    {tpStage === "cur" ? "CURRENT TRADING PASSWORD" : tpStage === "new" ? "NEW TRADING PASSWORD" : "CONFIRM NEW PASSWORD"}
                  </span>
                </div>
                <div className="muted" style={{ fontSize:12, paddingLeft:11, lineHeight:1.5 }}>
                  {tpStage === "cur" ? "Enter your existing 6-digit password" : tpStage === "new" ? "Enter a new 6-digit password" : "Re-enter new password to confirm"}
                </div>
              </div>
              <PinDots pin={tpCurrent()} showPin={tpShowPin} err={tpErr} onEye={function() { setTpShowPin(!tpShowPin); }} />
              <div style={{ height:20, marginBottom:14, fontSize:12, color:"var(--red-alert)", textAlign:"center", width:"100%", maxWidth:320 }}>
                {tpErr ? (tpStage==="cur" ? "Incorrect password — try again" : "Passwords do not match — try again") : " "}
              </div>
              <PinNumpad onTap={tpTap} shake={tpShake} err={tpErr} pin={tpCurrent()} />
            </React.Fragment>
          )}

          {/* ── DONE ── */}
          {tpModal === "done" && (
            <React.Fragment>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(16,185,129,0.15)", border:"2px solid var(--green-success)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
                <Icon name="check" size={32} style={{ color:"var(--green-success)" }} />
              </div>
              <div className="display" style={{ fontSize:20, fontWeight:800, color:"var(--text-primary)", marginBottom:8, textAlign:"center" }}>Password Saved</div>
              <div className="muted" style={{ fontSize:13, textAlign:"center", marginBottom:32, lineHeight:1.7 }}>
                Network access is now protected.<br />You will be asked for this password each time you visit the Network tab.
              </div>
              <Btn onClick={closeTp}>Done</Btn>
            </React.Fragment>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════
          GOOGLE AUTHENTICATOR DISABLE CONFIRMATION
      ════════════════════════════════════════════ */}
      {gaDisableConfirm && (
        <div style={{ position:"fixed", inset:0, background:"var(--bg-page)", zIndex:310, display:"flex", flexDirection:"column" }}>
          {/* Header */}
          <div style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px 14px", borderBottom:"1px solid var(--border-card)" }}>
            <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:"0.13em", color:"var(--red-alert)", textTransform:"uppercase" }}>Security Warning</div>
            <button onClick={function(){ setGaDisableConfirm(false); }}
              style={{ appearance:"none", background:"rgba(255,255,255,0.06)", border:"1px solid var(--border-card)", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-primary)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          {/* Body */}
          <div style={{ flex:1, overflowY:"auto", padding:"28px 24px 32px", display:"flex", flexDirection:"column", gap:24, WebkitOverflowScrolling:"touch" }}>
            {/* Warning icon */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(239,68,68,0.12)", border:"2px solid var(--red-alert)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--red-alert)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:20, fontWeight:800, color:"var(--text-primary)", lineHeight:1.3, marginBottom:8 }}>Disable Google Authenticator?</div>
                <div style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.6 }}>Your current 2FA protection will be removed.<br />Please read the following carefully.</div>
              </div>
            </div>
            {/* Warning points */}
            <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:16, padding:"18px 20px", display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { icon:"🔑", text:"Your existing secret key will be permanently invalidated. You will not be able to recover it." },
                { icon:"📱", text:"A new secret key will be issued on re-setup. You must re-scan the QR code in your Google Authenticator app." },
                { icon:"🔓", text:"Your account will have no 2FA protection during the period between disabling and re-enabling." },
                { icon:"💸", text:"Withdrawals and sensitive operations require 2FA. Disabling will restrict these actions until 2FA is restored." }
              ].map(function(item, i) {
                return (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{item.icon}</span>
                    <span style={{ fontSize:13.5, color:"var(--text-secondary)", lineHeight:1.62 }}>{item.text}</span>
                  </div>
                );
              })}
            </div>
            {/* Confirm text */}
            <div style={{ background:"rgba(185,154,107,0.07)", border:"1px solid rgba(185,154,107,0.2)", borderRadius:12, padding:"13px 16px" }}>
              <div style={{ fontSize:12.5, color:"var(--gold-highlight)", lineHeight:1.65, textAlign:"center" }}>
                Once disabled, your previous key is gone forever.<br />A new key will be issued when you re-enable 2FA.
              </div>
            </div>
            {/* Buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:4 }}>
              <button onClick={confirmGaDisable}
                style={{ appearance:"none", background:"var(--red-alert)", border:"none", borderRadius:14, padding:"15px", fontSize:15, fontWeight:800, letterSpacing:"0.05em", color:"#fff", cursor:"pointer" }}>
                Yes, Disable 2FA
              </button>
              <button onClick={function(){ setGaDisableConfirm(false); }}
                style={{ appearance:"none", background:"rgba(255,255,255,0.05)", border:"1.5px solid var(--border-card)", borderRadius:14, padding:"15px", fontSize:15, fontWeight:700, color:"var(--text-primary)", cursor:"pointer" }}>
                Cancel — Keep 2FA Active
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          SIGN OUT CONFIRMATION
      ════════════════════════════════════════════ */}
      {signOutConfirm && (
        <div className="pop-backdrop" style={{ zIndex:400 }} onClick={function(e){ if(e.target===e.currentTarget) setSignOutConfirm(false); }}>
          <div className="pop-card" role="dialog" aria-modal="true">
            <div className="pop-icon" style={{ color:"var(--text-secondary)", background:"rgba(255,255,255,0.06)", border:"1px solid var(--border-card)" }}>
              <Icon name="logout" size={22} weight={2} />
            </div>
            <div className="pop-tag">Sign Out</div>
            <div className="pop-title">Are you sure?</div>
            <div className="pop-body">You will be signed out of your LONGRISE account. You can sign back in at any time.</div>
            <button className="btn block" style={{ background:"none", border:"1.5px solid rgba(239,68,68,0.40)", color:"var(--red-alert)", borderRadius:14, padding:"14px", fontSize:14, fontWeight:800, cursor:"pointer", marginBottom:10 }} onClick={function(){ props.onClose(); ctx.signOut(); }}>Yes, Sign Out</button>
            <button className="btn ghost block" onClick={function(){ setSignOutConfirm(false); }}>Cancel — Stay Signed In</button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          GOOGLE AUTHENTICATOR SETUP MODAL
      ════════════════════════════════════════════ */}
      {gaOpen && (
        <div style={{ position:"fixed", inset:0, background:"var(--bg-page)", zIndex:300, display:"flex", flexDirection:"column", alignItems:"center", overflowY:"auto" }}>
          <button onClick={closeGa} style={{ position:"absolute", top:20, right:16, background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", padding:8 }}>
            <Icon name="x" size={22} />
          </button>
          <div style={{ width:"100%", maxWidth:360, padding:"60px 28px 40px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:56, height:56, borderRadius:16, background:"var(--surface-card)", border:"1px solid var(--border-card)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
              <Icon name="scan" size={28} style={{ color:"var(--accent)" }} />
            </div>
            <div className="display" style={{ fontSize:20, fontWeight:800, letterSpacing:"0.06em", color:"var(--text-primary)", textAlign:"center", marginBottom:4 }}>
              GOOGLE <span style={{ color:"var(--accent)" }}>AUTHENTICATOR</span>
            </div>
            <div className="muted" style={{ fontSize:11, letterSpacing:"0.1em", textAlign:"center", marginBottom:28, lineHeight:1.6 }}>
              ENABLE TWO-FACTOR AUTHENTICATION<br />FOR ENHANCED SECURITY
            </div>
            {!gaDone ? (
              <React.Fragment>
                <GaQRCode />
                <div style={{ width:"100%", marginTop:20, marginBottom:20 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:"var(--accent)", marginBottom:8, textAlign:"center" }}>MANUAL AUTHENTICATION KEY</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, background:"var(--surface-void)", border:"1px solid var(--border-card)", borderRadius:12, padding:"12px 14px" }}>
                    <span className="mono" style={{ flex:1, fontSize:12, fontWeight:700, color:"var(--text-primary)", letterSpacing:"0.08em", wordBreak:"break-all" }}>{GA_KEY}</span>
                    <button onClick={copyGaKey} style={{ background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", flexShrink:0, padding:4 }}>
                      <Icon name="copy" size={18} />
                    </button>
                  </div>
                </div>
                <div style={{ width:"100%", marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:"var(--accent)", marginBottom:12, textAlign:"center" }}>VERIFY 6-DIGIT CODE</div>
                  <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:4 }}>
                    {[0,1,2,3,4,5].map(function(i) {
                      var filled = gaOtp.length > i;
                      return (
                        <div key={i} style={{ width:40, height:52, borderRadius:12, background: filled?"rgba(56,189,248,0.08)":"var(--surface-void)", border:"1.5px solid "+(gaErr?"var(--red-alert)":filled?"var(--accent)":"var(--border-card)"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:gaErr?"var(--red-alert)":"var(--text-primary)", fontFamily:"monospace", transition:"border-color .15s" }}>
                          {gaOtp[i] || ""}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ height:18, fontSize:11, color:"var(--text-secondary)", textAlign:"center", marginBottom:4 }}>
                    {gaErr ? <span style={{ color:"var(--red-alert)" }}>Please enter a valid 6-digit code</span> : "From your Google Authenticator app"}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 76px)", gap:10, marginBottom:24 }}>
                  {gaKeys.map(function(k, i) {
                    if (k === "") return <div key={i} />;
                    return (
                      <button key={i} onClick={function() { gaTap(k); }}
                        style={{ height:72, borderRadius:16, background:"var(--surface-card)", border:"1.5px solid var(--border-card)", color:"var(--text-primary)", fontSize:k==="DEL"?20:24, fontWeight:600, cursor:"pointer", transition:"background .12s" }}>
                        {k === "DEL" ? "⌫" : k}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%" }}>
                  <Btn variant="ghost" onClick={closeGa}>Cancel</Btn>
                  <Btn disabled={gaOtp.length < 6} onClick={verifyGa}>Verify &amp; Enable</Btn>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(16,185,129,0.15)", border:"2px solid var(--green-success)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  <Icon name="check" size={32} style={{ color:"var(--green-success)" }} />
                </div>
                <div className="display" style={{ fontSize:18, fontWeight:700, color:"var(--text-primary)", marginBottom:8, textAlign:"center" }}>2FA Enabled</div>
                <div className="muted" style={{ fontSize:13, textAlign:"center", lineHeight:1.7 }}>Your account is now protected with<br />Google Authenticator.</div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

window.MyPage = MyPage;




/* LONGRISE Mobile — START HERE in-app guide (full-page overlay).
   Mobile-native version of START HERE.html: Buy → Earn → Grow → Repeat loop.
   All CTAs route into the app (no external navigation), so the standalone
   export stays fully self-contained. */
function StartHerePage(props) {
  const ctx = React.useContext(AppCtx);

  /* go(): close the guide, then route into the app tab/flow. */
  function go(tab, opts) {
    return function () { props.onClose(); ctx.goTab(tab, opts); };
  }

  const LOOP = [
    { n: "1", label: "Start" },
    { n: "2", label: "Earn" },
    { n: "3", label: "Grow" },
    { n: "4", label: "Repeat" }
  ];

  function StepCard(p) {
    return (
      <Card hero={p.feature}>
        <div className="sh2-step-head">
          <div className="sh2-idx">{p.idx}</div>
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <div className="sh2-title">{p.title}</div>
          </div>
        </div>
        <p className="sh2-desc">{p.desc}</p>
        {p.children}
        <div className="sh2-ctas">{p.ctas}</div>
      </Card>
    );
  }

  return (
    <div className="page-over" data-screen-label="Start Here">
      <div className="lr-header">
        <button className="iconbtn" onClick={props.onClose} aria-label="Back">
          <Icon name="chevL" size={20} />
        </button>
        <span className="eyebrow" style={{ color: "var(--color-cream)" }}>Start Here</span>
        <span style={{ width: 44 }}></span>
      </div>

      <div className="lr-screen">
        {/* Hero */}
        <div className="sh2-hero">
          <Eyebrow style={{ color: "var(--gold-glow)" }}>New here?</Eyebrow>
          <div className="sh2-h1">
            Master LongRise in <span style={{ color: "#ffffff" }}>3 minutes</span>
          </div>
          <p className="sh2-lead">
            Follow the steps below, top to bottom — and keep repeating the loop to grow your earnings.
          </p>
        </div>

        {/* Loop indicator */}
        <div className="sh2-loop">
          {LOOP.map(function (s, i) {
            return (
              <React.Fragment key={s.n}>
                <div className="sh2-node">
                  <div className="sh2-dot">{s.n}</div>
                  <span>{s.label}</span>
                </div>
                {i < LOOP.length - 1 && <span className="sh2-link"></span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* STEP 1 */}
        <StepCard idx="1" feature eyebrow="Understand & Start" title="Buy a Package"
          desc="The AI auto-trading engine earns you daily dividends. But it doesn't stop there — you also earn by helping LongRise grow."
          ctas={
            <React.Fragment>
              <Btn block onClick={go("PLANS")}>Buy a Package <Icon name="chevR" size={15} weight={2.2} /></Btn>
              <Btn variant="ghost" block onClick={go("EARN")}>See how ROI works <Icon name="chevR" size={15} weight={2.2} /></Btn>
            </React.Fragment>
          }>
          <div className="sh2-bonuses">
            <div className="sh2-bonus"><div className="bt">Winning Dividend</div><div className="bd">Daily ROI from the AI engine — every day, automatically.</div></div>
            <div className="sh2-bonus"><div className="bt">Referral + Roll-up</div><div className="bd">Invite others &amp; earn from your team's activity.</div></div>
            <div className="sh2-bonus"><div className="bt">Rank Bonus</div><div className="bd">As your org grows, your rank unlocks bigger bonuses.</div></div>
          </div>
        </StepCard>

        {/* STEP 2 */}
        <StepCard idx="2" eyebrow="Stay motivated" title="Check Your Earnings"
          desc="Watch your daily dividends and bonuses stack up. Seeing the numbers grow every day is what keeps you going."
          ctas={<Btn block onClick={go("EARN")}>View Earnings <Icon name="chevR" size={15} weight={2.2} /></Btn>} />

        {/* STEP 3 */}
        <StepCard idx="3" eyebrow="Multiply rewards" title="Grow Your Organization"
          desc="Refer others and build your team. Roll-up grows your bonuses as your network expands — and pushes you toward the next rank."
          ctas={
            <React.Fragment>
              <Btn block onClick={go("NETWORK")}>Refer Now <Icon name="chevR" size={15} weight={2.2} /></Btn>
              <Btn variant="ghost" block onClick={go("NETWORK")}>My Team &amp; Tree <Icon name="chevR" size={15} weight={2.2} /></Btn>
            </React.Fragment>
          } />

        {/* STEP 4 */}
        <StepCard idx="4" eyebrow="Keep the loop going" title="Deposit & Withdraw"
          desc="Add funds to grow your position, and withdraw what you've earned anytime. Then start again from Step 1 — every loop compounds."
          ctas={
            <React.Fragment>
              <Btn block onClick={go("WALLET", { open: "deposit" })}>Deposit <Icon name="chevR" size={15} weight={2.2} /></Btn>
              <Btn variant="ghost" block onClick={go("WALLET", { open: "withdraw" })}>Withdraw <Icon name="chevR" size={15} weight={2.2} /></Btn>
            </React.Fragment>
          } />

        {/* Loop footer */}
        <div className="sh2-loopfoot">
          <div className="sh2-lf-ic"><Icon name="swap" size={20} /></div>
          <div>
            <div className="sh2-lf-title">The more you repeat the loop, the more you earn.</div>
            <div className="sh2-lf-sub">Buy → Earn → Grow → Reinvest. Stuck on any step? Our team will walk you through it.</div>
          </div>
        </div>

        <Btn block onClick={props.onClose}>
          Close
        </Btn>
        <Btn variant="ghost" block onClick={function () { ctx.openSheet("support"); }}>
          <Icon name="support" size={16} /> Talk to Support
        </Btn>

      </div>
    </div>
  );
}

window.StartHerePage = StartHerePage;


/* LONGRISE Mobile — login overlays + ALL (전체) menu page
   - ConsentGate: shown every login. Risk Notice + Terms, each consented separately.
   - ImportantNoticePopup: optional second popup, only when D.importantNotice is set.
   - StartHereNudge: shown to new / no-purchase users after notices.
   - AllScreen: the "전체" tab — a full hotlink hub (replaces any sidebar/drawer). */

/* ---------- Consent gate (Risk Notice + Terms) ---------- */
function ConsentGate(props) {
  const D = window.LR_DATA;
  const [riskOk, setRiskOk] = React.useState(false);
  const [termsOk, setTermsOk] = React.useState(false);
  const both = riskOk && termsOk;

  function Box(p) {
    return (
      <div className="consent-box">
        <div className="consent-box-label">{p.label}</div>
        <div className="consent-text">{p.text}</div>
        <button className={"consent-check" + (p.on ? " on" : "")} onClick={p.onToggle}>
          <span className="cbox">{p.on && <Icon name="check" size={13} weight={2.4} />}</span>
          {p.agree}
        </button>
      </div>
    );
  }

  return (
    <div className="consent-gate" role="dialog" aria-modal="true" aria-label="Risk notice and terms">
      <div className="consent-card">
        <div className="consent-head">
          <div className="lr-brandmark">
            <img src={window.LR_IMG("iconGold")} alt="LONGRISE" />
            <span className="lr-wordmark">LONG<em>RISE</em></span>
          </div>
          <div className="consent-title">Before you continue</div>
          <div className="consent-sub">Please review and agree to each item to access your account.</div>
        </div>

        <div className="consent-boxes">
          <Box label="1 · Risk Notice" text={D.riskNotice} on={riskOk}
            agree="I have read and agree to the Risk Notice"
            onToggle={function () { setRiskOk(!riskOk); }} />
          <Box label="2 · Terms of Service" text={D.terms} on={termsOk}
            agree="I have read and agree to the Terms of Service"
            onToggle={function () { setTermsOk(!termsOk); }} />
        </div>

        <button className={"btn gold block consent-confirm" + (both ? "" : " is-disabled")}
          disabled={!both} onClick={props.onAgree}>
          Agree &amp; continue
        </button>
        <div className="consent-foot">You must agree each time you sign in.</div>
      </div>
    </div>
  );
}

/* ---------- Important notice (second popup) ---------- */
function ImportantNoticePopup(props) {
  const n = props.notice;
  return (
    <div className="pop-backdrop" onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}>
      <div className="pop-card" role="dialog" aria-modal="true">
        <div className="pop-icon alert"><Icon name="alert" size={22} weight={2} /></div>
        <div className="pop-tag">{n.tag}</div>
        <div className="pop-title">{n.title}</div>
        <div className="pop-body">{n.body}</div>
        <button className="btn gold block" onClick={props.onClose}>Got it</button>
      </div>
    </div>
  );
}

/* ---------- Start Here nudge (new users) ---------- */
function StartHereNudge(props) {
  const ctx = React.useContext(AppCtx);
  return (
    <div className="pop-backdrop" onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}>
      <div className="pop-card" role="dialog" aria-modal="true">
        <div className="pop-icon gold"><Icon name="bolt" size={22} weight={2} /></div>
        <div className="pop-tag" style={{ color: "var(--gold-glow)" }}>New here?</div>
        <div className="pop-title">Master LongRise in 3 minutes</div>
        <div className="pop-body">Follow the Start Here guide — buy a package, watch it earn, and grow. We'll walk you through every step.</div>
        <button className="btn gold block" onClick={function () { props.onClose(); ctx.openStartHere(); }}>Open Start Here</button>
        <button className="btn ghost block" style={{ marginTop: 8 }} onClick={props.onClose}>Maybe later</button>
      </div>
    </div>
  );
}

/* ---------- ALL (전체) menu page ---------- */
function AllScreen(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA;
  const [signOutConfirm, setSignOutConfirm] = React.useState(false);

  function Tile(p) {
    var icBg     = p.icBg     || "rgba(185,154,107,0.18)";
    var icClr    = p.icClr    || "var(--gold-highlight)";
    var icBorder = p.icBorder || "none";
    return (
      <button className={"all-tile" + (p.soon ? " soon" : "")} onClick={p.onClick}>
        <span className="all-ic" style={{ background:icBg, color:icClr, border:icBorder }}>
          <Icon name={p.icon} size={26} />
        </span>
        <span className="all-name">{p.name}</span>
        {p.soon && <span className="all-soon">Soon</span>}
      </button>
    );
  }

  return (
    <div className="lr-screen" data-screen-label="All">
      <div>
        <Eyebrow>All</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Everything in one place
        </div>
      </div>

      {/* Start Here highlight */}
      <button className="all-starthere" onClick={ctx.openStartHere}>
        <span className="all-ic gold"><Icon name="bolt" size={20} /></span>
        <span className="grow">
          <span className="all-sh-title">Start Here</span>
          <span className="all-sh-sub">New? Master LongRise in 3 minutes</span>
        </span>
        <Icon name="chevR" size={16} style={{ color: "var(--gold-base)" }} />
      </button>

      <Card void>
        <SectionHead title="Main" />
        <div className="all-grid">
          <Tile icon="invest" name="Plans"   icBg="linear-gradient(135deg,rgba(215,177,115,0.42),rgba(185,154,107,0.22))" icClr="#ffffff" icBorder="1px solid rgba(185,154,107,0.52)" onClick={function () { ctx.goTab("PLANS"); }} />
          <Tile icon="team"   name="Network" icBg="linear-gradient(135deg,rgba(215,177,115,0.42),rgba(185,154,107,0.22))" icClr="#ffffff" icBorder="1px solid rgba(185,154,107,0.52)" onClick={function () { ctx.goTab("NETWORK"); }} />
          <Tile icon="home"   name="Earn"    icBg="linear-gradient(135deg,rgba(215,177,115,0.42),rgba(185,154,107,0.22))" icClr="#ffffff" icBorder="1px solid rgba(185,154,107,0.52)" onClick={function () { ctx.goTab("EARN"); }} />
          <Tile icon="wallet" name="Wallet"  icBg="linear-gradient(135deg,rgba(215,177,115,0.42),rgba(185,154,107,0.22))" icClr="#ffffff" icBorder="1px solid rgba(185,154,107,0.52)" onClick={function () { ctx.goTab("WALLET"); }} />
          <Tile icon="user"   name="Profile" icBg="linear-gradient(135deg,rgba(215,177,115,0.42),rgba(185,154,107,0.22))" icClr="#ffffff" icBorder="1px solid rgba(185,154,107,0.52)" onClick={props.onOpenMy} />
        </div>
      </Card>

      <Card void>
        <SectionHead title="Trade & Markets" />
        <div className="all-grid">
          <Tile icon="arrowDown" name="Deposit"        icBg="linear-gradient(135deg,rgba(220,100,40,0.36),rgba(180,60,20,0.18))" icClr="#ffffff" icBorder="1px solid rgba(220,100,40,0.48)" onClick={function () { ctx.goTab("WALLET", { open: "deposit" }); }} />
          <Tile icon="arrowUp"   name="Withdraw"       icBg="linear-gradient(135deg,rgba(220,100,40,0.36),rgba(180,60,20,0.18))" icClr="#ffffff" icBorder="1px solid rgba(220,100,40,0.48)" onClick={function () { ctx.goTab("WALLET", { open: "withdraw" }); }} />
          <Tile icon="send"      name="Send"            icBg="linear-gradient(135deg,rgba(220,100,40,0.36),rgba(180,60,20,0.18))" icClr="#ffffff" icBorder="1px solid rgba(220,100,40,0.48)" onClick={function () { ctx.goTab("WALLET", { open: "send" }); }} />
          <Tile icon="swap"      name="Swap"            icBg="linear-gradient(135deg,rgba(220,100,40,0.36),rgba(180,60,20,0.18))" icClr="#ffffff" icBorder="1px solid rgba(220,100,40,0.48)" onClick={function () { ctx.goTab("WALLET", { open: "swap" }); }} />
        </div>
      </Card>

      <Card void>
        <SectionHead title="Account" />
        <div className="all-grid">
          <Tile icon="bell"    name="Alert"    icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={function () { ctx.openSheet("alerts"); }} />
          <Tile icon="news"    name="News"     icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={function () { ctx.openSheet("news"); }} />
          <Tile icon="doc"     name="FAQ"      icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={ctx.openStartHere} />
          <Tile icon="shield"  name="Security" icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={props.onOpenMy} />
          <Tile icon="support" name="Support"  icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={function () { ctx.openSheet("support"); }} />
          <Tile icon="gear"    name="Settings" icBg="linear-gradient(135deg,rgba(160,60,30,0.36),rgba(120,30,10,0.20))" icClr="#ffffff" icBorder="1px solid rgba(201,100,50,0.42)" onClick={function () { ctx.openSheet("settings"); }} />
        </div>
      </Card>

      <button className="all-signout" onClick={function(){ setSignOutConfirm(true); }}>
        <Icon name="logout" size={18} /> Sign out
      </button>

      {signOutConfirm && (
        <div className="pop-backdrop" style={{ zIndex:400 }} onClick={function(e){ if(e.target===e.currentTarget) setSignOutConfirm(false); }}>
          <div className="pop-card" role="dialog" aria-modal="true">
            <div className="pop-icon" style={{ color:"var(--text-secondary)", background:"rgba(255,255,255,0.06)", border:"1px solid var(--border-card)" }}>
              <Icon name="logout" size={22} weight={2} />
            </div>
            <div className="pop-tag">Sign Out</div>
            <div className="pop-title">Are you sure?</div>
            <div className="pop-body">You will be signed out of your LONGRISE account. You can sign back in at any time.</div>
            <button className="btn block" style={{ background:"none", border:"1.5px solid rgba(239,68,68,0.40)", color:"var(--red-alert)", borderRadius:14, padding:"14px", fontSize:14, fontWeight:800, cursor:"pointer", marginBottom:10 }} onClick={ctx.signOut}>Yes, Sign Out</button>
            <button className="btn ghost block" onClick={function(){ setSignOutConfirm(false); }}>Cancel — Stay Signed In</button>
          </div>
        </div>
      )}

    </div>
  );
}

Object.assign(window, { ConsentGate, ImportantNoticePopup, StartHereNudge, AllScreen });




/* LONGRISE Mobile — utility sheets (Support, Settings, News, Alerts, Credential).
   Centralized so any screen can open one via ctx.openSheet(type, payload). */

/* ---------- Support ---------- */
function SupportSheet(props) {
  const ctx = React.useContext(AppCtx);
  const [view,       setView]       = React.useState("main"); // "main" | "compose"
  const [msg,        setMsg]        = React.useState("");
  const [imgs,       setImgs]       = React.useState([]);
  const [sent,       setSent]       = React.useState(false);
  const [openTicket, setOpenTicket] = React.useState(null);
  const fileRef = React.useRef(null);

  var tickets = [
    { id:"LR-2041", cat:"GENERAL", date:"2026-06-12 11:02", priority:"medium", status:"IN PROGRESS",
      title:"STG ticket mqathszg", replies:["STG admin answer mqathszg","dsf","sfasdfas","fdgsdfg"] },
    { id:"LR-2038", cat:"GENERAL", date:"2026-06-12 10:55", priority:"medium", status:"RESOLVED",
      title:"PW ticket mqat8myz",  replies:["PW admin answer mqat8myz"] },
    { id:"LR-2035", cat:"GENERAL", date:"2026-06-12 10:54", priority:"medium", status:"IN PROGRESS",
      title:"PW ticket mqat73ld",  replies:["PW admin answer mqat73ld"] }
  ];

  var channels = [
    { icon:"support", label:"Open Support Ticket", sub:"Blockchain-tracked requests",    accent:"var(--accent)" },
    { icon:"send",    label:"Telegram Desk",        sub:"Route to live ops queue",        accent:"#38bdf8" },
    { icon:"doc",     label:"Email Desk",           sub:"Secure document review queue",   accent:"var(--gold-base)" }
  ];

  function handleImg(e) {
    Array.from(e.target.files).forEach(function(f) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        setImgs(function(prev) { return prev.concat([{ name:f.name, url:ev.target.result }]); });
      };
      reader.readAsDataURL(f);
    });
    e.target.value = "";
  }
  function removeImg(i) { setImgs(function(prev) { return prev.filter(function(_,idx){ return idx!==i; }); }); }

  /* ── MAIN view ── */
  if (!sent && view === "main") {
    return (
      <Sheet open onClose={props.onClose} title="Concierge Support">
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {/* subtitle */}
          <div className="muted" style={{ fontSize:12.5, textAlign:"center", lineHeight:1.65 }}>
            Operational support is connected to live ticket queues.<br />
            Submit issues and review case statuses below.
          </div>

          {/* Channel cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {channels.map(function(c,i) {
              return (
                <div key={i} onClick={function(){ ctx.notify("Connecting to "+c.label+" — preview"); }}
                  style={{ background:"var(--surface-card)", border:"1px solid var(--border-card)", borderRadius:16, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
                  <div style={{ width:46, height:46, borderRadius:13, background:"rgba(255,255,255,0.05)", border:"1px solid var(--border-card)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:c.accent }}>
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", marginBottom:2 }}>{c.label}</div>
                    <div className="muted" style={{ fontSize:12 }}>{c.sub}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", color:c.accent, whiteSpace:"nowrap" }}>CONNECT NOW ›</span>
                </div>
              );
            })}
          </div>

          {/* FRAUD REPORT */}
          <button onClick={function(){ ctx.notify("Fraud report channel — connecting"); }}
            style={{ width:"100%", padding:"13px 0", borderRadius:12, background:"rgba(239,68,68,0.07)", border:"1.5px solid rgba(239,68,68,0.35)", color:"#f87171", fontSize:13, fontWeight:800, letterSpacing:"0.1em", cursor:"pointer" }}>
            ⚠ FRAUD REPORT
          </button>

          {/* My Tickets header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <div style={{ fontSize:17, fontWeight:800, color:"var(--text-primary)", letterSpacing:"0.02em" }}>My Tickets</div>
              <div className="muted" style={{ fontSize:10, letterSpacing:"0.09em", marginTop:2 }}>LIVE OPERATIONAL QUEUE</div>
            </div>
            <Btn sm onClick={function(){ setView("compose"); setMsg(""); setImgs([]); setSent(false); }}>+ New Ticket</Btn>
          </div>

          {/* Ticket list */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {tickets.map(function(t,i) {
              var isOpen = openTicket === i;
              var resolved = t.status === "RESOLVED";
              var statusClr = resolved ? "var(--green-success)" : "var(--accent)";
              var statusBg  = resolved ? "rgba(16,185,129,0.12)" : "rgba(56,189,248,0.10)";
              return (
                <div key={i} style={{ background:"var(--surface-void)", border:"1px solid var(--border-card)", borderRadius:14, overflow:"hidden" }}>
                  <div style={{ padding:"14px 16px", cursor:"pointer" }} onClick={function(){ setOpenTicket(isOpen?null:i); }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7, gap:10 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", marginBottom:3 }}>{t.title}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:"var(--text-secondary)", letterSpacing:"0.08em" }}>{t.cat}</div>
                      </div>
                      <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.07em", color:statusClr, background:statusBg, border:"1px solid "+statusClr, borderRadius:20, padding:"4px 10px", flexShrink:0 }}>
                        {t.status}
                      </span>
                    </div>
                    <div style={{ display:"flex", gap:16 }}>
                      <span className="muted" style={{ fontSize:11.5 }}>⏱ {t.date}</span>
                      <span className="muted" style={{ fontSize:11.5 }}>◎ {t.priority}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:"1px solid var(--border-card)", padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                      {t.replies.map(function(r,ri) {
                        return (
                          <div key={ri} style={{ background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.15)", borderRadius:10, padding:"9px 13px", fontSize:13, color:"var(--text-primary)", lineHeight:1.5 }}>
                            <span style={{ color:"var(--accent)", fontWeight:700 }}>Support: </span>{r}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Sheet>
    );
  }

  /* ── COMPOSE view ── */
  if (!sent && view === "compose") {
    return (
      <Sheet open onClose={props.onClose} title="New Ticket">
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <button onClick={function(){ setView("main"); }}
            style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", fontSize:13, padding:0, alignSelf:"flex-start" }}>
            <Icon name="chevL" size={16} /> Back
          </button>

          <div className="field">
            <label style={{ fontSize:14 }}>Send a message</label>
            <textarea className="input" style={{ minHeight:110, padding:"14px 16px", resize:"none", lineHeight:1.6, fontSize:15 }}
              placeholder="Describe your issue in detail — our team replies within operational hours."
              value={msg} onChange={function(e){ setMsg(e.target.value); }} />
          </div>

          {/* Image attach */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:"0.12em", color:"var(--accent)", marginBottom:8 }}>ATTACH IMAGES</div>
            {imgs.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
                {imgs.map(function(img,i) {
                  return (
                    <div key={i} style={{ position:"relative", width:76, height:76, borderRadius:12, overflow:"hidden", border:"1.5px solid var(--border-card)" }}>
                      <img src={img.url} style={{ width:"100%", height:"100%", objectFit:"cover" }} alt={img.name} />
                      <button onClick={function(){ removeImg(i); }}
                        style={{ position:"absolute", top:4, right:4, width:20, height:20, borderRadius:"50%", background:"rgba(0,0,0,0.75)", border:"none", color:"#fff", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, lineHeight:1 }}>
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={function(){ fileRef.current && fileRef.current.click(); }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, width:"100%", background:"var(--surface-void)", border:"1.5px dashed rgba(56,189,248,0.30)", borderRadius:13, padding:"16px", color:"var(--text-secondary)", cursor:"pointer", fontSize:13.5 }}>
              <Icon name="scan" size={20} style={{ color:"var(--accent)" }} />
              <span>Tap to attach photo / screenshot</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handleImg} />
          </div>

          <Btn block disabled={msg.trim().length < 4} onClick={function(){ setSent(true); }}>
            <Icon name="send" size={15} /> Open Ticket
          </Btn>
        </div>
      </Sheet>
    );
  }

  /* ── SUCCESS view ── */
  return (
    <Sheet open onClose={props.onClose} title="Concierge Support">
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        <SuccessBlock title="Ticket Opened">
          Your ticket is in the queue. We'll notify you here when an agent responds.
        </SuccessBlock>
        <Btn block onClick={function(){ props.onClose(); ctx.notify("Ticket #LR-2044 created"); }}>Done</Btn>
      </div>
    </Sheet>
  );
}

/* ---------- Settings ---------- */
function SettingsSheet(props) {
  const ctx = React.useContext(AppCtx);
  const [lang, setLang] = React.useState("English");
  const [cur, setCur] = React.useState("USDT");
  const [confirmSave, setConfirmSave] = React.useState(false);
  // Currency Display uses USDT as the platform base currency.
  // Do not expose API provider names or calculation details to users.
  // Suggested free/public data sources:
  // 1) Fiat FX fallback: Frankfurter API (no API key, daily central-bank based rates)
  //    https://api.frankfurter.dev/v2/rates?base=USD&quotes=KRW,CNY,VND,THB,IDR,JPY,RUB
  // 2) Fiat FX fallback: ExchangeRate-API open endpoint (no API key, attribution required)
  //    https://open.er-api.com/v6/latest/USD
  // 3) USDT/USD reference: CoinGecko simple price endpoint or Binance ticker endpoint.
  // Calculation: usdtToLocal = usdtUsdPrice * usdToLocalRate
  const languages = [
    { name: "English", active: true },
    { name: "Chinese", active: true },
    { name: "Vietnamese", active: false },
    { name: "Korean", active: true },
    { name: "Thai", active: false },
    { name: "Indonesian", active: false },
    { name: "Japanese", active: false },
    { name: "Russian", active: false }
  ];
  const currencies = [
    { name: "USDT", rate: "1 USDT", active: true },
    { name: "KRW", rate: "1 USDT ≈ KRW", active: true },
    { name: "CNY", rate: "1 USDT ≈ CNY", active: true },
    { name: "VND", active: false },
    { name: "THB", active: false },
    { name: "IDR", active: false },
    { name: "JPY", active: false },
    { name: "RUB", active: false }
  ];

  function OptionGrid(props) {
    return (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {props.items.map(function (item) {
          var selected = props.value === item.name;
          return (
            <button key={item.name} disabled={!item.active}
              onClick={function () { if (item.active) props.onChange(item.name); }}
              style={{
                appearance:"none",
                border:"1px solid " + (selected ? "var(--line-gold-mid)" : "var(--border-card)"),
                background:selected ? "rgba(201,146,42,0.18)" : "var(--surface-void)",
                color:item.active ? "var(--text-primary)" : "var(--text-secondary)",
                opacity:item.active ? 1 : 0.52,
                borderRadius:12,
                padding:"11px 10px",
                minHeight:50,
                textAlign:"left",
                cursor:item.active ? "pointer" : "not-allowed",
                fontFamily:"var(--font-body)"
              }}>
              <div style={{ fontSize:12.5, fontWeight:800 }}>{item.name}</div>
              <div style={{ fontSize:10.5, color:item.active ? "var(--gold-base)" : "var(--text-secondary)", marginTop:3 }}>
                {item.active ? (item.rate || "Available") : "Coming soon"}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Sheet open onClose={props.onClose} title="Settings">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="field">
            <label>Language</label>
            <OptionGrid items={languages} value={lang} onChange={setLang} />
          </div>
          <div className="field">
            <label>Currency display</label>
            <OptionGrid items={currencies} value={cur} onChange={setCur} />
            <div className="muted" style={{ fontSize:11.5, marginTop:8 }}>Currency display is based on USDT.</div>
          </div>
          <Btn block onClick={function () { setConfirmSave(true); }}>
            Save preferences
          </Btn>
        </div>
      </Sheet>

      {confirmSave && (
        <div className="pop-backdrop" style={{ zIndex: 400 }} onClick={function (e) { if (e.target === e.currentTarget) setConfirmSave(false); }}>
          <div className="pop-card" role="dialog" aria-modal="true">
            <div className="pop-icon" style={{ color: "var(--gold-highlight)", background: "rgba(185,154,107,0.12)", border: "1px solid rgba(185,154,107,0.3)" }}>
              <Icon name="gear" size={22} weight={2} />
            </div>
            <div className="pop-tag">Save Preferences</div>
            <div className="pop-title">Apply these settings?</div>
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Language</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{lang}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Currency display</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{cur}</span>
              </div>
            </div>
            <button className="btn gold block" onClick={function () { setConfirmSave(false); props.onClose(); ctx.notify("Preferences saved — " + lang + " · " + cur); }}>
              Yes, Save
            </button>
            <button className="btn ghost block" style={{ marginTop: 8 }} onClick={function () { setConfirmSave(false); }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

/* ---------- News feed (full-screen overlay) ---------- */
function NewsSheet(props) {
  var CATS = ["ALL", "ANNOUNCEMENTS", "SYSTEM", "UPDATE", "PROMOTION"];
  var NEWS = [
    { id:1, cat:"UPDATE",        isNew:true,  date:"2026-06-16", title:"LONGRISE AI Performance Dashboard — New Metrics Available for Leader Accounts", body:"Advanced performance analytics are now available for all verified leader accounts. Real-time earnings breakdowns, team network insights, and referral tracking have been upgraded for the upcoming platform rollout. Access the enhanced dashboard from your profile." },
    { id:2, cat:"ANNOUNCEMENTS", isNew:true,  date:"2026-06-08", title:"LONGRISE AI Approaches 700,000 Members — A Global Community Like No Other", body:"LONGRISE AI is on the verge of reaching 700,000 registered members, marking an extraordinary chapter in the platform's history. This milestone reflects our global expansion efforts across 47 countries and six continents." },
    { id:3, cat:"ANNOUNCEMENTS", isNew:false, date:"2026-06-08", title:"LONGRISE AI Celebrates First Red Dragon Achievers — A Global Elite is Born", body:"LONGRISE AI proudly announces its first 12 Red Dragon achievers, representing the platform's most dedicated and accomplished partners. These pioneers have demonstrated exceptional commitment to building their global teams." },
    { id:4, cat:"ANNOUNCEMENTS", isNew:false, date:"2026-06-08", title:"LONGRISE AI Surpasses 400,000 Members — Global Expansion Reaches New Heights", body:"LONGRISE AI welcomes its 400,000th member, marking an extraordinary milestone just 14 months after launch. The platform continues to see accelerated growth across all major markets." },
  { id:5, cat:"SYSTEM",        isNew:false, date:"2026-05-20", title:"Wallet Batch Processing Notice", body:"Withdrawals are processed once daily at UTC 09:00. During maintenance, pending wallet requests may be delayed and will continue after maintenance completes." },
    { id:6, cat:"PROMOTION",     isNew:false, date:"2026-05-10", title:"Double ROI Event — May 15 to May 31", body:"All active members will receive double ROI distributions during the special promotion period. This event applies to all DRAGON package tiers. ROI calculations will be processed automatically — no action required from members." }
  ];

  var [cat, setCat] = React.useState("ALL");
  var [sel, setSel] = React.useState(null);

  var filtered = cat === "ALL" ? NEWS : NEWS.filter(function(n) { return n.cat === cat; });

  var overlayStyle = { position:"fixed", inset:0, background:"var(--bg-page)", zIndex:350, display:"flex", flexDirection:"column", overflowY:"hidden" };
  var headerStyle = { flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px 14px", borderBottom:"1px solid var(--border-card)" };
  var closeBtnStyle = { appearance:"none", background:"rgba(255,255,255,0.06)", border:"1px solid var(--border-card)", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-primary)", flexShrink:0 };

  if (sel) {
    return (
      <div style={overlayStyle}>
        <div style={headerStyle}>
          <button onClick={function(){ setSel(null); }}
            style={{ appearance:"none", background:"none", border:0, cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"var(--gold-highlight)", fontSize:14, fontWeight:800, letterSpacing:"0.06em", padding:0, textTransform:"uppercase" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <button onClick={props.onClose} style={closeBtnStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"22px 20px", display:"flex", flexDirection:"column", gap:18, WebkitOverflowScrolling:"touch" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <span style={{ fontSize:11.5, fontWeight:800, letterSpacing:"0.1em", padding:"4px 13px", borderRadius:20, background:"rgba(185,154,107,0.18)", color:"var(--gold-highlight)", textTransform:"uppercase" }}>{sel.cat}</span>
            {sel.isNew && <span style={{ fontSize:11.5, fontWeight:800, letterSpacing:"0.1em", padding:"4px 13px", borderRadius:20, background:"rgba(74,222,128,0.15)", color:"var(--green-success)" }}>NEW</span>}
            <span style={{ fontSize:13, color:"var(--text-secondary)", marginLeft:"auto" }}>{sel.date}</span>
          </div>
          <div style={{ fontSize:19, fontWeight:800, lineHeight:1.38, color:"var(--text-primary)" }}>{sel.title}</div>
          <div style={{ height:1, background:"var(--border-card)" }} />
          <p style={{ fontSize:15.5, color:"var(--text-secondary)", lineHeight:1.78, margin:0 }}>{sel.body}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle}>
      <div style={headerStyle}>
        <div>
          <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:"0.13em", color:"var(--gold-highlight)", textTransform:"uppercase", marginBottom:3 }}>News &amp; Updates</div>
          <div style={{ fontSize:22, fontWeight:800, color:"var(--text-primary)", letterSpacing:"0.01em" }}>News</div>
        </div>
        <button onClick={props.onClose} style={closeBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style={{ flexShrink:0, display:"flex", gap:8, overflowX:"auto", padding:"14px 20px 10px", WebkitOverflowScrolling:"touch" }}>
        {CATS.map(function(c) {
          var active = cat === c;
          return (
            <button key={c} onClick={function(){ setCat(c); }}
              style={{ flexShrink:0, appearance:"none", border:"1.5px solid "+(active ? "var(--gold-highlight)" : "var(--border-card)"), background:active ? "rgba(185,154,107,0.18)" : "transparent", color:active ? "var(--gold-highlight)" : "var(--text-secondary)", fontSize:12, fontWeight:700, letterSpacing:"0.07em", padding:"7px 16px", borderRadius:20, cursor:"pointer", textTransform:"uppercase", whiteSpace:"nowrap" }}>
              {c}
            </button>
          );
        })}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"6px 20px 32px", display:"flex", flexDirection:"column", gap:12, WebkitOverflowScrolling:"touch" }}>
        {filtered.map(function(n) {
          return (
            <button key={n.id} onClick={function(){ setSel(n); }}
              style={{ appearance:"none", background:"var(--surface-card)", border:"1px solid var(--border-card)", borderRadius:16, padding:"17px 18px", textAlign:"left", cursor:"pointer", display:"flex", flexDirection:"column", gap:11, width:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.09em", padding:"3px 11px", borderRadius:20, background:"rgba(185,154,107,0.15)", color:"var(--gold-highlight)", textTransform:"uppercase" }}>{n.cat}</span>
                {n.isNew && <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.09em", padding:"3px 11px", borderRadius:20, background:"rgba(74,222,128,0.15)", color:"var(--green-success)" }}>NEW</span>}
                <span style={{ fontSize:12, color:"var(--text-secondary)", marginLeft:"auto" }}>{n.date}</span>
              </div>
              <div style={{ fontSize:15.5, fontWeight:700, color:"var(--text-primary)", lineHeight:1.42 }}>{n.title}</div>
              <div style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.58, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{n.body}</div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", color:"var(--text-secondary)", fontSize:14, padding:"48px 0" }}>No articles in this category.</div>
        )}
      </div>
    </div>
  );
}

/* ---------- Alerts / notifications list ---------- */
function AlertsSheet(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA;
  const [items, setItems] = React.useState(D.alerts || []);
  const unread = items.filter(function (a) { return a.unread; }).length;

  const ICON = { ROI: "arrowDown", SECURITY: "shield", NOTICE: "alert" };

  return (
    <Sheet open onClose={props.onClose} title="Notifications">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="muted" style={{ fontSize: 12 }}>{unread} unread</span>
          {unread > 0 && (
            <button className="more" style={{ appearance: "none", background: "none", border: 0, color: "var(--gold-highlight)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
              onClick={function () { setItems(function (p) { return p.map(function (a) { return Object.assign({}, a, { unread: false }); }); }); ctx.notify("All marked as read"); }}>
              Mark all read
            </button>
          )}
        </div>
        <div className="rowlist">
          {items.map(function (a) {
            return (
              <RowItem key={a.id}
                lead={
                  <LeadDisc color={a.type === "SECURITY" ? "#f87171" : a.type === "ROI" ? "var(--green-success)" : "var(--gold-highlight)"}>
                    <Icon name={ICON[a.type] || "bell"} size={16} />
                  </LeadDisc>
                }
                title={
                  <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {a.title}
                    {a.unread && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-glow)", flex: "none" }}></span>}
                  </span>
                }
                sub={a.body + " · " + a.time}
                onClick={function () { setItems(function (p) { return p.map(function (x) { return x.id === a.id ? Object.assign({}, x, { unread: false }) : x; }); }); }} />
            );
          })}
        </div>
      </div>
    </Sheet>
  );
}

/* ---------- Credential change (trading password / withdrawal PIN) ---------- */
function CredentialSheet(props) {
  const ctx = React.useContext(AppCtx);
  const p = props.payload || {};
  const isPin = p.kind === "pin";
  const [step, setStep] = React.useState(0);
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [val, setVal] = React.useState("");
  const [val2, setVal2] = React.useState("");

  const otpFull = otp.join("").length === 6;
  const minLen = isPin ? 4 : 8;
  const valOk = val.length >= minLen && val === val2;

  return (
    <Sheet open onClose={props.onClose} title={p.title || "Update credential"}>
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ textAlign: "center" }}>
            <Eyebrow>Security requirement</Eyebrow>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Enter the 6-digit code from Google Authenticator</div>
          </div>
          <OtpInput value={otp} onChange={setOtp} />
          <Btn block disabled={!otpFull} onClick={function () { setStep(1); }}>Verify</Btn>
        </div>
      )}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label={isPin ? "New 4-digit PIN" : "New password"}
            type="password" inputMode={isPin ? "numeric" : undefined}
            value={val} onChange={function (v) { setVal(isPin ? v.replace(/\D/g, "").slice(0, 4) : v); }}
            placeholder={isPin ? "••••" : "At least 8 characters"} />
          <Field label={isPin ? "Confirm PIN" : "Confirm password"}
            type="password" inputMode={isPin ? "numeric" : undefined}
            value={val2} onChange={function (v) { setVal2(isPin ? v.replace(/\D/g, "").slice(0, 4) : v); }}
            placeholder="Re-enter to confirm" />
          {val2.length > 0 && val !== val2 && (
            <div className="red" style={{ fontSize: 12 }}>Entries do not match.</div>
          )}
          <Btn block disabled={!valOk} onClick={function () { setStep(2); }}>Update</Btn>
        </div>
      )}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <SuccessBlock title="Updated">
            Your {isPin ? "withdrawal PIN" : "trading password"} has been changed. Use it on your next withdrawal.
          </SuccessBlock>
          <Btn block onClick={function () { props.onClose(); ctx.notify((isPin ? "PIN" : "Password") + " updated"); }}>Done</Btn>
        </div>
      )}
    </Sheet>
  );
}

/* ---------- Router: renders the active utility sheet ---------- */
function UtilSheets(props) {
  const a = props.active;
  if (!a) return null;
  const onClose = props.onClose;
  switch (a.type) {
    case "support":    return <SupportSheet onClose={onClose} />;
    case "settings":   return <SettingsSheet onClose={onClose} />;
    case "news":       return <NewsSheet payload={a.payload} onClose={onClose} />;
    case "alerts":     return <AlertsSheet onClose={onClose} />;
    case "credential": return <CredentialSheet payload={a.payload} onClose={onClose} />;
    default: return null;
  }
}

Object.assign(window, { SupportSheet, SettingsSheet, NewsSheet, AlertsSheet, CredentialSheet, UtilSheets });


function NetworkPinGate(props) {
  var ctx = React.useContext(AppCtx);
  var _pin = React.useState(""), pin = _pin[0], setPin = _pin[1];
  var _err = React.useState(false), err = _err[0], setErr = _err[1];
  var _shk = React.useState(false), shake = _shk[0], setShake = _shk[1];
  function tap(k) {
    if (k === "DEL") { setPin(function(p) { return p.slice(0,-1); }); setErr(false); return; }
    if (pin.length >= 6) return;
    var next = pin + k;
    setPin(next);
    if (next.length === 6) {
      if (next === ctx.tradingPwd) { props.onSuccess(); }
      else { setShake(true); setErr(true); setTimeout(function() { setShake(false); setPin(""); setErr(false); }, 700); }
    }
  }
  var keys = ["1","2","3","4","5","6","7","8","9","","0","DEL"];
  return (
    <div style={{ position:"fixed", inset:0, background:"var(--bg-page)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:200, padding:"0 32px" }}>
      <button onClick={props.onBack} style={{ position:"absolute", top:20, left:16, background:"none", border:"none", color:"var(--text-secondary)", display:"flex", alignItems:"center", gap:4, cursor:"pointer", fontSize:14 }}>
        <Icon name="chevL" size={18} /> Back
      </button>
      <div style={{ width:54, height:54, borderRadius:16, background:"var(--surface-card)", border:"1px solid var(--border-card)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
        <Icon name="team" size={26} style={{ color:"var(--accent)" }} />
      </div>
      <div className="display" style={{ fontSize:20, fontWeight:700, color:"var(--text-primary)", marginBottom:6 }}>Network Access</div>
      <div className="muted" style={{ fontSize:13, textAlign:"center", marginBottom:36 }}>Enter your 6-digit trading password</div>
      <div style={{ display:"flex", gap:16, marginBottom:10 }}>
        {[0,1,2,3,4,5].map(function(i) {
          return <div key={i} style={{ width:16, height:16, borderRadius:"50%", transition:"background .15s, border-color .15s", background: pin.length > i ? (err ? "var(--red-alert)" : "var(--accent)") : "transparent", border:"2px solid "+(err ? "var(--red-alert)" : pin.length > i ? "var(--accent)" : "var(--line-gold-mid)") }} />;
        })}
      </div>
      <div style={{ height:22, marginBottom:20, fontSize:12, color:"var(--red-alert)", textAlign:"center" }}>{err ? "Incorrect password — try again" : " "}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 80px)", gap:12 }}>
        {keys.map(function(k, i) {
          if (k === "") return <div key={i} />;
          return (
            <button key={i} onClick={function() { tap(k); }}
              style={{ height:76, borderRadius:18, background: shake && err ? "rgba(239,68,68,0.10)" : "var(--surface-card)", border:"1.5px solid "+(shake && err ? "var(--red-alert)" : "var(--border-card)"), color:"var(--text-primary)", fontSize: k==="DEL" ? 20 : 26, fontWeight:600, cursor:"pointer", transition:"background .15s, border-color .15s" }}>
              {k === "DEL" ? "⌫" : k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
var DOC_SECTIONS = [
  { key: "introduction",    icon: "doc",    label: "Introduction" },
  { key: "getting-started", icon: "bolt",   label: "Getting Started" },
  { key: "user-guide",      icon: "team",   label: "User Guide" },
  { key: "faq",             icon: "shield", label: "FAQ" },
  { key: "overview",        icon: "doc",    label: "Overview" },
  { key: "guides",          icon: "invest", label: "Guides" },
  { key: "roadmap",         icon: "market", label: "Project Roadmap" },
  { key: "referral",        icon: "team",   label: "Referral Program" }
];

function VIPEntranceScreen({ onSuccess }) {
  var s = React.useState;
  var _sf = s(false), showForm = _sf[0], setShowForm = _sf[1];
  var _sd = s(false), showDocs = _sd[0], setShowDocs = _sd[1];
  var _as = s(null), activeSection = _as[0], setActiveSection = _as[1];
  var _tab = s("login"), activeTab = _tab[0], setActiveTab = _tab[1];
  var _le = s(""), loginEmail = _le[0], setLoginEmail = _le[1];
  var _lp = s(""), loginPw = _lp[0], setLoginPw = _lp[1];
  var _lps = s(false), showLoginPw = _lps[0], setShowLoginPw = _lps[1];
  var _lerr = s(""), loginErr = _lerr[0], setLoginErr = _lerr[1];
  var _se = s(""), signEmail = _se[0], setSignEmail = _se[1];
  var _cs = s(false), codeSent = _cs[0], setCodeSent = _cs[1];
  var _cv = s(false), codeVerified = _cv[0], setCodeVerified = _cv[1];
  var _vi = s(""), verifyInput = _vi[0], setVerifyInput = _vi[1];
  var _rc = s(""), refCode = _rc[0], setRefCode = _rc[1];
  var _sp = s(""), signPw = _sp[0], setSignPw = _sp[1];
  var _sps = s(false), showSignPw = _sps[0], setShowSignPw = _sps[1];
  var _sc = s(""), signPwConfirm = _sc[0], setSignPwConfirm = _sc[1];
  var _scs = s(false), showSignPwConfirm = _scs[0], setShowSignPwConfirm = _scs[1];
  var _ag = s(false), agreed = _ag[0], setAgreed = _ag[1];
  var _serr = s(""), signErr = _serr[0], setSignErr = _serr[1];
  var pwRules = [
    { label: "8 characters minimum", ok: signPw.length >= 8 },
    { label: "Uppercase and lowercase letters", ok: /[A-Z]/.test(signPw) && /[a-z]/.test(signPw) },
    { label: "Number and special character", ok: /[0-9]/.test(signPw) && /[^A-Za-z0-9]/.test(signPw) },
    { label: "Passwords match", ok: signPw.length > 0 && signPw === signPwConfirm }
  ];
  function doLogin() {
    if (!loginEmail || !loginPw) { setLoginErr("Please enter email and password."); return; }
    if (loginEmail.indexOf("@") < 0 || loginPw.length < 6) {
      setLoginErr("Invalid email or password."); return;
    }
    onSuccess();
  }
  function doSendCode() { if (signEmail) setCodeSent(true); }
  function doVerify() { if (verifyInput) setCodeVerified(true); }
  function doSignUp() {
    if (!signEmail || !signPw || !signPwConfirm) { setSignErr("Please fill in all fields."); return; }
    if (signPw !== signPwConfirm) { setSignErr("Passwords do not match."); return; }
    if (!agreed) { setSignErr("Please agree to the Terms of Service."); return; }
    onSuccess();
  }
  var D = window.LR_DATA;
  var STATS = [
    { label: "AUM",    value: "142M+", unit: "Managed" },
    { label: "GLOBAL", value: "840K+", unit: "Members" },
    { label: "PROFIT", value: "236%",  unit: "ROI Avg"  }
  ];
  var FEATURES = [
    { title: "Massive Exchange Synchronization", body: "Direct neural synchronization with Binance, Coinbase, KuCoin, and Coincheck. Every tick across global order books is ingested, processed, and mastered in milliseconds." },
    { title: "Tactical Pattern Recognition",     body: "Our V6 Core architecture continuously evolves by learning micro-pattern anomalies across disparate exchanges, identifying arbitrage and directional trend shifts before they manifest in market price." },
    { title: "Precision Execution Logic",        body: "Once a probabilistic edge is identified, the system deploys capital with institutional-grade risk management filters, ensuring maximum yield integrity while preserving capital sovereignty." }
  ];
  var TECH = [
    { title: "Neural AI Trading",      body: "Learns market patterns through neural networks, generating real-time trading signals unlike conventional algorithms." },
    { title: "High-Frequency Execution", body: "Ultra-low latency trading execution at microsecond speeds to capture optimal entry and exit points." },
    { title: "Risk Management System", body: "Aims for consistent profitability through automated stop-loss limits and position management." },
    { title: "Real-time Analytics",    body: "24/7 market analysis dashboard for transparent monitoring of all trading activities." }
  ];

  /* deterministic seeded particles — same render every time */
  var particles = React.useMemo(function () {
    var arr = []; var s = 1337;
    function r() { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xFFFFFFFF; }
    for (var i = 0; i < 20; i++) {
      arr.push({ left: (3 + r() * 94) + "%", topPct: r() * 110, size: (1.5 + r() * 3) + "px", delay: -(r() * 10) + "s", dur: (7 + r() * 9) + "s", op: 0.12 + r() * 0.45 });
    }
    return arr;
  }, []);

  /* ── DOCUMENTATION OVERLAY ── */
  if (showDocs) {
    /* Section content view */
    if (activeSection) {
      var sec = DOC_SECTIONS.find(function(x) { return x.key === activeSection; });
      return (
        <div className="vip-overlay" style={{ flexDirection: "column", background: "#0d0203", padding: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(201,146,42,0.14)", flexShrink: 0 }}>
            <button onClick={function () { setActiveSection(null); }}
              style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(201,146,42,0.25)", background: "rgba(60,8,8,0.60)", color: "#c9922a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="chevL" size={18} />
            </button>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", letterSpacing: "0.06em" }}>{sec ? sec.label.toUpperCase() : ""}</div>
          </div>
          {/* Placeholder content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "40px 28px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={sec ? sec.icon : "doc"} size={28} style={{ color: "var(--gold-base)" }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>{sec ? sec.label : ""}</div>
            <div style={{ fontSize: 13, color: "#9e8070", lineHeight: 1.7, maxWidth: 300 }}>Content for this section is being prepared.<br />Check back soon.</div>
            <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: "rgba(201,146,42,0.55)", letterSpacing: "0.14em" }}>COMING SOON</div>
          </div>
        </div>
      );
    }

    /* Sections list view */
    return (
      <div className="vip-overlay" style={{ flexDirection: "column", alignItems: "stretch", background: "#0d0203", padding: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 20px 14px", borderBottom: "1px solid rgba(201,146,42,0.14)", flexShrink: 0, position: "relative" }}>
          <button onClick={function () { setShowDocs(false); }}
            style={{ position: "absolute", left: 20, width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(201,146,42,0.25)", background: "rgba(60,8,8,0.60)", color: "#c9922a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="chevL" size={18} />
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#c9922a", marginBottom: 2 }}>LONGRISE AI</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", fontFamily: "var(--font-display)" }}>Documentation</div>
          </div>
        </div>

        {/* Gold divider line — centered */}
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #c9922a, transparent)", margin: "0 40px" }} />

        {/* Sections label — centered */}
        <div style={{ padding: "20px 20px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#c9922a" }}>SECTIONS</div>
        </div>

        {/* Section items — centered */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {DOC_SECTIONS.map(function(sec, i) {
            return (
              <button key={sec.key} onClick={function () { setActiveSection(sec.key); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "15px 20px", marginBottom: 8, background: "rgba(60,8,8,0.38)", border: "1px solid rgba(201,146,42," + (i === 0 ? "0.40)" : "0.16)"), borderRadius: 14, cursor: "pointer", transition: "border-color .15s, background .15s", position: "relative" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: i === 0 ? "linear-gradient(135deg,#c9922a,#8a6200)" : "rgba(201,146,42,0.10)", border: "1px solid rgba(201,146,42," + (i === 0 ? "0.6)" : "0.20)"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={sec.icon} size={16} style={{ color: i === 0 ? "#0d0203" : "#c9922a" }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? "#c9922a" : "#ffffff", letterSpacing: "0.08em" }}>{sec.label.toUpperCase()}</div>
                <Icon name="chevR" size={13} style={{ color: "rgba(201,146,42,0.40)", position: "absolute", right: 16 }} />
              </button>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: "16px 20px 28px", borderTop: "1px solid rgba(201,146,42,0.10)", flexShrink: 0 }}>
          <button className="vip-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 800, letterSpacing: "0.06em", padding: "15px" }} onClick={function () { setShowDocs(false); setShowForm(true); }}>
            <Icon name="bolt" size={15} style={{ marginRight: 8 }} /> START
          </button>
        </div>
      </div>
    );
  }

  /* ── LANDING SCREEN (4 sections) ── */
  if (!showForm) {
    return (
      <div className="vip-overlay" style={{ flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start", padding: 0, overflowY: "auto", background: "#0d0203" }}>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes lrFloatUp {
            0%   { transform: translateY(0) scale(1); opacity: var(--pop); }
            80%  { opacity: calc(var(--pop) * 0.6); }
            100% { transform: translateY(-110vh) scale(0.4); opacity: 0; }
          }
          @keyframes lrGlowPulse {
            0%,100% { text-shadow: 0 0 18px rgba(201,146,42,0.35); }
            50%     { text-shadow: 0 0 40px rgba(201,146,42,0.75), 0 0 80px rgba(201,146,42,0.20); }
          }
          @keyframes lrLogoFloat {
            0%,100% { transform: translateY(0px) scale(1); }
            50%     { transform: translateY(-9px) scale(1.04); }
          }
          @keyframes lrBrainRing {
            0%   { box-shadow: 0 0 0 0 rgba(201,146,42,0.55); }
            70%  { box-shadow: 0 0 0 22px rgba(201,146,42,0); }
            100% { box-shadow: 0 0 0 0 rgba(201,146,42,0); }
          }
          @keyframes lrFadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .lr-dot { position:absolute; border-radius:50%; background:rgba(201,146,42,0.7); pointer-events:none; animation: lrFloatUp linear infinite; }
          .lr-pkg-row { display:flex; gap:12px; overflow-x:auto; padding:4px 20px 16px; scroll-snap-type:x mandatory; -ms-overflow-style:none; scrollbar-width:none; }
          .lr-pkg-row::-webkit-scrollbar { display:none; }
          .lr-tech-card { background:rgba(74,10,10,0.40); border:1px solid rgba(201,146,42,0.20); border-radius:16px; padding:18px; margin-bottom:14px; animation: lrFadeUp 0.6s ease both; }
        `}} />

        {/* ======= SECTION 1 : HERO ======= */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 28px 60px", textAlign: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 85% 65% at 50% 20%, #4a0a0a 0%, #1e0505 50%, #0d0203 100%)" }}>

          {/* floating gold particles */}
          {particles.map(function (p, i) {
            return <div key={i} className="lr-dot" style={{ left: p.left, top: p.topPct + "%", width: p.size, height: p.size, "--pop": p.op, animationDelay: p.delay, animationDuration: p.dur }} />;
          })}

          <img src={window.LR_IMG("iconGold")} alt="LONGRISE" style={{ width: 84, height: 84, marginBottom: 22, animation: "lrLogoFloat 4s ease-in-out infinite", position: "relative", zIndex: 1 }} />

          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.26em", color: "#c9922a", marginBottom: 12, position: "relative", zIndex: 1 }}>AI-POWERED</div>

          <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", lineHeight: 1.06, marginBottom: 8, fontFamily: "var(--font-display)", letterSpacing: "-0.01em", position: "relative", zIndex: 1, animation: "lrGlowPulse 3.5s ease-in-out infinite" }}>
            Passive Income
          </div>

          <div style={{ fontSize: 13, color: "#9e8070", lineHeight: 1.8, marginBottom: 38, position: "relative", zIndex: 1 }}>
            Wealth Starts Automatically<br />24/7 Automated Trading &amp; Rewards Platform
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, width: "100%", marginBottom: 40, position: "relative", zIndex: 1 }}>
            {STATS.map(function (st) {
              return (
                <div key={st.label} style={{ background: "rgba(74,10,10,0.65)", border: "1px solid rgba(201,146,42,0.30)", borderRadius: 16, padding: "16px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", color: "#c9922a", marginBottom: 5 }}>{st.label}</div>
                  <div style={{ width: 22, height: 2, background: "#c9922a", margin: "0 auto 8px", borderRadius: 1 }} />
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>{st.value}</div>
                </div>
              );
            })}
          </div>

          {/* CTA buttons */}
          <button className="vip-btn-primary" style={{ width: "100%", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", padding: "17px", marginBottom: 12, position: "relative", zIndex: 1 }} onClick={function () { setShowForm(true); }}>
            <Icon name="bolt" size={16} style={{ marginRight: 8 }} /> START
          </button>
          <button onClick={function () { setShowDocs(true); setActiveSection(null); }} style={{ width: "100%", padding: "14px", border: "1.5px solid rgba(201,146,42,0.38)", borderRadius: 14, background: "none", color: "#c9922a", fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", cursor: "pointer", position: "relative", zIndex: 1 }}>
            What is LONGRISE AI?
          </button>

          {/* scroll hint */}
          <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.45, zIndex: 1 }}>
            <div style={{ fontSize: 8.5, color: "#9e8070", letterSpacing: "0.14em" }}>SCROLL</div>
            <div style={{ width: 1, height: 22, background: "rgba(201,146,42,0.6)" }} />
          </div>
        </section>

        {/* ======= SECTION 2 : PACKAGES ======= */}
        <section style={{ padding: "64px 0 56px", background: "rgba(8,1,1,0.70)" }}>
          <div style={{ textAlign: "center", marginBottom: 32, padding: "0 28px" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.24em", color: "#c9922a", marginBottom: 10 }}>INVESTMENT PLANS</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", fontFamily: "var(--font-display)", lineHeight: 1.15 }}>Dragon Wealth Packages</div>
            <div style={{ width: 52, height: 2, background: "linear-gradient(90deg, transparent, #c9922a, transparent)", margin: "14px auto 0" }} />
          </div>

          {/* 2-column grid for standard packages */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 20px" }}>
            {D.packages.filter(function(p) { return !p.featured; }).map(function (p) {
              return (
                <div key={p.id} style={{ background: "rgba(74,10,10,0.60)", border: "1px solid rgba(201,146,42,0.24)", borderRadius: 18, padding: "20px 14px 18px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: "#ffffff", marginBottom: 3, letterSpacing: "0.06em" }}>{p.name}</div>
                  <div style={{ fontSize: 8.5, color: "#9e8070", letterSpacing: "0.10em", marginBottom: 14 }}>{p.term.toUpperCase()}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", marginBottom: 2 }}>{p.min.toLocaleString()}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: "#c9922a", letterSpacing: "0.14em", marginBottom: 14 }}>USDT · ENTRY</div>
                  <div style={{ width: "100%", height: 1, background: "rgba(201,146,42,0.18)", marginBottom: 14 }} />
                  <div style={{ fontSize: 8.5, color: "#9e8070", marginBottom: 4 }}>ROI</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#10b981" }}>{p.roi}</div>
                </div>
              );
            })}
          </div>
          {/* VIP — full width featured card */}
          {D.packages.filter(function(p) { return p.featured; }).map(function (p) {
            return (
              <div key={p.id} style={{ margin: "12px 20px 0", background: "linear-gradient(135deg, rgba(100,20,10,0.85) 0%, rgba(60,10,5,0.90) 100%)", border: "1.5px solid rgba(201,146,42,0.70)", borderRadius: 18, padding: "22px 22px 20px", position: "relative", overflow: "hidden" }}>
                {/* gold shimmer line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #c9922a, transparent)" }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff", letterSpacing: "0.06em", marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 9, color: "#9e8070", letterSpacing: "0.10em", marginBottom: 14 }}>{p.term.toUpperCase()}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 2 }}>{p.min.toLocaleString()}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#c9922a", letterSpacing: "0.14em" }}>USDT · ENTRY</div>
                  </div>
                  <div style={{ textAlign: "right", paddingTop: 4 }}>
                    <div style={{ display: "inline-block", background: "#c9922a", color: "#0d0203", fontSize: 8.5, fontWeight: 900, letterSpacing: "0.12em", padding: "3px 11px", borderRadius: 20, marginBottom: 10 }}>POPULAR</div>
                    <div style={{ fontSize: 9, color: "#9e8070", marginBottom: 4 }}>ROI</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#10b981", lineHeight: 1 }}>{p.roi}</div>
                    <div style={{ fontSize: 9, color: "#9e8070", marginTop: 8 }}>{p.note}</div>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ textAlign: "center", marginTop: 24, padding: "0 28px" }}>
            <button onClick={function () { setShowForm(true); }} className="vip-btn-primary" style={{ padding: "14px 44px", fontSize: 14, fontWeight: 800, letterSpacing: "0.06em" }}>
              Select Now
            </button>
          </div>
        </section>

        {/* ======= SECTION 3 : NEURAL CORE ======= */}
        <section style={{ padding: "64px 28px 60px", background: "radial-gradient(ellipse 90% 60% at 85% 50%, #3d0a0a 0%, #0d0203 65%)" }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", color: "#c9922a", marginBottom: 14 }}>GLOBAL EXCHANGE INTEGRATION</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", lineHeight: 1.18, marginBottom: 4, fontFamily: "var(--font-display)" }}>Neural Adaptation to</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#c9922a", lineHeight: 1.18, marginBottom: 36, fontFamily: "var(--font-display)", fontStyle: "italic" }}>Global Liquidity.</div>
          {FEATURES.map(function (f, i) {
            return (
              <div key={i} style={{ marginBottom: 28, paddingLeft: 16, borderLeft: "2px solid rgba(201,146,42,0.35)" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#9e8070", lineHeight: 1.68 }}>{f.body}</div>
              </div>
            );
          })}
        </section>

        {/* ======= SECTION 4 : AI TECH STACK ======= */}
        <section style={{ padding: "64px 28px 100px", background: "linear-gradient(180deg, #0d0203 0%, #100303 100%)" }}>
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <div style={{ fontSize: 21, fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 1.3 }}>LONGRISE AI<br />Technology Stack</div>
            <div style={{ width: 52, height: 2, background: "linear-gradient(90deg, transparent, #c9922a, transparent)", margin: "14px auto 0" }} />
          </div>

          {/* Pulsing brain icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 38 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(74,10,10,0.85)", border: "2px solid rgba(201,146,42,0.40)", display: "flex", alignItems: "center", justifyContent: "center", animation: "lrBrainRing 2.2s ease-in-out infinite" }}>
              <Icon name="invest" size={46} style={{ color: "#c9922a" }} />
            </div>
          </div>

          {/* Tech feature cards */}
          {TECH.map(function (tc, i) {
            return (
              <div key={i} className="lr-tech-card" style={{ animationDelay: (i * 0.12) + "s" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#c9922a", marginBottom: 8 }}>{tc.title}</div>
                <div style={{ fontSize: 13, color: "#9e8070", lineHeight: 1.65 }}>{tc.body}</div>
              </div>
            );
          })}

          {/* Final CTA */}
          <div style={{ marginTop: 44 }}>
            <button className="vip-btn-primary" style={{ width: "100%", fontSize: 16, fontWeight: 800, padding: "17px", letterSpacing: "0.06em" }} onClick={function () { setShowForm(true); }}>
              <Icon name="bolt" size={16} style={{ marginRight: 8 }} /> START
            </button>
            <div style={{ fontSize: 11, color: "#9e8070", marginTop: 14, textAlign: "center", opacity: 0.65 }}>
              Secure access · Your LONGRISE account awaits
            </div>
          </div>
        </section>

      </div>
    );
  }

  /* ── LOGIN / SIGN UP FORM (full-screen accessible) ── */
  var INP = { width: "100%", height: 62, fontSize: 16, padding: "0 20px", background: "rgba(60,8,8,0.70)", border: "1.5px solid rgba(201,146,42,0.28)", borderRadius: 16, color: "#fff8f0", outline: "none", boxSizing: "border-box", display: "block" };
  var PWINP = Object.assign({}, INP, { paddingRight: 84 });
  var PWBTN = { position: "absolute", right: 10, top: 10, height: 42, minWidth: 64, border: "1px solid rgba(201,146,42,0.32)", borderRadius: 12, background: "rgba(13,2,3,0.78)", color: "#c9922a", fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", cursor: "pointer" };
  var LBL = { fontSize: 13, fontWeight: 700, color: "#9e8070", letterSpacing: "0.10em", marginBottom: 10, display: "block" };
  var FLD = { marginBottom: 22 };
  return (
    <div className="vip-overlay" style={{ flexDirection: "column", alignItems: "stretch", padding: 0, background: "#0d0203" }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "center", padding: "16px 20px 14px", borderBottom: "1px solid rgba(201,146,42,0.14)", flexShrink: 0 }}>
        <button onClick={function () { setShowForm(false); setLoginErr(""); setSignErr(""); }}
          style={{ height: 44, padding: "0 14px", background: "rgba(60,8,8,0.60)", border: "1px solid rgba(201,146,42,0.22)", borderRadius: 12, color: "#c9922a", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
          <Icon name="chevL" size={18} /> Back
        </button>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={function () { setShowForm(false); setLoginErr(""); setSignErr(""); }}>
          <img src={window.LR_IMG("iconGold")} alt="LONGRISE" style={{ width: 34, height: 34, marginBottom: 4 }} />
          <span className="lr-wordmark" style={{ fontSize: 16 }}>LONG<em>RISE</em></span>
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* ── Tab switcher ── */}
      <div style={{ display: "flex", margin: "24px 24px 0", background: "rgba(60,8,8,0.55)", border: "1px solid rgba(201,146,42,0.18)", borderRadius: 18, padding: 5, flexShrink: 0 }}>
        <button onClick={function () { setActiveTab("login"); setLoginErr(""); }}
          style={{ flex: 1, height: 52, borderRadius: 13, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", transition: "all .2s",
            background: activeTab === "login" ? "#c9922a" : "none",
            color:      activeTab === "login" ? "#0d0203"  : "#9e8070" }}>
          LOGIN
        </button>
        <button onClick={function () { setActiveTab("signup"); setSignErr(""); }}
          style={{ flex: 1, height: 52, borderRadius: 13, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", transition: "all .2s",
            background: activeTab === "signup" ? "#c9922a" : "none",
            color:      activeTab === "signup" ? "#0d0203"  : "#9e8070" }}>
          SIGN UP
        </button>
      </div>

      {/* ── Form body (scrollable) ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px 48px" }}>

        {activeTab === "login" ? (
          <div>
            <div style={FLD}>
              <label style={LBL}>EMAIL ADDRESS</label>
              <input style={INP} type="email" placeholder="you@longrise.ai" value={loginEmail}
                onChange={function (e) { setLoginEmail(e.target.value); setLoginErr(""); }} />
            </div>
            <div style={FLD}>
              <label style={LBL}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input style={PWINP} type={showLoginPw ? "text" : "password"} placeholder="Enter your password" value={loginPw}
                  onChange={function (e) { setLoginPw(e.target.value); setLoginErr(""); }} />
                <button type="button" style={PWBTN} onClick={function () { setShowLoginPw(!showLoginPw); }}>
                  {showLoginPw ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            {loginErr && <div style={{ color: "#ef4444", fontSize: 14, marginBottom: 16, padding: "12px 16px", background: "rgba(239,68,68,0.10)", borderRadius: 12 }}>{loginErr}</div>}
            <button onClick={doLogin}
              style={{ width: "100%", height: 64, background: "#c9922a", border: "none", borderRadius: 18, color: "#0d0203", fontSize: 17, fontWeight: 900, letterSpacing: "0.08em", cursor: "pointer", marginTop: 8 }}>
              LOGIN
            </button>
          </div>

        ) : (
          <div>
            <div style={FLD}>
              <label style={LBL}>EMAIL ADDRESS</label>
              <input style={Object.assign({}, INP, { marginBottom: 10 })} type="email" placeholder="you@longrise.ai" value={signEmail}
                onChange={function (e) { setSignEmail(e.target.value); setCodeSent(false); setCodeVerified(false); }} />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button style={{ flex: 1, height: 48, background: "rgba(60,8,8,0.60)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: 13, color: "#9e8070", fontSize: 13, fontWeight: 700, cursor: "pointer" }} onClick={function () {}}>Check Duplicate</button>
                <button style={{ flex: 1, height: 48, background: "rgba(201,146,42,0.18)", border: "1px solid rgba(201,146,42,0.45)", borderRadius: 13, color: "#c9922a", fontSize: 13, fontWeight: 700, cursor: "pointer" }} onClick={doSendCode}>Send Code</button>
              </div>
            </div>
            <div style={FLD}>
              <label style={LBL}>VERIFICATION CODE</label>
              <input style={INP} type="text" inputMode="numeric" placeholder="6-digit code" value={verifyInput}
                onChange={function (e) { setVerifyInput(e.target.value); }} />
              {codeVerified
                ? <div style={{ color: "#10b981", fontSize: 14, marginTop: 10, fontWeight: 700 }}>{String.fromCharCode(10003)} Email verified</div>
                : <button style={{ width: "100%", height: 52, background: "rgba(60,8,8,0.60)", border: "1px solid rgba(201,146,42,0.30)", borderRadius: 14, color: "#c9922a", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 10 }} onClick={doVerify}>Verify Code</button>
              }
            </div>
            <div style={FLD}>
              <label style={LBL}>REFERRAL CODE <span style={{ color: "#5a4030", fontWeight: 600 }}>(OPTIONAL)</span></label>
              <input style={INP} type="text" placeholder="Enter referral code" value={refCode}
                onChange={function (e) { setRefCode(e.target.value); }} />
            </div>
            <div style={FLD}>
              <label style={LBL}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input style={PWINP} type={showSignPw ? "text" : "password"} placeholder="Create a strong password" value={signPw}
                  onChange={function (e) { setSignPw(e.target.value); }} />
                <button type="button" style={PWBTN} onClick={function () { setShowSignPw(!showSignPw); }}>
                  {showSignPw ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            <div style={FLD}>
              <label style={LBL}>CONFIRM PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input style={PWINP} type={showSignPwConfirm ? "text" : "password"} placeholder="Re-enter your password" value={signPwConfirm}
                  onChange={function (e) { setSignPwConfirm(e.target.value); }} />
                <button type="button" style={PWBTN} onClick={function () { setShowSignPwConfirm(!showSignPwConfirm); }}>
                  {showSignPwConfirm ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            {/* Password rules */}
            <div style={{ background: "rgba(60,8,8,0.50)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 14, padding: "14px 16px", marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9e8070", letterSpacing: "0.12em", marginBottom: 10 }}>PASSWORD RULES</div>
              {pwRules.map(function (r, i) {
                return <div key={i} style={{ fontSize: 13, color: r.ok ? "#10b981" : "#5a4030", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15 }}>{r.ok ? String.fromCharCode(10003) : String.fromCharCode(8226)}</span> {r.label}
                </div>;
              })}
            </div>
            {/* Agreement */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 24, cursor: "pointer" }}>
              <input type="checkbox" checked={agreed} onChange={function (e) { setAgreed(e.target.checked); }}
                style={{ width: 22, height: 22, marginTop: 2, accentColor: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "#9e8070", lineHeight: 1.6 }}>
                I agree to the <a href="#" style={{ color: "#c9922a" }}>Terms of Service</a> and <a href="#" style={{ color: "#c9922a" }}>Privacy Policy</a>.
              </span>
            </label>
            {signErr && <div style={{ color: "#ef4444", fontSize: 14, marginBottom: 16, padding: "12px 16px", background: "rgba(239,68,68,0.10)", borderRadius: 12 }}>{signErr}</div>}
            <button onClick={doSignUp}
              style={{ width: "100%", height: 64, background: "#c9922a", border: "none", borderRadius: 18, color: "#0d0203", fontSize: 17, fontWeight: 900, letterSpacing: "0.08em", cursor: "pointer" }}>
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
/* LONGRISE Mobile — app shell: tabs, context, login overlays, tweaks */
const TWEAK_DEFAULTS = {
  "goldMode": "restrained",
  "motion": true,
  "liveDemo": true,
  "userState": "new",
  "showNotice": true
};

/* Bottom-nav tabs. `key` is the internal route id; `label` is the displayed
   (interim) term. Terminology will be unified later — see Glossary.html.
   PLANS=plans catalog, NETWORK=referral/team, EARN=earning dashboard,
   WALLET=funds, ALL=full menu hub (replaces any sidebar/drawer). */
const LR_TABS = [
  { key: "PLANS",   label: "Plans",   icon: "invest" },
  { key: "NETWORK", label: "Network", icon: "team" },
  { key: "EARN",    label: "Earn",    icon: "home" },
  { key: "WALLET",  label: "Wallet",  icon: "wallet" },];

/* MOCK ONLY: standalone preview starts as an authenticated session.
   Do not copy this bypass into production authentication logic.
   QA fixture account: dragon88@gmail.com / Dragon88@ */
const MOCK_PREAUTH = true;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const D = window.LR_DATA;

  const [tab, setTab] = React.useState("EARN");
  const [myOpen, setMyOpen] = React.useState(false);
  const [startHere, setStartHere] = React.useState(false);
  const [bal, setBal] = React.useState(D.balances);
  const [portfolio, setPortfolio] = React.useState(D.portfolio);
  const [history, setHistory] = React.useState(D.history);
  const [toasts, setToasts] = React.useState([]);
  const [walletFlow, setWalletFlow] = React.useState({ flow: null, nonce: 0 });
  const [util, setUtil] = React.useState(null); // utility sheet: {type, payload}
  const [tradingPwd, setTradingPwd] = React.useState(null);
  const [networkLocked, setNetworkLocked] = React.useState(false);
  const [fabOpen, setFabOpen] = React.useState(false);

  /* Login overlay sequence: consent → (important notice) → (start-here nudge) → done */
  const [intro, setIntro] = React.useState(MOCK_PREAUTH ? null : "auth");

  function notify(msg) {
    const id = Date.now() + Math.random();
    setToasts(function (prev) { return prev.concat([{ id: id, msg: msg }]); });
    setTimeout(function () {
      setToasts(function (prev) { return prev.filter(function (x) { return x.id !== id; }); });
    }, 2600);
  }

  function addHistory(h) {
    setHistory(function (prev) {
      return [Object.assign({ id: "h" + Date.now(), date: "Jun 13, now" }, h)].concat(prev);
    });
  }

  function goTab(next, opts) {
    if (next === "NETWORK" && tradingPwd) { setNetworkLocked(true); } else { setNetworkLocked(false); }
    setTab(next);
    setMyOpen(false);
    setStartHere(false);
    if (next === "WALLET" && opts && opts.open) {
      setWalletFlow(function (w) { return { flow: opts.open, nonce: w.nonce + 1 }; });
    }
  }

  /* Sign out — reset session back to the consent gate (logged-out state). */
  function signOut() {
    setUtil(null);
    setMyOpen(false);
    setStartHere(false);
    setTab("EARN");
    setNetworkLocked(false);
    setIntro("auth");
    notify("Signed out");
  }

  /* After VIP Entrance auth: skip consent, go to starthere or main. */
  function afterAuth() {
    setIntro("consent");
  }

  function afterConsent() {
    var D = window.LR_DATA;
    if (D.importantNotice) { setIntro("notice"); return; }
    if (t.userState === "new") { setIntro("starthere"); return; }
    setIntro(null);
  }

  function afterNotice() {
    if (t.userState === "new") { setIntro("starthere"); return; }
    setIntro(null);
  }

  const ctxValue = {
    bal: bal, setBal: setBal,
    portfolio: portfolio, setPortfolio: setPortfolio,
    history: history, addHistory: addHistory,
    notify: notify, goTab: goTab,
    openStartHere: function () { setMyOpen(false); setStartHere(true); },
    openSheet: function (type, payload) { setUtil({ type: type, payload: payload }); },
    signOut: signOut,
    tradingPwd: tradingPwd,
    setTradingPwd: setTradingPwd,
    motionOn: t.motion,
    liveOn: t.liveDemo
  };

  return (
    <AppCtx.Provider value={ctxValue}>
      <div className="lr-stage">
        <div className="lr-app" data-gold={t.goldMode} data-motion={t.motion ? "on" : "off"}>

          {/* Header */}
          <header className="lr-header">
            <div className="lr-brandmark" onClick={function () { goTab("EARN"); }} style={{ cursor: "pointer" }}>
              <img src={window.LR_IMG("iconGold")} alt="LONGRISE" />
              <span className="lr-wordmark">LONG<em>RISE</em></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button className="iconbtn" aria-label="Notifications" onClick={function () { setUtil({ type: "alerts" }); }}>
                <Icon name="bell" size={20} />
              </button>
              <button className="avatar" aria-label="My profile" onClick={function () { setMyOpen(true); }}>
                {D.user.initials}
              </button>
            </div>
          </header>

          {/* Active screen */}
          {tab === "EARN" && <HomeScreen />}
          {tab === "PLANS" && <InvestScreen />}
          {tab === "NETWORK" && !networkLocked && <TeamScreen />}
          {tab === "NETWORK" && networkLocked && <NetworkPinGate onSuccess={function() { setNetworkLocked(false); }} onBack={function() { setNetworkLocked(false); setTab("EARN"); }} />}
          {tab === "WALLET" && <WalletScreen initialFlow={walletFlow.flow} flowNonce={walletFlow.nonce} />}

          {/* MY overlay */}
          {myOpen && <MyPage onClose={function () { setMyOpen(false); }} />}

          {/* START HERE in-app guide */}
          {startHere && <StartHerePage onClose={function () { setStartHere(false); }} />}

          {/* Utility sheets (support / settings / news / alerts / credential) */}
          <UtilSheets active={util} onClose={function () { setUtil(null); }} />

          {/* Bottom nav */}
          <nav className="lr-nav">
            {LR_TABS.map(function (item) {
              return (
                <button key={item.key}
                  className={tab === item.key ? "active" : ""}
                  onClick={function () { goTab(item.key); }}>
                  <Icon name={item.icon} size={21} weight={tab === item.key ? 2 : 1.6} />
                  {item.label}
                  <span className="nav-dot"></span>
                </button>
              );
            })}
          </nav>

          {/* Toasts */}
          <div className="toast-host">
            {toasts.map(function (x) {
              return (
                <div key={x.id} className="toast">
                  <Icon name="check" size={14} style={{ color: "var(--gold-glow)" }} />
                  {x.msg}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ===== Floating Action Buttons ===== */}
      {!intro && (
        <div style={{ position: "fixed", bottom: 92, right: 16, zIndex: 1200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>

          {/* Expanded: AI Chat + Telegram */}
          {fabOpen && (
            <React.Fragment>

              {/* 1:1 AI Chat */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "fab-in .22s cubic-bezier(.34,1.56,.64,1)" }}>
                <div style={{ background: "rgba(10,2,2,0.82)", backdropFilter: "blur(10px)", color: "#e8d5b0", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", padding: "6px 13px", borderRadius: 20, border: "1px solid rgba(201,146,42,0.22)", whiteSpace: "nowrap" }}>1:1 AI Chat</div>
                <button onClick={function () { setFabOpen(false); setUtil({ type: "support" }); }}
                  style={{ width: 50, height: 50, borderRadius: "50%", border: "1.5px solid rgba(201,80,60,0.5)", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg,#7f1d1d,#450a0a)", boxShadow: "0 4px 18px rgba(127,29,29,0.65)" }}>
                  {/* Chat bubble with lightning — AI chat */}
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4v13c0 1.1.9 2 2 2h3l3 3 3-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="rgba(255,255,255,0.92)"/>
                    <path d="M13.5 7.5l-2.5 4h3l-2.5 5" stroke="#7f1d1d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Telegram */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "fab-in .16s cubic-bezier(.34,1.56,.64,1)" }}>
                <div style={{ background: "rgba(10,2,2,0.82)", backdropFilter: "blur(10px)", color: "#e8d5b0", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", padding: "6px 13px", borderRadius: 20, border: "1px solid rgba(201,146,42,0.22)", whiteSpace: "nowrap" }}>Telegram</div>
                <button onClick={function () { setFabOpen(false); notify("Telegram channel opening…"); }}
                  style={{ width: 50, height: 50, borderRadius: "50%", border: "1.5px solid rgba(0,136,204,0.45)", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg,#0369a1,#0c4a6e)", boxShadow: "0 4px 18px rgba(3,105,161,0.60)" }}>
                  {/* Official Telegram logo shape */}
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(255,255,255,0.12)"/>
                    <path d="M17.5 7L5.5 11.5l3.8 1.4 1.5 4.6 2.2-2.2 3.3 2.4L17.5 7z" fill="white"/>
                    <path d="M9.3 12.9l.5 3.6 1.5-1.5" fill="white" opacity="0.7"/>
                  </svg>
                </button>
              </div>

            </React.Fragment>
          )}

          {/* Main toggle — chat bubble icon */}
          <button onClick={function () { setFabOpen(!fabOpen); }}
            style={{ width: 52, height: 52, borderRadius: "50%", border: "1.5px solid rgba(201,146,42," + (fabOpen ? "0.5)" : "0.25)"), cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: fabOpen ? "linear-gradient(145deg,#1a0505,#0d0203)" : "linear-gradient(145deg,#991b1b,#5c0a0a)", boxShadow: fabOpen ? "0 2px 10px rgba(0,0,0,0.5)" : "0 4px 20px rgba(153,27,27,0.55)", transition: "background .25s ease, box-shadow .25s ease, border-color .25s ease", opacity: 0.93 }}>
            {fabOpen
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/></svg>
              : <svg width="23" height="23" viewBox="0 0 24 24" fill="none"><path d="M21 15c0 1.1-.9 2-2 2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z" fill="rgba(255,255,255,0.92)"/><circle cx="9" cy="10" r="1" fill="#991b1b"/><circle cx="12" cy="10" r="1" fill="#991b1b"/><circle cx="15" cy="10" r="1" fill="#991b1b"/></svg>
            }
          </button>

        </div>
      )}

      {/* ===== Auth / Login overlays (outside lr-app — avoids overflow:hidden clip) ===== */}
      {intro === "auth" && <VIPEntranceScreen onSuccess={afterAuth} />}
      {intro === "consent" && <ConsentGate onAgree={afterConsent} />}
      {intro === "notice" && D.importantNotice &&
        <ImportantNoticePopup notice={D.importantNotice} onClose={afterNotice} />}
      {intro === "starthere" &&
        <StartHereNudge onClose={function () { setIntro(null); }} />}

    </AppCtx.Provider>
  );
}

export default App;
