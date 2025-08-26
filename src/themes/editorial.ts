/**
 * Minimal Editorial Theme
 *
 * A clean, sophisticated theme with near-white/near-black colors plus one accent,
 * strict grid layout, and generous whitespace.
 *
 * This theme emphasizes content and typography, creating a premium,
 * magazine-like aesthetic that lets TMJ's story and music take center stage.
 */
export const editorialTheme = {
  colors: {
    // Base colors
    background: '#FAFAFA',
    foreground: '#111111',
    // Primary colors
    primary: '#111111',
    'primary-foreground': '#FFFFFF',
    // Secondary colors
    secondary: '#F2F2F2',
    'secondary-foreground': '#111111',
    // Accent colors
    accent: '#E63946',
    'accent-foreground': '#FFFFFF',
    // UI colors
    muted: '#F2F2F2',
    'muted-foreground': '#717171',
    card: '#FFFFFF',
    'card-foreground': '#111111',
    border: 'rgba(0, 0, 0, 0.1)',
    input: 'rgba(0, 0, 0, 0.07)',
    // Semantic colors
    success: '#4D9E4D',
    warning: '#F5A623',
    error: '#E63946',
    info: '#4A7BA7'
  },
  typography: {
    'font-family': "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    'heading-family': "'Fraunces', 'Times New Roman', serif",
    'base-size': '1rem',
    'line-height': '1.5',
    'heading-weight': '600',
    'body-weight': '400'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '5rem',
    '2xl': '8rem'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.04)',
    glow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    'sharp-sm': '1px 1px 0 rgba(0, 0, 0, 0.1)',
    'sharp-md': '2px 2px 0 rgba(0, 0, 0, 0.1)'
  },
  motion: {
    fast: '0.15s',
    medium: '0.25s',
    slow: '0.4s',
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  textures: {
    grid: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
    dot: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)'
  }
};