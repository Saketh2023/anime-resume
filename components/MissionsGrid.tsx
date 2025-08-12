'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MissionCard } from './MissionCard';
import { staggerContainer, fadeInUp, missionReveal } from '@/lib/motion';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  rank: string;
  status: string;
  tech: string[];
  impact: string;
  team: number;
  duration: string;
  type: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  role: string;
  achievements: string[];
  metrics: Record<string, string>;
  rewards: string[];
  links: Record<string, string>;
  tags: string[];
  icon: string;
  rarity: string;
  experienceGained: number;
  skillsUnlocked: string[];
}

interface MissionsGridProps {
  onMissionClick?: (mission: Mission) => void;
}

export function MissionsGrid({ onMissionClick }: MissionsGridProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const response = await fetch('/data/missions.json');
        if (!response.ok) {
          throw new Error('Failed to load missions data');
        }
        const data = await response.json();
        setMissions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load missions');
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  const handleMissionClick = (mission: Mission) => {
    onMissionClick?.(mission);
  };

  if (loading) {
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="h-64 bg-gray-800/50 rounded-lg animate-pulse border border-gray-700/50"
            variants={fadeInUp}
          />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-400 mb-2">⚠️ Mission Data Compromised</div>
        <div className="text-gray-400 text-sm">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
    >
      {missions.map((mission) => (
        <motion.div
          key={mission.id}
          variants={missionReveal}
          layout
          layoutId={mission.id}
        >
          <MissionCard
            mission={mission}
            onClick={() => handleMissionClick(mission)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}