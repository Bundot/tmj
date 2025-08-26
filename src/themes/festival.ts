/**
 * Sunlit Festival Theme
 *
 * A bright, airy theme with soft pastels, sunrise gradients,
 * rounded corners, airy spacing, and floating hero elements.
 *
 * This theme evokes the joyful atmosphere of outdoor music festivals,
 * with a light, optimistic color palette and gentle, flowing animations.
 */
export const festivalTheme = {
  colors: {
    // Base colors
    background: '#FFFCF9',
    foreground: '#3D3B4F',
    // Primary colors
    primary: '#FF7D5B',
    'primary-foreground': '#FFFFFF',
    // Secondary colors
    secondary: '#B6E3FF',
    'secondary-foreground': '#3D3B4F',
    // Accent colors
    accent: '#FFCD69',
    'accent-foreground': '#3D3B4F',
    // UI colors
    muted: '#F4F1F9',
    'muted-foreground': '#8C89A2',
    card: '#FFFFFF',
    'card-foreground': '#3D3B4F',
    border: 'rgba(61, 59, 79, 0.1)',
    input: 'rgba(61, 59, 79, 0.07)',
    // Semantic colors
    success: '#7ED9A9',
    warning: '#FFCD69',
    error: '#FF7D5B',
    info: '#B6E3FF'
  },
  typography: {
    'font-family': "'DM Sans', 'Quicksand', sans-serif",
    'heading-family': "'Outfit', 'DM Sans', sans-serif",
    'base-size': '1rem',
    'line-height': '1.6',
    'heading-weight': '600',
    'body-weight': '400'
  },
  spacing: {
    xs: '0.75rem',
    sm: '1.25rem',
    md: '2rem',
    lg: '3.25rem',
    xl: '5rem',
    '2xl': '7.5rem'
  },
  radii: {
    none: '0',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 2px 4px rgba(61, 59, 79, 0.04)',
    md: '0 6px 12px rgba(61, 59, 79, 0.06), 0 2px 4px rgba(61, 59, 79, 0.03)',
    lg: '0 15px 20px rgba(61, 59, 79, 0.08), 0 5px 10px rgba(61, 59, 79, 0.04)',
    xl: '0 25px 30px rgba(61, 59, 79, 0.1), 0 10px 15px rgba(61, 59, 79, 0.05)',
    glow: '0 0 15px rgba(255, 125, 91, 0.2), 0 0 30px rgba(255, 205, 105, 0.15)',
    'soft-sm': '0 2px 8px rgba(61, 59, 79, 0.08)',
    'soft-md': '0 8px 24px rgba(61, 59, 79, 0.12)'
  },
  motion: {
    fast: '0.2s',
    medium: '0.4s',
    slow: '0.7s',
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    float: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)'
  },
  textures: {
    gradient: 'linear-gradient(120deg, #FF7D5B, #FFCD69)',
    dots: 'radial-gradient(rgba(61, 59, 79, 0.05) 1px, transparent 1px)',
    softNoise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")"
  }
};