import chroma from 'chroma-js';

/**
 * Get WCAG contrast ratio between two colors.
 * Returns a number >= 1 (higher = more contrast).
 */
export function getContrastRatio(hex1, hex2) {
  try {
    return chroma.contrast(hex1, hex2);
  } catch {
    return 1;
  }
}

/**
 * Get WCAG compliance level for a contrast ratio.
 * Returns 'AAA', 'AA', 'FAIL' for normal text.
 */
export function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'FAIL';
}

/**
 * Get contrast info between two hex colors.
 */
export function getContrastInfo(fg, bg) {
  const ratio = getContrastRatio(fg, bg);
  return {
    ratio: Math.round(ratio * 100) / 100,
    level: getWCAGLevel(ratio),
  };
}
