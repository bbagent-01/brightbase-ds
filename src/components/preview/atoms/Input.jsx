"use client";

export default function Input({
  label,
  placeholder,
  type = 'text',
  error,
  hint,
  textarea = false,
}) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="bb-input-group">
      {label && <label className="bb-input-label">{label}</label>}
      <Tag
        type={textarea ? undefined : type}
        placeholder={placeholder}
        className={`bb-input ${textarea ? 'bb-textarea' : ''} ${error ? 'bb-input-error' : ''}`}
      />
      {error && <span className="bb-input-error-msg">{error}</span>}
      {hint && !error && <span className="bb-input-hint">{hint}</span>}
    </div>
  );
}
