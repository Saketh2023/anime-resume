"use client";

import { useState, useEffect } from "react";
import { Activity, Zap, Coffee, Target, Settings } from "lucide-react";

interface StatBarProps {
  name: string;
  value: number;
  max: number;
  color: 'primary' | 'accent' | 'secondary';
  icon: React.ReactNode;
  subtitle?: string;
}

interface ThemeOption {
  id: string;
  name: string;
  colors: string[];
  icon: string;
}

function StatBar({ name, value, max, color, icon, subtitle }: StatBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorClasses = {
    primary: 'from-red-500 via-red-400 to-pink-400',
    accent: 'from-yellow-500 via-amber-400 to-orange-400', 
    secondary: 'from-blue-500 via-cyan-400 to-teal-400'
  };

  const glowColors = {
    primary: 'shadow-red-500/50',
    accent: 'shadow-yellow-500/50',
    secondary: 'shadow-blue-500/50'
  };

  return (
    <div className="group relative">
      {/* Stat Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-theme-accent">{icon}</div>
          <div>
            <div className="text-sm font-semibold text-white">{name}</div>
            {subtitle && (
              <div className="text-xs text-gray-400 font-mono">{subtitle}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-theme-accent font-mono">
            {value}
          </div>
          <div className="text-xs text-gray-500 font-mono">/{max}</div>
        </div>
      </div>

      {/* Stat Bar Container */}
      <div className="relative h-3 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
        
        {/* Progress Fill */}
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-1000 ease-out relative overflow-hidden group-hover:${glowColors[color]} group-hover:shadow-lg`}
          style={{ width: `${animatedValue}%` }}
        >
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 hud-scan opacity-30" />
      </div>

      {/* Progress Percentage Display */}
      <div className="absolute -top-8 right-0 text-xs font-mono text-theme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 px-2 py-1 rounded border border-theme-accent/30">
        {Math.round(percentage)}%
      </div>
    </div>
  );
}

function ThemeSwitch() {
  const [currentTheme, setCurrentTheme] = useState('persona5');
  const [isOpen, setIsOpen] = useState(false);

  const themes: ThemeOption[] = [
    { 
      id: 'persona5', 
      name: 'Phantom Thief', 
      colors: ['#E60012', '#000000', '#FFCC00'],
      icon: '🎭'
    },
    { 
      id: 'ninja', 
      name: 'Shadow Walker', 
      colors: ['#2D5A27', '#0D1F0C', '#D4AF37'],
      icon: '🥷'
    },
    { 
      id: 'pirate', 
      name: 'Sea Captain', 
      colors: ['#2C5F85', '#0F1419', '#FFB000'],
      icon: '🏴‍☠️'
    },
    { 
      id: 'mech', 
      name: 'Cyber Pilot', 
      colors: ['#00BFFF', '#2A2A2E', '#FF6B00'],
      icon: '🤖'
    }
  ];

  const switchTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-black/40 border border-theme-accent/30 rounded-lg backdrop-blur-sm hover:bg-theme-accent/10 transition-all duration-300 group"
        aria-label="Switch Theme"
      >
        <Settings size={16} className="text-theme-accent group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-mono text-white">THEME</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-theme-accent/30 rounded-lg backdrop-blur-md shadow-2xl z-50 overflow-hidden">
          <div className="p-2 border-b border-theme-accent/20">
            <div className="text-xs font-mono text-theme-accent">SELECT INTERFACE</div>
          </div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => switchTheme(theme.id)}
              className={`w-full flex items-center justify-between p-3 hover:bg-theme-accent/10 transition-all duration-200 group ${
                currentTheme === theme.id ? 'bg-theme-accent/20' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{theme.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{theme.name}</div>
                  <div className="flex space-x-1 mt-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {currentTheme === theme.id && (
                <div className="text-theme-accent text-xs">●</div>
              )}
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export function HeroStats() {
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Character stats - these could come from props or context
  const stats = [
    {
      name: "CHAKRA",
      value: 85,
      max: 100,
      color: 'primary' as const,
      icon: <Zap size={16} />,
      subtitle: "Energy Level"
    },
    {
      name: "FOCUS", 
      value: 92,
      max: 100,
      color: 'accent' as const,
      icon: <Target size={16} />,
      subtitle: "Concentration"
    },
    {
      name: "CREATIVITY",
      value: 78,
      max: 100, 
      color: 'secondary' as const,
      icon: <Activity size={16} />,
      subtitle: "Innovation"
    }
  ];

  return (
    <div className="relative">
      {/* Main HUD Container */}
      <div className="hud-panel rounded-2xl p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 98px,
              var(--theme-accent) 100px,
              var(--theme-accent) 100px
            )`
          }} />
        </div>

        {/* Animated Scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(0deg, transparent ${scanlinePosition}%, var(--theme-primary) ${scanlinePosition + 1}%, transparent ${scanlinePosition + 2}%)`
          }}
        />

        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            {/* Left Side: Character Info */}
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-theme-accent rounded-full animate-pulse" />
                <h2 className="text-xl font-bold text-white">PHANTOM STATUS</h2>
              </div>
              <div className="text-sm text-gray-400 font-mono flex items-center space-x-2">
                <span>CODENAME: DEVELOPER</span>
                <span className="text-theme-accent">●</span>
                <span>ACTIVE</span>
              </div>
              <div className="flex space-x-4 text-xs font-mono text-gray-500">
                <span>LVL.∞</span>
                <span>EXP: 9,999+</span>
                <span>NEXT: ∞</span>
              </div>
            </div>

            {/* Right Side: Theme Switcher */}
            <ThemeSwitch />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.name} style={{ animationDelay: `${index * 200}ms` }}>
                <StatBar {...stat} />
              </div>
            ))}
          </div>

          {/* Bottom Status Bar */}
          <div className="mt-6 pt-4 border-t border-theme-accent/20">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-theme-accent">
                  <div className="w-2 h-2 bg-theme-accent rounded-full animate-pulse" />
                  <span>SYSTEM OPTIMAL</span>
                </div>
                <div className="flex items-center space-x-2 text-theme-primary">
                  <Coffee size={12} />
                  <span>FUEL: HIGH</span>
                </div>
              </div>
              <div className="text-theme-accent">
                {new Date().toLocaleTimeString()} GMT
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-theme-accent/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-theme-accent/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-theme-accent/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-theme-accent/30" />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-theme-accent/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Additional CSS for the floating animation
const additionalStyles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg); 
      opacity: 0.3;
    }
    50% { 
      transform: translateY(-20px) rotate(180deg); 
      opacity: 1;
    }
  }
  
  .animate-float {
    animation: float linear infinite;
  }
`;

// Inject styles if we're in the browser
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
}