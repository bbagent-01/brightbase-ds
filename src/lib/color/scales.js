import chroma from 'chroma-js';

/**
 * Generate a 10-step color scale from a single hex value.
 * Uses Oklch color space for perceptual uniformity.
 * Steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
 * 500 is closest to the input color.
 */
export function generateScale(hex) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  // Create a scale from white → input color → near-black
  // Using oklch for perceptual uniformity
  const lightScale = chroma.scale(['#ffffff', hex]).mode('oklch').colors(7);
  const darkScale = chroma.scale([hex, '#0a0a0a']).mode('oklch').colors(7);

  // Map to our 11 steps
  const colors = {
    50: lightScale[1],   // very light
    100: lightScale[2],  // light
    200: lightScale[3],  // lighter
    300: lightScale[4],  // light-mid
    400: lightScale[5],  // mid-light
    500: hex,            // base (input color)
    600: darkScale[1],   // mid-dark
    700: darkScale[2],   // darker
    800: darkScale[3],   // dark
    900: darkScale[4],   // very dark
    950: darkScale[5],   // near-black
  };

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
