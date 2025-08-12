'use client';

import { motion } from 'motion/react';

interface StatBarProps {
  label: string;
  current: number;
  max: number;
  color: 'blue' | 'red' | 'green' | 'purple' | 'yellow';
  showPercentage?: boolean;
  animated?: boolean;
  delay?: number;
  height?: 'sm' | 'md' | 'lg';
}

export function StatBar({ 
  label, 
  current, 
  max, 
  color, 
  showPercentage = false, 
  animated = true,
  delay = 0,
  height = 'md'
}: StatBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    blue: 'from-blue-600 to-blue-400',
    red: 'from-red-600 to-red-400',
    green: 'from-green-600 to-green-400',
    purple: 'from-purple-600 to-purple-400',
    yellow: 'from-yellow-600 to-yellow-400',
  };

  const shadowClasses = {
    blue: 'shadow-blue-500/30',
    red: 'shadow-red-500/30',
    green: 'shadow-green-500/30',
    purple: 'shadow-purple-500/30',
    yellow: 'shadow-yellow-500/30',
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">
          {showPercentage ? `${percentage.toFixed(0)}%` : `${current}/${max}`}
        </span>
      </div>
      <div className={`w-full bg-gray-800 rounded-full ${heightClasses[height]} overflow-hidden`}>
        {animated ? (
          <motion.div
            className={`${heightClasses[height]} bg-gradient-to-r ${colorClasses[color]} rounded-full shadow-lg ${shadowClasses[color]}`}
            initial={{ width: 0, opacity: 0.8 }}
            whileInView={{ width: `${percentage}%`, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          />
        ) : (
          <div
            className={`${heightClasses[height]} bg-gradient-to-r ${colorClasses[color]} rounded-full shadow-lg ${shadowClasses[color]} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      
      {/* Animated progress particles */}
      {animated && percentage > 0 && (
        <motion.div
          className="relative h-0 overflow-visible"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {Array.from({ length: Math.min(Math.floor(percentage / 20), 3) }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${(percentage * (index + 1)) / 4}%`,
                top: '-2px'
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}