'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useKeyboardNavigation, ariaUtils } from '@/lib/accessibility';
import { usePreferredReducedMotion } from '@/lib/performance';
import { useThemeStore, getAllThemes, useThemePreview, type Theme } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemeButtonProps {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ThemeButton = ({ theme, isActive, onClick, onMouseEnter, onMouseLeave }: ThemeButtonProps) => {
  const prefersReducedMotion = usePreferredReducedMotion();
  
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative group flex flex-col items-center justify-center',
        'w-16 h-16 md:w-20 md:h-20',
        'rounded-xl border-2 transition-all duration-300',
        'bg-black/20 backdrop-blur-sm',
        'hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50',
        isActive 
          ? 'border-current shadow-lg shadow-current/50 scale-105' 
          : 'border-white/20 hover:border-white/40'
      )}
      {...ariaUtils.createButtonProps(`Switch to ${theme.name} theme`, false)}
      style={{
        color: theme.colors.primary,
        backgroundColor: isActive ? `${theme.colors.primary}20` : undefined
      }}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      initial={false}
      animate={isActive && !prefersReducedMotion ? { 
        boxShadow: `0 0 20px ${theme.colors.primary}60`,
        borderColor: theme.colors.primary 
      } : {}}
    >
      {/* Theme Icon */}
      <div className="text-2xl md:text-3xl mb-1 filter drop-shadow-sm">
        {theme.icon}
      </div>
      
      {/* Theme Name */}
      <div className="text-xs font-medium text-center leading-tight">
        {theme.name.split(' ').map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
      
      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
            initial={{ scale: 0, x: '-50%' }}
            animate={{ scale: 1, x: '-50%' }}
            exit={{ scale: 0, x: '-50%' }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${theme.colors.primary}20 0%, transparent 70%)`
        }}
      />
    </motion.button>
  );
};

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme, isTransitioning } = useThemeStore();
  const { previewTheme, clearPreview } = useThemePreview();
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapse by default, but button will be more prominent
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePreferredReducedMotion();
  
  // Keyboard navigation support
  useKeyboardNavigation(containerRef, {
    onEscape: () => setIsCollapsed(false),
    onEnter: () => setIsCollapsed(!isCollapsed)
  });
  
  const themes = getAllThemes();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null; // Prevent hydration mismatch
  }
  
  const handleThemeChange = (themeId: string) => {
    if (themeId !== currentTheme) {
      setTheme(themeId);
      // setIsCollapsed(true);
    }
  };
  
  const handleThemePreview = (themeId: string) => {
    if (themeId !== currentTheme) {
      previewTheme(themeId);
    }
  };
  
  return (
    <motion.div
      className="fixed top-6 right-6 z-[9999]" // Very high z-index
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }} // Faster appearance
    >
      <div className="relative">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'flex items-center justify-center w-16 h-16',
            'rounded-full border-3 border-white/60 bg-black/80 backdrop-blur-md shadow-2xl',
            'text-white hover:border-white/60 transition-all duration-300',
            'shadow-lg hover:shadow-xl hover:scale-105',
            'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50',
            isCollapsed && 'mb-2'
          )}
          {...ariaUtils.createButtonProps(
            isCollapsed ? 'Open theme selector' : 'Close theme selector',
            !isCollapsed,
            'theme-panel'
          )}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          style={{ 
            backgroundColor: themes.find(t => t.id === currentTheme)?.colors.primary + '40',
            borderColor: themes.find(t => t.id === currentTheme)?.colors.primary + '80',
            boxShadow: isCollapsed ? 'none' : `0 0 20px ${themes.find(t => t.id === currentTheme)?.colors.primary}60`
          }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 45 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold"
          >
            🎨
          </motion.div>
        </motion.button>
        
        {/* Theme Buttons Panel */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              id="theme-panel"
              ref={containerRef}
              className={cn(
                'absolute top-16 right-0 p-4',
                'bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl',
                'shadow-2xl min-w-max'
              )}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3 }}
              role="dialog"
              aria-labelledby="theme-selector-heading"
              aria-modal="false"
            >
              {/* Header */}
              <div className="text-center mb-4">
                <h3 id="theme-selector-heading" className="text-sm font-semibold text-white mb-1">Choose Theme</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto" aria-hidden="true" />
              </div>
              
              {/* Theme Grid */}
              <div className="grid grid-cols-2 gap-3" role="group" aria-label="Available themes">
                {themes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? 
                      { duration: 0.1 } : 
                      { duration: 0.3, delay: index * 0.05 }
                    }
                  >
                    <ThemeButton
                      theme={theme}
                      isActive={currentTheme === theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      onMouseEnter={() => handleThemePreview(theme.id)}
                      onMouseLeave={clearPreview}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="text-center mt-4 pt-3 border-t border-white/10">
                <p className="text-xs text-white/60">
                  Current: <span className="font-medium text-white">{themes.find(t => t.id === currentTheme)?.name}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Transition Loading Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="text-white font-medium">Switching theme...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ThemeSwitcher;