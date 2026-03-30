"use client";

export default function SliderControl({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-editor-text-muted">{label}</label>
        <span className="text-xs font-mono text-editor-text">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
