import { Variants, Transition } from 'motion/react';

// Base easing and timing configurations
export const MOTION_CONFIG = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 0.5,
  staggerDelay: 0.06,
  springConfig: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20
  }
};

// Reduced motion support
export const getMotionConfig = (duration: number = MOTION_CONFIG.duration): Transition => ({
  duration,
  ease: MOTION_CONFIG.ease
});

// Common animation variants
export const fadeInUp: Variants = {
  initial: { 
    y: 24, 
    opacity: 0 
  },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: getMotionConfig()
  },
  exit: { 
    y: -24, 
    opacity: 0,
    transition: getMotionConfig(0.3)
  }
};

export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: getMotionConfig()
  },
  exit: { 
    opacity: 0,
    transition: getMotionConfig(0.3)
  }
};

export const scaleIn: Variants = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: getMotionConfig()
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: getMotionConfig(0.3)
  }
};

export const slideInLeft: Variants = {
  initial: { 
    x: -48, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: getMotionConfig()
  },
  exit: { 
    x: -48, 
    opacity: 0,
    transition: getMotionConfig(0.3)
  }
};

export const slideInRight: Variants = {
  initial: { 
    x: 48, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: getMotionConfig()
  },
  exit: { 
    x: 48, 
    opacity: 0,
    transition: getMotionConfig(0.3)
  }
};

// Stagger container for animating lists
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: MOTION_CONFIG.staggerDelay
    }
  }
};

// Elastic scaling for interactive elements
export const elasticScale: Variants = {
  initial: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05,
    transition: MOTION_CONFIG.springConfig
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Progress bar animation
export const progressBar: Variants = {
  initial: { 
    scaleX: 0,
    originX: 0
  },
  animate: { 
    scaleX: 1,
    transition: {
      ...MOTION_CONFIG.springConfig,
      delay: 0.2
    }
  }
};

// Floating animation for continuous motion
export const floating: Variants = {
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation for attention-grabbing elements
export const pulse: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Glow effect for special elements
export const glow: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(59, 130, 246, 0)"
  },
  animate: {
    boxShadow: [
      "0 0 0 rgba(59, 130, 246, 0)",
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 0 rgba(59, 130, 246, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scanning line effect for HUD elements
export const scanLine: Variants = {
  initial: {
    backgroundPosition: "-100% 0"
  },
  animate: {
    backgroundPosition: "100% 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Layout animation for smooth transitions
export const layoutTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

// Utility function to create viewport-triggered animations
export const createViewportAnimation = (
  variants: Variants,
  options?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  }
) => ({
  variants,
  initial: "initial",
  whileInView: "animate",
  viewport: {
    once: options?.once ?? true,
    margin: options?.margin ?? "-10%",
    amount: options?.amount ?? 0.3
  }
});

// Skill tree connection line animation
export const connectionLine: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    }
  }
};

// Mission card reveal animation
export const missionReveal: Variants = {
  initial: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Stat counter animation
export const statCounter: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  }
};

// Theme switch animation
export const themeSwitch: Variants = {
  initial: {
    rotate: 0,
    scale: 1
  },
  animate: {
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: {
      rotate: { duration: 0.6, ease: "easeInOut" },
      scale: { duration: 0.4, ease: "easeOut" }
    }
  }
};