"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/resume";
import { getSkillLevelText } from "@/lib/data-utils";

interface SkillBadgeProps {
  skill: Skill;
  variant?: "default" | "compact" | "detailed";
  showLevel?: boolean;
  className?: string;
}

export function SkillBadge({ 
  skill, 
  variant = "default",
  showLevel = true,
  className 
}: SkillBadgeProps) {
  if (variant === "compact") {
    return (
      <Badge 
        variant="secondary" 
        className={cn("text-xs", className)}
        style={{ 
          backgroundColor: skill.color ? `${skill.color}20` : undefined,
          borderColor: skill.color || undefined,
        }}
      >
        {skill.icon && <span className="mr-1">{skill.icon}</span>}
        {skill.name}
      </Badge>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={cn("p-4 rounded-lg border bg-card", className)}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {skill.icon && (
              <span className="text-lg">{skill.icon}</span>
            )}
            <span className="font-medium">{skill.name}</span>
          </div>
          {showLevel && (
            <Badge variant="outline" className="text-xs">
              {getSkillLevelText(skill.level)}
            </Badge>
          )}
        </div>
        
        {showLevel && (
          <div className="space-y-1">
            <Progress 
              value={skill.level} 
              className="h-2"
              style={{
                background: skill.color ? `${skill.color}20` : undefined
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Proficiency</span>
              <span>{skill.level}%</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-shadow", className)}>
      {skill.icon && (
        <span className="text-2xl" style={{ color: skill.color }}>{skill.icon}</span>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium truncate">{skill.name}</span>
          {showLevel && (
            <span className="text-sm text-muted-foreground ml-2">
              {skill.level}%
            </span>
          )}
        </div>
        
        {showLevel && (
          <Progress 
            value={skill.level} 
            className="h-2"
            style={{
              background: skill.color ? `${skill.color}20` : undefined
            }}
          />
        )}
      </div>
    </div>
  );
}