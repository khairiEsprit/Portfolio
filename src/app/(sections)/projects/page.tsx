"use client";

import { motion } from "framer-motion";
import { ProjectData } from "./constant";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/animations/AnimatedSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ProjectsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="responsive-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div
            variants={headerVariants}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest work in web development, AI, and
              innovative solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </motion.div>

          {/* Projects Grid */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
              {ProjectData.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  className="h-full"
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection
            animation="fadeUp"
            delay={0.5}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border/50">
              <h3 className="text-2xl font-semibold mb-4">
                Interested in collaborating?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                I'm always open to discussing new opportunities and innovative
                projects.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Get In Touch
              </motion.a>
            </div>
          </AnimatedSection>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectsPage;
