'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Zap, Target, Users } from 'lucide-react';

interface ProfileData {
  name: string;
  codename: string;
  title: string;
  level: number;
  currentRank: string;
  totalMissionsCompleted: number;
  legendaryAchievements: number;
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
  specialties: string[];
  favoriteQuote: string;
}

interface ShareCardProps {
  profileData: ProfileData | null;
  className?: string;
}

export function ShareCard({ profileData, className = '' }: ShareCardProps) {
  if (!profileData) return null;

  const statBars = [
    { 
      name: 'Chakra', 
      value: profileData.stats.chakra, 
      max: profileData.stats.maxChakra, 
      color: 'from-blue-500 to-cyan-400',
      icon: '⚡'
    },
    { 
      name: 'Focus', 
      value: profileData.stats.focus, 
      max: profileData.stats.maxFocus, 
      color: 'from-purple-500 to-pink-400',
      icon: '🎯'
    },
    { 
      name: 'Creativity', 
      value: profileData.stats.creativity, 
      max: profileData.stats.maxCreativity, 
      color: 'from-orange-500 to-yellow-400',
      icon: '✨'
    },
    { 
      name: 'Experience', 
      value: profileData.stats.experience, 
      max: profileData.stats.maxExperience, 
      color: 'from-green-500 to-emerald-400',
      icon: '📈'
    },
  ];

  return (
    <div id="share-card" className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-[630px] w-[1200px] p-8 flex flex-col ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--theme-primary-rgb,236,72,153),0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:20px_20px]" />
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Phantom Thief Badge */}
          <div className="inline-flex items-center px-4 py-2 theme-card border-2 border-theme-primary rounded-full mb-4">
            <span className="text-xl mr-2">👻</span>
            <span className="text-theme-primary font-bold text-base tracking-wider">PHANTOM THIEF</span>
          </div>

          {/* Name and Codename */}
          <h1 className="text-4xl font-black text-white mb-3 leading-tight">
            {profileData.name}
          </h1>
          <div className="text-2xl font-bold text-theme-accent mb-2">
            &quot;{profileData.codename}&quot;
          </div>
          <div className="text-xl text-gray-300 mb-6">
            {profileData.title}
          </div>

          {/* Level and Rank */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center mb-1">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                  <span className="text-lg font-black text-white">{profileData.level}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 font-medium">LEVEL</div>
            </div>
            <div className="text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{profileData.currentRank}</div>
              <div className="text-xs text-gray-400">RANK</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-6 mb-8 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Power Levels */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Power Assessment</h3>
            </div>
            <div className="space-y-3">
              {statBars.map((stat, index) => (
                <div key={stat.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">{stat.icon}</span>
                      <span className="text-white font-medium text-sm">{stat.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {stat.value}/{stat.max}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Stats */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-red-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Mission Report</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-black text-red-400 mb-1">
                  {profileData.totalMissionsCompleted}
                </div>
                <div className="text-gray-400 text-sm">Missions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400 mb-1">
                  {profileData.legendaryAchievements}
                </div>
                <div className="text-gray-400 text-sm">Legendary Achievements</div>
              </div>
              <div className="text-center pt-3 border-t border-gray-700">
                <div className="text-base font-bold text-green-400">ELITE STATUS</div>
                <div className="text-xs text-gray-400">Ready for Any Heist</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specialties */}
        <motion.div 
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-blue-400 mr-2" />
            <h3 className="text-lg font-bold text-white">Core Specialties</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {profileData.specialties.slice(0, 6).map((specialty, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-3 py-1 bg-white/5 border-white/20 text-white hover:bg-white/10 text-sm"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Footer with Quote */}
        <motion.div 
          className="text-center border-t border-gray-700 pt-4 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-3">
            <div className="text-sm text-gray-300 italic font-medium leading-relaxed max-w-lg mx-auto">
              &quot;{profileData.favoriteQuote.length > 120 ? profileData.favoriteQuote.slice(0, 120) + '...' : profileData.favoriteQuote}&quot;
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
            <span>⚡</span>
            <span>Phantom Thief Resume System</span>
            <span>⚡</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-6 left-6 text-4xl opacity-10">🎭</div>
      <div className="absolute bottom-6 right-6 text-4xl opacity-10">⚔️</div>
      <div className="absolute top-1/2 left-0 w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50" />
      <div className="absolute top-1/2 right-0 w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50" />
    </div>
  );
}