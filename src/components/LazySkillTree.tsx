"use client";

import { lazy, Suspense, useMemo } from "react";
import { motion } from "motion/react";
import { usePreferredReducedMotion } from "@/lib/performance";
import { getMotionVariant } from "@/lib/motion";
import { TreePine, Loader2 } from "lucide-react";

// Lazy load the actual component
const SkillTree = lazy(() => import("./SkillTree").then(module => ({ default: module.SkillTree })));

// Loading skeleton for skill tree
const SkillTreeSkeleton = () => {
  const prefersReducedMotion = usePreferredReducedMotion();
  
  return (
    <div 
      className="relative min-h-[600px] bg-gray-900/20 border border-gray-700/30 rounded-xl p-6 backdrop-blur-sm overflow-hidden"
      role="status"
      aria-label="Loading skill tree"
    >
      {/* Skill category headers */}
      {['Frontend', 'Backend', 'DevOps', 'Design'].map((category, categoryIndex) => (
        <div key={category} className="mb-8">
          <motion.div
            className="flex items-center space-x-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3, delay: categoryIndex * 0.1 }}
          >
            <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
            <div className="h-5 bg-gray-700 rounded w-24 animate-pulse" />
          </motion.div>
          
          {/* Skill nodes skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, skillIndex) => (
              <motion.div
                key={skillIndex}
                className="relative p-4 bg-gray-800/30 border border-gray-700/30 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={prefersReducedMotion ? 
                  { duration: 0.1 } : 
                  { duration: 0.3, delay: (categoryIndex * 4 + skillIndex) * 0.05 }
                }
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                  <div className="h-2 bg-gray-700 rounded w-full animate-pulse" />
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-700 rounded-full animate-pulse" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="flex items-center space-x-2 text-gray-400"
          animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading skill data...</span>
        </motion.div>
      </div>
      
      <div className="sr-only">Loading skill tree data...</div>
    </div>
  );
};

// Error fallback component
const SkillTreeError = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div 
    className="text-center py-12 min-h-[400px] flex flex-col items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <TreePine className="mx-auto mb-4 text-red-400" size={48} />
    <h3 className="text-xl font-semibold mb-2 text-red-400">Skill Tree Data Corrupted</h3>
    <p className="text-gray-400 mb-4">Unable to load skill progression data.</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Retry loading skill tree"
    >
      Reinitialize System
    </button>
  </motion.div>
);

interface LazySkillTreeProps {
  className?: string;
}

export default function LazySkillTree({ className }: LazySkillTreeProps) {
  const prefersReducedMotion = usePreferredReducedMotion();
  
  // Memoize the component to prevent unnecessary re-renders
  const memoizedComponent = useMemo(() => (
    <Suspense fallback={<SkillTreeSkeleton />}>
      <SkillTree />
    </Suspense>
  ), []);

  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
      variants={getMotionVariant(
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        },
        prefersReducedMotion
      )}
    >
      {memoizedComponent}
    </motion.div>
  );
}