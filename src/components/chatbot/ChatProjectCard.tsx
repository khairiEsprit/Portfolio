"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";
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

export default function ChatProjectCard({
  project,
  index = 0,
}: ChatProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full mt-3"
    >
      <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 overflow-hidden">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {project.category && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {project.category}
                  </Badge>
                )}
                {project.status === "completed" && (
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Star size={12} fill="currentColor" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
            {project.completionDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={12} />
                <span>{project.completionDate}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  +{project.technologies.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.live && (
              <Button
                size="sm"
                className="flex-1 h-8 text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.open(project.live, "_blank")}
              >
                <ExternalLink size={12} className="mr-1.5" />
                View Project
              </Button>
            )}
            {project.github && project.github !== "#" && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => window.open(project.github, "_blank")}
              >
                <Github size={12} className="mr-1.5" />
                Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
