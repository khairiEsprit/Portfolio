"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Eye, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Tilt } from "react-tilt";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import defaultOptions from "@/lib/react-titl";
import { ProjectType } from "@/app/(sections)/projects/constant";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  className?: string;
}

const ProjectCard = ({ project, index, className }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.65,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("group project-card", className)}
    >
      <Tilt options={defaultOptions}>
        <Card className="overflow-hidden h-full bg-card/50 backdrop-blur-optimized border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/20">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            {!imageError ? (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={imageLoaded ? "visible" : "hidden"}
                className="relative w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-70 project-card-image"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                />
              </motion.div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center space-y-2">
                  <Eye className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Preview unavailable
                  </p>
                </div>
              </div>
            )}

            {/* Overlay on hover */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              whileHover="visible"
              className="absolute inset-0 bg-black/60 backdrop-blur-optimized flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex gap-3">
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                      variant="outline"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </motion.div>
                </Link>
                {project.github !== "#" && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                        variant="outline"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Category Badge */}
            {project.category && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm text-xs font-medium"
                >
                  {project.category}
                </Badge>
              </div>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary/90 text-primary-foreground text-xs font-medium">
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Content Section */}
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techstack.map((tech, techIndex) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1 + techIndex * 0.05,
                    duration: 0.3,
                  }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live
                </Button>
              </Link>
              {project.github !== "#" && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;
