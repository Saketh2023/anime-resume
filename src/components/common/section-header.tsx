"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionHeader({ 
  title, 
  icon: Icon, 
  description, 
  className,
  delay = 0,
  id 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "relative mb-8 pb-4 border-b-2 border-primary/20",
        "animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background accent */}
      <div className="absolute -top-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-transparent opacity-70" />
      
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        
        <div>
          <h2 id={id} className="text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Persona 5 style diagonal accent */}
      <div className="absolute -right-4 -top-2 w-16 h-16 bg-primary/5 p5-diagonal opacity-50" />
    </div>
  );
}