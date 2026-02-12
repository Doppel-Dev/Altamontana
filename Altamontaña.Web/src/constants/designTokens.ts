/**
 * Design Tokens - Sistema centralizado de valores de diseño
 * Elimina hardcoded values y asegura consistencia en toda la aplicación
 */

// Colores principales
export const COLORS = {
  light: {
    primary: '#003366',
    primaryDark: '#002244',
    accent: '#ff6b00',
    accentDark: '#e65100',
    background: '#ffffff',
    backgroundAlt: '#f5f5f5',
    surface: '#ffffff',
    surfaceElevated: '#fafafa',
    text: {
      primary: '#1a1a1a',
      secondary: '#4a5568',
      tertiary: '#718096',
      inverse: '#ffffff',
    },
    border: '#e2e8f0',
    borderLight: '#f7fafc',
    success: '#48bb78',
    error: '#f56565',
    warning: '#ed8936',
    info: '#4299e1',
  },
  dark: {
    primary: '#0055aa',
    primaryDark: '#003366',
    accent: '#ff8833',
    accentDark: '#ff6b00',
    background: '#1a202c',
    backgroundAlt: '#2d3748',
    surface: '#2d3748',
    surfaceElevated: '#374151',
    text: {
      primary: '#f7fafc',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e0',
      inverse: '#1a202c',
    },
    border: '#4a5568',
    borderLight: '#2d3748',
    success: '#68d391',
    error: '#fc8181',
    warning: '#f6ad55',
    info: '#63b3ed',
  },
} as const;

// Breakpoints (mobile-first)
export const BREAKPOINTS = {
  mobile: 320,
  mobileLarge: 375,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1280,
  desktopXL: 1536,
} as const;

// Media queries para uso en JS
export const MEDIA_QUERIES = {
  mobile: `(min-width: ${BREAKPOINTS.mobile}px)`,
  mobileLarge: `(min-width: ${BREAKPOINTS.mobileLarge}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  desktopLarge: `(min-width: ${BREAKPOINTS.desktopLarge}px)`,
  desktopXL: `(min-width: ${BREAKPOINTS.desktopXL}px)`,
  // Queries útiles adicionales
  isMobile: `(max-width: ${BREAKPOINTS.tablet - 1}px)`,
  isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDark: '(prefers-color-scheme: dark)',
} as const;

// Spacing (en rem, multiplicar por 4px base)
export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px

  // Spacing específicos del layout
  navbar: '80px',
  section: '6rem',
  container: {
    padding: {
      mobile: '1rem',
      tablet: '2rem',
      desktop: '3rem',
    },
    maxWidth: '1280px',
  },
} as const;

// Duraciones de transiciones y animaciones
export const TRANSITIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',

  // Easing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Tipografía
export const TYPOGRAPHY = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: '"Playfair Display", Georgia, serif',
    base: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '"Playfair Display", Georgia, serif',
    mono: '"Fira Code", "Consolas", "Monaco", monospace',
  },
  fontSize: {
    tiny: '0.625rem',  // 10px
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    extraWide: '0.15em',
    ultra: '0.2em',
  },
} as const;

// Tokens tipográficos del sistema profesional
export const TYPOGRAPHY_TOKENS = {
  display: {
    light: {
      fontSize: { base: '3rem', md: '4rem', lg: '5rem' },          // 48/64/80px
      fontWeight: 700,
      fontFamily: 'serif',
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      textTransform: 'none',
      fontStyle: 'normal',
    },
    dark: {
      fontSize: { base: '3rem', md: '4rem', lg: '5rem' },          // 48/64/80px
      fontWeight: 900,
      fontFamily: 'sans',
      letterSpacing: '-0.05em',
      lineHeight: 1,
      textTransform: 'uppercase',
      fontStyle: 'italic',
    },
  },
  h1: {
    light: {
      fontSize: { base: '2.25rem', md: '3rem', lg: '3.75rem' },    // 36/48/60px
      fontWeight: 700,
      fontFamily: 'serif',
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    dark: {
      fontSize: { base: '2.25rem', md: '3rem', lg: '3.75rem' },    // 36/48/60px
      fontWeight: 900,
      fontFamily: 'sans',
      letterSpacing: '-0.05em',
      lineHeight: 1.1,
      textTransform: 'uppercase',
      fontStyle: 'italic',
    },
  },
  h2: {
    light: {
      fontSize: { base: '1.875rem', md: '2.25rem', lg: '3rem' },   // 30/36/48px
      fontWeight: 700,
      fontFamily: 'serif',
      letterSpacing: '-0.025em',
      lineHeight: 1.3,
    },
    dark: {
      fontSize: { base: '1.875rem', md: '2.25rem', lg: '3rem' },   // 30/36/48px
      fontWeight: 900,
      fontFamily: 'sans',
      letterSpacing: '-0.05em',
      lineHeight: 1.2,
      textTransform: 'uppercase',
      fontStyle: 'italic',
    },
  },
  h3: {
    light: {
      fontSize: { base: '1.5rem', md: '1.875rem', lg: '2.25rem' }, // 24/30/36px
      fontWeight: 600,
      fontFamily: 'serif',
      letterSpacing: '-0.025em',
      lineHeight: 1.4,
    },
    dark: {
      fontSize: { base: '1.5rem', md: '1.875rem', lg: '2.25rem' }, // 24/30/36px
      fontWeight: 800,
      fontFamily: 'sans',
      letterSpacing: '-0.025em',
      lineHeight: 1.3,
      textTransform: 'uppercase',
      fontStyle: 'italic',
    },
  },
  h4: {
    light: {
      fontSize: { base: '1.25rem', md: '1.5rem' },                 // 20/24px
      fontWeight: 600,
      fontFamily: 'serif',
      letterSpacing: '0',
      lineHeight: 1.4,
    },
    dark: {
      fontSize: { base: '1.25rem', md: '1.5rem' },                 // 20/24px
      fontWeight: 700,
      fontFamily: 'sans',
      letterSpacing: '0',
      lineHeight: 1.4,
      textTransform: 'uppercase',
      fontStyle: 'italic',
    },
  },
  body: {
    large: {
      fontSize: '1.125rem',                                         // 18px
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: '0',
    },
    base: {
      fontSize: '1rem',                                             // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0',
    },
    small: {
      fontSize: '0.875rem',                                         // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
  },
  label: {
    large: {
      fontSize: '0.875rem',                                         // 14px
      fontWeight: 600,
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
    },
    base: {
      fontSize: '0.75rem',                                          // 12px
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    small: {
      fontSize: '0.6875rem',                                        // 11px
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    tiny: {
      fontSize: '0.625rem',                                         // 10px
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
  },
  price: {
    hero: {
      fontSize: { base: '3rem', md: '4rem' },                      // 48/64px
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1,
    },
    large: {
      fontSize: { base: '2.25rem', md: '3rem' },                   // 36/48px
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
    },
    medium: {
      fontSize: '1.5rem',                                           // 24px
      fontWeight: 700,
      letterSpacing: '0',
      lineHeight: 1.2,
    },
  },
  button: {
    large: {
      fontSize: '1rem',                                             // 16px
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    base: {
      fontSize: '0.875rem',                                         // 14px
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    small: {
      fontSize: '0.75rem',                                          // 12px
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  eyebrow: {
    light: {
      fontSize: '0.75rem',                                          // 12px
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily: 'sans',
    },
    dark: {
      fontSize: '0.75rem',                                          // 12px
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily: 'sans',
      fontStyle: 'italic',
    },
  },
} as const;

// Colores de texto (reemplazan uso de opacity)
export const TEXT_COLORS = {
  light: {
    primary: '#1a1a1a',
    secondary: '#4a5568',
    tertiary: '#718096',
    muted: '#9ca3af',
    subtle: '#d1d5db',
  },
  dark: {
    primary: '#ffffff',
    secondary: '#e2e8f0',
    tertiary: '#cbd5e0',
    muted: '#9ca3af',
    subtle: '#6b7280',
  },
} as const;

// Sombras (box-shadow)
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

  // Sombras específicas
  navbar: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
} as const;

// Border radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Z-index (layers)
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  navbar: 1100,
} as const;

// Dimensiones de componentes comunes
export const COMPONENT_SIZES = {
  button: {
    sm: {
      height: '2rem',      // 32px
      padding: '0.5rem 1rem',
      fontSize: TYPOGRAPHY.fontSize.sm,
    },
    md: {
      height: '2.5rem',    // 40px
      padding: '0.625rem 1.25rem',
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    lg: {
      height: '3rem',      // 48px
      padding: '0.75rem 1.5rem',
      fontSize: TYPOGRAPHY.fontSize.lg,
    },
  },
  input: {
    sm: {
      height: '2rem',      // 32px
      padding: '0.5rem 0.75rem',
      fontSize: TYPOGRAPHY.fontSize.sm,
    },
    md: {
      height: '2.5rem',    // 40px
      padding: '0.625rem 1rem',
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    lg: {
      height: '3rem',      // 48px
      padding: '0.75rem 1.25rem',
      fontSize: TYPOGRAPHY.fontSize.lg,
    },
  },
  icon: {
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
  },
  // Touch targets mínimos para móvil (accesibilidad)
  touchTarget: {
    minWidth: '44px',
    minHeight: '44px',
  },
} as const;

// Safe areas para iOS
export const SAFE_AREAS = {
  top: 'env(safe-area-inset-top)',
  right: 'env(safe-area-inset-right)',
  bottom: 'env(safe-area-inset-bottom)',
  left: 'env(safe-area-inset-left)',
} as const;

// Exportar todo como un objeto único también
export const designTokens = {
  colors: COLORS,
  breakpoints: BREAKPOINTS,
  mediaQueries: MEDIA_QUERIES,
  spacing: SPACING,
  transitions: TRANSITIONS,
  typography: TYPOGRAPHY,
  typographyTokens: TYPOGRAPHY_TOKENS,
  textColors: TEXT_COLORS,
  shadows: SHADOWS,
  borderRadius: BORDER_RADIUS,
  zIndex: Z_INDEX,
  componentSizes: COMPONENT_SIZES,
  safeAreas: SAFE_AREAS,
} as const;

export default designTokens;
