"use client";

import { useState, useEffect } from "react";
import { PersonaHeader } from "./PersonaHeader";
import { StatsSection } from "./StatsSection";
import { SkillsArcana } from "./SkillsArcana";
import { MissionHistory } from "./MissionHistory";
import { ConfidantNetwork } from "./ConfidantNetwork";
import { TreasureCollection } from "./TreasureCollection";

export function PersonaResume() {
  const [currentSection, setCurrentSection] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      const newKonami = [...konami, event.code].slice(-10);
      setKonami(newKonami);
      
      if (newKonami.join(',') === konamiCode.join(',')) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        setKonami([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  const sections = [
    { id: "profile", label: "Phantom Profile", icon: "👤" },
    { id: "stats", label: "Power Level", icon: "📊" },
    { id: "skills", label: "Arcana Skills", icon: "🎭" },
    { id: "missions", label: "Mission History", icon: "🎯" },
    { id: "confidants", label: "Confidant Network", icon: "🤝" },
    { id: "treasures", label: "Treasure Vault", icon: "💎" },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "profile":
        return <PersonaHeader />;
      case "stats":
        return <StatsSection />;
      case "skills":
        return <SkillsArcana />;
      case "missions":
        return <MissionHistory />;
      case "confidants":
        return <ConfidantNetwork />;
      case "treasures":
        return <TreasureCollection />;
      default:
        return <PersonaHeader />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          )`
        }} />
      </div>

      {/* Easter egg modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-red-900 p-8 rounded-lg border-2 border-red-500 text-center animate-bounce-gentle">
            <h2 className="text-2xl font-bold mb-4">All-Out Attack!</h2>
            <p className="text-lg">You found the secret developer konami code!</p>
            <p className="text-sm text-red-300 mt-2">Achievement Unlocked: Phantom Hacker 🏆</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-red-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="text-red-500 font-bold text-xl tracking-wider">
                PHANTOM DEV
              </div>
              <div className="hidden sm:block text-xs text-gray-400 font-mono">
                v2.0.25 • Loading memories...
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                    currentSection === section.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105"
                      : "text-gray-300 hover:text-white hover:bg-red-900/50 hover:scale-102"
                  }`}
                >
                  <span className="text-sm">{section.icon}</span>
                  <span className="text-sm font-medium">{section.label}</span>
                  {currentSection === section.id && (
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-red-500 hover:text-white transition-colors"
            >
              <div className="space-y-1">
                <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`} />
                <div className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`} />
                <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-red-900 animate-slide-down">
            <div className="px-4 py-2 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(section.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 ${
                    currentSection === section.id
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-red-900/50"
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-fade-in-up">
            {renderSection()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-900 bg-black/50 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-sm mb-2">
            "The ultimate goal of any phantom thief is to steal the hearts of their targets."
          </p>
          <p className="text-xs text-gray-500 font-mono">
            Crafted with ❤️ and way too much coffee • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}