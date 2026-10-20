// Theme-independent design tokens. Values follow design-system/team-task-manager
// (generated with the ui-ux-pro-max skill) adapted for native: 4/8pt spacing
// rhythm, 44pt minimum touch targets and a single type family.

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

export type FontWeight = keyof typeof fontFamily;

interface TypeStyle {
  fontSize: number;
  lineHeight: number;
  weight: FontWeight;
}

export const typography = {
  display: { fontSize: 28, lineHeight: 34, weight: 'extrabold' },
  title: { fontSize: 22, lineHeight: 28, weight: 'bold' },
  heading: { fontSize: 17, lineHeight: 24, weight: 'semibold' },
  body: { fontSize: 16, lineHeight: 24, weight: 'regular' },
  callout: { fontSize: 15, lineHeight: 22, weight: 'medium' },
  label: { fontSize: 13, lineHeight: 18, weight: 'semibold' },
  caption: { fontSize: 12, lineHeight: 16, weight: 'medium' },
} as const satisfies Record<string, TypeStyle>;

export type TypographyVariant = keyof typeof typography;

export const iconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/** Readable content width on tablets and web; phones are narrower than this anyway. */
export const CONTENT_MAX_WIDTH = 720;

/** Spread into a scroll view's contentContainerStyle to centre content at CONTENT_MAX_WIDTH. */
export const centeredContent = {
  width: '100%',
  maxWidth: CONTENT_MAX_WIDTH,
  alignSelf: 'center',
} as const;

/** Minimum interactive size (iOS HIG 44pt; Android 48dp is reached via hitSlop). */
export const TOUCH_TARGET = 44;

export const hitSlop = { top: 4, bottom: 4, left: 4, right: 4 } as const;

/** Opacity applied to pressed controls — colour-only feedback, no layout shift. */
export const PRESSED_OPACITY = 0.72;
