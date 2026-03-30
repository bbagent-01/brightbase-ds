"use client";

import useTokenStore from '@/lib/tokens/store';
import FontSelect from '../controls/FontSelect';
import SliderControl from '../controls/SliderControl';
import { FONT_OPTIONS, MONO_FONT_OPTIONS } from '@/lib/tokens/defaults';

export default function TypographySection() {
  const typography = useTokenStore((s) => s.typography);
  const setTypography = useTokenStore((s) => s.setTypography);

  return (
    <div className="space-y-3">
      <FontSelect
        label="Heading Font"
        value={typography.headingFont}
        options={FONT_OPTIONS}
        onChange={(v) => setTypography('headingFont', v)}
      />
      <FontSelect
        label="Body Font"
        value={typography.bodyFont}
        options={FONT_OPTIONS}
        onChange={(v) => setTypography('bodyFont', v)}
      />
      <FontSelect
        label="Mono Font"
        value={typography.monoFont}
        options={MONO_FONT_OPTIONS}
        onChange={(v) => setTypography('monoFont', v)}
      />
      <SliderControl
        label="Base Size"
        value={typography.baseSize}
        min={12} max={22} step={1} unit="px"
        onChange={(v) => setTypography('baseSize', v)}
      />
      <SliderControl
        label="Heading Weight"
        value={typography.headingWeight}
        min={300} max={800} step={100}
        onChange={(v) => setTypography('headingWeight', v)}
      />
      <SliderControl
        label="Body Line Height"
        value={typography.lineHeight}
        min={1.2} max={2.0} step={0.1}
        onChange={(v) => setTypography('lineHeight', v)}
      />
      <SliderControl
        label="Heading Line Height"
        value={typography.headingLineHeight}
        min={1.0} max={1.6} step={0.05}
        onChange={(v) => setTypography('headingLineHeight', v)}
      />
    </div>
  );
}
