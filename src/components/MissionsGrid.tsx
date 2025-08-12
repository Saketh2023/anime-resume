"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MissionCard } from "./MissionCard";
import missionsData from "@/data/missions.json";

interface Mission {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  rank: "S" | "A" | "B" | "C" | "D";
  status: "completed" | "ongoing" | "legendary";
  tech: string[];
  impact: string;
  team?: number;
  duration: string;
  type: string;
  company: string;
  position?: string;
  startDate: string;
  endDate?: string;
  role?: string;
  achievements: string[];
  metrics?: {
    monthlyRevenue?: string;
    conversionRate?: string;
    pageLoadTime?: string;
    userGrowth?: string;
    performanceGain?: string;
  };
  links?: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  stealthRating?: number;
  icon?: string;
  color?: "blue" | "green" | "purple" | "red" | "cyan" | "orange" | "yellow";
}

// Load mission data from JSON file
const missions: Mission[] = missionsData as Mission[];

// Helper function to get mission icon and color based on type/rank
const getMissionIcon = (mission: Mission) => {
  const iconMap: { [key: string]: string } = {
    "mission-001": "🛍️",
    "mission-002": "🏦", 
    "mission-003": "📱",
    "mission-004": "🏥",
    "mission-005": "🎓",
    "mission-006": "🏠"
  };
  return iconMap[mission.id] || "💼";
};

const getMissionColor = (mission: Mission): "blue" | "green" | "purple" | "red" | "cyan" | "orange" | "yellow" => {
  const colorMap: { [key: string]: "blue" | "green" | "purple" | "red" | "cyan" | "orange" | "yellow" } = {
    "mission-001": "blue",
    "mission-002": "green", 
    "mission-003": "purple",
    "mission-004": "red",
    "mission-005": "cyan",
    "mission-006": "orange"
  };
  return colorMap[mission.id] || "blue";
};

const calculateStealthRating = (mission: Mission) => {
  // Calculate based on rank and achievements
  const rankScores = { S: 98, A: 92, B: 85, C: 78, D: 70 };
  const baseScore = rankScores[mission.rank] || 70;
  const achievementBonus = Math.min(mission.achievements.length, 5);
  return Math.min(baseScore + achievementBonus, 100);
};

interface MissionsGridProps {
  className?: string;
}

export function MissionsGrid({ className = "" }: MissionsGridProps) {
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMissions = missions.filter(mission => {
    const difficultyMatch = filterDifficulty === "all" || mission.rank === filterDifficulty;
    const statusMatch = filterStatus === "all" || mission.status === filterStatus;
    return difficultyMatch && statusMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors: {[key: string]: string} = {
      S: "text-red-400 border-red-500",
      A: "text-yellow-400 border-yellow-500",
      B: "text-green-400 border-green-500",
      C: "text-blue-400 border-blue-500",
      D: "text-gray-400 border-gray-500"
    };
    return colors[difficulty] || colors.D;
  };

  const getStatusColor = (status: string) => {
    const colors: {[key: string]: string} = {
      completed: "text-green-400",
      ongoing: "text-blue-400", 
      legendary: "text-yellow-400"
    };
    return colors[status] || "text-gray-400";
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {[
          { label: "Completed", value: missions.filter(m => m.status === 'completed').length, icon: "🎯", color: "green" },
          { label: "Active", value: missions.filter(m => m.status === 'ongoing').length, icon: "⚡", color: "blue" },
          { label: "Legendary", value: missions.filter(m => m.status === 'legendary').length, icon: "🏆", color: "yellow" },
          { label: "Avg Stealth", value: `${Math.round(missions.reduce((sum, m) => sum + (calculateStealthRating(m) || 0), 0) / missions.length)}%`, icon: "👻", color: "red" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`glass rounded-xl p-4 border border-${stat.color}-500/30 text-center hover:scale-105 transition-transform cursor-default`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="text-2xl mb-2"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {stat.icon}
            </motion.div>
            <div className={`text-2xl font-bold text-${stat.color}-400`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Controls */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex gap-2">
          <span className="text-sm text-gray-400 self-center">Difficulty:</span>
          {["all", "S", "A", "B", "C"].map((difficulty) => (
            <motion.button
              key={difficulty}
              onClick={() => setFilterDifficulty(difficulty)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
                filterDifficulty === difficulty
                  ? "bg-red-600 text-white border-red-500"
                  : `bg-transparent border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {difficulty === "all" ? "All" : `Rank ${difficulty}`}
            </motion.button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <span className="text-sm text-gray-400 self-center">Status:</span>
          {["all", "completed", "ongoing", "legendary"].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
                filterStatus === status
                  ? "bg-red-600 text-white border-red-500"
                  : "bg-transparent border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Missions Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={{
                ...mission,
                name: mission.title,
                difficulty: mission.rank,
                technologies: mission.tech,
                stealthRating: calculateStealthRating(mission),
                icon: getMissionIcon(mission),
                color: getMissionColor(mission)
              }}
              index={index}
              isExpanded={selectedMission?.id === mission.id}
              onToggleExpand={(missionToToggle) => 
                setSelectedMission(selectedMission?.id === missionToToggle.id ? null : {
                  ...mission,
                  name: mission.title,
                  difficulty: mission.rank,
                  technologies: mission.tech,
                  stealthRating: calculateStealthRating(mission),
                  icon: getMissionIcon(mission),
                  color: getMissionColor(mission)
                })
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mission Summary */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900/50 to-red-900/20 rounded-xl p-8 border border-red-900/30 text-center mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.h3 
          className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Phantom Thief Mission Record
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {[
            { icon: "👻", value: `${missions.length} Missions`, desc: "Successfully infiltrated", color: "red" },
            { icon: "⭐", value: "Zero Failures", desc: "Perfect success rate", color: "yellow" },
            { icon: "🎯", value: "Elite Status", desc: "Top-tier phantom thief", color: "blue" }
          ].map((item, index) => (
            <motion.div
              key={item.desc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className={`text-xl font-bold text-${item.color}-400 mb-2`}>
                {item.value}
              </div>
              <div className="text-gray-400">{item.desc}</div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-8 text-sm text-gray-500 italic font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          "The true art of the phantom thief is to leave no trace, except for a better world."
        </motion.div>
      </motion.div>
    </div>
  );
}