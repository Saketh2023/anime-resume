import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Persona 5 Color System
      colors: {
        // P5 Brand Colors
        'p5-red-primary': 'var(--p5-red-primary)',
        'p5-red-dark': 'var(--p5-red-dark)',
        'p5-red-light': 'var(--p5-red-light)',
        'p5-black-primary': 'var(--p5-black-primary)',
        'p5-black-soft': 'var(--p5-black-soft)',
        'p5-black-medium': 'var(--p5-black-medium)',
        'p5-white-primary': 'var(--p5-white-primary)',
        'p5-white-soft': 'var(--p5-white-soft)',
        'p5-white-gray': 'var(--p5-white-gray)',
        'p5-yellow-accent': 'var(--p5-yellow-accent)',
        'p5-yellow-soft': 'var(--p5-yellow-soft)',
        'p5-blue-phantom': 'var(--p5-blue-phantom)',
        'p5-purple-shadow': 'var(--p5-purple-shadow)',
        'p5-gray-ui': 'var(--p5-gray-ui)',
        'p5-gray-border': 'var(--p5-gray-border)',
        
        // Semantic Colors
        'p5-success': 'var(--p5-success)',
        'p5-warning': 'var(--p5-warning)',
        'p5-error': 'var(--p5-error)',
        'p5-info': 'var(--p5-info)',
        
        // Text Colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-inverse': 'var(--text-inverse)',
        'text-accent': 'var(--text-accent)',
        'text-highlight': 'var(--text-highlight)',
        
        // Background Colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-soft': 'var(--bg-dark-soft)',
        'bg-surface': 'var(--bg-surface)',
      },
      
      // Persona 5 Typography
      fontFamily: {
        'primary': 'var(--font-primary)',
        'body': 'var(--font-body)',
        'mono': 'var(--font-mono)',
        'phantom': 'var(--font-primary)', // Alias for primary
      },
      
      // Extended Font Sizes
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      
      // Persona 5 Spacing Scale
      spacing: {
        '0.5': 'var(--space-0_5)',
        '1': 'var(--space-1)',
        '1.5': 'var(--space-1_5)',
        '2': 'var(--space-2)',
        '2.5': 'var(--space-2_5)',
        '3': 'var(--space-3)',
        '3.5': 'var(--space-3_5)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      
      // Border Radius
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      
      // Box Shadows
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'red-glow': 'var(--shadow-red-glow)',
        'red-glow-strong': 'var(--shadow-red-glow-strong)',
        'yellow-glow': 'var(--shadow-yellow-glow)',
      },
      
      // Animation Timing
      animation: {
        'phantom-slide': 'phantomSlide 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'phantom-fade': 'phantomFade 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      
      // Keyframes
      keyframes: {
        phantomSlide: {
          'from': { 
            transform: 'translateX(-100%)', 
            opacity: '0' 
          },
          'to': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
        },
        phantomFade: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: 'var(--shadow-red-glow)' 
          },
          '50%': { 
            boxShadow: 'var(--shadow-red-glow-strong)' 
          },
        },
      },
      
      // Custom Z-Index Scale
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
      
      // Letter Spacing
      letterSpacing: {
        'tight': 'var(--tracking-tight)',
        'normal': 'var(--tracking-normal)',
        'wide': 'var(--tracking-wide)',
        'wider': 'var(--tracking-wider)',
      },
      
      // Line Height
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
      },
      
      // Custom Transition Timing Functions
      transitionTimingFunction: {
        'phantom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Background Images for patterns
      backgroundImage: {
        'diagonal-stripes': `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          var(--p5-red-primary) 2px,
          var(--p5-red-primary) 4px
        )`,
        'dot-pattern': `radial-gradient(
          circle,
          var(--p5-red-primary) 1px,
          transparent 1px
        )`,
      },
      
      // Background Size for patterns
      backgroundSize: {
        'diagonal': '20px 20px',
        'dots': '20px 20px',
      },
    },
  },
  plugins: [
    // Add custom utilities plugin
    function({ addUtilities, theme }: {addUtilities: any, theme: any}) {
      const utilities = {
        // Phantom Typography
        '.font-phantom': {
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.wide'),
          textTransform: 'uppercase',
        },
        '.text-phantom-lg': {
          fontSize: theme('fontSize.3xl'),
          lineHeight: theme('lineHeight.tight'),
          fontWeight: theme('fontWeight.extrabold'),
        },
        '.text-phantom-xl': {
          fontSize: theme('fontSize.5xl'),
          lineHeight: theme('lineHeight.tight'),
          fontWeight: theme('fontWeight.black'),
        },
        
        // Glow Effects
        '.glow-red': {
          boxShadow: theme('boxShadow.red-glow'),
          transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        '.glow-red:hover': {
          boxShadow: theme('boxShadow.red-glow-strong'),
        },
        '.glow-yellow': {
          boxShadow: theme('boxShadow.yellow-glow'),
        },
        
        // Border Effects
        '.border-phantom': {
          border: `2px solid ${theme('colors.p5-red-primary')}`,
          position: 'relative',
        },
        '.border-phantom::before': {
          content: '\"\"',
          position: 'absolute',
          top: '-4px',
          left: '-4px',
          right: '-4px',
          bottom: '-4px',
          border: `1px solid ${theme('colors.p5-red-primary')}`,
          opacity: '0.5',
          pointerEvents: 'none',
        },
        
        // All-Out Button
        '.btn-all-out': {
          background: `linear-gradient(135deg, ${theme('colors.p5-red-primary')} 0%, ${theme('colors.p5-red-dark')} 100%)`,
          color: theme('colors.p5-white-primary'),
          border: 'none',
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.wide'),
          textTransform: 'uppercase',
          borderRadius: theme('borderRadius.DEFAULT'),
          boxShadow: theme('boxShadow.md'),
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
        },
        '.btn-all-out:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `${theme('boxShadow.lg')}, ${theme('boxShadow.red-glow')}`,
        },
        '.btn-all-out:active': {
          transform: 'translateY(0)',
        },
      }
      
      addUtilities(utilities)
    },
  ],
}

export default config