"use client";

import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Calendar, Star, Sparkles, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProjectCardData {
  type: "project_card";
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  status?: "completed" | "in-progress" | "planned";
  completionDate?: string;
  category?: string;
}

interface ChatProjectCardProps {
  project: ProjectCardData;
  index?: number;
}

// Memoized component for performance optimization
const ChatProjectCard = memo(({ project, index = 0 }: ChatProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState<string | null>(null);

  // Animation variants for performance optimization
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      rotateX: 10,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    hover: {
      scale: 1.03,
      y: -4,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: isHovered ? 0.6 : 0,
      transition: { duration: 0.3 }
    }
  };

  const badgeVariants = {
    rest: { scale: 1, opacity: 0.8 },
    hover: { 
      scale: 1.05, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full mt-3 perspective-1000"
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-xl -z-10"
      />
      
      {/* Glassmorphism card */}
      <Card className="relative rounded-2xl border-0 overflow-hidden group backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-px">
          <div className="h-full w-full bg-white dark:bg-gray-900 rounded-2xl" />
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <motion.div
            animate={{ 
              backgroundPosition: isHovered ? "100% 100%" : "0% 0%" 
            }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
            style={{
              backgroundSize: "400% 400%"
            }}
          />
        </div>

        <CardContent className="relative p-5 z-10">
          {/* Header with enhanced styling */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h3 
                className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1 mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {project.title}
              </motion.h3>
              
              <motion.div 
                className="flex items-center gap-2 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                {project.category && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0 font-medium"
                  >
                    <Code2 size={10} className="mr-1" />
                    {project.category}
                  </Badge>
                )}
                
                {project.status === "completed" && (
                  <motion.div 
                    className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star size={10} fill="currentColor" />
                    <span className="font-medium">Completed</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            {project.completionDate && (
              <motion.div 
                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                <Calendar size={10} />
                <span>{project.completionDate}</span>
              </motion.div>
            )}
          </div>

          {/* Enhanced description */}
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Animated technology badges */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    variants={badgeVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.15 + 0.6 + techIndex * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200 font-medium"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {project.technologies.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                  >
                    <Sparkles size={10} className="mr-1" />
                    +{project.technologies.length - 4} more
                  </Badge>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enhanced action buttons */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.7 }}
          >
            {project.live && (
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setButtonHovered('live')}
                onHoverEnd={() => setButtonHovered(null)}
                className="flex-1"
              >
                <Button
                  size="sm"
                  className="w-full h-9 text-xs relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 font-medium group"
                  onClick={() => window.open(project.live, "_blank")}
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20"
                    animate={{ opacity: buttonHovered === 'live' ? 0.3 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <ExternalLink size={12} className="mr-2" />
                  <span>View Project</span>
                </Button>
              </motion.div>
            )}
            
            {project.github && project.github !== "#" && (
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setButtonHovered('github')}
                onHoverEnd={() => setButtonHovered(null)}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs px-4 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github size={12} className="mr-2" />
                  <span>Code</span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ChatProjectCard.displayName = "ChatProjectCard";

export default ChatProjectCard;
