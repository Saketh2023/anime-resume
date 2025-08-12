'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, ChevronDown, Monitor, Eye, Zap, Users2, Sparkles } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  primary: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

const THEME_STORAGE_KEY = 'anime-resume-theme';
const DEFAULT_THEME_ID = 'phantom';

interface ThemeSwitcherProps {
  className?: string;
  onThemeChange?: (theme: Theme) => void;
}

// Theme icons mapping
const themeIcons: Record<string, React.ReactNode> = {
  persona: <Zap className="w-4 h-4" />,
  ninja: <Eye className="w-4 h-4" />,
  pirate: <Users2 className="w-4 h-4" />,
  mech: <Monitor className="w-4 h-4" />,
  cyberpunk: <Sparkles className="w-4 h-4" />,
  fantasy: <Sparkles className="w-4 h-4" />,
  space: <Monitor className="w-4 h-4" />,
  phantom: <Eye className="w-4 h-4" />,
};

export function ThemeSwitcher({ className = '', onThemeChange }: ThemeSwitcherProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load themes from JSON file
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const response = await fetch('/data/themes.json');
        const data = await response.json();
        const themeArray = Object.values(data.themes) as Theme[];
        setThemes(themeArray);
        
        // Load saved theme or default
        const savedThemeId = typeof window !== 'undefined' 
          ? localStorage.getItem(THEME_STORAGE_KEY) 
          : null;
        
        const initialTheme = savedThemeId 
          ? themeArray.find(t => t.id === savedThemeId) || themeArray.find(t => t.id === DEFAULT_THEME_ID)!
          : themeArray.find(t => t.id === DEFAULT_THEME_ID)!;
        
        setCurrentTheme(initialTheme);
      } catch (error) {
        console.error('Failed to load themes:', error);
        // Fallback theme
        const fallbackTheme: Theme = {
          id: 'fallback',
          name: 'Default',
          primary: '#e11d48',
          colors: {
            primary: '#e11d48',
            secondary: '#1f2937',
            accent: '#f59e0b',
            background: '#0a0a0a'
          }
        };
        setThemes([fallbackTheme]);
        setCurrentTheme(fallbackTheme);
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((theme: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    // Apply theme colors as CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Update Tailwind CSS variables
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--background', theme.colors.background);
    
    // Apply theme class for advanced styling
    root.setAttribute('data-theme', theme.id);
    
    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme.colors.primary);
    }
  }, []);

  // Handle theme change
  const handleThemeChange = useCallback((theme: Theme) => {
    if (theme.id === currentTheme?.id) return;
    
    setIsTransitioning(true);
    
    // Add transition class
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      setCurrentTheme(theme);
      applyTheme(theme);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, theme.id);
      }
      
      onThemeChange?.(theme);
      
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 150);
    }, 75);
    
    setIsOpen(false);
  }, [currentTheme, applyTheme, onThemeChange]);

  // Apply theme on mount
  useEffect(() => {
    if (currentTheme) {
      applyTheme(currentTheme);
    }
  }, [currentTheme, applyTheme]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        setIsOpen(false);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const currentIndex = themes.findIndex(t => t.id === currentTheme?.id);
        const nextIndex = event.key === 'ArrowDown' 
          ? (currentIndex + 1) % themes.length
          : (currentIndex - 1 + themes.length) % themes.length;
        handleThemeChange(themes[nextIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, themes, currentTheme, handleThemeChange]);

  if (loading || !currentTheme) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 rounded-lg bg-gray-700 animate-pulse" />
        <div className="w-24 h-8 rounded-lg bg-gray-700 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Theme Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-gray-700/50 hover:border-gray-600 transition-all duration-300 min-w-[160px] ${
          isOpen ? 'ring-2 ring-red-500/20' : ''
        } ${isTransitioning ? 'opacity-50' : ''}`}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        disabled={isTransitioning}
        aria-label="Switch theme"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white"
            style={{ backgroundColor: currentTheme.colors.primary }}
            animate={isTransitioning ? { rotate: 360 } : {}}
            transition={{ duration: 0.3 }}
          >
            {themeIcons[currentTheme.id] || <Palette className="w-4 h-4" />}
          </motion.div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">
              {currentTheme.name}
            </div>
            <div className="text-xs text-gray-400">
              Theme Active
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl z-50 min-w-[280px] max-h-96 overflow-y-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-3">
                <div className="text-xs font-medium text-gray-400 mb-3 px-2">
                  Choose Your Aesthetic
                </div>
                
                <div className="space-y-1">
                  {themes.map((theme, index) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        currentTheme.id === theme.id
                          ? 'bg-white/10 border border-white/20'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      {/* Theme Preview */}
                      <div className="flex-shrink-0 relative">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg"
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          {themeIcons[theme.id] || <Palette className="w-4 h-4" />}
                        </div>
                        {currentTheme.id === theme.id && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Theme Info */}
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white group-hover:text-gray-100">
                          {theme.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {theme.id === 'persona' && 'Bold & Rebellious'}
                          {theme.id === 'ninja' && 'Stealth & Shadow'}
                          {theme.id === 'pirate' && 'Ocean Adventure'}
                          {theme.id === 'mech' && 'Mechanical Power'}
                          {theme.id === 'cyberpunk' && 'Neon Future'}
                          {theme.id === 'fantasy' && 'Magical Realm'}
                          {theme.id === 'space' && 'Cosmic Journey'}
                          {theme.id === 'phantom' && 'Elite Thief'}
                        </div>
                      </div>
                      
                      {/* Color Preview */}
                      <div className="flex space-x-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="border-t border-gray-700/50 mt-4 pt-3">
                  <div className="text-xs text-gray-500 text-center">
                    <Palette className="w-3 h-3 inline mr-1" />
                    Themes auto-save to your device
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}