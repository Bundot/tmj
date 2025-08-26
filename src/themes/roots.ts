/**
 * Roots & Earth Theme
 *
 * A warm, earthy theme with browns, greens, and reds,
 * low-opacity fabric textures, serif headlines, and inked dividers.
 *
 * This theme connects to the traditional roots of Nigerian culture
 * and music, with organic textures and colors that evoke natural
 * materials and handcrafted aesthetics.
 */
export const rootsTheme = {
  colors: {
    // Base colors
    background: '#F5F1E8',
    foreground: '#2C1810',
    // Primary colors
    primary: '#7D4F3A',
    'primary-foreground': '#F5F1E8',
    // Secondary colors
    secondary: '#5B8A72',
    'secondary-foreground': '#F5F1E8',
    // Accent colors
    accent: '#C45D3E',
    'accent-foreground': '#F5F1E8',
    // UI colors
    muted: '#E5DFD4',
    'muted-foreground': '#6E5F4B',
    card: '#FFFCF7',
    'card-foreground': '#2C1810',
    border: 'rgba(125, 79, 58, 0.2)',
    input: 'rgba(44, 24, 16, 0.1)',
    // Semantic colors
    success: '#5B8A72',
    warning: '#D9A566',
    error: '#C45D3E',
    info: '#6E8CA8'
  },
  typography: {
    'font-family': "'Lora', 'Merriweather', serif",
    'heading-family': "'Playfair Display', 'Lora', serif",
    'base-size': '1rem',
    'line-height': '1.7',
    'heading-weight': '700',
    'body-weight': '400'
  },
  spacing: {
    xs: '0.625rem',
    sm: '1.125rem',
    md: '1.75rem',
    lg: '2.75rem',
    xl: '4.25rem',
    '2xl': '6.5rem'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(44, 24, 16, 0.06)',
    md: '0 3px 6px rgba(44, 24, 16, 0.08), 0 1px 2px rgba(44, 24, 16, 0.04)',
    lg: '0 8px 12px rgba(44, 24, 16, 0.08), 0 2px 4px rgba(44, 24, 16, 0.03)',
    xl: '0 16px 24px rgba(44, 24, 16, 0.08), 0 4px 8px rgba(44, 24, 16, 0.02)',
    glow: '0 0 10px rgba(196, 93, 62, 0.2)',
    'inked-border': '0 1px 0 rgba(44, 24, 16, 0.15)',
    'paper-lift': '0 3px 6px rgba(44, 24, 16, 0.1), 0 0 0 1px rgba(44, 24, 16, 0.03)'
  },
  motion: {
    fast: '0.2s',
    medium: '0.35s',
    slow: '0.6s',
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  textures: {
    fabric: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237D4F3A' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
    paper: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
    inkedLine: 'linear-gradient(to right, rgba(44, 24, 16, 0.1) 0%, rgba(44, 24, 16, 0.2) 50%, rgba(44, 24, 16, 0.1) 100%)'
  }
};