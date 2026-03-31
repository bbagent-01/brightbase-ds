"use client";

import useTokenStore from '@/lib/tokens/store';
import ScaleStepPicker from '../controls/ScaleStepPicker';

const VARIANTS = ['primary', 'secondary', 'ghost', 'destructive'];
const TOKEN_KEYS = [
  { key: 'bg', label: 'Background' },
  { key: 'hover', label: 'Hover' },
  { key: 'text', label: 'Text' },
  { key: 'border', label: 'Border' },
];

export default function ButtonStyleSection() {
  const buttonTokens = useTokenStore((s) => s.buttonTokens);
  const setButtonToken = useTokenStore((s) => s.setButtonToken);

  return (
    <div className="space-y-4">
      {VARIANTS.map((variant) => {
        const tokens = buttonTokens[variant];
        if (!tokens) return null;
        return (
          <div key={variant}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted capitalize">
                {variant}
              </div>
              {/* Mini preview button */}
              <button
                className={`bb-btn bb-btn-${variant} bb-btn-sm`}
                style={{ fontSize: '10px', padding: '3px 8px', pointerEvents: 'none' }}
              >
                {variant}
              </button>
            </div>
            <div className="space-y-1">
              {TOKEN_KEYS.map(({ key, label }) => {
                const ref = tokens[key];
                // Skip picker for transparent/null values — show a toggle-like control
                if (ref === 'transparent' || ref === null) {
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded border border-editor-border bg-editor-bg flex items-center justify-center">
                        <span className="text-[8px] text-editor-text-muted">—</span>
                      </div>
                      <span className="text-[10px] font-mono text-editor-text-muted flex-1">{label}</span>
                      <button
                        onClick={() => setButtonToken(variant, key, 'neutral-500')}
                        className="text-[9px] text-editor-accent hover:text-editor-accent-hover"
                      >
                        Set
                      </button>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex items-center gap-2">
                    <ScaleStepPicker
                      currentRef={ref}
                      onSelect={(newRef) => setButtonToken(variant, key, newRef)}
                    />
                    <span className="text-[10px] font-mono text-editor-text flex-1">{label}</span>
                    {key === 'bg' || key === 'border' ? (
                      <button
                        onClick={() => setButtonToken(variant, key, key === 'bg' ? 'transparent' : null)}
                        className="text-[9px] text-editor-text-muted hover:text-red-400"
                        title={key === 'bg' ? 'Set transparent' : 'Remove border'}
                      >
                        ✕
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
