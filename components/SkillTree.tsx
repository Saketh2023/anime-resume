'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { staggerContainer, fadeInUp, scaleIn, progressBar, elasticScale, glow } from '@/lib/motion';

interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  icon: string;
  category: string;
  prerequisites: string[];
  unlocked: boolean;
}

interface SkillTreeProps {
  onSkillClick?: (skill: Skill) => void;
}

export function SkillTree({ onSkillClick }: SkillTreeProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch('/data/skills.json');
        if (!response.ok) {
          throw new Error('Failed to load skills data');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const handleSkillClick = (skill: Skill) => {
    onSkillClick?.(skill);
  };

  const getSkillGradient = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    if (percentage >= 90) return 'from-purple-500 to-pink-500';
    if (percentage >= 75) return 'from-blue-500 to-purple-500';
    if (percentage >= 50) return 'from-green-500 to-blue-500';
    if (percentage >= 25) return 'from-yellow-500 to-green-500';
    return 'from-red-500 to-yellow-500';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 w-20 bg-gray-800/50 rounded-md animate-pulse" />
          ))}
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div
              key={index}
              className="h-48 bg-gray-800/50 rounded-lg animate-pulse border border-gray-700/50"
              variants={fadeInUp}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-400 mb-2">⚠️ Skill Tree Corrupted</div>
        <div className="text-gray-400 text-sm">{error}</div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex gap-2 flex-wrap"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
          }`}
          variants={elasticScale}
          whileHover="hover"
          whileTap="tap"
        >
          All Skills ({skills.length})
        </motion.button>
        {categories.map((category) => {
          const categorySkills = skills.filter(skill => skill.category === category);
          const unlockedCount = categorySkills.filter(skill => skill.unlocked).length;
          
          return (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
              variants={elasticScale}
              whileHover="hover"
              whileTap="tap"
            >
              {category} ({unlockedCount}/{categorySkills.length})
            </motion.button>
          );
        })}
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {filteredSkills.map((skill) => {
            const skillPercentage = (skill.level / skill.maxLevel) * 100;
            const isMaxLevel = skill.level === skill.maxLevel;
            const isHighLevel = skillPercentage >= 85;
            
            return (
              <motion.div
                key={skill.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  skill.unlocked
                    ? isHighLevel
                      ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:bg-purple-500/20'
                      : 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20'
                    : 'border-gray-600 bg-gray-600/10 opacity-50 cursor-not-allowed'
                }`}
                variants={scaleIn}
                whileHover={skill.unlocked ? elasticScale.hover : undefined}
                whileTap={skill.unlocked ? elasticScale.tap : undefined}
                onClick={() => skill.unlocked && handleSkillClick(skill)}
                layoutId={skill.id}
              >
                {/* Legendary skill glow effect */}
                {isMaxLevel && skill.unlocked && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20"
                    variants={glow}
                    animate="animate"
                  />
                )}
                
                {/* Skill mastery indicator */}
                {isMaxLevel && (
                  <div className="absolute top-2 right-2 text-yellow-400 text-lg">
                    🌟
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className="text-2xl drop-shadow-lg"
                      animate={isMaxLevel ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-base ${
                        skill.unlocked ? 'text-white' : 'text-gray-500'
                      }`}>
                        {skill.name}
                      </h3>
                      <div className="text-sm text-gray-400">
                        Level {skill.level}/{skill.maxLevel}
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${
                    skill.unlocked ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {skill.description}
                  </p>
                  
                  {/* Skill progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className={`font-medium ${
                        skill.unlocked ? 'text-white' : 'text-gray-500'
                      }`}>
                        {skillPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${getSkillGradient(skill.level, skill.maxLevel)} rounded-full`}
                        variants={progressBar}
                        style={{ width: `${skillPercentage}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.3,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Prerequisites indicator */}
                  {!skill.unlocked && skill.prerequisites.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">
                      🔒 Requires: {skill.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}