"use client";

export default function FontSelect({ label, value, options, onChange }) {
  return (
    <div className="mb-3">
      <label className="text-xs text-editor-text-muted block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-editor-bg border border-editor-border rounded px-2 py-1.5 text-sm text-editor-text outline-none focus:border-editor-accent"
        style={{ fontFamily: value }}
      >
        {options.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}
