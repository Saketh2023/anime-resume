"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, scaleIn, floating, elasticScale, themeSwitch } from "@/lib/motion";

interface ProfileData {
  name: string;
  codename: string;
  title: string;
  tagline: string;
  level: number;
  class: string;
  guild: string;
  location: string;
  email: string;
  phone: string;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  bio: string;
  currentObjective: string;
  favoriteQuote: string;
  joinDate: string;
  totalMissionsCompleted: number;
  legendaryAchievements: number;
  personalityTraits: {
    analytical: number;
    creative: number;
    collaborative: number;
    leadership: number;
    adaptability: number;
  };
}

interface PersonaHeaderProps {
  profileData?: ProfileData | null;
}

export function PersonaHeader({ profileData }: PersonaHeaderProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showSecret, setShowSecret] = useState(false);

  const roles = [
    profileData?.codename || "Full-Stack Phantom",
    "Code Thief",
    "Digital Trickster", 
    "Bug Slayer",
    "Feature Summoner"
  ];

  const personalityTraits = profileData ? [
    { trait: "Analytical Thinking", level: profileData.personalityTraits.analytical, color: "red" },
    { trait: "Creative Problem Solving", level: profileData.personalityTraits.creative, color: "blue" },
    { trait: "Team Collaboration", level: profileData.personalityTraits.collaborative, color: "green" },
    { trait: "Leadership Skills", level: profileData.personalityTraits.leadership, color: "purple" },
    { trait: "Adaptability", level: profileData.personalityTraits.adaptability, color: "cyan" },
  ] : [
    { trait: "Debugging Intuition", level: 95, color: "red" },
    { trait: "Creative Problem Solving", level: 92, color: "blue" },
    { trait: "Team Collaboration", level: 88, color: "green" },
    { trait: "Learning Appetite", level: 97, color: "purple" },
    { trait: "Coffee Dependency", level: 100, color: "amber", isJoke: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAvatarClick = () => {
    setShowSecret(!showSecret);
  };

  if (!profileData) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton */}
        <motion.div 
          className="relative bg-gradient-to-r from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-800/50 animate-pulse" />
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
              <div className="h-6 bg-gray-800/50 rounded animate-pulse" />
              <div className="h-8 bg-gray-800/50 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section */}
      <motion.div 
        className="relative theme-card rounded-2xl p-8 backdrop-blur-sm overflow-hidden"
        variants={scaleIn}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-16 translate-x-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full translate-y-12 -translate-x-12"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <motion.div 
            className="relative group"
            variants={floating}
            animate="animate"
          >
            <motion.div 
              className="w-32 h-32 rounded-full theme-gradient p-1 cursor-pointer"
              variants={elasticScale}
              whileHover="hover"
              whileTap="tap"
              onClick={handleAvatarClick}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold text-white">
                <motion.span
                  key={showSecret ? 'mask' : 'dev'}
                  variants={themeSwitch}
                  animate={showSecret ? "animate" : "initial"}
                >
                  {showSecret ? "🎭" : "👨‍💻"}
                </motion.span>
              </div>
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
            <motion.div 
              className="absolute -top-2 -left-2 text-2xl"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ⭐
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 text-center md:text-left"
            variants={fadeInUp}
          >
            {/* Name and Title */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2 theme-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {profileData.name}
            </motion.h1>
            <motion.div 
              className="flex items-center justify-center md:justify-start space-x-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-xl text-theme-primary">Codename:</span>
              <motion.span 
                className={`text-xl font-semibold text-white transition-all duration-500 ${
                  isTyping ? "opacity-100" : "opacity-50"
                }`}
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {roles[currentRole]}
              </motion.span>
              <motion.div 
                className={`w-2 h-6 bg-theme-primary ${
                  isTyping ? "opacity-100" : "opacity-0"
                }`}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Title and tagline */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-lg text-gray-300 mb-1">{profileData.title}</div>
              <div className="text-sm text-gray-400 italic">"{profileData.tagline}"</div>
            </motion.div>
            
            {/* Location and Status */}
            <motion.div 
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-300 mb-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="flex items-center space-x-2"
                variants={fadeInUp}
              >
                <span>📍</span>
                <span>{profileData.location}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                variants={fadeInUp}
              >
                <span>🎯</span>
                <span>Available for Heists</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                variants={fadeInUp}
              >
                <span>⚡</span>
                <span>Level {profileData.level} {profileData.class}</span>
              </motion.div>
            </motion.div>
            
            {/* Contact Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.a
                href={`mailto:${profileData.email}`}
                className="px-4 py-2 theme-button rounded-lg transition-all duration-300 flex items-center space-x-2 group"
                variants={elasticScale}
                whileHover="hover"
                whileTap="tap"
              >
                <span>📧</span>
                <span>Send Message</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
              {profileData.linkedin && (
                <motion.a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-theme-primary text-theme-primary hover:theme-button hover:text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                  variants={elasticScale}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span>📱</span>
                  <span>Connect</span>
                </motion.a>
              )}
              {profileData.github && (
                <motion.a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                  variants={elasticScale}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span>📄</span>
                  <span>GitHub</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div 
          className="theme-card rounded-xl p-6 backdrop-blur-sm transition-all duration-300"
          variants={scaleIn}
          whileHover={{ y: -5 }}
        >
          <motion.h2 
            className="text-xl font-bold mb-4 flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              🎯
            </motion.span>
            <span>Mission Statement</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {profileData.bio}
          </motion.p>
          <motion.div 
            className="mt-4 text-xs text-theme-accent font-mono italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            "{profileData.favoriteQuote}"
          </motion.div>
        </motion.div>

        <motion.div 
          className="theme-card rounded-xl p-6 backdrop-blur-sm transition-all duration-300"
          variants={scaleIn}
          whileHover={{ y: -5 }}
        >
          <motion.h2 
            className="text-xl font-bold mb-4 flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              ⚡
            </motion.span>
            <span>Personality Matrix</span>
          </motion.h2>
          <motion.div 
            className="space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {personalityTraits.map((trait, index) => (
              <motion.div 
                key={trait.trait} 
                className="group"
                variants={fadeInUp}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm ${trait.isJoke ? 'text-amber-400' : 'text-gray-300'}`}>
                    {trait.trait} {trait.isJoke && '☕'}
                  </span>
                  <motion.span 
                    className={`text-xs font-mono ${trait.isJoke ? 'text-amber-400' : 'text-theme-primary'}`}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {trait.level}%
                  </motion.span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${
                      trait.color === 'red' ? 'from-red-500 to-red-400' :
                      trait.color === 'blue' ? 'from-blue-500 to-blue-400' :
                      trait.color === 'green' ? 'from-green-500 to-green-400' :
                      trait.color === 'purple' ? 'from-purple-500 to-purple-400' :
                      trait.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
                      'from-amber-500 to-amber-400'
                    } group-hover:shadow-lg`}
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.level}%` }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    <div className="w-full h-full bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
      >
        {[
          { label: "Years of Experience", value: new Date().getFullYear() - new Date(profileData.joinDate).getFullYear() + "+", icon: "⏰" },
          { label: "Missions Completed", value: profileData.totalMissionsCompleted.toString(), icon: "🎯" },
          { label: "Legendary Achievements", value: profileData.legendaryAchievements.toString(), icon: "👑" },
          { label: "Current Level", value: profileData.level.toString(), icon: "⭐" },
        ].map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className="theme-card rounded-xl p-4 backdrop-blur-sm text-center group cursor-pointer"
            variants={scaleIn}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
                          }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-2xl mb-2"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.5 
              }}
            >
              {stat.icon}
            </motion.div>
            <motion.div 
              className="text-2xl font-bold text-theme-primary mb-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}