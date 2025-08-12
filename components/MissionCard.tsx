'use client';

import { motion } from 'motion/react';
import { elasticScale, glow } from '@/lib/motion';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  rank: string;
  status: string;
  tech: string[];
  impact: string;
  team: number;
  duration: string;
  type: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  role: string;
  achievements: string[];
  metrics: Record<string, string>;
  rewards: string[];
  links: Record<string, string>;
  tags: string[];
  icon: string;
  rarity: string;
  experienceGained: number;
  skillsUnlocked: string[];
  progress?: number;
}

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
}

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const statusColors = {
    completed: 'border-green-500 bg-green-500/10 hover:bg-green-500/20',
    'in-progress': 'border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20',
    locked: 'border-gray-500 bg-gray-500/10 opacity-50',
    legendary: 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20'
  };

  const rankColors = {
    'S': 'text-yellow-400 bg-yellow-400/20',
    'SS': 'text-orange-400 bg-orange-400/20',
    'SSS': 'text-purple-400 bg-purple-400/20',
    'A': 'text-blue-400 bg-blue-400/20',
    'B': 'text-green-400 bg-green-400/20',
    'C': 'text-gray-400 bg-gray-400/20'
  };

  const rarityColors = {
    legendary: 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    epic: 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    rare: 'border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    common: 'border-gray-500 bg-gray-500/10'
  };

  const getStatusColor = () => {
    if (mission.rarity === 'legendary') return statusColors.legendary;
    return statusColors[mission.status as keyof typeof statusColors] || statusColors.completed;
  };

  const isLegendary = mission.rarity === 'legendary';
  const isInProgress = mission.status === 'in-progress';

  return (
    <motion.div
      className={`relative p-6 rounded-xl border-2 cursor-pointer backdrop-blur-sm overflow-hidden transition-all duration-300 ${
        rarityColors[mission.rarity as keyof typeof rarityColors] || rarityColors.common
      }`}
      variants={elasticScale}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      style={{
        background: isLegendary ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)' : undefined
      }}
    >
      {isLegendary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20"
          variants={glow}
          animate="animate"
        />
      )}
      
      {isInProgress && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div 
              className="text-3xl drop-shadow-lg"
              animate={isLegendary ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {mission.icon}
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-white">{mission.title}</h3>
              <p className="text-sm text-gray-400 mb-1">{mission.subtitle}</p>
              <div className="text-xs text-gray-500">{mission.company} • {mission.duration}</div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs font-bold ${
            rankColors[mission.rank as keyof typeof rankColors] || rankColors.C
          }`}>
            RANK {mission.rank}
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{mission.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {mission.tech.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
          {mission.tech.length > 4 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
              +{mission.tech.length - 4}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-green-400 mb-2 font-medium">
            {mission.impact}
          </div>
          <div className="text-xs text-gray-500">
            {mission.team} members • +{mission.experienceGained} XP
          </div>
        </div>
        
        {isInProgress && mission.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{mission.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1">
          {mission.rewards.slice(0, 2).map((reward, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
            >
              {reward}
            </span>
          ))}
          {mission.rewards.length > 2 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
              +{mission.rewards.length - 2} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

