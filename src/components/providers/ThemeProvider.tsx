'use client';

import { useEffect, useState } from 'react';
import { initializeTheme, useThemeStore } from '@/lib/themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
    setMounted(true);
  }, []);

  // Re-apply theme when it changes
  useEffect(() => {
    if (mounted) {
    }
  }, [currentTheme, mounted]);

  return <>{children}</>;
};

export default ThemeProvider;