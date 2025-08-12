"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Zap, Code, Palette, Server, Cloud, Users, Brain } from "lucide-react";
import skillsData from "@/data/skills.json";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: string;
  description: string;
  icon: string;
  prerequisites?: string[];
  unlocked: boolean;
  position?: { x: number; y: number };
  experience?: string[];
  projects?: string[];
  unlocks?: string[];
  color?: string;
}

// Load skills from JSON and create positions for tree layout
const rawSkills = skillsData as SkillNode[];

// Create grid positions for skills by category
const createSkillPositions = (skills: SkillNode[]) => {
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillNode[]>);
  
  const positionedSkills: SkillNode[] = [];
  let yOffset = 100;
  
  Object.entries(categories).forEach(([category, categorySkills]) => {
    categorySkills.forEach((skill, index) => {
      const x = 150 + (index * 180);
      const y = yOffset;
      
      positionedSkills.push({
        ...skill,
        position: { x, y },
        color: getCategoryColor(skill.category),
        experience: skill.experience || [
          `Level ${skill.level} Mastery`,
          "Production Experience",
          "Best Practices",
          "Team Projects"
        ],
        projects: skill.projects || [
          "Multiple projects completed",
          "Production applications", 
          "Team collaborations"
        ]
      });
    });
    yOffset += 150;
  });
  
  return positionedSkills;
};

const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    "Frontend": "cyan",
    "Backend": "green", 
    "Languages": "blue",
    "DevOps": "orange",
    "Tools": "purple",
    "Databases": "red",
    "Design": "pink",
    "Leadership": "yellow"
  };
  return colorMap[category] || "gray";
};

const skillNodes: SkillNode[] = createSkillPositions(rawSkills);

const connections = [
  { from: "html-css", to: "react" },
  { from: "html-css", to: "vue" },
  { from: "javascript", to: "react" },
  { from: "javascript", to: "nodejs" },
  { from: "javascript", to: "typescript" },
  { from: "typescript", to: "nextjs" },
  { from: "react", to: "nextjs" },
  { from: "nodejs", to: "express" },
  { from: "nodejs", to: "databases" },
  { from: "express", to: "apis" },
  { from: "apis", to: "microservices" },
  { from: "docker", to: "kubernetes" },
  { from: "docker", to: "aws" },
  { from: "docker", to: "cicd" },
  { from: "ui-design", to: "ux-design" },
  { from: "team-lead", to: "mentoring" }
];

interface SkillTreeProps {
  className?: string;
}

export function SkillTree({ className = "" }: SkillTreeProps) {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const svgRef = useRef<SVGSVGElement>(null);

  const categories = [
    { id: "all", name: "All Skills", icon: Star, color: "gray" },
    { id: "Frontend", name: "Frontend", icon: Code, color: "cyan" },
    { id: "Backend", name: "Backend", icon: Server, color: "green" },
    { id: "Languages", name: "Languages", icon: Brain, color: "blue" },
    { id: "DevOps", name: "DevOps", icon: Cloud, color: "orange" },
    { id: "Tools", name: "Tools", icon: Palette, color: "purple" },
    { id: "Databases", name: "Databases", icon: Users, color: "red" }
  ];

  const filteredNodes = filterCategory === "all" 
    ? skillNodes 
    : skillNodes.filter(node => node.category === filterCategory);

  const filteredConnections = connections.filter(conn => {
    const fromNode = skillNodes.find(n => n.id === conn.from);
    const toNode = skillNodes.find(n => n.id === conn.to);
    return filteredNodes.includes(fromNode!) && filteredNodes.includes(toNode!);
  });

  const getNodeColor = (category: string, level: number, maxLevel: number) => {
    const isMaxed = level >= 90; // Consider 90+ as mastered
    const colorMap: {[key: string]: string} = {
      "Frontend": isMaxed ? "from-cyan-400 to-blue-500" : "from-cyan-600 to-blue-700",
      "Backend": isMaxed ? "from-green-400 to-emerald-500" : "from-green-600 to-emerald-700",
      "Languages": isMaxed ? "from-blue-400 to-indigo-500" : "from-blue-600 to-indigo-700",
      "DevOps": isMaxed ? "from-orange-400 to-red-500" : "from-orange-600 to-red-700",
      "Tools": isMaxed ? "from-purple-400 to-violet-500" : "from-purple-600 to-violet-700",
      "Databases": isMaxed ? "from-red-400 to-pink-500" : "from-red-600 to-pink-700",
      "Design": isMaxed ? "from-pink-400 to-purple-500" : "from-pink-600 to-purple-700"
    };
    return colorMap[category] || "from-gray-600 to-gray-700";
  };

  const getProgressRadius = (level: number, maxLevel: number) => {
    const percentage = level / maxLevel;
    return 28 * percentage; // Max radius is 28
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header Stats */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Technical Skill Tree
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Each node represents a mastered skill with experience levels and project applications. 
          Click nodes to explore detailed progression and achievements.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: "Total Skills", value: skillNodes.length, icon: "⚡" },
            { label: "Mastered", value: skillNodes.filter(n => n.level === n.maxLevel).length, icon: "🏆" },
            { label: "Avg Level", value: Math.round(skillNodes.reduce((sum, n) => sum + n.level, 0) / skillNodes.length), icon: "📊" },
            { label: "Categories", value: new Set(skillNodes.map(n => n.category)).size, icon: "🎯" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg font-bold text-purple-400">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                filterCategory === category.id
                  ? `bg-${category.color}-600 text-white border-${category.color}-500`
                  : `bg-transparent border-gray-600 text-gray-300 hover:border-${category.color}-500 hover:text-${category.color}-400`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={16} className="mr-2" />
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skill Tree Visualization */}
        <div className="lg:col-span-2">
          <motion.div 
            className="glass rounded-xl p-6 min-h-[600px] relative overflow-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <svg 
              ref={svgRef}
              width="900" 
              height="800" 
              className="w-full h-full"
              viewBox="0 0 900 800"
            >
              {/* Connections */}
              {filteredConnections.map((connection, index) => {
                const fromNode = skillNodes.find(n => n.id === connection.from);
                const toNode = skillNodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode || !fromNode.position || !toNode.position) return null;

                return (
                  <motion.line
                    key={`${connection.from}-${connection.to}`}
                    x1={fromNode.position.x}
                    y1={fromNode.position.y}
                    x2={toNode.position.x}
                    y2={toNode.position.y}
                    stroke="rgba(107, 114, 128, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.8 }}
                  />
                );
              })}

              {/* Skill Nodes */}
              {filteredNodes.filter(node => node.position).map((node, index) => (
                <g key={node.id}>
                  {/* Node Background Circle */}
                  <motion.circle
                    cx={node.position!.x}
                    cy={node.position!.y}
                    r="35"
                    fill="rgba(0, 0, 0, 0.8)"
                    stroke={hoveredNode === node.id ? "rgba(239, 68, 68, 0.8)" : "rgba(107, 114, 128, 0.5)"}
                    strokeWidth="2"
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />

                  {/* Progress Ring */}
                  <motion.circle
                    cx={node.position!.x}
                    cy={node.position!.y}
                    r="30"
                    fill="none"
                    stroke={`url(#gradient-${node.id})`}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * getProgressRadius(node.level, node.maxLevel)} ${2 * Math.PI * 30}`}
                    transform={`rotate(-90 ${node.position!.x} ${node.position!.y})`}
                    initial={{ strokeDasharray: "0 188" }}
                    animate={{ 
                      strokeDasharray: `${2 * Math.PI * getProgressRadius(node.level, node.maxLevel)} ${2 * Math.PI * 30}` 
                    }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.8 }}
                  />

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={getNodeColor(node.category, node.level, node.maxLevel).split(' ')[1]} />
                      <stop offset="100%" stopColor={getNodeColor(node.category, node.level, node.maxLevel).split(' ')[3]} />
                    </linearGradient>
                  </defs>

                  {/* Node Icon */}
                  <motion.text
                    x={node.position!.x}
                    y={node.position!.y + 6}
                    textAnchor="middle"
                    fontSize="20"
                    className="cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  >
                    {node.icon}
                  </motion.text>

                  {/* Level Display */}
                  <motion.text
                    x={node.position!.x}
                    y={node.position!.y + 50}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    fontWeight="bold"
                    className="cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.05 }}
                    onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  >
                    {node.level}/{node.maxLevel}
                  </motion.text>

                  {/* Mastery Badge */}
                  {node.level >= 90 && (
                    <motion.text
                      x={node.position?.x! + 25}
                      y={node.position?.y! - 25}
                      textAnchor="middle"
                      fontSize="12"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.05, type: "spring" }}
                    >
                      ⭐
                    </motion.text>
                  )}
                </g>
              ))}
            </svg>
          </motion.div>
        </div>

        {/* Selected Skill Details */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  className="glass rounded-xl p-6 border-2 border-purple-500/50"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {selectedNode.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{selectedNode.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{selectedNode.description}</p>
                    
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {selectedNode.level}/{selectedNode.maxLevel}
                        </div>
                        <div className="text-xs text-gray-400">Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {Math.round((selectedNode.level / selectedNode.maxLevel) * 100)}%
                        </div>
                        <div className="text-xs text-gray-400">Mastery</div>
                      </div>
                    </div>

                    {selectedNode.level >= 90 && (
                      <motion.div 
                        className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-2 mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <div className="text-yellow-400 text-sm font-bold">
                          🏆 MASTERED
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Experience */}
                    <div>
                      <h4 className="font-bold mb-3 flex items-center">
                        <Zap size={16} className="mr-2 text-blue-400" />
                        Experience
                      </h4>
                      <div className="space-y-1">
                        {(selectedNode.experience || []).map((exp, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            <span className="text-gray-300">{exp}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 className="font-bold mb-3 flex items-center">
                        <Star size={16} className="mr-2 text-yellow-400" />
                        Projects
                      </h4>
                      <div className="space-y-1">
                        {(selectedNode.projects || []).map((project, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                            <span className="text-gray-300">{project}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites & Unlocks */}
                    {(selectedNode.prerequisites?.length || selectedNode.unlocks?.length) && (
                      <div className="border-t border-gray-600 pt-4">
                        {selectedNode.prerequisites?.length && (
                          <div className="mb-3">
                            <div className="text-sm text-gray-400 mb-1">Prerequisites:</div>
                            <div className="flex flex-wrap gap-1">
                              {selectedNode.prerequisites.map(prereq => {
                                const prereqNode = skillNodes.find(n => n.id === prereq);
                                return (
                                  <span key={prereq} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">
                                    {prereqNode?.name || prereq}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {selectedNode.unlocks?.length && (
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Unlocks:</div>
                            <div className="flex flex-wrap gap-1">
                              {selectedNode.unlocks.map(unlock => {
                                const unlockNode = skillNodes.find(n => n.id === unlock);
                                return (
                                  <span key={unlock} className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                                    {unlockNode?.name || unlock}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => setSelectedNode(null)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="glass rounded-xl p-8 border-2 border-gray-700 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-4 opacity-50">🌳</div>
                  <h3 className="text-xl font-bold mb-2">Select a Skill Node</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Click on any skill node in the tree to explore detailed progression, 
                    experience, and project applications.
                  </p>
                  <div className="text-xs text-gray-500">
                    💡 Tip: Use category filters to focus on specific skill domains
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}