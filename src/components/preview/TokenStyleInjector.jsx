"use client";

import { useEffect } from 'react';
import useTokenStore from '@/lib/tokens/store';
import { TYPE_SCALE, SHADOW_PRESETS } from '@/lib/tokens/defaults';

/**
 * Bridge between Zustand store and CSS custom properties.
 * Injects a <style> tag with all --bb-* variables.
 * Preview components read these vars — no React re-render needed downstream.
 */
export default function TokenStyleInjector() {
  const scales = useTokenStore((s) => s.scales);
  const semantic = useTokenStore((s) => s.semantic);
  const typography = useTokenStore((s) => s.typography);
  const spacing = useTokenStore((s) => s.spacing);
  const borders = useTokenStore((s) => s.borders);
  const gradients = useTokenStore((s) => s.gradients);
  const elementGradients = useTokenStore((s) => s.elementGradients);
  const buttonTokens = useTokenStore((s) => s.buttonTokens);

  useEffect(() => {
    const lines = [':root {'];

    // Scale colors (option tokens)
    for (const [key, hex] of Object.entries(scales)) {
      lines.push(`  --bb-scale-${key}: ${hex};`);
    }

    // Semantic colors (resolved to final values)
    for (const [name, ref] of Object.entries(semantic)) {
      const resolved = scales[ref] || '#ff00ff';
      lines.push(`  --bb-${name}: ${resolved};`);
    }

    // Typography
    lines.push(`  --bb-font-heading: '${typography.headingFont}', sans-serif;`);
    lines.push(`  --bb-font-body: '${typography.bodyFont}', sans-serif;`);
    lines.push(`  --bb-font-mono: '${typography.monoFont}', monospace;`);
    lines.push(`  --bb-text-base: ${typography.baseSize}px;`);
    lines.push(`  --bb-heading-weight: ${typography.headingWeight};`);
    lines.push(`  --bb-body-weight: ${typography.bodyWeight};`);
    lines.push(`  --bb-line-height: ${typography.lineHeight};`);
    lines.push(`  --bb-heading-line-height: ${typography.headingLineHeight};`);
    lines.push(`  --bb-tracking-eyebrow: ${typography.eyebrowTracking ?? 0.1}em;`);
    lines.push(`  --bb-tracking-heading: ${typography.headingTracking ?? -0.02}em;`);
    lines.push(`  --bb-tracking-body: ${typography.bodyTracking ?? 0}em;`);

    // Type scale (derived from base size)
    for (const [name, ratio] of Object.entries(TYPE_SCALE)) {
      lines.push(`  --bb-text-${name}: ${Math.round(typography.baseSize * ratio)}px;`);
    }

    // Spacing
    lines.push(`  --bb-space-base: ${spacing.base}px;`);
    for (let i = 1; i <= 16; i++) {
      lines.push(`  --bb-space-${i}: ${spacing.base * i}px;`);
    }
    lines.push(`  --bb-section-padding: ${spacing.sectionPadding}px;`);
    lines.push(`  --bb-container-padding: ${spacing.containerPadding}px;`);
    lines.push(`  --bb-component-gap: ${spacing.componentGap}px;`);
    lines.push(`  --bb-max-width: ${spacing.maxWidth}px;`);

    // Borders & shadows (derived from base radius × multiplier)
    const r = borders.radius;
    lines.push(`  --bb-radius: ${r}px;`);
    lines.push(`  --bb-card-radius: ${Math.round(r * (borders.cardMult || 1.5))}px;`);
    lines.push(`  --bb-container-radius: ${Math.round(r * (borders.containerMult || 2))}px;`);
    lines.push(`  --bb-button-radius: ${Math.round(r * (borders.buttonMult || 0.75))}px;`);
    lines.push(`  --bb-input-radius: ${Math.round(r * (borders.inputMult || 0.75))}px;`);
    lines.push(`  --bb-shadow: ${SHADOW_PRESETS[borders.shadow] || 'none'};`);

    // Gradients (resolve scale refs to hex)
    if (gradients) {
      for (const [name, grad] of Object.entries(gradients)) {
        const resolvedStops = grad.stops.map((ref) => scales[ref] || '#ff00ff');
        lines.push(`  --bb-${name}: linear-gradient(${grad.angle}deg, ${resolvedStops.join(', ')});`);
      }
    }

    // Element gradients (only emit when set)
    if (elementGradients) {
      for (const [el, gradName] of Object.entries(elementGradients)) {
        if (gradName && gradients[gradName]) {
          const grad = gradients[gradName];
          const resolvedStops = grad.stops.map((ref) => scales[ref] || '#ff00ff');
          lines.push(`  --bb-${el}-gradient: linear-gradient(${grad.angle}deg, ${resolvedStops.join(', ')});`);
        }
      }
    }

    // Button component tokens
    if (buttonTokens) {
      const resolve = (ref) => {
        if (!ref || ref === 'transparent') return ref || 'transparent';
        if (scales[ref]) return scales[ref];
        const semRef = semantic[ref];
        if (semRef && scales[semRef]) return scales[semRef];
        return ref;
      };
      for (const [variant, tokens] of Object.entries(buttonTokens)) {
        lines.push(`  --bb-btn-${variant}-bg: ${resolve(tokens.bg)};`);
        lines.push(`  --bb-btn-${variant}-hover: ${resolve(tokens.hover)};`);
        lines.push(`  --bb-btn-${variant}-text: ${resolve(tokens.text)};`);
        lines.push(`  --bb-btn-${variant}-border: ${tokens.border ? '1px solid ' + resolve(tokens.border) : 'none'};`);
      }
    }

    lines.push('}');

    // Inject or update style tag
    let styleEl = document.getElementById('bb-token-vars');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'bb-token-vars';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = lines.join('\n');

    return () => {
      // Don't remove on unmount — persist until page unload
    };
  }, [scales, semantic, typography, spacing, borders, gradients, elementGradients, buttonTokens]);

  return null;
}
