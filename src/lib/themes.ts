import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Theme {
  id: string;
  name: string;
  primary: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface?: string;
    text?: string;
    textMuted?: string;
  };
  description?: string;
  icon?: string;
}

export interface ThemeStore {
  currentTheme: string;
  isTransitioning: boolean;
  setTheme: (themeId: string) => void;
  setTransitioning: (transitioning: boolean) => void;
}

// Enhanced themes configuration with dramatic anime styling
export const DEFAULT_THEMES: Record<string, Theme> = {
  persona: {
    id: 'persona',
    name: 'Persona 5',
    primary: '#dc143c',
    colors: {
      primary: '#dc143c',
      secondary: '#000000',
      accent: '#ffd700',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)',
      surface: 'rgba(220, 20, 60, 0.15)',
      text: '#ffffff',
      textMuted: '#cccccc'
    },
    description: 'Enhanced Phantom Thief with dramatic red-black contrast and golden accents',
    icon: '🎭'
  },
  ninja: {
    id: 'ninja',
    name: 'Shadow Ninja',
    primary: '#00a86b',
    colors: {
      primary: '#00a86b',
      secondary: '#0d2818',
      accent: '#90ee90',
      background: 'linear-gradient(135deg, #0a1f0a 0%, #1a2f1a 100%)',
      surface: 'rgba(0, 168, 107, 0.12)',
      text: '#e8f5e8',
      textMuted: '#a8d8a8'
    },
    description: 'Enhanced forest stealth with deep greens and bamboo textures',
    icon: '🥷'
  },
  pirate: {
    id: 'pirate',
    name: 'Ocean Corsair',
    primary: '#1e90ff',
    colors: {
      primary: '#1e90ff',
      secondary: '#003366',
      accent: '#ffd700',
      background: 'linear-gradient(135deg, #001122 0%, #003355 100%)',
      surface: 'rgba(30, 144, 255, 0.12)',
      text: '#e6f3ff',
      textMuted: '#b3d9ff'
    },
    description: 'Enhanced deep sea adventure with wave patterns and treasure glints',
    icon: '🏴‍☠️'
  },
  mech: {
    id: 'mech',
    name: 'Cyber Mech',
    primary: '#ff6b00',
    colors: {
      primary: '#ff6b00',
      secondary: '#333333',
      accent: '#00ddff',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
      surface: 'rgba(255, 107, 0, 0.12)',
      text: '#fff5e6',
      textMuted: '#ccb399'
    },
    description: 'Enhanced industrial tech with circuit patterns and tech glows',
    icon: '🤖'
  }
};

// Zustand store for theme management
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: 'persona',
      isTransitioning: false,
      setTheme: (themeId: string) => {
        const { currentTheme } = get();
        
        if (currentTheme === themeId) {
          return;
        }
        
        set({ isTransitioning: true });
        
        // Apply theme immediately
        applyTheme(themeId);
        
        // Update store
        set({ currentTheme: themeId });
        
        // Reset transition state after animation completes
        setTimeout(() => {
          set({ isTransitioning: false });
        }, 300);
      },
      setTransitioning: (transitioning: boolean) => {
        set({ isTransitioning: transitioning });
      }
    }),
    {
      name: 'anime-resume-theme',
      partialize: (state) => ({ currentTheme: state.currentTheme })
    }
  )
);

// Enhanced theme application utility with visual effects
export const applyTheme = (themeId: string) => {
  if (typeof window === 'undefined') return;
  
  const theme = DEFAULT_THEMES[themeId];
  if (!theme) {
    console.warn(`Theme "${themeId}" not found`);
    return;
  }

  const root = document.documentElement;
  
  
  // Add transition class during theme change
  root.classList.add('theme-transitioning');
  
  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', themeId);
  
  // Apply CSS custom properties
  root.style.setProperty('--theme-primary', theme.colors.primary);
  root.style.setProperty('--theme-secondary', theme.colors.secondary);
  root.style.setProperty('--theme-accent', theme.colors.accent);
  root.style.setProperty('--theme-background', theme.colors.background);
  root.style.setProperty('--theme-surface', theme.colors.surface || `${theme.colors.primary}20`);
  root.style.setProperty('--theme-text', theme.colors.text || '#ffffff');
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted || '#a1a1aa');
  
  // Calculate primary RGB values for rgba usage
  const primaryRgb = hexToRgb(theme.colors.primary);
  if (primaryRgb) {
    root.style.setProperty('--theme-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
  }
  
  // Apply enhanced theme-specific effects
  const themeEffects = getThemeEffects(themeId);
  Object.entries(themeEffects).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Remove transition class after animation
  setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 300);
};

// Theme-specific effect configurations
function getThemeEffects(themeId: string): Record<string, string> {
  const effects: Record<string, Record<string, string>> = {
    persona: {
      '--theme-glow': '0 0 20px rgba(220, 20, 60, 0.5)',
      '--theme-shadow': '0 4px 20px rgba(0, 0, 0, 0.8)',
      '--theme-particle-1': '#dc143c',
      '--theme-particle-2': '#ffd700',
      '--theme-particle-3': '#ff1744'
    },
    ninja: {
      '--theme-glow': '0 0 15px rgba(0, 168, 107, 0.4)',
      '--theme-shadow': '0 4px 20px rgba(0, 50, 20, 0.7)',
      '--theme-particle-1': '#00a86b',
      '--theme-particle-2': '#90ee90',
      '--theme-particle-3': '#32cd32'
    },
    pirate: {
      '--theme-glow': '0 0 18px rgba(30, 144, 255, 0.4)',
      '--theme-shadow': '0 4px 20px rgba(0, 20, 40, 0.8)',
      '--theme-particle-1': '#1e90ff',
      '--theme-particle-2': '#ffd700',
      '--theme-particle-3': '#00bfff'
    },
    mech: {
      '--theme-glow': '0 0 22px rgba(255, 107, 0, 0.5)',
      '--theme-shadow': '0 4px 20px rgba(40, 20, 0, 0.8)',
      '--theme-particle-1': '#ff6b00',
      '--theme-particle-2': '#00ddff',
      '--theme-particle-3': '#ffaa33'
    }
  };
  
  return effects[themeId] || {};
}

// Initialize enhanced theme system
export const initializeTheme = () => {
  if (typeof window === 'undefined') return;
  
  const store = useThemeStore.getState();
  applyTheme(store.currentTheme);
  
  // Add global theme enhancement class to body
  document.body.classList.add('theme-enhanced');
};

// Utility to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Get theme by ID
export const getTheme = (themeId: string): Theme | undefined => {
  return DEFAULT_THEMES[themeId];
};

// Get all available themes
export const getAllThemes = (): Theme[] => {
  return Object.values(DEFAULT_THEMES);
};

// Hook for theme preview (doesn't persist)
export const useThemePreview = () => {
  const previewTheme = (themeId: string) => {
    const theme = DEFAULT_THEMES[themeId];
    if (!theme) return;
    
    // Apply theme temporarily without changing store
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
  };
  
  const clearPreview = () => {
    if (typeof window === 'undefined') return;
    const { currentTheme } = useThemeStore.getState();
    applyTheme(currentTheme);
  };
  
  return { previewTheme, clearPreview };
};