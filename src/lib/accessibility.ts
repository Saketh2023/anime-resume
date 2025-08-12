import { useEffect, useRef, useState } from 'react';

/**
 * Focus management utilities for accessibility
 */
export const focusManager = {
  /**
   * Trap focus within a container for modals/dialogs
   */
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Manage focus return after modal close
   */
  createFocusReturn: (triggerElement?: HTMLElement) => {
    const previousActiveElement = document.activeElement as HTMLElement;
    
    return () => {
      if (triggerElement) {
        triggerElement.focus();
      } else if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }
};

/**
 * Hook for managing keyboard navigation
 */
export function useKeyboardNavigation(
  containerRef: React.RefObject<HTMLElement | null>,
  options: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  } = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (options.onEnter) {
            e.preventDefault();
            options.onEnter();
          }
          break;
        case 'Escape':
          if (options.onEscape) {
            e.preventDefault();
            options.onEscape();
          }
          break;
        case 'ArrowUp':
          if (options.onArrowKeys) {
            e.preventDefault();
            options.onArrowKeys('up');
          }
          break;
        case 'ArrowDown':
          if (options.onArrowKeys) {
            e.preventDefault();
            options.onArrowKeys('down');
          }
          break;
        case 'ArrowLeft':
          if (options.onArrowKeys) {
            e.preventDefault();
            options.onArrowKeys('left');
          }
          break;
        case 'ArrowRight':
          if (options.onArrowKeys) {
            e.preventDefault();
            options.onArrowKeys('right');
          }
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, options]);
}

/**
 * ARIA utilities for better screen reader support
 */
export const ariaUtils = {
  /**
   * Generate unique IDs for ARIA relationships
   */
  generateId: (prefix = 'element') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  /**
   * Announce text to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create accessible button props
   */
  createButtonProps: (label: string, expanded?: boolean, controls?: string) => ({
    'aria-label': label,
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
    ...(controls && { 'aria-controls': controls }),
    role: 'button',
    tabIndex: 0
  })
};

/**
 * Hook for screen reader announcements
 */
export function useScreenReaderAnnouncement() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    ariaUtils.announce(message, priority);
  };

  return announce;
}

/**
 * Reduced motion variants for animations
 */
export const reducedMotionVariants = {
  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }
};

/**
 * High contrast mode detection
 */
export function useHighContrast(): boolean {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHighContrast(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
}

