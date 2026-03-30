"use client";

import useTokenStore from '@/lib/tokens/store';
import SliderControl from '../controls/SliderControl';

const SHADOW_OPTIONS = ['none', 'subtle', 'medium', 'strong'];

export default function BorderSection() {
  const borders = useTokenStore((s) => s.borders);
  const setBorders = useTokenStore((s) => s.setBorders);

  return (
    <div className="space-y-3">
      <SliderControl
        label="Base Radius"
        value={borders.radius}
        min={0} max={24} step={1} unit="px"
        onChange={(v) => setBorders('radius', v)}
      />
      <SliderControl
        label="Container Radius"
        value={borders.containerRadius}
        min={0} max={32} step={1} unit="px"
        onChange={(v) => setBorders('containerRadius', v)}
      />
      <SliderControl
        label="Card Radius"
        value={borders.cardRadius}
        min={0} max={32} step={1} unit="px"
        onChange={(v) => setBorders('cardRadius', v)}
      />
      <SliderControl
        label="Button Radius"
        value={borders.buttonRadius}
        min={0} max={100} step={1} unit="px"
        onChange={(v) => setBorders('buttonRadius', v)}
      />
      <SliderControl
        label="Input Radius"
        value={borders.inputRadius}
        min={0} max={24} step={1} unit="px"
        onChange={(v) => setBorders('inputRadius', v)}
      />
      <div>
        <label className="text-xs text-editor-text-muted block mb-1">Shadow</label>
        <div className="flex gap-1">
          {SHADOW_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setBorders('shadow', opt)}
              className={`text-[10px] px-2 py-1 rounded capitalize transition-colors ${
                borders.shadow === opt
                  ? 'bg-editor-accent text-white'
                  : 'bg-editor-bg text-editor-text-muted border border-editor-border hover:text-editor-text'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mt-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-editor-text-muted mb-2">
          Preview
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <div
            className="w-20 h-14 bg-editor-bg border border-editor-border flex items-center justify-center text-[8px] text-editor-text-muted"
            style={{ borderRadius: `${borders.containerRadius}px` }}
          >
            Container
          </div>
          <div
            className="w-14 h-10 bg-editor-bg border border-editor-border flex items-center justify-center text-[8px] text-editor-text-muted"
            style={{ borderRadius: `${borders.cardRadius}px` }}
          >
            Card
          </div>
          <div
            className="px-3 py-1.5 bg-editor-accent text-white text-[10px] font-medium"
            style={{ borderRadius: `${borders.buttonRadius}px` }}
          >
            Button
          </div>
          <div
            className="px-2.5 py-1 bg-editor-bg border border-editor-border text-[10px] text-editor-text-muted"
            style={{ borderRadius: `${borders.inputRadius}px` }}
          >
            Input
          </div>
        </div>
      </div>
    </div>
  );
}
