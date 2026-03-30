"use client";

import { useState } from 'react';
import useTokenStore from '@/lib/tokens/store';
import ColorPicker from '../controls/ColorPicker';
import ScaleStepPicker from '../controls/ScaleStepPicker';
import { getContrastInfo } from '@/lib/color/contrast';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Pairs to check contrast on (text token, bg token)
const CONTRAST_PAIRS = [
  ['text-primary', 'bg-primary'],
  ['text-secondary', 'bg-primary'],
  ['text-on-action', 'action-primary'],
];

export default function ColorSection() {
  const foundationColors = useTokenStore((s) => s.foundationColors);
  const scales = useTokenStore((s) => s.scales);
  const semantic = useTokenStore((s) => s.semantic);
  const setFoundationColor = useTokenStore((s) => s.setFoundationColor);
  const addFoundationColor = useTokenStore((s) => s.addFoundationColor);
  const removeFoundationColor = useTokenStore((s) => s.removeFoundationColor);
  const setSemanticRef = useTokenStore((s) => s.setSemanticRef);

  const [newColorName, setNewColorName] = useState('');

  const protectedColors = ['primary', 'neutral', 'dark'];

  return (
    <div className="space-y-5">
      {/* Foundation Colors */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Foundation
        </div>
        <div className="space-y-2">
          {Object.entries(foundationColors).map(([name, hex]) => (
            <ColorPicker
              key={name}
              label={name}
              value={hex}
              onChange={(v) => setFoundationColor(name, v)}
              onRemove={protectedColors.includes(name) ? null : () => removeFoundationColor(name)}
            />
          ))}
        </div>
        {/* Add color */}
        <div className="flex gap-1 mt-2">
          <input
            type="text"
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))}
            placeholder="color name"
            className="flex-1 bg-editor-bg border border-editor-border rounded px-2 py-1 text-xs text-editor-text outline-none focus:border-editor-accent"
          />
          <button
            onClick={() => {
              if (newColorName && !foundationColors[newColorName]) {
                addFoundationColor(newColorName, '#6366f1');
                setNewColorName('');
              }
            }}
            className="bg-editor-accent text-white text-xs px-2 py-1 rounded hover:bg-editor-accent-hover transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Generated Scales */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Scales
        </div>
        <div className="space-y-2">
          {Object.keys(foundationColors).map((name) => (
            <div key={name}>
              <div className="text-[9px] font-mono text-editor-text-muted mb-0.5">{name}</div>
              <div className="flex gap-px rounded overflow-hidden">
                {STEPS.map((step) => {
                  const hex = scales[`${name}-${step}`];
                  return (
                    <div
                      key={step}
                      className="flex-1 h-5"
                      style={{ backgroundColor: hex }}
                      title={`${name}-${step}: ${hex}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Assignments */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Semantic Tokens
        </div>
        <div className="space-y-1.5">
          {Object.entries(semantic).map(([name, ref]) => {
            // Check if this is a text token that has a contrast pair
            const pair = CONTRAST_PAIRS.find(([fg]) => fg === name);
            let contrastInfo = null;
            if (pair) {
              const fgHex = scales[semantic[pair[0]]] || '#000';
              const bgHex = scales[semantic[pair[1]]] || '#fff';
              contrastInfo = getContrastInfo(fgHex, bgHex);
            }

            return (
              <div key={name} className="flex items-center gap-2">
                <ScaleStepPicker
                  currentRef={ref}
                  onSelect={(key) => setSemanticRef(name, key)}
                />
                <span className="text-[10px] font-mono text-editor-text flex-1 truncate">{name}</span>
                {contrastInfo && (
                  <span
                    className={`text-[9px] font-mono px-1 py-0.5 rounded ${
                      contrastInfo.level === 'AAA' ? 'bg-green-900/40 text-green-400' :
                      contrastInfo.level === 'AA' ? 'bg-yellow-900/40 text-yellow-400' :
                      'bg-red-900/40 text-red-400'
                    }`}
                    title={`Contrast ratio: ${contrastInfo.ratio}:1`}
                  >
                    {contrastInfo.ratio} {contrastInfo.level}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
