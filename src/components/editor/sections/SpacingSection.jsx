"use client";

import useTokenStore from '@/lib/tokens/store';
import SliderControl from '../controls/SliderControl';

export default function SpacingSection() {
  const spacing = useTokenStore((s) => s.spacing);
  const setSpacing = useTokenStore((s) => s.setSpacing);

  return (
    <div className="space-y-3">
      <SliderControl
        label="Base Unit"
        value={spacing.base}
        min={2} max={12} step={1} unit="px"
        onChange={(v) => setSpacing('base', v)}
      />
      <SliderControl
        label="Section Padding"
        value={spacing.sectionPadding}
        min={20} max={160} step={4} unit="px"
        onChange={(v) => setSpacing('sectionPadding', v)}
      />
      <SliderControl
        label="Container Padding"
        value={spacing.containerPadding}
        min={8} max={64} step={4} unit="px"
        onChange={(v) => setSpacing('containerPadding', v)}
      />
      <SliderControl
        label="Component Gap"
        value={spacing.componentGap}
        min={4} max={48} step={4} unit="px"
        onChange={(v) => setSpacing('componentGap', v)}
      />
      <SliderControl
        label="Max Width"
        value={spacing.maxWidth}
        min={800} max={1600} step={50} unit="px"
        onChange={(v) => setSpacing('maxWidth', v)}
      />

      {/* Derived scale preview */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Scale Preview
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4, 6, 8, 12, 16].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-editor-text-muted w-6 text-right">{i}</span>
              <div
                className="h-2 bg-editor-accent rounded-sm"
                style={{ width: `${spacing.base * i}px` }}
              />
              <span className="text-[9px] font-mono text-editor-text-muted">{spacing.base * i}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
