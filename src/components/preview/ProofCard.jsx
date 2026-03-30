"use client";

/**
 * Proof-of-concept Card component.
 * Uses ONLY --bb-* CSS variables — zero hardcoded values.
 * Validates that the token cascade works for container components.
 */
export default function ProofCard({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bb-bg-card)',
        border: '1px solid var(--bb-border-default)',
        borderRadius: 'var(--bb-radius)',
        padding: 'var(--bb-space-6)',
        boxShadow: 'var(--bb-shadow)',
        fontFamily: 'var(--bb-font-body)',
      }}
    >
      {title && (
        <h3
          style={{
            fontFamily: 'var(--bb-font-heading)',
            fontWeight: 'var(--bb-heading-weight)',
            fontSize: 'var(--bb-text-lg)',
            color: 'var(--bb-text-primary)',
            lineHeight: 'var(--bb-heading-line-height)',
            margin: '0 0 var(--bb-space-2) 0',
          }}
        >
          {title}
        </h3>
      )}
      <div
        style={{
          fontSize: 'var(--bb-text-sm)',
          color: 'var(--bb-text-secondary)',
          lineHeight: 'var(--bb-line-height)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
