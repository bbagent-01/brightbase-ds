"use client";

import { useState, useRef, useEffect } from 'react';
import useTokenStore from '@/lib/tokens/store';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export default function ScaleStepPicker({ currentRef, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const scales = useTokenStore((s) => s.scales);
  const foundationColors = useTokenStore((s) => s.foundationColors);

  const currentHex = scales[currentRef] || '#ff00ff';

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
    <div className="relative" ref={ref}>
      {/* Trigger swatch */}
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 rounded border border-editor-border cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: currentHex }}
        title={`${currentRef} → ${currentHex}`}
      />

      {/* Popup */}
      {open && (
        <div className="absolute z-50 top-9 left-0 bg-editor-bg border border-editor-border rounded-lg shadow-xl p-3 w-64 max-h-72 overflow-y-auto">
          {Object.keys(foundationColors).map((name) => (
            <div key={name} className="mb-2">
              <div className="text-[9px] font-mono uppercase text-editor-text-muted mb-1 tracking-wider">
                {name}
              </div>
              <div className="flex gap-0.5 flex-wrap">
                {STEPS.map((step) => {
                  const key = `${name}-${step}`;
                  const hex = scales[key];
                  if (!hex) return null;
                  const isActive = currentRef === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { onSelect(key); setOpen(false); }}
                      className={`w-5 h-5 rounded-sm border transition-transform hover:scale-125 ${
                        isActive ? 'border-white scale-110 ring-1 ring-editor-accent' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={`${key}: ${hex}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
