"use client";

import { useState } from 'react';

export default function Toggle({ defaultChecked = false, label }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bb-space-2)' }}>
      <button
        className="bb-toggle"
        data-checked={checked}
        onClick={() => setChecked(!checked)}
        role="switch"
        aria-checked={checked}
      />
      {label && (
        <span style={{
          fontFamily: 'var(--bb-font-body)',
          fontSize: 'var(--bb-text-sm)',
          color: 'var(--bb-text-primary)',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}
