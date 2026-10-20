// Semantic colour tokens per scheme. Every text/background pairing below was
// checked with .claude/skills/mobile-app-design/scripts/check-contrast.py and
// meets WCAG AA (4.5:1 for text, 3:1 for control boundaries).

export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  /** Decorative separators and card outlines. */
  border: string;
  /** Boundaries of interactive controls (inputs, unselected chips). */
  borderStrong: string;
  primary: string;
  onPrimary: string;
  primarySoft: string;
  onPrimarySoft: string;
  /** Attention colour for time-sensitive states such as overdue dates. */
  accent: string;
  danger: string;
}

/** Background/foreground pair used by pills, badges and status chips. */
export interface Tone {
  background: string;
  foreground: string;
}

export type ToneName = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface AppTheme {
  scheme: ColorScheme;
  colors: ThemeColors;
  tones: Record<ToneName, Tone>;
}

export const lightTheme: AppTheme = {
  scheme: 'light',
  colors: {
    background: '#F0FDFA',
    surface: '#FFFFFF',
    surfaceMuted: '#E8F1F4',
    text: '#134E4A',
    textMuted: '#475569',
    border: '#CCEBE6',
    borderStrong: '#64748B',
    // teal-700 rather than the generated teal-600: white on #0D9488 is 3.74:1.
    primary: '#0F766E',
    onPrimary: '#FFFFFF',
    primarySoft: '#CCFBF1',
    onPrimarySoft: '#115E59',
    accent: '#C2410C',
    danger: '#B91C1C',
  },
  tones: {
    neutral: { background: '#E2E8F0', foreground: '#334155' },
    primary: { background: '#CCFBF1', foreground: '#115E59' },
    success: { background: '#DCFCE7', foreground: '#166534' },
    warning: { background: '#FFEDD5', foreground: '#C2410C' },
    danger: { background: '#FEE2E2', foreground: '#B91C1C' },
  },
};

export const darkTheme: AppTheme = {
  scheme: 'dark',
  colors: {
    background: '#061A19',
    surface: '#0C2725',
    surfaceMuted: '#12322F',
    text: '#E6FFFA',
    textMuted: '#9EBCB7',
    border: '#1E4440',
    borderStrong: '#5F8F89',
    primary: '#2DD4BF',
    onPrimary: '#042F2E',
    primarySoft: '#134E4A',
    onPrimarySoft: '#99F6E4',
    accent: '#FB923C',
    danger: '#F87171',
  },
  tones: {
    neutral: { background: '#1E293B', foreground: '#CBD5E1' },
    primary: { background: '#134E4A', foreground: '#99F6E4' },
    success: { background: '#14532D', foreground: '#86EFAC' },
    warning: { background: '#431F0A', foreground: '#FDBA74' },
    danger: { background: '#451A1A', foreground: '#FCA5A5' },
  },
};
