"use client";

import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, FileText, Target, Zap, Award } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  company: string;
  duration: string;
  status: "completed" | "ongoing" | "legendary";
  difficulty: "S" | "A" | "B" | "C" | "D";
  description: string;
  longDescription: string;
  technologies: string[];
  achievements: string[];
  impact: string;
  stealthRating: number;
  icon: string;
  color: "blue" | "green" | "purple" | "red" | "cyan" | "orange" | "yellow";
  links?: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
}

interface MissionCardProps {
  mission: Mission;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (mission: Mission) => void;
}

export function MissionCard({ mission, index, isExpanded, onToggleExpand }: MissionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    const colors: {[key: string]: { text: string; border: string; bg: string; glow: string }} = {
      S: { text: "text-red-400", border: "border-red-500", bg: "bg-red-500/10", glow: "shadow-red-500/20" },
      A: { text: "text-yellow-400", border: "border-yellow-500", bg: "bg-yellow-500/10", glow: "shadow-yellow-500/20" },
      B: { text: "text-green-400", border: "border-green-500", bg: "bg-green-500/10", glow: "shadow-green-500/20" },
      C: { text: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
      D: { text: "text-gray-400", border: "border-gray-500", bg: "bg-gray-500/10", glow: "shadow-gray-500/20" }
    };
    return colors[difficulty] || colors.D;
  };

  const getStatusColor = (status: string) => {
    const colors: {[key: string]: { text: string; bg: string }} = {
      completed: { text: "text-green-400", bg: "bg-green-500/20" },
      ongoing: { text: "text-blue-400", bg: "bg-blue-500/20" },
      legendary: { text: "text-yellow-400", bg: "bg-yellow-500/20" }
    };
    return colors[status] || { text: "text-gray-400", bg: "bg-gray-500/20" };
  };

  const getColorClasses = (color: string) => {
    const colorMap: {[key: string]: string} = {
      blue: "border-blue-500/50 hover:border-blue-400 hover:shadow-blue-500/20",
      green: "border-green-500/50 hover:border-green-400 hover:shadow-green-500/20",
      purple: "border-purple-500/50 hover:border-purple-400 hover:shadow-purple-500/20",
      red: "border-red-500/50 hover:border-red-400 hover:shadow-red-500/20",
      cyan: "border-cyan-500/50 hover:border-cyan-400 hover:shadow-cyan-500/20",
      orange: "border-orange-500/50 hover:border-orange-400 hover:shadow-orange-500/20",
      yellow: "border-yellow-500/50 hover:border-yellow-400 hover:shadow-yellow-500/20"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getStatusBadge = (status: string) => {
    const badges: {[key: string]: string} = {
      completed: "✅ COMPLETED",
      ongoing: "🔄 IN PROGRESS",
      legendary: "🏆 LEGENDARY"
    };
    return badges[status] || status.toUpperCase();
  };

  const staggerDelay = 0.06;

  return (
    <motion.div
      layout
      className={`glass rounded-xl border-2 backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
        getColorClasses(mission.color)
      } ${isExpanded ? "shadow-2xl shadow-lg" : "hover:shadow-xl"}`}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          delay: index * staggerDelay,
          duration: 0.6,
          ease: "easeOut"
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.3 }
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onClick={() => onToggleExpand(mission)}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="text-4xl"
              whileHover={{ 
                rotate: 360,
                scale: 1.2,
                transition: { duration: 0.5 }
              }}
            >
              {mission.icon}
            </motion.div>
            <div>
              <motion.h3 
                className="text-xl font-bold text-white mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * staggerDelay + 0.2 }}
              >
                {mission.name}
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * staggerDelay + 0.3 }}
              >
                {mission.company}
              </motion.p>
              <motion.p 
                className="text-xs text-gray-500 font-mono"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * staggerDelay + 0.4 }}
              >
                {mission.duration}
              </motion.p>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            {/* Difficulty Badge */}
            <motion.div 
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(mission.difficulty).text} ${getDifficultyColor(mission.difficulty).border} ${getDifficultyColor(mission.difficulty).bg}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * staggerDelay + 0.5, type: "spring" }}
              whileHover={{ scale: 1.1 }}
            >
              RANK {mission.difficulty}
            </motion.div>
            
            {/* Status Badge */}
            <motion.div 
              className={`text-xs font-bold ${getStatusColor(mission.status).text}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * staggerDelay + 0.6 }}
            >
              {getStatusBadge(mission.status)}
            </motion.div>
          </div>
        </div>

        {/* Mission Description */}
        <motion.p 
          className="text-gray-300 text-sm mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * staggerDelay + 0.7 }}
        >
          {mission.description}
        </motion.p>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * staggerDelay + 0.8 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target size={16} className="text-gray-400 mr-1" />
            </div>
            <div className="text-xs text-gray-400">Impact</div>
            <div className="text-sm font-semibold text-blue-400 truncate">{mission.impact}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap size={16} className="text-gray-400 mr-1" />
            </div>
            <div className="text-xs text-gray-400">Stealth</div>
            <div className="text-sm font-semibold text-green-400">{mission.stealthRating}%</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Award size={16} className="text-gray-400 mr-1" />
            </div>
            <div className="text-xs text-gray-400">Tech Stack</div>
            <div className="text-sm font-semibold text-purple-400">{mission.technologies.length}</div>
          </div>
        </motion.div>

        {/* Technology Preview (first 3) */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * staggerDelay + 0.9 }}
        >
          {mission.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.span 
              key={tech}
              className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 border border-gray-600"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * staggerDelay + 1 + techIndex * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgb(156, 163, 175)" }}
            >
              {tech}
            </motion.span>
          ))}
          {mission.technologies.length > 3 && (
            <motion.span 
              className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400 border border-gray-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * staggerDelay + 1.3 }}
            >
              +{mission.technologies.length - 3} more
            </motion.span>
          )}
        </motion.div>

        {/* Expand Indicator */}
        <motion.div 
          className="flex justify-center items-center text-gray-500 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * staggerDelay + 1.4 }}
        >
          <span className="mr-2">
            {isExpanded ? "Click to collapse" : "Click to expand mission details"}
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </motion.div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border-t border-gray-700"
          >
            <div className="p-6 space-y-6">
              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="font-bold mb-3 text-white flex items-center">
                  <FileText size={18} className="mr-2 text-blue-400" />
                  Mission Brief
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {mission.longDescription}
                </p>
              </motion.div>

              {/* Full Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-bold mb-3 text-white">Technology Arsenal</h4>
                <div className="flex flex-wrap gap-2">
                  {mission.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={tech}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-600 hover:border-gray-500 transition-colors"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-bold mb-3 text-white flex items-center">
                  <Award size={18} className="mr-2 text-yellow-400" />
                  Mission Achievements
                </h4>
                <div className="space-y-2">
                  {mission.achievements.map((achievement, achievementIndex) => (
                    <motion.div 
                      key={achievementIndex}
                      className="flex items-start space-x-3 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + achievementIndex * 0.1 }}
                    >
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              {mission.links && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="font-bold mb-3 text-white">Mission Links</h4>
                  <div className="flex flex-wrap gap-3">
                    {mission.links.demo && mission.links.demo !== "" && (
                      <motion.a
                        href={mission.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-600/30 hover:border-blue-400 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </motion.a>
                    )}
                    {mission.links.github && mission.links.github !== "" && (
                      <motion.a
                        href={mission.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-gray-600/20 border border-gray-500/50 rounded-lg text-gray-400 hover:bg-gray-600/30 hover:border-gray-400 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} className="mr-2" />
                        Source Code
                      </motion.a>
                    )}
                    {mission.links.case_study && mission.links.case_study !== "" && (
                      <motion.a
                        href={mission.links.case_study}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-purple-600/20 border border-purple-500/50 rounded-lg text-purple-400 hover:bg-purple-600/30 hover:border-purple-400 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText size={16} className="mr-2" />
                        Case Study
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Mission Classification */}
              <motion.div 
                className="bg-black/50 rounded-lg p-4 border border-red-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm text-gray-400 mb-2">Mission Classification</div>
                <div className="text-red-400 font-mono text-xs mb-2">CLASSIFIED: PHANTOM LEVEL</div>
                <div className="text-xs text-gray-500">
                  This mission required infiltration of existing systems with minimal 
                  detection while achieving maximum impact. Stealth protocols 
                  maintained throughout operation with {mission.stealthRating}% success rating.
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}