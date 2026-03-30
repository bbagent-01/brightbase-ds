import chroma from 'chroma-js';

/**
 * Generate an 11-step color scale from a single hex value.
 * Uses Oklch color space for perceptual uniformity.
 * Steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
 * 500 is the input color. 50 is near-white, 950 is near-black.
 *
 * The light side (50-400) interpolates from near-white down to just above the input.
 * The dark side (600-950) interpolates from just below the input down to near-black.
 * This ensures monotonically decreasing lightness regardless of how dark the input is.
 */
export function generateScale(hex) {
  const base = chroma(hex);
  const [baseL, baseC, baseH] = base.oklch();

  // Clamp base lightness to a sane range
  const L = Math.max(0.05, Math.min(0.95, baseL || 0.5));
  const h = baseH || 0;
  const c = baseC || 0;

  // Light side: distribute evenly from 0.97 down to just above L
  const lightSteps = [50, 100, 200, 300, 400];
  const lightTop = 0.97;
  const lightBottom = L + (lightTop - L) * 0.08; // slightly above base

  // Dark side: distribute evenly from just below L down to 0.08
  const darkSteps = [600, 700, 800, 900, 950];
  const darkTop = L - (L - 0.08) * 0.08; // slightly below base
  const darkBottom = 0.08;

  const colors = {};

  // Light steps
  lightSteps.forEach((step, i) => {
    const t = i / (lightSteps.length - 1); // 0 to 1
    const targetL = lightTop - t * (lightTop - lightBottom);

    // Desaturate toward white
    const chromaScale = 0.15 + (t * 0.85);
    const adjustedC = c * chromaScale;

    try {
      colors[step] = chroma.oklch(targetL, adjustedC, h).hex();
    } catch {
      colors[step] = chroma.mix('#ffffff', hex, t * 0.8, 'oklch').hex();
    }
  });

  // Base (500)
  colors[500] = hex;

  // Dark steps
  darkSteps.forEach((step, i) => {
    const t = i / (darkSteps.length - 1); // 0 to 1
    const targetL = darkTop - t * (darkTop - darkBottom);

    // Moderate desaturation toward black
    const chromaScale = 1 - (t * 0.6);
    const adjustedC = c * chromaScale;

    try {
      colors[step] = chroma.oklch(targetL, adjustedC, h).hex();
    } catch {
      colors[step] = chroma.mix(hex, '#0a0a0a', t, 'oklch').hex();
    }
  });

  return colors;
}

/**
 * Generate all scales from a foundation colors map.
 * Returns flat map: { 'primary-50': '#...', 'primary-100': '#...', ... }
 */
export function generateAllScales(foundationColors) {
  const scales = {};

  for (const [name, hex] of Object.entries(foundationColors)) {
    const scale = generateScale(hex);
    for (const [step, color] of Object.entries(scale)) {
      scales[`${name}-${step}`] = color;
    }
  }

  return scales;
}
