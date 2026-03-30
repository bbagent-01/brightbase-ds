"use client";

import { useState } from 'react';
import useTokenStore from '@/lib/tokens/store';
import ScaleStepPicker from '../controls/ScaleStepPicker';
import { getContrastInfo } from '@/lib/color/contrast';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Pairs to check contrast on (text token, bg token)
const CONTRAST_PAIRS = [
  ['text-primary', 'bg-primary'],
  ['text-secondary', 'bg-primary'],
  ['text-on-action', 'action-primary'],
];

// Group semantic tokens by category for display
const SEMANTIC_GROUPS = [
  { label: 'Backgrounds', keys: ['bg-primary', 'bg-surface', 'bg-card'] },
  { label: 'Text', keys: ['text-primary', 'text-secondary', 'text-on-action'] },
  { label: 'Actions', keys: ['action-primary', 'action-primary-hover', 'action-secondary', 'action-secondary-hover', 'action-destructive', 'action-destructive-hover'] },
  { label: 'Borders', keys: ['border-default', 'border-faint', 'border-focus'] },
  { label: 'Feedback', keys: ['feedback-success', 'feedback-error'] },
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
      {/* Foundation Colors — large swatches */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Foundation
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(foundationColors).map(([name, hex]) => (
            <div key={name} className="relative group">
              <div className="relative">
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => setFoundationColor(name, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="w-full h-16 rounded-lg border border-editor-border cursor-pointer"
                  style={{ backgroundColor: hex }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <div className="text-[10px] text-editor-text capitalize leading-tight">{name}</div>
                  <div className="text-[9px] font-mono text-editor-text-muted uppercase">{hex}</div>
                </div>
                {!protectedColors.includes(name) && (
                  <button
                    onClick={() => removeFoundationColor(name)}
                    className="opacity-0 group-hover:opacity-100 text-editor-text-muted hover:text-red-400 text-xs transition-opacity"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Add color */}
        <div className="flex gap-1 mt-3">
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

      {/* Semantic Assignments — grouped by category */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Semantic Tokens
        </div>
        <div className="space-y-3">
          {SEMANTIC_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="text-[9px] font-mono text-editor-text-muted/60 uppercase tracking-wider mb-1.5">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.keys.filter((k) => semantic[k]).map((name) => {
                  const ref = semantic[name];
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
          ))}
        </div>
      </div>
    </div>
  );
}
