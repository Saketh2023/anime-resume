"use client";

import { useState } from "react";

interface Mission {
  id: string;
  codename: string;
  client: string;
  duration: string;
  status: "completed" | "ongoing" | "legendary";
  difficulty: number;
  technologies: string[];
  description: string;
  achievements: string[];
  impact: string;
  stealthRating: number;
  icon: string;
  color: string;
}

const missions: Mission[] = [
  {
    id: "mission-001",
    codename: "Operation: E-Commerce Phantom",
    client: "TechCorp Industries",
    duration: "2023 - Present",
    status: "ongoing",
    difficulty: 9,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
    description: "Infiltrated legacy system and rebuilt entire e-commerce platform from shadows. Increased performance by 300% while maintaining stealth.",
    achievements: [
      "Reduced page load time by 70%",
      "Implemented microservices architecture",
      "Built real-time inventory system",
      "Achieved 99.9% uptime"
    ],
    impact: "$2M+ revenue increase",
    stealthRating: 95,
    icon: "🛍️",
    color: "blue"
  },
  {
    id: "mission-002",
    codename: "The FinTech Heist",
    client: "SecureBank Solutions",
    duration: "2022 - 2023",
    status: "completed",
    difficulty: 10,
    technologies: ["Vue.js", "Express", "MongoDB", "Docker", "Kubernetes"],
    description: "Executed flawless penetration of outdated banking system. Modernized entire infrastructure while maintaining Fort Knox-level security.",
    achievements: [
      "Zero security breaches",
      "Migrated 1M+ user accounts",
      "Implemented OAuth 2.0",
      "Built fraud detection AI"
    ],
    impact: "50% faster transactions",
    stealthRating: 98,
    icon: "🏦",
    color: "green"
  },
  {
    id: "mission-003",
    codename: "Social Media Phantom Strike",
    client: "ConnectAll Networks",
    duration: "2021 - 2022",
    status: "legendary",
    difficulty: 8,
    technologies: ["React Native", "GraphQL", "Redis", "WebSocket"],
    description: "Ghosted into social platform and revolutionized user engagement. Created viral features that broke the internet (in a good way).",
    achievements: [
      "10M+ daily active users",
      "Real-time messaging system",
      "Smart recommendation engine",
      "Cross-platform consistency"
    ],
    impact: "400% user retention",
    stealthRating: 92,
    icon: "📱",
    color: "purple"
  },
  {
    id: "mission-004",
    codename: "The Healthcare Data Liberation",
    client: "MedTech Innovations",
    duration: "2020 - 2021",
    status: "completed",
    difficulty: 9,
    technologies: ["Angular", "Python", "FastAPI", "PostgreSQL", "HIPAA Compliance"],
    description: "Infiltrated chaotic healthcare data systems. Brought order to medical chaos while maintaining patient privacy fortress.",
    achievements: [
      "HIPAA compliant architecture",
      "Integrated 5 legacy systems",
      "Built patient portal",
      "Automated reporting system"
    ],
    impact: "60% efficiency increase",
    stealthRating: 96,
    icon: "🏥",
    color: "red"
  },
  {
    id: "mission-005",
    codename: "EdTech Stealth Operation",
    client: "Future Learning Labs",
    duration: "2019 - 2020",
    status: "completed",
    difficulty: 7,
    technologies: ["React", "Firebase", "WebRTC", "Machine Learning"],
    description: "Covertly transformed traditional education platform into interactive learning paradise. Students didn't know what hit them.",
    achievements: [
      "Video conferencing integration",
      "AI-powered study plans",
      "Gamification system",
      "Multi-language support"
    ],
    impact: "85% completion rate",
    stealthRating: 88,
    icon: "🎓",
    color: "cyan"
  }
];

export function MissionHistory() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMissions = filterStatus === "all" 
    ? missions 
    : missions.filter(mission => mission.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "ongoing": return "text-blue-400";
      case "legendary": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return "✅ COMPLETED";
      case "ongoing": return "🔄 IN PROGRESS";
      case "legendary": return "🏆 LEGENDARY";
      default: return status.toUpperCase();
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return "★".repeat(difficulty) + "☆".repeat(10 - difficulty);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "border-blue-500/50 hover:border-blue-400",
      green: "border-green-500/50 hover:border-green-400", 
      purple: "border-purple-500/50 hover:border-purple-400",
      red: "border-red-500/50 hover:border-red-400",
      cyan: "border-cyan-500/50 hover:border-cyan-400",
    };
    return colorMap[color] || "border-gray-500/50";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Mission History Archive
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A record of successful infiltrations, digital heists, and system liberations. 
          Each mission completed with phantom precision and zero casualties.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 rounded-xl p-4 border border-green-500/30 text-center">
          <div className="text-2xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-green-400">
            {missions.filter(m => m.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-blue-500/30 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-blue-400">
            {missions.filter(m => m.status === 'ongoing').length}
          </div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/30 text-center">
          <div className="text-2xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-yellow-400">
            {missions.filter(m => m.status === 'legendary').length}
          </div>
          <div className="text-sm text-gray-400">Legendary</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-red-500/30 text-center">
          <div className="text-2xl mb-2">👻</div>
          <div className="text-2xl font-bold text-red-400">
            {Math.round(missions.reduce((sum, m) => sum + m.stealthRating, 0) / missions.length)}%
          </div>
          <div className="text-sm text-gray-400">Avg Stealth</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["all", "completed", "ongoing", "legendary"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filterStatus === status
                ? "bg-red-600 text-white shadow-lg scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {status === "all" ? "All Missions" : getStatusBadge(status)}
          </button>
        ))}
      </div>

      {/* Mission Cards */}
      <div className="space-y-6">
        {filteredMissions.map((mission, index) => (
          <div 
            key={mission.id}
            className={`bg-black/40 rounded-xl p-6 border-2 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
              getColorClasses(mission.color)
            } ${
              selectedMission?.id === mission.id ? "ring-2 ring-red-500 shadow-2xl" : "hover:shadow-xl"
            }`}
            onClick={() => setSelectedMission(selectedMission?.id === mission.id ? null : mission)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mission Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{mission.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{mission.codename}</h3>
                      <p className="text-gray-400">{mission.client}</p>
                      <p className="text-sm text-gray-500 font-mono">{mission.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getStatusColor(mission.status)} mb-1`}>
                      {getStatusBadge(mission.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {mission.id}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{mission.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Difficulty</div>
                    <div className="text-yellow-400 text-sm font-mono">
                      {getDifficultyStars(mission.difficulty)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Stealth Rating</div>
                    <div className="text-green-400 font-bold">{mission.stealthRating}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Impact</div>
                    <div className="text-blue-400 font-semibold">{mission.impact}</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Technology Arsenal</div>
                  <div className="flex flex-wrap gap-2">
                    {mission.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300 border border-gray-600 hover:border-gray-500 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {selectedMission?.id === mission.id && (
                <div className="lg:w-80 border-l border-gray-600 pl-6 animate-fade-in">
                  <h4 className="font-bold mb-3 flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Mission Achievements</span>
                  </h4>
                  <div className="space-y-2 mb-6">
                    {mission.achievements.map((achievement, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start space-x-2 text-sm"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-sm text-gray-400 mb-2">Mission Classification</div>
                    <div className="text-red-400 font-mono text-xs mb-2">CLASSIFIED: PHANTOM LEVEL</div>
                    <div className="text-xs text-gray-500">
                      This mission required infiltration of legacy systems with minimal 
                      detection while achieving maximum impact. Stealth protocols 
                      maintained throughout operation.
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Expand indicator */}
            <div className="flex justify-center mt-4">
              <div className="text-gray-500 text-sm flex items-center space-x-2">
                <span>{selectedMission?.id === mission.id ? "Click to collapse" : "Click to expand mission details"}</span>
                <span className={`transform transition-transform ${
                  selectedMission?.id === mission.id ? "rotate-180" : ""
                }`}>▼</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Summary */}
      <div className="bg-gradient-to-r from-gray-900/50 to-red-900/20 rounded-xl p-6 border border-red-900/30 text-center">
        <h3 className="text-xl font-bold mb-4">Phantom Thief Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-2xl mb-2">👻</div>
            <div className="text-lg font-bold text-red-400 mb-1">
              {missions.length} Missions
            </div>
            <div className="text-gray-400">Successfully infiltrated</div>
          </div>
          <div>
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-lg font-bold text-yellow-400 mb-1">
              Zero Failures
            </div>
            <div className="text-gray-400">Perfect success rate</div>
          </div>
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-lg font-bold text-blue-400 mb-1">
              Elite Status
            </div>
            <div className="text-gray-400">Top-tier phantom thief</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 italic">
          "The true art of the phantom thief is to leave no trace, except for a better world."
        </div>
      </div>
    </div>
  );
}