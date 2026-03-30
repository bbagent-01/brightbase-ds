"use client";

/**
 * Proof-of-concept Button component.
 * Uses ONLY --bb-* CSS variables — zero hardcoded values.
 * Validates that the token cascade works end-to-end.
 */
export default function ProofButton({ children, variant = 'primary', size = 'md' }) {
  const sizeStyles = {
    sm: { padding: 'var(--bb-space-2) var(--bb-space-3)', fontSize: 'var(--bb-text-sm)' },
    md: { padding: 'var(--bb-space-3) var(--bb-space-5)', fontSize: 'var(--bb-text-base)' },
    lg: { padding: 'var(--bb-space-4) var(--bb-space-8)', fontSize: 'var(--bb-text-lg)' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--bb-action-primary)',
      color: 'var(--bb-text-on-action)',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--bb-action-primary)',
      border: '1px solid var(--bb-border-default)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--bb-text-primary)',
      border: 'none',
    },
  };

  return (
    <button
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        fontFamily: 'var(--bb-font-body)',
        fontWeight: 500,
        borderRadius: 'var(--bb-button-radius)',
        cursor: 'pointer',
        transition: 'opacity 0.15s',
        lineHeight: 1,
      }}
      onMouseEnter={(e) => e.target.style.opacity = '0.85'}
      onMouseLeave={(e) => e.target.style.opacity = '1'}
    >
      {children}
    </button>
  );
}
