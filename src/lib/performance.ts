import { useEffect, useState } from 'react';

/**
 * Hook to detect user's motion preferences for accessibility
 */
export function usePreferredReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for intersection observer to optimize animations
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isVisible;
}

/**
 * Optimized animation variants that respect user preferences
 */
export function getOptimizedVariants(
  normalVariant: any,
  reducedMotionVariant: any,
  prefersReducedMotion: boolean
) {
  return prefersReducedMotion ? reducedMotionVariant : normalVariant;
}

/**
 * Performance-optimized image loading
 */
export function useImagePreload(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);

  return loaded;
}

/**
 * Debounce hook for performance optimization
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Performance monitoring utility
 */
export const performanceMonitor = {
  measureComponentRender: (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${end - start}ms`);
      }
    };
  },
  
  measureAsyncOperation: async (operationName: string, operation: () => Promise<any>) => {
    const start = performance.now();
    try {
      const result = await operation();
      const end = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`${operationName} completed in: ${end - start}ms`);
      }
      return result;
    } catch (error) {
      const end = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.error(`${operationName} failed after: ${end - start}ms`, error);
      }
      throw error;
    }
  }
};