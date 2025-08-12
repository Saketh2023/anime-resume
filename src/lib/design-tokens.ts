/**
 * Persona 5 Design Tokens
 * Professional Rebel Design System
 * 
 * These tokens provide type-safe access to the design system
 * defined in globals.css. Use these instead of hardcoded values.
 */

export const designTokens = {
  // ==================== COLORS ====================
  colors: {
    // Primary Palette
    p5: {
      red: {
        primary: '#E60012',
        dark: '#B3000E',
        light: '#FF1A2B',
      },
      black: {
        primary: '#0D0D0D',
        soft: '#1A1A1A',
        medium: '#2A2A2A',
      },
      white: {
        primary: '#FFFFFF',
        soft: '#F8F8F8',
        gray: '#E8E8E8',
      },
      yellow: {
        accent: '#FFD700',
        soft: '#FFF4CC',
      },
      blue: {
        phantom: '#1E3A8A',
      },
      purple: {
        shadow: '#7C3AED',
      },
      gray: {
        ui: '#6B7280',
        border: '#D1D5DB',
      },
    },
    
    // Functional Colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#E60012', // Uses brand red
      info: '#1E3A8A',  // Uses phantom blue
    },
    
    // Text Colors
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      inverse: 'var(--text-inverse)',
      accent: 'var(--text-accent)',
      highlight: 'var(--text-highlight)',
    },
    
    // Background Colors
    background: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)',
      tertiary: 'var(--bg-tertiary)',
      dark: 'var(--bg-dark)',
      darkSoft: 'var(--bg-dark-soft)',
      surface: 'var(--bg-surface)',
    },
  },

  // ==================== TYPOGRAPHY ====================
  typography: {
    fontFamily: {
      primary: 'var(--font-primary)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    
    fontSize: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      base: 'var(--text-base)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
      '3xl': 'var(--text-3xl)',
      '4xl': 'var(--text-4xl)',
      '5xl': 'var(--text-5xl)',
      '6xl': 'var(--text-6xl)',
    },
    
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
    },
  },

  // ==================== SPACING ====================
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  // ==================== BORDER RADIUS ====================
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // ==================== SHADOWS ====================
  shadow: {
    sm: '0 1px 2px 0 rgba(13, 13, 13, 0.05)',
    base: '0 1px 3px 0 rgba(13, 13, 13, 0.1), 0 1px 2px -1px rgba(13, 13, 13, 0.1)',
    md: '0 4px 6px -1px rgba(13, 13, 13, 0.1), 0 2px 4px -2px rgba(13, 13, 13, 0.1)',
    lg: '0 10px 15px -3px rgba(13, 13, 13, 0.1), 0 4px 6px -4px rgba(13, 13, 13, 0.1)',
    xl: '0 20px 25px -5px rgba(13, 13, 13, 0.1), 0 8px 10px -6px rgba(13, 13, 13, 0.1)',
    '2xl': '0 25px 50px -12px rgba(13, 13, 13, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(13, 13, 13, 0.05)',
    
    // Persona 5 Special Shadows
    redGlow: '0 0 20px rgba(230, 0, 18, 0.3)',
    redGlowStrong: '0 0 40px rgba(230, 0, 18, 0.5)',
    yellowGlow: '0 0 20px rgba(255, 215, 0, 0.4)',
  },

  // ==================== ANIMATION ====================
  animation: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      phantom: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Custom Persona 5 easing
    },
  },

  // ==================== BREAKPOINTS ====================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ==================== Z-INDEX ====================
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
} as const;

// ==================== COMPONENT PRESETS ====================

/**
 * Pre-configured component styles using design tokens
 */
export const componentPresets = {
  // Button Styles
  buttons: {
    allOut: {
      background: `linear-gradient(135deg, ${designTokens.colors.p5.red.primary} 0%, ${designTokens.colors.p5.red.dark} 100%)`,
      color: designTokens.colors.p5.white.primary,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.bold,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      textTransform: 'uppercase' as const,
      borderRadius: designTokens.borderRadius.base,
      boxShadow: designTokens.shadow.md,
      transition: `all ${designTokens.animation.duration[200]} ${designTokens.animation.easing.phantom}`,
    },
    
    phantom: {
      border: `2px solid ${designTokens.colors.p5.red.primary}`,
      color: designTokens.colors.p5.red.primary,
      background: 'transparent',
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      textTransform: 'uppercase' as const,
      borderRadius: designTokens.borderRadius.base,
      transition: `all ${designTokens.animation.duration[200]} ${designTokens.animation.easing.out}`,
    },
  },

  // Card Styles
  cards: {
    mission: {
      background: designTokens.colors.background.primary,
      borderLeft: `4px solid ${designTokens.colors.p5.red.primary}`,
      boxShadow: designTokens.shadow.md,
      borderRadius: designTokens.borderRadius.base,
      padding: designTokens.spacing[6],
    },
    
    skill: {
      background: `linear-gradient(135deg, ${designTokens.colors.p5.black.primary}, ${designTokens.colors.p5.black.soft})`,
      color: designTokens.colors.p5.white.primary,
      border: `1px solid ${designTokens.colors.p5.red.primary}`,
      borderRadius: designTokens.borderRadius.md,
      padding: designTokens.spacing[4],
    },
    
    phantom: {
      background: designTokens.colors.background.primary,
      border: `2px solid ${designTokens.colors.p5.red.primary}`,
      borderRadius: designTokens.borderRadius.base,
      boxShadow: designTokens.shadow.base,
      position: 'relative' as const,
      padding: designTokens.spacing[6],
    },
  },

  // Typography Styles
  text: {
    phantomTitle: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.black,
      fontSize: designTokens.typography.fontSize['5xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      textTransform: 'uppercase' as const,
      color: designTokens.colors.text.primary,
    },
    
    sectionHeader: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.extrabold,
      fontSize: designTokens.typography.fontSize['3xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      textTransform: 'uppercase' as const,
      color: designTokens.colors.p5.red.primary,
    },
    
    missionTitle: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.bold,
      fontSize: designTokens.typography.fontSize['2xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.text.primary,
    },
  },
} as const;

// ==================== UTILITY FUNCTIONS ====================

/**
 * Create a CSS custom property reference
 */
export const cssVar = (token: string): string => `var(--${token})`;

/**
 * Create responsive CSS values
 */
export const responsive = {
  mobile: (styles: Record<string, any>) => ({
    [`@media (max-width: ${designTokens.breakpoints.sm})`]: styles,
  }),
  tablet: (styles: Record<string, any>) => ({
    [`@media (min-width: ${designTokens.breakpoints.sm}) and (max-width: ${designTokens.breakpoints.lg})`]: styles,
  }),
  desktop: (styles: Record<string, any>) => ({
    [`@media (min-width: ${designTokens.breakpoints.lg})`]: styles,
  }),
};

/**
 * Persona 5 specific utilities
 */
export const p5Utils = {
  // Create the signature red glow effect
  redGlow: (intensity: 'normal' | 'strong' = 'normal') => ({
    boxShadow: intensity === 'strong' 
      ? designTokens.shadow.redGlowStrong 
      : designTokens.shadow.redGlow,
    transition: `box-shadow ${designTokens.animation.duration[300]} ${designTokens.animation.easing.phantom}`,
  }),
  
  // Create the phantom border effect
  phantomBorder: () => ({
    border: `2px solid ${designTokens.colors.p5.red.primary}`,
    position: 'relative' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: '-4px',
      left: '-4px',
      right: '-4px',
      bottom: '-4px',
      border: `1px solid ${designTokens.colors.p5.red.primary}`,
      opacity: 0.5,
      pointerEvents: 'none' as const,
    },
  }),
  
  // Create the phantom slide animation
  slideIn: (direction: 'left' | 'right' | 'up' | 'down' = 'left') => {
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)',
    };
    
    return {
      animation: `phantomSlide-${direction} ${designTokens.animation.duration[500]} ${designTokens.animation.easing.phantom}`,
      '@keyframes phantomSlide-left': {
        from: { transform: transforms[direction], opacity: 0 },
        to: { transform: 'translate(0)', opacity: 1 },
      },
    };
  },
};

// ==================== TYPE DEFINITIONS ====================

export type DesignTokens = typeof designTokens;
export type ColorTokens = typeof designTokens.colors;
export type TypographyTokens = typeof designTokens.typography;
export type SpacingTokens = typeof designTokens.spacing;
export type ComponentPresets = typeof componentPresets;