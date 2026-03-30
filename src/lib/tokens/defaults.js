/**
 * Default token values — Brightbase theme.
 * Flat key-value maps — simple to work with in UI.
 * DTCG conversion happens only on export.
 */

export const DEFAULT_FOUNDATION_COLORS = {
  primary: '#FE4E18',
  secondary: '#34474E',
  accent: '#e8e4dd',
  neutral: '#6b7280',
  dark: '#0D1E24',
};

export const DEFAULT_SEMANTIC = {
  // Backgrounds
  'bg-primary': 'accent-50',
  'bg-surface': 'accent-100',
  'bg-card': 'accent-50',
  // Text
  'text-primary': 'dark-900',
  'text-secondary': 'secondary-700',
  'text-on-action': 'accent-50',
  // Actions
  'action-primary': 'primary-500',
  'action-primary-hover': 'primary-600',
  'action-secondary': 'secondary-500',
  'action-secondary-hover': 'secondary-600',
  'action-destructive': 'primary-700',
  'action-destructive-hover': 'primary-800',
  // Borders
  'border-default': 'neutral-200',
  'border-faint': 'neutral-100',
  'border-focus': 'primary-400',
  // Feedback
  'feedback-success': 'secondary-500',
  'feedback-error': 'primary-600',
};

export const DEFAULT_TYPOGRAPHY = {
  headingFont: 'DM Sans',
  bodyFont: 'Inter',
  monoFont: 'JetBrains Mono',
  baseSize: 16,
  headingWeight: 600,
  bodyWeight: 400,
  lineHeight: 1.5,
  headingLineHeight: 1.15,
};

export const DEFAULT_SPACING = {
  base: 4,
  sectionPadding: 80,
  containerPadding: 24,
  componentGap: 16,
  maxWidth: 1200,
};

export const DEFAULT_BORDERS = {
  radius: 8,
  cardRadius: 12,
  containerRadius: 16,
  buttonRadius: 6,
  inputRadius: 6,
  shadow: 'subtle',
};

// Type scale — derived from baseSize using a ratio
export const TYPE_SCALE = {
  xs: 0.75,
  sm: 0.875,
  base: 1,
  lg: 1.125,
  xl: 1.25,
  '2xl': 1.5,
  '3xl': 1.875,
  '4xl': 2.25,
  '5xl': 3,
};

// Shadow presets
export const SHADOW_PRESETS = {
  none: 'none',
  subtle: '0 1px 2px rgba(0,0,0,0.05)',
  medium: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  strong: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
};

// Font options available in the editor
export const FONT_OPTIONS = [
  'DM Sans',
  'Inter',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Manrope',
  'Outfit',
  'Sora',
];

export const MONO_FONT_OPTIONS = [
  'JetBrains Mono',
];
