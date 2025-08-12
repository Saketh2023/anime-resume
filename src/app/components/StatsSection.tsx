"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { staggerContainer, fadeInUp, scaleIn, progressBar } from "@/lib/motion";

interface ProfileData {
  personalityTraits: {
    analytical: number;
    creative: number;
    collaborative: number;
    leadership: number;
    adaptability: number;
  };
  currentRank: string;
  nextRank: string;
  rankProgress: number;
}

interface StatsSectionProps {
  profileData?: ProfileData | null;
}

interface Skill {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  category: string;
  icon: string;
  description: string;
  isMaxLevel?: boolean;
}

const skillsData: Skill[] = [
  {
    name: "TypeScript Mastery",
    level: 85,
    experience: 8500,
    maxExperience: 10000,
    category: "Languages",
    icon: "🔷",
    description: "Type safety is my middle name",
  },
  {
    name: "React Summoning",
    level: 92,
    experience: 9200,
    maxExperience: 10000,
    category: "Frontend",
    icon: "⚛️",
    description: "Components bow to my will",
  },
  {
    name: "Node.js Conjuring",
    level: 78,
    experience: 7800,
    maxExperience: 10000,
    category: "Backend",
    icon: "🟢",
    description: "Server whisperer extraordinaire",
  },
  {
    name: "Database Alchemy",
    level: 88,
    experience: 8800,
    maxExperience: 10000,
    category: "Data",
    icon: "🗄️",
    description: "I speak fluent SQL and NoSQL",
  },
  {
    name: "Cloud Architecture",
    level: 82,
    experience: 8200,
    maxExperience: 10000,
    category: "DevOps",
    icon: "☁️",
    description: "Building castles in the cloud",
  },
  {
    name: "Git Wizardry",
    level: 95,
    experience: 9500,
    maxExperience: 10000,
    category: "Tools",
    icon: "🌟",
    description: "Master of time travel and parallel universes",
  },
  {
    name: "Coffee Brewing",
    level: 100,
    experience: 10000,
    maxExperience: 10000,
    category: "Life Skills",
    icon: "☕",
    description: "Legendary barista powers achieved",
    isMaxLevel: true,
  },
  {
    name: "Rubber Duck Debugging",
    level: 97,
    experience: 9700,
    maxExperience: 10000,
    category: "Problem Solving",
    icon: "🦆",
    description: "Fluent in duck language",
  },
];

export function StatsSection({ profileData }: StatsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({});
  const [showLevelUp, setShowLevelUp] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(skillsData.map(skill => skill.category)))];
  
  const filteredSkills = selectedCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  useEffect(() => {
    // Animate skill levels on component mount
    const timer = setTimeout(() => {
      const animated: {[key: string]: number} = {};
      skillsData.forEach(skill => {
        animated[skill.name] = skill.level;
      });
      setAnimatedLevels(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSkillClick = (skillName: string) => {
    setShowLevelUp(skillName);
    setTimeout(() => setShowLevelUp(null), 2000);
  };

  const getSkillColor = (category: string) => {
    const colors: {[key: string]: string} = {
      "Languages": "from-blue-500 to-blue-400",
      "Frontend": "from-cyan-500 to-cyan-400", 
      "Backend": "from-green-500 to-green-400",
      "Data": "from-purple-500 to-purple-400",
      "DevOps": "from-orange-500 to-orange-400",
      "Tools": "from-yellow-500 to-yellow-400",
      "Life Skills": "from-pink-500 to-pink-400",
      "Problem Solving": "from-indigo-500 to-indigo-400",
    };
    return colors[category] || "from-gray-500 to-gray-400";
  };

  if (!profileData) {
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-32 bg-gray-800/50 rounded-lg animate-pulse" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        variants={fadeInUp}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Power Level Assessment
        </motion.h1>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every phantom thief needs to track their abilities. Here's the current skill progression 
          across various disciplines of digital thievery.
        </motion.p>
      </motion.div>

      {/* Level up notification */}
      {showLevelUp && (
        <motion.div 
          className="fixed top-20 right-4 bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold z-50 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          🎉 LEVEL UP! {showLevelUp} improved!
        </motion.div>
      )}

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-red-600 text-white shadow-lg scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Overall Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-black/30 rounded-xl p-6 border border-red-900/30 text-center"
          variants={scaleIn}
          whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.5)" }}
        >
          <div className="text-3xl mb-2">📈</div>
          <motion.div 
            className="text-2xl font-bold text-red-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(skillsData.reduce((acc, skill) => acc + skill.level, 0) / skillsData.length)}
          </motion.div>
          <div className="text-sm text-gray-400">Average Level</div>
        </motion.div>
        
        <motion.div 
          className="bg-black/30 rounded-xl p-6 border border-red-900/30 text-center"
          variants={scaleIn}
          whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.5)" }}
        >
          <div className="text-3xl mb-2">🏆</div>
          <motion.div 
            className="text-2xl font-bold text-yellow-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            {skillsData.filter(skill => skill.level >= 90).length}
          </motion.div>
          <div className="text-sm text-gray-400">Master Level Skills</div>
        </motion.div>
        
        <motion.div 
          className="bg-black/30 rounded-xl p-6 border border-red-900/30 text-center"
          variants={scaleIn}
          whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.5)" }}
        >
          <div className="text-3xl mb-2">⚡</div>
          <motion.div 
            className="text-2xl font-bold text-blue-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            {skillsData.reduce((acc, skill) => acc + skill.experience, 0).toLocaleString()}
          </motion.div>
          <div className="text-sm text-gray-400">Total Experience</div>
        </motion.div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredSkills.map((skill, index) => {
          const animatedLevel = animatedLevels[skill.name] || 0;
          const experiencePercent = (skill.experience / skill.maxExperience) * 100;
          
          return (
            <motion.div
              key={skill.name}
              className="bg-black/30 rounded-xl p-6 border border-red-900/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleSkillClick(skill.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">
                      {skill.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <motion.div 
                    className={`text-2xl font-bold ${
                      skill.isMaxLevel ? "text-yellow-400" : "text-red-400"
                    } group-hover:scale-110 transition-transform`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    {animatedLevel}
                  </motion.div>
                  <div className="text-xs text-gray-500">
                    {skill.category}
                  </div>
                  {skill.isMaxLevel && (
                    <motion.div 
                      className="text-xs text-yellow-400 font-bold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      MAX
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Level Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Level Progress</span>
                  <span>{animatedLevel}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${
                      getSkillColor(skill.category)
                    } relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${animatedLevel}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    {skill.isMaxLevel && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-yellow-400/30 animate-pulse" />
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Experience Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Experience</span>
                  <span>{skill.experience.toLocaleString()}/{skill.maxExperience.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-gray-400 to-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${experiencePercent}%` }}
                    transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Skill Points Summary */}
      <motion.div 
        className="bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-xl p-6 border border-red-900/30 text-center"
        variants={scaleIn}
        whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)" }}
      >
        <motion.h3 
          className="text-xl font-bold mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Phantom Thief Rank
        </motion.h3>
        <motion.div 
          className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {profileData?.currentRank || "Elite Infiltrator"}
        </motion.div>
        <p className="text-gray-400 text-sm mb-4">
          You've mastered the art of digital stealth and code manipulation. 
          Your next target: {profileData?.nextRank || "Technical Lead"} status.
        </p>
        <motion.div 
          className="flex justify-center space-x-4 text-sm"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="flex items-center space-x-1"
            variants={fadeInUp}
          >
            <span>🎯</span>
            <span>Next Goal: {profileData?.nextRank || "Full Stack Phantom"}</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            variants={fadeInUp}
          >
            <span>📊</span>
            <span>Completion: {profileData?.rankProgress || 89}%</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}