// Motion variants for consistent animations across the app
// Performance-optimized with reduced motion support

// Reduced motion alternatives for accessibility
export const reducedMotion = {
  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } }
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } }
  },
  slideInLeft: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } }
  },
  slideInRight: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } }
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

// Utility to get motion variant based on user preference
export function getMotionVariant(
  normalVariant: any,
  prefersReducedMotion: boolean
) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } }
    };
  }
  return normalVariant;
}

export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
  }
};

export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  }
};

export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  }
};

export const slideInRight = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  }
};

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  }
};

// Floating animation for decorative elements
export const floating = {
  initial: {
    y: 0,
  },
  animate: {
    y: -10,
  }
};

// Pulse animation
export const pulse = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.05,
  }
};

// Glow effect animation
export const glow = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const
    }
  }
};

// Bounce animation
export const bounce = {
  initial: {
    y: 0,
  },
  animate: {
    y: -20,
  }
};

// Rotate animation
export const rotate = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
  }
};

// Phantom-specific animations
export const phantomSlide = {
  initial: {
    opacity: 0,
    x: -50,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
  }
};

export const phantomGlow = {
  initial: {
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
  },
  animate: {
    boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
  }
};

// Page transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

// Hover animations
export const hoverScale = {
  whileHover: {
    scale: 1.05,
  },
  whileTap: {
    scale: 0.95,
  },
};

export const hoverGlow = {
  whileHover: {
    textShadow: '0 0 10px currentColor',
  },
};

// Loading animation
export const loadingSpinner = {
  animate: {
    rotate: 360,
  }
};

// Modal animations
export const modalOverlay = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const modalContent = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
};

// Theme transition
export const themeTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

// Missing variants
export const elasticScale = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.95,
  },
};

export const themeSwitch = {
  initial: {
    opacity: 0,
    rotateY: -90,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
  },
};

export const scanLine = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: '100%',
  },
};

// Mission-specific animations
export const missionReveal = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

// Progress bar animation
export const progressBar = {
  initial: {
    width: 0,
  },
  animate: {
    width: '100%',
    transition: {
      duration: 1.5,
      ease: 'easeOut' as const
    }
  },
};

// Performance-optimized variants
export const performanceOptimized = {
  fadeInUp: {
    initial: {
      opacity: 0,
      y: 30, // Reduced from 60 for better performance
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom bezier for smoother animation
      }
    }
  },
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.9, // Reduced scale change for performance
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const
      }
    }
  }
};