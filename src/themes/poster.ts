/**
 * Vibrant Street Poster Theme
 *
 * A bold, energetic theme with festival brights, collage/sticker motifs,
 * halftone textures, and snappy micro-interactions.
 *
 * This theme captures the vibrant energy of street art and music festival
 * posters, with high-contrast colors and playful design elements.
 */
export const posterTheme = {
  colors: {
    // Base colors
    background: '#0D0D0D',
    foreground: '#FFFFFF',
    // Primary colors
    primary: '#FF3C00',
    'primary-foreground': '#FFFFFF',
    // Secondary colors
    secondary: '#FFDE00',
    'secondary-foreground': '#0D0D0D',
    // Accent colors
    accent: '#00E1FF',
    'accent-foreground': '#0D0D0D',
    // UI colors
    muted: '#1F1F1F',
    'muted-foreground': '#AFAFAF',
    card: '#1F1F1F',
    'card-foreground': '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.15)',
    input: 'rgba(255, 255, 255, 0.1)',
    // Semantic colors
    success: '#00E054',
    warning: '#FFDE00',
    error: '#FF3C00',
    info: '#00B2FF'
  },
  typography: {
    'font-family': "'Rubik', sans-serif",
    'heading-family': "'Anton', 'Impact', sans-serif",
    'base-size': '1rem',
    'line-height': '1.5',
    'heading-weight': '700',
    'body-weight': '400'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2.5rem',
    xl: '4rem',
    '2xl': '6rem'
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2)',
    glow: '0 0 10px rgba(255, 60, 0, 0.5), 0 0 20px rgba(255, 60, 0, 0.3)',
    'neon-primary': '0 0 10px rgba(255, 60, 0, 0.7), 0 0 20px rgba(255, 60, 0, 0.4)',
    'neon-secondary': '0 0 10px rgba(255, 222, 0, 0.7), 0 0 20px rgba(255, 222, 0, 0.4)',
    'neon-accent': '0 0 10px rgba(0, 225, 255, 0.7), 0 0 20px rgba(0, 225, 255, 0.4)',
    'offset-primary': '3px 3px 0 #FF3C00',
    'offset-secondary': '3px 3px 0 #FFDE00'
  },
  motion: {
    fast: '0.1s',
    medium: '0.2s',
    slow: '0.3s',
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'spring-bounce': 'cubic-bezier(0.5, -0.5, 0.1, 1.5)'
  },
  textures: {
    halftone: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='3' cy='13' r='1'/%3E%3Ccircle cx='13' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
    noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
    diagonal: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 10px, transparent 10px, transparent 20px)'
  }
};