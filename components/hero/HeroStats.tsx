'use client';

import { motion } from 'motion/react';
import { StatBar } from './StatBar';
import { staggerContainer, fadeInUp, scaleIn, floating, scanLine } from '@/lib/motion';

interface ProfileData {
  level: number;
  stats: {
    chakra: number;
    maxChakra: number;
    focus: number;
    maxFocus: number;
    creativity: number;
    maxCreativity: number;
    experience: number;
    maxExperience: number;
  };
  currentRank: string;
  nextRank: string;
  rankProgress: number;
  totalMissionsCompleted: number;
  legendaryAchievements: number;
}

interface HeroStatsProps {
  profileData?: ProfileData | null;
}

export function HeroStats({ profileData }: HeroStatsProps) {
  if (!profileData) {
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            className="h-24 bg-gray-800/50 rounded-lg animate-pulse border border-gray-700/50"
            variants={fadeInUp}
          />
        ))}
      </motion.div>
    );
  }

  const stats = [
    {
      label: "Chakra",
      current: profileData.stats.chakra,
      max: profileData.stats.maxChakra,
      color: "blue" as const,
      icon: "⚡",
      description: "Mental energy and focus"
    },
    {
      label: "Focus",
      current: profileData.stats.focus,
      max: profileData.stats.maxFocus,
      color: "green" as const,
      icon: "🎯",
      description: "Concentration and attention to detail"
    },
    {
      label: "Creativity",
      current: profileData.stats.creativity,
      max: profileData.stats.maxCreativity,
      color: "purple" as const,
      icon: "🎨",
      description: "Innovation and problem-solving"
    },
    {
      label: "Experience",
      current: profileData.stats.experience,
      max: profileData.stats.maxExperience,
      color: "yellow" as const,
      icon: "📈",
      description: "Overall development expertise"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Level and rank display */}
      <motion.div 
        className="text-center space-y-2"
        variants={scaleIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-3"
          variants={floating}
          animate="animate"
        >
          <span className="text-3xl">👑</span>
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LEVEL {profileData.level}
            </div>
            <div className="text-sm text-gray-400">
              {profileData.currentRank} → {profileData.nextRank}
            </div>
          </div>
        </motion.div>
        
        {/* Rank progress */}
        <motion.div className="max-w-md mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Rank Progress</span>
            <span>{profileData.rankProgress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${profileData.rankProgress}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* HUD-style stats grid */}
      <motion.div 
        className="relative"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          variants={scanLine}
          animate="animate"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 overflow-hidden"
              variants={fadeInUp}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(34, 211, 238, 0.6)",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* HUD corner decorations */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="text-xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {stat.icon}
                    </motion.span>
                    <span className="text-cyan-300 font-semibold text-sm">
                      {stat.label.toUpperCase()}
                    </span>
                  </div>
                  <motion.span 
                    className="text-white font-bold text-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.current}
                  </motion.span>
                </div>
                
                <StatBar
                  label={stat.label}
                  current={stat.current}
                  max={stat.max}
                  color={stat.color}
                  showPercentage
                  animated
                  delay={index * 0.1}
                />
                
                <div className="text-xs text-gray-400 mt-2 opacity-75">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement summary */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center"
          variants={scaleIn}
        >
          <motion.div 
            className="text-2xl text-green-400 font-bold mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {profileData.totalMissionsCompleted}
          </motion.div>
          <div className="text-xs text-gray-400">Missions Complete</div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 text-center"
          variants={scaleIn}
        >
          <motion.div 
            className="text-2xl text-purple-400 font-bold mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            {profileData.legendaryAchievements}
          </motion.div>
          <div className="text-xs text-gray-400">Legendary Achievements</div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4 text-center"
          variants={scaleIn}
        >
          <motion.div 
            className="text-2xl text-blue-400 font-bold mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            85%
          </motion.div>
          <div className="text-xs text-gray-400">Skill Mastery</div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 text-center"
          variants={scaleIn}
        >
          <motion.div 
            className="text-2xl text-yellow-400 font-bold mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            99.9%
          </motion.div>
          <div className="text-xs text-gray-400">Uptime</div>
        </motion.div>
      </motion.div>
    </div>
  );
}