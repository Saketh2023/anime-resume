/**
 * Persona 5 Utility Classes
 * Pre-built class combinations for common Persona 5 design patterns
 * Use these with Tailwind CSS for consistent styling
 */

/**
 * Typography Classes
 * Persona 5-themed text styles
 */
export const p5Text = {
  // Hero/Display Text
  phantomTitle: 'font-phantom text-phantom-xl text-p5-red-primary uppercase tracking-wider',
  heroSubtitle: 'font-primary text-2xl font-semibold text-text-secondary uppercase tracking-wide',
  
  // Section Headers
  sectionTitle: 'font-primary text-3xl font-extrabold text-p5-red-primary uppercase tracking-wide mb-8',
  subsectionTitle: 'font-primary text-xl font-bold text-text-primary uppercase tracking-wide mb-4',
  
  // Content Text
  missionTitle: 'font-primary text-2xl font-bold text-text-primary mb-2',
  bodyText: 'font-body text-base text-text-primary leading-relaxed',
  caption: 'font-body text-sm text-text-tertiary',
  
  // Special Text
  accent: 'text-p5-red-primary font-medium',
  highlight: 'text-p5-yellow-accent font-semibold',
  code: 'font-mono text-sm bg-p5-black-soft text-p5-white-primary px-2 py-1 rounded',
};

/**
 * Layout Classes
 * Common layout patterns for Persona 5 design
 */
export const p5Layout = {
  // Containers
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16 lg:py-24',
  
  // Grids
  skillGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  missionGrid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
  achievementGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  
  // Flex Layouts
  heroLayout: 'min-h-screen flex items-center justify-center text-center',
  navLayout: 'flex items-center justify-between w-full',
  cardHeader: 'flex items-start justify-between mb-4',
};

/**
 * Component Classes
 * Styled components following Persona 5 aesthetic
 */
export const p5Components = {
  // Cards
  missionCard: 'bg-bg-primary border-l-4 border-p5-red-primary shadow-md rounded p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
  skillCard: 'bg-gradient-to-br from-p5-black-primary to-p5-black-soft text-p5-white-primary border border-p5-red-primary rounded-md p-4',
  phantomCard: 'bg-bg-primary border-2 border-p5-red-primary rounded shadow-base p-6 relative transition-all duration-300 hover:shadow-lg glow-red',
  
  // Buttons
  allOutButton: 'btn-all-out inline-flex items-center gap-2',
  phantomButton: 'border-2 border-p5-red-primary text-p5-red-primary bg-transparent px-6 py-3 font-primary font-medium uppercase tracking-wide rounded transition-all duration-200 hover:bg-p5-red-primary hover:text-p5-white-primary',
  stealthButton: 'border border-p5-gray-border text-text-primary bg-transparent px-6 py-3 font-body font-medium rounded transition-all duration-200 hover:border-p5-red-primary hover:text-p5-red-primary',
  
  // Navigation
  navbar: 'fixed top-0 w-full bg-bg-primary/95 backdrop-blur-md border-b border-p5-gray-border z-fixed',
  navLink: 'font-primary font-medium uppercase tracking-wide text-text-secondary hover:text-p5-red-primary transition-colors duration-200',
  
  // Form Elements
  input: 'w-full px-4 py-3 border border-p5-gray-border rounded bg-bg-secondary text-text-primary focus:outline-none focus:border-p5-red-primary focus:ring-1 focus:ring-p5-red-primary transition-colors duration-200',
  textarea: 'w-full px-4 py-3 border border-p5-gray-border rounded bg-bg-secondary text-text-primary focus:outline-none focus:border-p5-red-primary focus:ring-1 focus:ring-p5-red-primary transition-colors duration-200 resize-vertical',
  
  // Status/Progress
  progressBar: 'w-full bg-p5-gray-border rounded-full h-2',
  progressFill: 'bg-gradient-to-r from-p5-red-primary to-p5-red-light h-full rounded-full transition-all duration-500',
  badge: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
  skillBadge: 'bg-p5-black-primary text-p5-white-primary border border-p5-red-primary px-3 py-1 rounded-full text-sm font-mono',
};

/**
 * Animation Classes
 * Persona 5-inspired animations and effects
 */
export const p5Animations = {
  // Entrance Animations
  slideIn: 'animate-phantom-slide',
  fadeIn: 'animate-phantom-fade',
  
  // Hover Effects
  glow: 'glow-red transition-all duration-300',
  glowStrong: 'hover:glow-red-strong',
  lift: 'hover:-translate-y-1 transition-transform duration-200',
  
  // Loading States
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  
  // Interactive
  clickScale: 'active:scale-95 transition-transform duration-75',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
};

/**
 * Background Classes
 * Persona 5-themed backgrounds and overlays
 */
export const p5Backgrounds = {
  // Solid Backgrounds
  primary: 'bg-bg-primary',
  secondary: 'bg-bg-secondary',
  dark: 'bg-bg-dark',
  surface: 'bg-bg-surface',
  
  // Gradient Backgrounds
  redGradient: 'bg-gradient-to-r from-p5-red-primary to-p5-red-dark',
  blackGradient: 'bg-gradient-to-br from-p5-black-primary to-p5-black-soft',
  heroGradient: 'bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-tertiary',
  
  // Pattern Backgrounds (using CSS)
  diagonal: 'bg-diagonal-stripes',
  dots: 'bg-dot-pattern',
  
  // Overlays
  overlay: 'absolute inset-0 bg-p5-black-primary/50',
  overlayRed: 'absolute inset-0 bg-p5-red-primary/10',
};

/**
 * Border and Shadow Classes
 */
export const p5Effects = {
  // Borders
  phantomBorder: 'border-phantom',
  redBorder: 'border-2 border-p5-red-primary',
  subtleBorder: 'border border-p5-gray-border',
  
  // Shadows
  cardShadow: 'shadow-md',
  elevatedShadow: 'shadow-lg',
  glowShadow: 'shadow-red-glow',
  
  // Rounded Corners
  sharpCorners: 'rounded',
  softCorners: 'rounded-md',
  pillCorners: 'rounded-full',
};

/**
 * Responsive Classes
 * Mobile-first responsive design
 */
export const p5Responsive = {
  // Text Scaling
  heroText: 'text-4xl md:text-5xl lg:text-6xl',
  sectionText: 'text-2xl md:text-3xl lg:text-4xl',
  bodyText: 'text-base md:text-lg',
  
  // Spacing
  sectionPadding: 'py-12 md:py-16 lg:py-24',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  
  // Grids
  responsiveGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  twoColGrid: 'grid grid-cols-1 lg:grid-cols-2',
  threeColGrid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
};

/**
 * Utility Functions
 */

/**
 * Combine multiple class strings safely
 */
export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Apply Persona 5 theme based on variant
 */
export const p5Variant = (
  variant: 'primary' | 'secondary' | 'accent' | 'phantom' = 'primary'
): string => {
  const variants = {
    primary: 'bg-p5-red-primary text-p5-white-primary',
    secondary: 'bg-p5-black-primary text-p5-white-primary',
    accent: 'bg-p5-yellow-accent text-p5-black-primary',
    phantom: 'bg-transparent border-2 border-p5-red-primary text-p5-red-primary',
  };
  return variants[variant];
};

/**
 * Generate skill level bars (Persona 5 style)
 */
export const skillLevel = (level: 1 | 2 | 3 | 4 | 5): string => {
  const filled = '■'.repeat(level);
  const empty = '□'.repeat(5 - level);
  return filled + empty;
};

/**
 * Pre-built component combinations
 */
export const p5Presets = {
  // Hero Section
  hero: cn(
    p5Layout.heroLayout,
    p5Backgrounds.heroGradient,
    'relative overflow-hidden'
  ),
  
  // Section Headers
  sectionHeader: cn(
    p5Text.sectionTitle,
    p5Animations.fadeIn,
    'relative'
  ),
  
  // Mission Cards
  featuredMission: cn(
    p5Components.missionCard,
    p5Effects.glowShadow,
    'border-l-6'
  ),
  
  // Skill Display
  skillShowcase: cn(
    p5Components.skillCard,
    p5Animations.glow,
    p5Animations.lift
  ),
  
  // Contact Section
  contact: cn(
    p5Backgrounds.dark,
    'text-p5-white-primary',
    p5Layout.section
  ),
};

export default {
  text: p5Text,
  layout: p5Layout,
  components: p5Components,
  animations: p5Animations,
  backgrounds: p5Backgrounds,
  effects: p5Effects,
  responsive: p5Responsive,
  presets: p5Presets,
  cn,
  p5Variant,
  skillLevel,
};