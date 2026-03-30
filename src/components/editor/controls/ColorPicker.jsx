"use client";

export default function ColorPicker({ label, value, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-editor-text capitalize">{label}</div>
        <div className="text-[10px] font-mono text-editor-text-muted uppercase">{value}</div>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 text-editor-text-muted hover:text-red-400 text-xs transition-opacity"
          title="Remove color"
        >
          ✕
        </button>
      )}
    </div>
  );
}
