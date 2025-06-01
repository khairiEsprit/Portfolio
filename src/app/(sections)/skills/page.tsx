"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Frontend, Backend, Tools, AIML, Languages } from "./constant";

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

interface SkillComponents {
  [key: string]: () => JSX.Element;
}

const skillComponents: SkillComponents = {
  Frontend: Frontend,
  Backend: Backend,
  Tools: Tools,
  "AI/ML": AIML,
  Languages: Languages,
};

const data = [
  {
    label: "Frontend",
  },
  {
    label: "Backend",
  },
  {
    label: "Tools",
  },
  {
    label: "AI/ML",
  },
  {
    label: "Languages",
  },
];

const Skills = () => {
  const isMobile = useIsMobile();

  // Mobile-optimized animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1, // Faster stagger on mobile
        delayChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 15 : 30, // Reduced movement on mobile
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="pb-20">
        <motion.div
          className="flex flex-col items-center justify-center py-5"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="font-bold text-3xl">Skills</p>
          <div className="h-[2px] w-20 bg-blue-500 rounded-full my-1"></div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center px-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map(({ label }, index) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col m-1"
              style={{
                // Force hardware acceleration for smooth animations
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <div className="flex flex-col">
                <span className="animate_in text-xl mt-1">{label}</span>
                <div className="w-16 h-[1px] bg-blue-500 rounded-full my-1"></div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-5">
                {skillComponents[label] && (
                  <div>{skillComponents[label]()}</div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default Skills;
