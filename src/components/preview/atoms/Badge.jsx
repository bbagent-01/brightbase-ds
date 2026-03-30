"use client";

export default function Badge({ children, variant = 'primary' }) {
  return (
    <span className={`bb-badge bb-badge-${variant}`}>
      {children}
    </span>
  );
}
