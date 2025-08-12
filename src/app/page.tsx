"use client";

import { useState, lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { usePreferredReducedMotion } from "@/lib/performance";
import { getMotionVariant, reducedMotion } from "@/lib/motion";
import { useKeyboardNavigation, useScreenReaderAnnouncement } from "@/lib/accessibility";
import { motion } from "motion/react";
import { PersonaHeader } from "@/app/components/PersonaHeader";
import { StatsSection } from "@/app/components/StatsSection";
import { ConfidantNetwork } from "@/app/components/ConfidantNetwork";
import { TreasureCollection } from "@/app/components/TreasureCollection";
import { SectionHeader } from "@/components/common/section-header";
import { HeroStats } from "@/components/hero/HeroStats";
// Lazy load heavy components for better performance
const LazyMissionsGrid = lazy(() => import("@/components/LazyMissionsGrid"));
const LazySkillTree = lazy(() => import("@/components/LazySkillTree"));
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { PerformanceMonitor, SectionTracker } from "@/components/PerformanceMonitor";
import { Target, Users, Zap, Trophy, Star, Crown, TreePine } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, floating, pulse, glow } from "@/lib/motion";
import profileData from "@/data/profile.json";

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
  stats: {
    chakra: number;
    maxChakra: number;
    focus: number;
    maxFocus: number;
    creativity: number;
    maxCreativity: number;
    experience: number;
    maxExperience: number;
  };
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: string;
    earnedDate: string;
  }>;
  avatar: {
    url: string;
    style: string;
    background: string;
    effects: string[];
  };
  bio: string;
  currentObjective: string;
  favoriteQuote: string;
  joinDate: string;
  totalMissionsCompleted: number;
  legendaryAchievements: number;
  currentRank: string;
  nextRank: string;
  rankProgress: number;
  specialties: string[];
  personalityTraits: {
    analytical: number;
    creative: number;
    collaborative: number;
    leadership: number;
    adaptability: number;
  };
}

export default function Home() {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  
  // Performance and accessibility hooks
  const prefersReducedMotion = usePreferredReducedMotion();
  const announce = useScreenReaderAnnouncement();
  

  const handleMissionClick = (mission: any) => {
    announce(`Mission ${mission.title} selected`, 'polite');
  };

  const handleSkillClick = (skill: any) => {
    announce(`Skill ${skill.name} examined`, 'polite');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-theme-primary mb-2">⚠️ Data Link Compromised</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Performance Monitoring */}
      <PerformanceMonitor />
      
      {/* Global Theme Switcher */}
      <ThemeSwitcher />
      
      <div className="min-h-screen bg-background">
      {/* Character Header */}
      <SectionTracker sectionName="hero">
        <motion.section 
          id="hero-section" 
          className="container mx-auto px-6 py-12"
        initial="initial"
        animate="animate"
        variants={getMotionVariant(
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          },
          prefersReducedMotion
        )}
        role="banner"
        aria-label="Phantom thief character profile"
      >
        <div className="relative">
          <PersonaHeader profileData={profileData} />
          
        </div>
        </motion.section>
      </SectionTracker>
      
      {/* HUD Stats Display */}
      <motion.section 
        className="container mx-auto px-6 py-8"
        variants={getMotionVariant(staggerContainer, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="stats-heading"
      >
        <HeroStats />
      </motion.section>
      
      {/* Stats Assessment */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="power-assessment-heading"
      >
        <SectionHeader 
          id="power-assessment-heading"
          title="POWER LEVEL ASSESSMENT" 
          icon={Zap}
          description="Every phantom thief must master diverse abilities across multiple domains"
          className="mb-12"
        />
        <StatsSection profileData={profileData} />
      </motion.section>
      
      {/* Mission Grid - Lazy Loaded */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="missions-heading"
      >
        <SectionHeader 
          id="missions-heading"
          title="MISSION OPERATIONS" 
          icon={Target}
          description="Professional projects reimagined as elite phantom thief missions"
          className="mb-12"
        />
        <ErrorBoundary>
          <Suspense fallback={
            <div className="text-center py-12" role="status" aria-label="Loading missions">
              <div className="animate-pulse text-gray-400">Loading mission data...</div>
            </div>
          }>
            <LazyMissionsGrid />
          </Suspense>
        </ErrorBoundary>
      </motion.section>
      
      {/* Skill Tree - Lazy Loaded */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="skills-heading"
      >
        <SectionHeader 
          id="skills-heading"
          title="TECHNICAL SKILL TREE" 
          icon={TreePine}
          description="Interactive skill progression system showing mastery across all development domains"
          className="mb-12"
        />
        <ErrorBoundary>
          <Suspense fallback={
            <div className="text-center py-12" role="status" aria-label="Loading skill tree">
              <div className="animate-pulse text-gray-400">Initializing skill matrix...</div>
            </div>
          }>
            <LazySkillTree />
          </Suspense>
        </ErrorBoundary>
      </motion.section>
      
      {/* Treasure Vault */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="treasure-heading"
      >
        <SectionHeader 
          id="treasure-heading"
          title="TREASURE VAULT" 
          icon={Trophy}
          description="Legendary artifacts, achievements, and certifications acquired"
          className="mb-12"
        />
        <TreasureCollection />
      </motion.section>
      
      {/* Confidant Network */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="network-heading"
      >
        <SectionHeader 
          id="network-heading"
          title="CONFIDANT NETWORK" 
          icon={Users}
          description="Trusted allies and professional relationships forged through shared missions"
          className="mb-12"
        />
        <ConfidantNetwork />
      </motion.section>
      
      {/* Final Power Assessment */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        role="region"
        aria-labelledby="final-assessment-heading"
      >
        <motion.div 
          className="relative theme-card rounded-2xl p-8 backdrop-blur-sm text-center overflow-hidden"
          variants={scaleIn}
        >
          {/* Legendary glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"
            variants={glow}
            animate="animate"
          />
          
          <div className="relative z-10">
            <motion.div className="mb-6" variants={prefersReducedMotion ? {} : floating} animate={prefersReducedMotion ? {} : "animate"}>
              <Crown className="mx-auto mb-4 text-theme-accent drop-shadow-lg theme-icon" size={48} aria-hidden="true" />
              <motion.h2 
                id="final-assessment-heading"
                className="text-4xl font-bold mb-2 theme-heading"
                variants={prefersReducedMotion ? {} : pulse}
                animate={prefersReducedMotion ? {} : "animate"}
              >
                PHANTOM THIEF STATUS: ELITE
              </motion.h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                This comprehensive character sheet represents years of dedication to the craft of development. 
                Every skill mastered, mission completed, and relationship forged contributes to an elite phantom thief 
                ready for any digital challenge.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8"
              variants={getMotionVariant(staggerContainer, prefersReducedMotion)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              role="group"
              aria-label="Final statistics summary"
            >
              <motion.div className="p-4" variants={getMotionVariant(fadeInUp, prefersReducedMotion)}>
                <motion.div 
                  className="text-2xl text-theme-primary font-bold mb-1"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
                  transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
                  aria-label={`${profileData?.totalMissionsCompleted || '47'} missions completed`}
                >
                  {profileData?.totalMissionsCompleted || '47'}+
                </motion.div>
                <div className="text-sm text-gray-400">Missions Completed</div>
              </motion.div>
              <motion.div className="p-4" variants={fadeInUp}>
                <motion.div 
                  className="text-2xl text-theme-accent font-bold mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {profileData?.currentRank || 'Elite'}
                </motion.div>
                <div className="text-sm text-gray-400">Phantom Thief Rank</div>
              </motion.div>
              <motion.div className="p-4" variants={fadeInUp}>
                <motion.div 
                  className="text-2xl text-theme-primary font-bold mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  Ready
                </motion.div>
                <div className="text-sm text-gray-400">For Next Heist</div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="text-xs text-gray-500 italic font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {profileData?.favoriteQuote || '"The heart of a true phantom thief beats not for glory, but for the code that changes the world."'}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
      
      </div>
    </>
  );
}