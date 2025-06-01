"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionConfig,
} from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeUp"
    | "fadeDown"
    | "fadeLeft"
    | "fadeRight"
    | "scaleIn"
    | "slideUp"
    | "bounceIn";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

// Mobile-optimized animation variants
const getMobileOptimizedVariants = (animation: string, isMobile: boolean) => {
  const baseVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: isMobile ? 15 : 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: isMobile ? -15 : -30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: isMobile ? -15 : -30 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: isMobile ? 15 : 30 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: {
        opacity: 0,
        // Remove scale on mobile to prevent layout shifts
        ...(isMobile ? {} : { scale: 0.9 }),
      },
      visible: {
        opacity: 1,
        ...(isMobile ? {} : { scale: 1 }),
      },
    },
    slideUp: {
      hidden: { opacity: isMobile ? 0 : 1, y: isMobile ? 25 : 100 },
      visible: { opacity: 1, y: 0 },
    },
    bounceIn: {
      hidden: {
        opacity: 0,
        // Disable bounce on mobile for performance
        ...(isMobile ? {} : { scale: 0.3 }),
      },
      visible: {
        opacity: 1,
        ...(isMobile ? {} : { scale: 1 }),
        transition: isMobile
          ? {}
          : {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
      },
    },
  };

  return (
    baseVariants[animation as keyof typeof baseVariants] || baseVariants.fadeUp
  );
};

export default function AnimatedSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin: "-50px 0px -50px 0px",
  });

  const variants = getMobileOptimizedVariants(animation, isMobile);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{
          duration: isMobile ? Math.min(duration, 0.4) : duration, // Faster on mobile
          delay: isMobile ? Math.min(delay, 0.2) : delay, // Reduced delay on mobile
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(className)}
        style={{
          // Force hardware acceleration for smooth animations
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

// Staggered children animation component
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
}: StaggeredContainerProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: threshold, once });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? Math.min(staggerDelay, 0.05) : staggerDelay, // Faster stagger on mobile
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn(className)}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )}
      </motion.div>
    </MotionConfig>
  );
}

// Parallax component for background elements
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
