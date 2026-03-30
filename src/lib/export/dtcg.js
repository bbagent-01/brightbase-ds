/**
 * Convert flat token store to W3C DTCG JSON format.
 * https://www.designtokens.org/
 */
export function generateDTCG(state) {
  const { foundationColors, scales, semantic, typography, spacing, borders } = state;
  const tokens = {};

  // Color foundations
  tokens.color = { foundation: {}, scale: {}, semantic: {} };

  for (const [name, hex] of Object.entries(foundationColors)) {
    tokens.color.foundation[name] = { $value: hex, $type: 'color' };
  }

  // Color scales
  for (const [key, hex] of Object.entries(scales)) {
    const [name, step] = key.split('-');
    if (!tokens.color.scale[name]) tokens.color.scale[name] = {};
    tokens.color.scale[name][step] = { $value: hex, $type: 'color' };
  }

  // Semantic tokens with references
  for (const [name, ref] of Object.entries(semantic)) {
    const [colorName, step] = ref.split('-');
    tokens.color.semantic[name] = {
      $value: `{color.scale.${colorName}.${step}}`,
      $type: 'color',
    };
  }

  // Typography
  tokens.typography = {
    headingFont: { $value: typography.headingFont, $type: 'fontFamily' },
    bodyFont: { $value: typography.bodyFont, $type: 'fontFamily' },
    monoFont: { $value: typography.monoFont, $type: 'fontFamily' },
    baseSize: { $value: `${typography.baseSize}px`, $type: 'dimension' },
    headingWeight: { $value: typography.headingWeight, $type: 'fontWeight' },
    bodyWeight: { $value: typography.bodyWeight, $type: 'fontWeight' },
    lineHeight: { $value: typography.lineHeight, $type: 'number' },
    headingLineHeight: { $value: typography.headingLineHeight, $type: 'number' },
  };

  // Spacing
  tokens.spacing = {
    base: { $value: `${spacing.base}px`, $type: 'dimension' },
    sectionPadding: { $value: `${spacing.sectionPadding}px`, $type: 'dimension' },
    containerPadding: { $value: `${spacing.containerPadding}px`, $type: 'dimension' },
    componentGap: { $value: `${spacing.componentGap}px`, $type: 'dimension' },
    maxWidth: { $value: `${spacing.maxWidth}px`, $type: 'dimension' },
  };

  // Borders
  tokens.borders = {
    radius: { $value: `${borders.radius}px`, $type: 'dimension' },
    buttonRadius: { $value: `${borders.buttonRadius}px`, $type: 'dimension' },
    shadow: { $value: borders.shadow, $type: 'shadow' },
  };

  return tokens;
}
