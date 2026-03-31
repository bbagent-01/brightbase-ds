"use client";

import useTokenStore from '@/lib/tokens/store';

const ELEMENTS = [
  { key: 'card', label: 'Card Background' },
  { key: 'container', label: 'Container Background' },
];

export default function ElementStyleSection() {
  const gradients = useTokenStore((s) => s.gradients);
  const elementGradients = useTokenStore((s) => s.elementGradients);
  const setElementGradient = useTokenStore((s) => s.setElementGradient);
  const scales = useTokenStore((s) => s.scales);

  const gradientNames = Object.keys(gradients || {});

  return (
    <div className="space-y-3">
      {ELEMENTS.map(({ key, label }) => {
        const current = elementGradients?.[key] || null;
        // Show gradient swatch preview
        let swatchStyle = {};
        if (current && gradients[current]) {
          const grad = gradients[current];
          const resolvedStops = grad.stops.map((ref) => scales[ref] || '#ff00ff');
          swatchStyle = { background: `linear-gradient(${grad.angle}deg, ${resolvedStops.join(', ')})` };
        }

        return (
          <div key={key}>
            <label className="text-[10px] text-editor-text-muted block mb-1">{label}</label>
            <div className="flex items-center gap-2">
              {current && (
                <div className="w-7 h-5 rounded border border-editor-border" style={swatchStyle} />
              )}
              <select
                value={current || ''}
                onChange={(e) => setElementGradient(key, e.target.value || null)}
                className="flex-1 bg-editor-bg border border-editor-border rounded px-2 py-1 text-[10px] text-editor-text outline-none focus:border-editor-accent"
              >
                <option value="">None (solid color)</option>
                {gradientNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        );
      })}
      <div className="text-[9px] text-editor-text-muted mt-2">
        Apply gradients to element backgrounds. When set, the gradient overrides the solid semantic color.
      </div>
    </div>
  );
}
