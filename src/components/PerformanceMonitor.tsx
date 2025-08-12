"use client";

import { useEffect } from "react";
import { performanceMonitor } from "@/lib/performance";

interface PerformanceMonitorProps {
  enabled?: boolean;
}

export function PerformanceMonitor({ enabled = process.env.NODE_ENV === 'development' }: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const reportWebVitals = (metric: any) => {
      console.log(`[Performance] ${metric.name}:`, metric.value, 'ms');
      
      // Report to analytics if needed
      if (process.env.NODE_ENV === 'production') {
        // Track to analytics service
        // gtag('event', metric.name, {
        //   event_category: 'Web Vitals',
        //   value: Math.round(metric.value),
        //   non_interaction: true,
        // });
      }
    };

    // First Contentful Paint
    const observeFCP = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportWebVitals({
            name: 'FCP',
            value: entry.startTime,
            id: entry.entryType + entry.startTime
          });
        }
      }
    });

    // Largest Contentful Paint
    const observeLCP = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVitals({
          name: 'LCP',
          value: entry.startTime,
          id: entry.entryType + entry.startTime
        });
      }
    });

    // Time to First Byte
    const observeNavigation = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const navigationEntry = entry as PerformanceNavigationTiming;
        reportWebVitals({
          name: 'TTFB',
          value: navigationEntry.responseStart - navigationEntry.requestStart,
          id: 'ttfb-' + navigationEntry.startTime
        });
      }
    });

    try {
      observeFCP.observe({ entryTypes: ['paint'] });
      observeLCP.observe({ entryTypes: ['largest-contentful-paint'] });
      observeNavigation.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('[Performance] Observer not supported:', error);
    }

    // Monitor component render times
    const measureRender = performanceMonitor.measureComponentRender('HomePage');
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('[Performance] Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
      });
    }

    return () => {
      measureRender();
      observeFCP.disconnect();
      observeLCP.disconnect();
      observeNavigation.disconnect();
    };
  }, [enabled]);

  // Don't render anything
  return null;
}

/**
 * Performance-aware image component
 */
export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}) {
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      // Preload critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  }, [src, priority]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
}

/**
 * Component to track when sections come into view
 */
export function SectionTracker({
  sectionName,
  children,
  className
}: {
  sectionName: string;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && process.env.NODE_ENV === 'development') {
            console.log(`[Performance] Section "${sectionName}" visible`);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`[data-section="${sectionName}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionName]);

  return (
    <div data-section={sectionName} className={className}>
      {children}
    </div>
  );
}