"use client";

import { useState } from "react";

interface Confidant {
  name: string;
  role: string;
  relationship: string;
  trustLevel: number;
  maxTrust: number;
  description: string;
  specialAbility: string;
  location: string;
  avatar: string;
  color: string;
  testimonial?: string;
  isMaxRank?: boolean;
}

const confidants: Confidant[] = [
  {
    name: "Sarah Chen",
    role: "Senior Product Manager",
    relationship: "Strategic Alliance",
    trustLevel: 9,
    maxTrust: 10,
    description: "Master of product vision and user empathy. Guides phantom thieves through complex feature heists.",
    specialAbility: "Requirements Translation",
    location: "San Francisco HQ",
    avatar: "👩‍💼",
    color: "blue",
    testimonial: "Working with this phantom thief transformed our entire product development process. Their code quality is legendary!"
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead DevOps Engineer",
    relationship: "Infrastructure Ally",
    trustLevel: 8,
    maxTrust: 10,
    description: "Cloud kingdom ruler who ensures all phantom operations run smoothly in the digital shadows.",
    specialAbility: "Zero-Downtime Deployment",
    location: "Remote (Austin, TX)",
    avatar: "👨‍🔧",
    color: "orange"
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Director",
    relationship: "Mentor Figure",
    trustLevel: 10,
    maxTrust: 10,
    description: "Wise sage of software architecture. Provides ancient wisdom about scalable system design.",
    specialAbility: "Architecture Enlightenment",
    location: "MIT Labs",
    avatar: "👩‍🔬",
    color: "purple",
    testimonial: "Exceptional problem-solving skills and attention to detail. A rare talent in the developer world.",
    isMaxRank: true
  },
  {
    name: "Jake Thompson",
    role: "Frontend Specialist",
    relationship: "Creative Partner",
    trustLevel: 7,
    maxTrust: 10,
    description: "UI/UX phantom who makes interfaces so beautiful, users forget they're using software.",
    specialAbility: "Pixel Perfect Precision",
    location: "New York Studio",
    avatar: "🎨",
    color: "cyan"
  },
  {
    name: "Priya Patel",
    role: "QA Lead",
    relationship: "Quality Guardian",
    trustLevel: 9,
    maxTrust: 10,
    description: "Bug hunter extraordinaire. No glitch escapes her watchful testing protocols.",
    specialAbility: "Bug Extermination",
    location: "London Office",
    avatar: "🔍",
    color: "green",
    testimonial: "Incredible attention to detail and proactive communication. Makes the whole team better."
  },
  {
    name: "Alex Kim",
    role: "Junior Developer",
    relationship: "Mentee",
    trustLevel: 6,
    maxTrust: 10,
    description: "Eager apprentice phantom learning the ways of clean code and elegant solutions.",
    specialAbility: "Fresh Perspective",
    location: "Seattle Campus",
    avatar: "👨‍🎓",
    color: "yellow"
  },
  {
    name: "Coffee Machine #47",
    role: "Caffeine Dispenser",
    relationship: "Life Support System", 
    trustLevel: 10,
    maxTrust: 10,
    description: "The most reliable team member. Never fails to deliver the essential fuel for phantom operations.",
    specialAbility: "Productivity Boost",
    location: "Office Kitchen",
    avatar: "☕",
    color: "amber",
    testimonial: "*brewing sounds* Best developer I've ever served. Consistently high performance, never spills.",
    isMaxRank: true
  },
  {
    name: "Luna (Rubber Duck)",
    role: "Debug Consultant",
    relationship: "Silent Partner",
    trustLevel: 10,
    maxTrust: 10,
    description: "Legendary debug companion. Solves complex problems through the ancient art of patient listening.",
    specialAbility: "Rubber Duck Debugging",
    location: "Desk Corner",
    avatar: "🦆",
    color: "pink",
    isMaxRank: true
  }
];

export function ConfidantNetwork() {
  const [selectedConfidant, setSelectedConfidant] = useState<Confidant | null>(null);
  const [hoveredConfidant, setHoveredConfidant] = useState<string | null>(null);

  const getColorClasses = (color: string, isSelected = false) => {
    const colorMap: Record<string, string> = {
      blue: isSelected ? "bg-blue-600 border-blue-400" : "border-blue-500/50 hover:border-blue-400",
      orange: isSelected ? "bg-orange-600 border-orange-400" : "border-orange-500/50 hover:border-orange-400",
      purple: isSelected ? "bg-purple-600 border-purple-400" : "border-purple-500/50 hover:border-purple-400",
      cyan: isSelected ? "bg-cyan-600 border-cyan-400" : "border-cyan-500/50 hover:border-cyan-400",
      green: isSelected ? "bg-green-600 border-green-400" : "border-green-500/50 hover:border-green-400",
      yellow: isSelected ? "bg-yellow-600 border-yellow-400" : "border-yellow-500/50 hover:border-yellow-400",
      amber: isSelected ? "bg-amber-600 border-amber-400" : "border-amber-500/50 hover:border-amber-400",
      pink: isSelected ? "bg-pink-600 border-pink-400" : "border-pink-500/50 hover:border-pink-400",
    };
    return colorMap[color] || "border-gray-500/50";
  };

  const getTrustColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500 to-blue-400",
      orange: "from-orange-500 to-orange-400",
      purple: "from-purple-500 to-purple-400",
      cyan: "from-cyan-500 to-cyan-400",
      green: "from-green-500 to-green-400",
      yellow: "from-yellow-500 to-yellow-400",
      amber: "from-amber-500 to-amber-400",
      pink: "from-pink-500 to-pink-400",
    };
    return colorMap[color] || "from-gray-500 to-gray-400";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Confidant Network
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Every phantom thief needs trusted allies. These are the legends who've shaped my journey 
          and continue to provide wisdom, support, and the occasional rubber duck debugging session.
        </p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 rounded-xl p-4 border border-purple-500/30 text-center">
          <div className="text-2xl mb-2">🤝</div>
          <div className="text-2xl font-bold text-purple-400">{confidants.length}</div>
          <div className="text-sm text-gray-400">Total Confidants</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/30 text-center">
          <div className="text-2xl mb-2">👑</div>
          <div className="text-2xl font-bold text-yellow-400">
            {confidants.filter(c => c.isMaxRank).length}
          </div>
          <div className="text-sm text-gray-400">Max Rank</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-blue-500/30 text-center">
          <div className="text-2xl mb-2">💪</div>
          <div className="text-2xl font-bold text-blue-400">
            {Math.round((confidants.reduce((sum, c) => sum + c.trustLevel, 0) / (confidants.length * 10)) * 100)}%
          </div>
          <div className="text-sm text-gray-400">Avg Trust</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-green-500/30 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-green-400">
            {confidants.length}
          </div>
          <div className="text-sm text-gray-400">Special Abilities</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Confidant Cards */}
        <div className="lg:col-span-2 space-y-4">
          {confidants.map((confidant, index) => (
            <div
              key={confidant.name}
              className={`bg-black/40 rounded-xl p-6 border-2 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                selectedConfidant?.name === confidant.name
                  ? getColorClasses(confidant.color, true) + " shadow-2xl"
                  : getColorClasses(confidant.color) + " hover:shadow-xl"
              } ${
                hoveredConfidant === confidant.name ? "animate-pulse" : ""
              }`}
              onClick={() => setSelectedConfidant(
                selectedConfidant?.name === confidant.name ? null : confidant
              )}
              onMouseEnter={() => setHoveredConfidant(confidant.name)}
              onMouseLeave={() => setHoveredConfidant(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="text-4xl transform transition-transform duration-300 hover:scale-110">
                  {confidant.avatar}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{confidant.name}</h3>
                      <p className="text-gray-400 text-sm">{confidant.role}</p>
                      <p className="text-gray-500 text-xs">{confidant.location}</p>
                    </div>
                    <div className="text-right">
                      {confidant.isMaxRank && (
                        <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse mb-1">
                          MAX
                        </div>
                      )}
                      <div className="text-sm text-gray-400">{confidant.relationship}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{confidant.description}</p>
                  
                  {/* Trust Level */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Trust Level</span>
                      <span>{confidant.trustLevel}/{confidant.maxTrust}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 bg-gradient-to-r ${
                          getTrustColor(confidant.color)
                        } relative`}
                        style={{ width: `${(confidant.trustLevel / confidant.maxTrust) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Special Ability */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">Special Ability:</span>
                    <span className="text-yellow-400 font-semibold">{confidant.specialAbility}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Confidant Details */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {selectedConfidant ? (
              <div className={`bg-black/40 rounded-xl p-6 border-2 backdrop-blur-sm animate-fade-in ${
                getColorClasses(selectedConfidant.color, true)
              }`}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {selectedConfidant.avatar}
                  </div>
                  <h2 className="text-xl font-bold mb-1">{selectedConfidant.name}</h2>
                  <p className="text-gray-300 text-sm mb-1">{selectedConfidant.role}</p>
                  <p className="text-gray-500 text-xs">{selectedConfidant.location}</p>
                </div>

                <div className="space-y-4">
                  {/* Relationship Status */}
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-sm text-gray-400 mb-1">Relationship</div>
                    <div className="text-white font-semibold">{selectedConfidant.relationship}</div>
                  </div>

                  {/* Special Ability Details */}
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-sm text-gray-400 mb-1">Special Ability</div>
                    <div className="text-yellow-400 font-semibold mb-2">
                      {selectedConfidant.specialAbility}
                    </div>
                    <div className="text-xs text-gray-300">
                      This confidant provides unique support that enhances phantom operations.
                    </div>
                  </div>

                  {/* Trust Progress */}
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-400">Trust Level</div>
                      <div className={`text-lg font-bold ${
                        selectedConfidant.isMaxRank ? "text-yellow-400" : "text-white"
                      }`}>
                        {selectedConfidant.trustLevel}/{selectedConfidant.maxTrust}
                      </div>
                    </div>
                    {selectedConfidant.isMaxRank ? (
                      <div className="text-yellow-400 text-sm font-bold animate-pulse text-center">
                        🌟 MAXIMUM TRUST ACHIEVED 🌟
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm text-center">
                        {selectedConfidant.maxTrust - selectedConfidant.trustLevel} levels to max trust
                      </div>
                    )}
                  </div>

                  {/* Testimonial */}
                  {selectedConfidant.testimonial && (
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="text-sm text-gray-400 mb-2">Testimonial</div>
                      <blockquote className="text-sm text-gray-300 italic">
                        "{selectedConfidant.testimonial}"
                      </blockquote>
                      <div className="text-xs text-gray-500 mt-2 text-right">
                        — {selectedConfidant.name}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setSelectedConfidant(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded-xl p-8 border-2 border-gray-700 backdrop-blur-sm text-center">
                <div className="text-6xl mb-4 opacity-50">👥</div>
                <h2 className="text-xl font-bold mb-2">Select a Confidant</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Click on any confidant to learn more about their role in the phantom thief network 
                  and see their trust level progression.
                </p>
                <div className="text-xs text-gray-500">
                  💡 Tip: Higher trust levels unlock special collaborative abilities
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Network Summary */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-900/30">
        <h3 className="text-xl font-bold mb-4 text-center">Phantom Thief Network Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-lg font-bold text-yellow-400 mb-1">Elite Network</div>
            <div className="text-sm text-gray-400">
              Surrounded by industry legends and rising stars. This network provides 
              comprehensive support for any digital heist or development challenge.
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🤝</div>
            <div className="text-lg font-bold text-blue-400 mb-1">Strong Bonds</div>
            <div className="text-sm text-gray-400">
              Built through years of successful collaborations, pair programming sessions, 
              and shared coffee breaks. These relationships fuel exceptional teamwork.
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500 italic">
          "A phantom thief's greatest power isn't stealth—it's the friends they make along the way."
        </div>
      </div>
    </div>
  );
}