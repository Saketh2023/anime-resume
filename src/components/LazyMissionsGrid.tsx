"use client";

import { lazy, Suspense, useMemo } from "react";
import { motion } from "motion/react";
import { usePreferredReducedMotion } from "@/lib/performance";
import { getMotionVariant } from "@/lib/motion";
import { Target, Loader2 } from "lucide-react";

// Lazy load the actual component
const MissionsGrid = lazy(() => import("./MissionsGrid").then(module => ({ default: module.MissionsGrid })));

// Loading skeleton component
const MissionsGridSkeleton = () => {
  const prefersReducedMotion = usePreferredReducedMotion();
  
  return (
    <div className="grid gap-6 md:gap-8" role="status" aria-label="Loading missions">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-48 bg-gray-800/30 border border-gray-700/30 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3, delay: index * 0.1 }}
        >
          <div className="p-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
            <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-5/6 animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-700 rounded w-16 animate-pulse" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
      <div className="sr-only">Loading mission data...</div>
    </div>
  );
};

// Error fallback component
const MissionsGridError = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div 
    className="text-center py-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Target className="mx-auto mb-4 text-red-400" size={48} />
    <h3 className="text-xl font-semibold mb-2 text-red-400">Mission Data Unavailable</h3>
    <p className="text-gray-400 mb-4">Unable to load mission operations.</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Retry loading missions"
    >
      Retry Data Link
    </button>
  </motion.div>
);

interface LazyMissionsGridProps {
  className?: string;
}

export default function LazyMissionsGrid({ className }: LazyMissionsGridProps) {
  const prefersReducedMotion = usePreferredReducedMotion();
  
  // Memoize the component to prevent unnecessary re-renders
  const memoizedComponent = useMemo(() => (
    <Suspense fallback={<MissionsGridSkeleton />}>
      <MissionsGrid />
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