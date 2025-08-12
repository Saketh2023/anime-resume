"use client";

import { useState } from "react";

interface ArcanaSkill {
  name: string;
  arcana: string;
  rank: number;
  maxRank: number;
  description: string;
  abilities: string[];
  icon: string;
  color: string;
  isMaxRank?: boolean;
}

const arcanaSkills: ArcanaSkill[] = [
  {
    name: "The Developer",
    arcana: "Code Mastery",
    rank: 8,
    maxRank: 10,
    description: "Mastery over the digital realm and its languages",
    abilities: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
    icon: "💻",
    color: "blue",
  },
  {
    name: "The Architect",
    arcana: "System Design",
    rank: 7,
    maxRank: 10,
    description: "Building scalable and maintainable digital kingdoms",
    abilities: ["Microservices", "API Design", "Database Architecture", "Caching Strategies"],
    icon: "🏗️",
    color: "purple",
  },
  {
    name: "The Magician",
    arcana: "Frontend Sorcery",
    rank: 9,
    maxRank: 10,
    description: "Conjuring beautiful and interactive user experiences",
    abilities: ["React", "Vue.js", "CSS Wizardry", "Animation Magic", "UX Design"],
    icon: "🎭",
    color: "cyan",
  },
  {
    name: "The Hermit",
    arcana: "Backend Mysteries",
    rank: 8,
    maxRank: 10,
    description: "Deep knowledge of server-side arcane arts",
    abilities: ["Node.js", "Express", "GraphQL", "REST APIs", "Authentication"],
    icon: "🔮",
    color: "green",
  },
  {
    name: "The Emperor",
    arcana: "DevOps Command",
    rank: 6,
    maxRank: 10,
    description: "Ruling over deployment realms and cloud kingdoms",
    abilities: ["Docker", "Kubernetes", "AWS", "CI/CD", "Monitoring"],
    icon: "👑",
    color: "orange",
  },
  {
    name: "The Tower",
    arcana: "Problem Solving",
    rank: 10,
    maxRank: 10,
    description: "Destroying bugs and rebuilding solutions from chaos",
    abilities: ["Debugging", "Critical Thinking", "Algorithm Design", "Performance Optimization"],
    icon: "⚡",
    color: "red",
    isMaxRank: true,
  },
  {
    name: "The Star",
    arcana: "Team Leadership",
    rank: 7,
    maxRank: 10,
    description: "Guiding teams toward their destined digital victories",
    abilities: ["Mentoring", "Code Review", "Project Planning", "Agile Methodology"],
    icon: "⭐",
    color: "yellow",
  },
  {
    name: "The Fool",
    arcana: "Continuous Learning",
    rank: 10,
    maxRank: 10,
    description: "Embracing the unknown and diving into new technologies",
    abilities: ["Adaptability", "Curiosity", "Research Skills", "Technology Adoption"],
    icon: "🎪",
    color: "pink",
    isMaxRank: true,
  },
];

export function SkillsArcana() {
  const [selectedArcana, setSelectedArcana] = useState<ArcanaSkill | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getColorClasses = (color: string, isSelected = false) => {
    const colorMap: Record<string, string> = {
      blue: isSelected ? "bg-blue-600 border-blue-400" : "border-blue-500/50 hover:border-blue-400",
      purple: isSelected ? "bg-purple-600 border-purple-400" : "border-purple-500/50 hover:border-purple-400",
      cyan: isSelected ? "bg-cyan-600 border-cyan-400" : "border-cyan-500/50 hover:border-cyan-400",
      green: isSelected ? "bg-green-600 border-green-400" : "border-green-500/50 hover:border-green-400",
      orange: isSelected ? "bg-orange-600 border-orange-400" : "border-orange-500/50 hover:border-orange-400",
      red: isSelected ? "bg-red-600 border-red-400" : "border-red-500/50 hover:border-red-400",
      yellow: isSelected ? "bg-yellow-600 border-yellow-400" : "border-yellow-500/50 hover:border-yellow-400",
      pink: isSelected ? "bg-pink-600 border-pink-400" : "border-pink-500/50 hover:border-pink-400",
    };
    return colorMap[color] || "border-gray-500/50";
  };

  const getProgressColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500 to-blue-400",
      purple: "from-purple-500 to-purple-400",
      cyan: "from-cyan-500 to-cyan-400",
      green: "from-green-500 to-green-400",
      orange: "from-orange-500 to-orange-400",
      red: "from-red-500 to-red-400",
      yellow: "from-yellow-500 to-yellow-400",
      pink: "from-pink-500 to-pink-400",
    };
    return colorMap[color] || "from-gray-500 to-gray-400";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Arcana Skill Compendium
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Each arcana represents a different aspect of development mastery. 
          Click on a card to reveal the hidden abilities within.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Arcana Cards Grid */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            {arcanaSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`relative bg-black/40 rounded-xl p-6 border-2 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-105 ${
                  selectedArcana?.name === skill.name
                    ? getColorClasses(skill.color, true) + " shadow-2xl"
                    : getColorClasses(skill.color) + " hover:shadow-xl"
                } ${
                  hoveredCard === skill.name ? "animate-pulse" : ""
                }`}
                onClick={() => setSelectedArcana(selectedArcana?.name === skill.name ? null : skill)}
                onMouseEnter={() => setHoveredCard(skill.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Number */}
                <div className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
                  {String(index).padStart(2, '0')}
                </div>
                
                {/* Max Rank Badge */}
                {skill.isMaxRank && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    MAX
                  </div>
                )}

                {/* Card Content */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2 transform transition-transform duration-300 hover:scale-110">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-400">{skill.arcana}</p>
                </div>

                {/* Rank Display */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Rank</span>
                    <span className={`font-bold ${
                      skill.isMaxRank ? "text-yellow-400" : "text-white"
                    }`}>
                      {skill.rank}/{skill.maxRank}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 bg-gradient-to-r ${
                        getProgressColor(skill.color)
                      } relative`}
                      style={{ width: `${(skill.rank / skill.maxRank) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 text-center">
                  {skill.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Arcana Details */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {selectedArcana ? (
              <div className={`bg-black/40 rounded-xl p-6 border-2 backdrop-blur-sm ${
                getColorClasses(selectedArcana.color, true)
              } animate-fade-in`}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {selectedArcana.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedArcana.name}</h2>
                  <p className="text-gray-300">{selectedArcana.arcana}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Abilities Learned</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedArcana.abilities.map((ability, index) => (
                      <div 
                        key={ability}
                        className="bg-black/50 rounded-lg p-3 border border-gray-600 hover:border-gray-500 transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-current rounded-full" />
                          <span className="text-sm">{ability}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-lg font-bold mb-2 ${
                    selectedArcana.isMaxRank ? "text-yellow-400" : "text-white"
                  }`}>
                    Rank {selectedArcana.rank}/{selectedArcana.maxRank}
                  </div>
                  {selectedArcana.isMaxRank ? (
                    <div className="text-yellow-400 text-sm font-bold animate-pulse">
                      🏆 MASTERED
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      {selectedArcana.maxRank - selectedArcana.rank} ranks to mastery
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setSelectedArcana(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    Close Arcana
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded-xl p-8 border-2 border-gray-700 backdrop-blur-sm text-center">
                <div className="text-6xl mb-4 opacity-50">🃏</div>
                <h2 className="text-xl font-bold mb-2">Select an Arcana</h2>
                <p className="text-gray-400 text-sm">
                  Click on any arcana card to discover the abilities and rank progression 
                  within that skill domain.
                </p>
                <div className="mt-6 text-xs text-gray-500">
                  💡 Tip: Each arcana represents a different aspect of development expertise
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overall Arcana Progress */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-900/30">
        <h3 className="text-xl font-bold mb-4 text-center">Arcana Mastery Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {arcanaSkills.reduce((sum, skill) => sum + skill.rank, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Ranks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {arcanaSkills.filter(skill => skill.isMaxRank).length}
            </div>
            <div className="text-sm text-gray-400">Mastered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {Math.round((arcanaSkills.reduce((sum, skill) => sum + skill.rank, 0) / (arcanaSkills.length * 10)) * 100)}%
            </div>
            <div className="text-sm text-gray-400">Completion</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {arcanaSkills.reduce((sum, skill) => sum + skill.abilities.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Abilities</div>
          </div>
        </div>
      </div>
    </div>
  );
}