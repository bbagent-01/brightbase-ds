"use client";

export default function Button({ children, variant = 'primary', size = 'md', disabled = false }) {
  return (
    <button
      className={`bb-btn bb-btn-${variant} bb-btn-${size}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
