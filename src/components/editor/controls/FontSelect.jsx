"use client";

import { useState, useRef, useEffect } from 'react';

const PANGRAM = 'The Quick Brown Fox Jumps Over The Lazy Dog';
const PANGRAM_LOWER = 'The quick brown fox jumps over the lazy dog';

export default function FontSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="mb-3 relative" ref={ref}>
      <label className="text-xs text-editor-text-muted block mb-1">{label}</label>

      {/* Selected font display */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-editor-bg border border-editor-border rounded-lg px-3 py-2 text-left outline-none focus:border-editor-accent hover:border-editor-text-muted transition-colors overflow-hidden"
      >
        <div
          className="text-lg text-editor-text leading-tight whitespace-nowrap overflow-hidden"
          style={{ fontFamily: value }}
        >
          {PANGRAM}
        </div>
        <div
          className="text-[9px] text-editor-text-muted mt-0.5 whitespace-nowrap overflow-hidden"
          style={{ fontFamily: value }}
        >
          {value} — {PANGRAM_LOWER}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-editor-bg border border-editor-border rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {options.map((font) => (
            <button
              key={font}
              onClick={() => { onChange(font); setOpen(false); }}
              className={`w-full text-left px-3 py-3 hover:bg-editor-surface transition-colors border-b border-editor-border last:border-0 overflow-hidden ${
                value === font ? 'bg-editor-surface' : ''
              }`}
            >
              <div
                className="text-lg text-editor-text leading-tight whitespace-nowrap overflow-hidden"
                style={{ fontFamily: font }}
              >
                {PANGRAM}
              </div>
              <div
                className="text-xs text-editor-text-muted mt-1 whitespace-nowrap overflow-hidden"
                style={{ fontFamily: font }}
              >
                {font} — {PANGRAM_LOWER}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
