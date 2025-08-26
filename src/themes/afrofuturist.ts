/**
 * Afrofuturist Night Theme
 *
 * A dark, futuristic theme with neon accents, glassy cards,
 * subtle gridlines, and a parallax hero effect.
 *
 * This theme evokes the feeling of a high-tech, Afrofuturistic
 * world that blends traditional African aesthetics with
 * sci-fi and cyberpunk elements.
 */
export const afrofuturistTheme = {
  colors: {
    // Base colors
    background: '#050714',
    foreground: '#f8f9ff',
    // Primary colors
    primary: '#7000FF',
    'primary-foreground': '#ffffff',
    // Secondary colors
    secondary: '#00FFCC',
    'secondary-foreground': '#050714',
    // Accent colors
    accent: '#FF3D71',
    'accent-foreground': '#ffffff',
    // UI colors
    muted: '#1E2035',
    'muted-foreground': '#A9ABBD',
    card: 'rgba(30, 32, 53, 0.7)',
    'card-foreground': '#ffffff',
    border: 'rgba(122, 104, 255, 0.3)',
    input: 'rgba(248, 249, 255, 0.1)',
    // Semantic colors
    success: '#00D68F',
    warning: '#FFAA00',
    error: '#FF3D71',
    info: '#0095FF'
  },
  typography: {
    'font-family': "'Space Grotesk', 'Exo 2', sans-serif",
    'heading-family': "'Orbitron', 'Space Grotesk', sans-serif",
    'base-size': '1rem',
    'line-height': '1.6',
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
    sm: '0 1px 2px rgba(122, 104, 255, 0.1)',
    md: '0 4px 6px rgba(122, 104, 255, 0.1), 0 1px 3px rgba(122, 104, 255, 0.08)',
    lg: '0 10px 15px rgba(122, 104, 255, 0.1), 0 4px 6px rgba(122, 104, 255, 0.05)',
    xl: '0 20px 25px rgba(122, 104, 255, 0.1), 0 10px 10px rgba(122, 104, 255, 0.04)',
    glow: '0 0 15px rgba(112, 0, 255, 0.5), 0 0 30px rgba(0, 255, 204, 0.3)',
    'neon-primary': '0 0 10px rgba(112, 0, 255, 0.7), 0 0 20px rgba(112, 0, 255, 0.4)',
    'neon-secondary': '0 0 10px rgba(0, 255, 204, 0.7), 0 0 20px rgba(0, 255, 204, 0.4)'
  },
  motion: {
    fast: '0.15s',
    medium: '0.3s',
    slow: '0.5s',
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  textures: {
    grid: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237000FF' fill-opacity='0.1'%3E%3Cpath d='M0 0h1v20H0V0zm19 0h1v20h-1V0z'/%3E%3Cpath d='M0 0v1h20V0H0zm0 19v1h20v-1H0z'/%3E%3C/g%3E%3C/svg%3E\")",
    noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")"
  }
};