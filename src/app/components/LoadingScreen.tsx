"use client";

import { useState, useEffect } from "react";

const loadingQuotes = [
  "Infiltrating your browser...",
  "Awakening your Persona...",
  "Stealing hearts and code...",
  "Loading legendary skills...",
  "Preparing for the heist...",
  "Summoning developer powers...",
];

const loadingTips = [
  "The real treasure was the code we wrote along the way",
  "Every bug is just a surprise feature in disguise",
  "Coffee is the ultimate debugging tool",
  "Rubber duck debugging: 60% of the time, it works every time",
  "There are only 10 types of people: those who understand binary and those who don't",
];

export function LoadingScreen() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length);
    }, 400);

    // Cycle through tips slower
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 1200);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Persona 5 style logo placeholder */}
        <div className="mb-8">
          <div className="inline-block p-6 border-4 border-red-500 rounded-full bg-black/50 backdrop-blur-sm transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-red-500 tracking-wider">
              P5
            </div>
          </div>
        </div>

        {/* Loading quote */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 min-h-[28px]">
            {loadingQuotes[currentQuote]}
          </h2>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full transition-all duration-300 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="text-red-400 font-mono text-sm">
            {Math.min(Math.floor(progress), 100)}%
          </div>
        </div>

        {/* Loading tip */}
        <div className="text-gray-300 text-sm italic min-h-[40px] flex items-center justify-center">
          <span className="animate-fade-in">{loadingTips[currentTip]}</span>
        </div>

        {/* Phantom Thief aesthetic elements */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-red-500/20 rounded-full animate-spin-slow" />
        <div className="absolute -top-20 -left-20 w-32 h-32 border border-red-500/10 rounded-full animate-spin-reverse" />
      </div>
    </div>
  );
}