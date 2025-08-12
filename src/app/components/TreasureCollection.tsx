"use client";

import { useState } from "react";

interface Treasure {
  name: string;
  category: "certification" | "project" | "achievement" | "skill" | "artifact";
  rarity: "common" | "rare" | "epic" | "legendary";
  description: string;
  dateAcquired: string;
  icon: string;
  value: string;
  source: string;
  stats?: { [key: string]: number };
  isSecret?: boolean;
}

const treasures: Treasure[] = [
  {
    name: "AWS Solutions Architect",
    category: "certification",
    rarity: "epic",
    description: "Mastery certificate for cloud architecture and infrastructure design. Grants +50 Cloud Powers.",
    dateAcquired: "2023-08-15",
    icon: "☁️",
    value: "Professional Credibility +100",
    source: "Amazon Web Services",
    stats: { "Cloud Architecture": 85, "Infrastructure Design": 90, "Cost Optimization": 75 }
  },
  {
    name: "TypeScript Compiler Contributor",
    category: "achievement",
    rarity: "legendary",
    description: "Rare achievement for contributing to the TypeScript compiler. One of only 247 phantom thieves worldwide.",
    dateAcquired: "2023-03-22",
    icon: "🔷",
    value: "Open Source Fame +200",
    source: "Microsoft GitHub",
    stats: { "Open Source Karma": 95, "TypeScript Mastery": 98, "Community Impact": 85 }
  },
  {
    name: "Perfect Code Review Streak",
    category: "achievement",
    rarity: "rare",
    description: "365 consecutive days of meaningful code reviews without missing a single day. The dedication is real.",
    dateAcquired: "2023-12-31",
    icon: "🔍",
    value: "Team Respect +150",
    source: "GitHub Statistics",
    stats: { "Code Quality": 92, "Team Collaboration": 88, "Consistency": 100 }
  },
  {
    name: "Rubber Duck of Enlightenment",
    category: "artifact",
    rarity: "legendary",
    description: "Ancient debugging artifact passed down through generations of developers. Whispers solutions to impossible bugs.",
    dateAcquired: "2019-04-01",
    icon: "🦆",
    value: "Debug Wisdom +∞",
    source: "Mysterious Mentor",
    stats: { "Problem Solving": 100, "Patience": 95, "Rubber Duck Fluency": 100 },
    isSecret: true
  },
  {
    name: "10K GitHub Stars Achievement",
    category: "achievement",
    rarity: "epic",
    description: "Phantom project reached legendary status with 10,000+ stars. The community has spoken.",
    dateAcquired: "2023-09-10",
    icon: "⭐",
    value: "Developer Street Cred +300",
    source: "GitHub Community",
    stats: { "Project Impact": 95, "Community Building": 90, "Code Quality": 88 }
  },
  {
    name: "Coffee Machine Whisperer",
    category: "skill",
    rarity: "rare",
    description: "Unique ability to fix any coffee machine in the office. Essential skill for maintaining team morale.",
    dateAcquired: "2020-11-15",
    icon: "☕",
    value: "Office Popularity +250",
    source: "Trial by Fire (and Beans)",
    stats: { "Caffeine Engineering": 88, "Office Hero Status": 95, "Productivity Boost": 92 }
  },
  {
    name: "React Conference Speaker",
    category: "achievement",
    rarity: "epic",
    description: "Shared phantom thief techniques with 500+ developers at ReactConf 2023. Knowledge is meant to be stolen... I mean shared.",
    dateAcquired: "2023-05-18",
    icon: "🎤",
    value: "Thought Leadership +200",
    source: "React Community",
    stats: { "Public Speaking": 85, "Technical Communication": 90, "Community Impact": 92 }
  },
  {
    name: "Zero-Bug Release Champion",
    category: "achievement",
    rarity: "legendary",
    description: "Achieved the impossible: 12 consecutive releases without a single production bug. The legends are true.",
    dateAcquired: "2023-07-04",
    icon: "🏆",
    value: "QA Team Admiration +500",
    source: "Production Environment",
    stats: { "Code Quality": 98, "Testing Prowess": 95, "Risk Assessment": 90 }
  },
  {
    name: "Midnight Debugger Medal",
    category: "achievement",
    rarity: "rare",
    description: "For solving critical production issues at 3 AM without breaking a sweat. True phantom dedication.",
    dateAcquired: "2022-12-24",
    icon: "🌙",
    value: "Emergency Response +180",
    source: "Production Incident",
    stats: { "Crisis Management": 88, "Debugging Speed": 92, "Sleep Deprivation Resistance": 100 }
  },
  {
    name: "Mentorship Master",
    category: "achievement",
    rarity: "epic",
    description: "Guided 15+ junior developers into phantom thief status. The next generation of code ninjas.",
    dateAcquired: "2023-11-30",
    icon: "🎓",
    value: "Karma Points +400",
    source: "Junior Developer Feedback",
    stats: { "Teaching Ability": 90, "Patience": 85, "Leadership": 88 }
  }
];

export function TreasureCollection() {
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [showSecrets, setShowSecrets] = useState(false);

  const categories = ["all", ...Array.from(new Set(treasures.map(t => t.category)))];
  const rarities = ["all", "common", "rare", "epic", "legendary"];

  const filteredTreasures = treasures.filter(treasure => {
    const categoryMatch = filterCategory === "all" || treasure.category === filterCategory;
    const rarityMatch = filterRarity === "all" || treasure.rarity === filterRarity;
    const secretMatch = !treasure.isSecret || showSecrets;
    return categoryMatch && rarityMatch && secretMatch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-gray-500 bg-gray-900/30";
      case "rare": return "border-blue-500 bg-blue-900/20";
      case "epic": return "border-purple-500 bg-purple-900/20 shadow-purple-500/20";
      case "legendary": return "border-yellow-500 bg-yellow-900/20 shadow-yellow-500/30 animate-pulse-gentle";
      default: return "border-gray-500";
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-400";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "certification": return "📜";
      case "project": return "🚀";
      case "achievement": return "🏆";
      case "skill": return "⚡";
      case "artifact": return "🗿";
      default: return "💎";
    }
  };

  const totalValue = treasures.length * 100; // Base calculation for dramatic effect
  const secretTreasures = treasures.filter(t => t.isSecret).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Treasure Vault
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Every phantom thief collects legendary artifacts, achievements, and certifications. 
          These treasures represent milestones in the journey from apprentice to master phantom.
        </p>
      </div>

      {/* Vault Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/30 text-center hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">💎</div>
          <div className="text-2xl font-bold text-yellow-400">{treasures.length}</div>
          <div className="text-sm text-gray-400">Total Treasures</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-purple-500/30 text-center hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">🌟</div>
          <div className="text-2xl font-bold text-purple-400">
            {treasures.filter(t => t.rarity === 'legendary').length}
          </div>
          <div className="text-sm text-gray-400">Legendary Items</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-green-500/30 text-center hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-2xl font-bold text-green-400">{totalValue.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Estimated Value</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 border border-red-500/30 text-center hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">🔒</div>
          <div className="text-2xl font-bold text-red-400">{secretTreasures}</div>
          <div className="text-sm text-gray-400">Secret Artifacts</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 self-center">Category:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                filterCategory === category
                  ? "bg-red-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category === "all" ? "All" : getCategoryIcon(category) + " " + category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 self-center">Rarity:</span>
          {rarities.map(rarity => (
            <button
              key={rarity}
              onClick={() => setFilterRarity(rarity)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                filterRarity === rarity
                  ? "bg-red-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            showSecrets
              ? "bg-purple-600 text-white animate-pulse"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          🔍 {showSecrets ? "Hide" : "Reveal"} Secrets
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Treasure Grid */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTreasures.map((treasure, index) => (
              <div
                key={treasure.name}
                className={`relative rounded-xl p-4 border-2 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  getRarityColor(treasure.rarity)
                } ${
                  selectedTreasure?.name === treasure.name ? "ring-2 ring-red-500" : ""
                } ${
                  treasure.isSecret ? "animate-shimmer" : ""
                }`}
                onClick={() => setSelectedTreasure(
                  selectedTreasure?.name === treasure.name ? null : treasure
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Secret Badge */}
                {treasure.isSecret && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    SECRET
                  </div>
                )}

                {/* Rarity Indicator */}
                <div className={`absolute top-2 left-2 text-xs font-bold ${getRarityText(treasure.rarity)}`}>
                  {treasure.rarity.toUpperCase()}
                </div>

                <div className="text-center mt-6 mb-4">
                  <div className="text-4xl mb-2 transform transition-transform duration-300 hover:scale-110">
                    {treasure.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{treasure.name}</h3>
                  <p className="text-xs text-gray-400">{getCategoryIcon(treasure.category)} {treasure.category}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-gray-300">{treasure.description}</div>
                  <div className="text-gray-400">Value: <span className="text-green-400">{treasure.value}</span></div>
                  <div className="text-gray-500">Source: {treasure.source}</div>
                  <div className="text-gray-500">Acquired: {new Date(treasure.dateAcquired).toLocaleDateString()}</div>
                </div>

                {/* Hover glow effect */}
                {treasure.rarity === "legendary" && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Treasure Details */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {selectedTreasure ? (
              <div className={`rounded-xl p-6 border-2 backdrop-blur-sm animate-fade-in ${
                getRarityColor(selectedTreasure.rarity)
              }`}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {selectedTreasure.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2">{selectedTreasure.name}</h2>
                  <p className={`text-sm font-bold ${getRarityText(selectedTreasure.rarity)}`}>
                    {selectedTreasure.rarity.toUpperCase()} {selectedTreasure.category.toUpperCase()}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-sm text-gray-300">{selectedTreasure.description}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-black/50 rounded-lg p-2 border border-gray-600">
                      <div className="text-xs text-gray-400">Value</div>
                      <div className="text-green-400 font-bold">{selectedTreasure.value}</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-2 border border-gray-600">
                      <div className="text-xs text-gray-400">Source</div>
                      <div className="text-blue-400 font-semibold">{selectedTreasure.source}</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Date Acquired</div>
                    <div className="text-white">
                      {new Date(selectedTreasure.dateAcquired).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  {selectedTreasure.stats && (
                    <div className="bg-black/50 rounded-lg p-3 border border-gray-600">
                      <div className="text-sm text-gray-400 mb-3">Stat Bonuses</div>
                      <div className="space-y-2">
                        {Object.entries(selectedTreasure.stats).map(([stat, value]) => (
                          <div key={stat}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-300">{stat}</span>
                              <span className="text-yellow-400">+{value}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full transition-all duration-1000"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setSelectedTreasure(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    Close Treasure
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded-xl p-8 border-2 border-gray-700 backdrop-blur-sm text-center">
                <div className="text-6xl mb-4 opacity-50">💎</div>
                <h2 className="text-xl font-bold mb-2">Select a Treasure</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Click on any treasure to examine its properties, stats, and the story behind its acquisition.
                </p>
                <div className="text-xs text-gray-500">
                  💡 Tip: Legendary treasures have special glow effects and unique properties
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vault Summary */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-6 border border-yellow-900/30">
        <h3 className="text-xl font-bold mb-4 text-center">Phantom Thief Legacy</h3>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">👑</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Master Treasure Hunter
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            This collection represents years of dedication, learning, and phantom thief excellence. 
            Each treasure tells a story of growth, challenge overcome, and mastery achieved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-center">
          <div>
            <div className="text-yellow-400 font-bold">Rarest Collection</div>
            <div className="text-gray-400">{treasures.filter(t => t.rarity === 'legendary').length} legendary artifacts acquired</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">Diverse Expertise</div>
            <div className="text-gray-400">{categories.length - 1} different treasure categories mastered</div>
          </div>
          <div>
            <div className="text-green-400 font-bold">Continuous Growth</div>
            <div className="text-gray-400">New treasures acquired regularly</div>
          </div>
        </div>
      </div>
    </div>
  );
}